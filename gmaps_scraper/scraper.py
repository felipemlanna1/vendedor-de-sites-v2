"""
Core Google Maps scraper usando Playwright headless.
Scroll feed → coleta URLs → extrai detail pages → salva no cache.
"""

import asyncio
import random
import re
import sys
from urllib.parse import unquote

from playwright.async_api import async_playwright, Page, BrowserContext

from . import selectors as sel
from .cache import LeadCache, make_fingerprint
from .geo import make_maps_url


# ============================================================
# CONFIG
# ============================================================

USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
]

CONSENT_COOKIE = {
    "name": "CONSENT",
    "value": "YES+cb.20240101-01-p0.pt+FX+430",
    "domain": ".google.com",
    "path": "/",
}

MAX_SCROLL_ATTEMPTS = 8  # scrolls sem novos resultados antes de parar
CONCURRENT_TABS = 5


# ============================================================
# HELPERS
# ============================================================

async def _random_delay(min_s: float = 2.0, max_s: float = 5.0):
    """Delay aleatorio anti-deteccao."""
    await asyncio.sleep(random.uniform(min_s, max_s))


def _extract_place_id(url: str) -> str:
    """Extrai place_id de uma URL do Google Maps."""
    # Padrao: /maps/place/.../data=...!1s0x...!2s...
    # Ou: ftid=0x...:0x...
    match = re.search(r'ftid=([^&]+)', url)
    if match:
        return match.group(1)
    match = re.search(r'!1s(0x[a-f0-9:]+)', url)
    if match:
        return match.group(1)
    # Fallback: usar parte do path como ID
    match = re.search(r'/maps/place/([^/]+)', url)
    if match:
        return unquote(match.group(1))[:100]
    return ""


def _parse_rating(aria_label: str) -> tuple[float | None, int | None]:
    """Extrai rating e review count de aria-label como '4.5 stars 120 reviews'."""
    rating = None
    reviews = None

    rating_match = re.search(sel.RATING_REGEX, aria_label)
    if rating_match:
        rating = float(rating_match.group(1).replace(",", "."))

    reviews_match = re.search(r'(\d[\d,.]*)\s*(?:review|avaliação|aval|reseña)', aria_label, re.IGNORECASE)
    if reviews_match:
        reviews = int(reviews_match.group(1).replace(",", "").replace(".", ""))

    return rating, reviews


# ============================================================
# SCROLL FEED — coleta links dos resultados
# ============================================================

async def _scroll_feed(page: Page, max_results: int = 120) -> list[str]:
    """Scrolla o feed de resultados e coleta URLs de places."""
    try:
        await page.wait_for_selector(sel.FEED, timeout=15000)
    except Exception:
        return []

    place_links = set()
    no_new_count = 0

    while len(place_links) < max_results and no_new_count < MAX_SCROLL_ATTEMPTS:
        # Scroll usando keyboard (mais humano que scrollTo)
        feed = page.locator(sel.FEED)
        await feed.focus()
        for _ in range(3):
            await page.keyboard.press("PageDown")
            await asyncio.sleep(random.uniform(0.3, 0.7))

        await _random_delay(1.5, 3.0)

        # Coletar links
        links = await page.locator(sel.PLACE_LINKS).evaluate_all(
            "els => els.map(e => e.href)"
        )

        old_count = len(place_links)
        place_links.update(links)

        if len(place_links) == old_count:
            no_new_count += 1
        else:
            no_new_count = 0

        # Checar fim da lista
        end_en = await page.locator(f"xpath={sel.END_OF_LIST}").count()
        end_pt = await page.locator(f"xpath={sel.END_OF_LIST_PT}").count()
        if end_en > 0 or end_pt > 0:
            break

    return list(place_links)[:max_results]


# ============================================================
# EXTRACT DETAIL — extrai dados de uma pagina de negocio
# ============================================================

async def _extract_detail(page: Page, url: str) -> dict | None:
    """Visita uma pagina de detalhes e extrai todos os dados disponiveis."""
    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=20000)
        await _random_delay(2.0, 4.0)
    except Exception:
        return None

    data = await page.evaluate(r"""() => {
        const r = {};

        // Nome via title tag (mais estavel)
        const title = document.title || '';
        const titleMatch = title.match(/^(.+?)\s*[-–]\s*Google/);
        r.name = titleMatch ? titleMatch[1].trim() : '';
        if (!r.name) {
            const h1 = document.querySelector('h1');
            r.name = h1 ? h1.innerText.trim() : '';
        }

        // Endereco
        const addrBtn = document.querySelector('button[data-item-id="address"]');
        r.address = addrBtn ? addrBtn.innerText.replace(/\n/g, ', ').trim() : '';

        // Telefone — extrair do data-item-id (mais limpo que innerText)
        const phoneBtn = document.querySelector('button[data-item-id^="phone:"]');
        if (phoneBtn) {
            // data-item-id="phone:tel:+554899..." contem o numero limpo
            const pid = phoneBtn.getAttribute('data-item-id') || '';
            const telMatch = pid.match(/phone:tel:(.+)/);
            if (telMatch) {
                r.phone = telMatch[1].trim();
            } else {
                // Fallback: innerText limpo (remove icones unicode e newlines)
                r.phone = (phoneBtn.innerText || '').replace(/[^\d()+\-\s]/g, '').trim();
            }
        }
        if (!r.phone) {
            const phoneLink = document.querySelector('a[href^="tel:"]');
            if (phoneLink) {
                r.phone = phoneLink.getAttribute('href').replace('tel:', '').trim();
            }
        }

        // Website
        const webLink = document.querySelector('a[data-item-id="authority"]');
        r.website = webLink ? webLink.getAttribute('href') : '';

        // Categoria
        const catBtn = document.querySelector('button[jsaction*="category"]');
        r.category = catBtn ? catBtn.innerText.trim() : '';

        // Rating + Reviews via aria-label nos spans role=img
        // aria-label tipicamente: "4.5 stars 1,234 reviews" ou "4,5 estrelas 1.234 avaliações"
        const ratingImgs = document.querySelectorAll('span[role="img"]');
        for (const img of ratingImgs) {
            const label = img.getAttribute('aria-label') || '';
            const starMatch = label.match(/([0-9]+[.,][0-9]+)\s*(?:star|estrela)/i);
            if (starMatch) {
                r.rating = parseFloat(starMatch[1].replace(',', '.'));

                // Extrair reviews do mesmo aria-label
                const revMatch = label.match(/(\d[\d.,]*)\s*(?:review|avaliação|avaliações|aval)/i);
                if (revMatch) {
                    r.reviews = parseInt(revMatch[1].replace(/[.,]/g, ''));
                }
                break;
            }
        }

        // Fallback reviews: buscar no texto da pagina
        if (!r.reviews) {
            // Procurar padrao "(NNN)" ou "NNN reviews" proximo ao rating
            const allText = document.body.innerText || '';
            // Buscar padrao "N.NNN avaliações" ou "N,NNN reviews"
            const revFallback = allText.match(/(\d{1,3}(?:[.,]\d{3})*)\s*(?:reviews?|avaliações?|avaliação)/i);
            if (revFallback) {
                r.reviews = parseInt(revFallback[1].replace(/[.,]/g, ''));
            }
        }

        // Fallback reviews: div.F7nice spans com numero entre parenteses
        if (!r.reviews) {
            const f7 = document.querySelector('div.F7nice');
            if (f7) {
                const txt = f7.innerText || '';
                const nums = txt.match(/\((\d[\d.,]*)\)/);
                if (nums) {
                    r.reviews = parseInt(nums[1].replace(/[.,]/g, ''));
                }
            }
        }

        // Preco
        const priceSpans = document.querySelectorAll('span[aria-label]');
        for (const sp of priceSpans) {
            const label = sp.getAttribute('aria-label') || '';
            if (label.match(/price|preço/i) && label.match(/[\$·]/)) {
                r.price_range = sp.innerText.trim();
                break;
            }
        }

        // Status (aberto/fechado)
        r.status = 'OPERATIONAL';
        const pageText = document.body.innerText || '';
        if (pageText.match(/Temporarily closed|Temporariamente fechado/i)) {
            r.status = 'CLOSED_TEMPORARILY';
            r.is_temporarily_closed = true;
        }
        if (pageText.match(/Permanently closed|Permanentemente fechado/i)) {
            r.status = 'CLOSED_PERMANENTLY';
            r.is_permanently_closed = true;
        }

        // Plus Code
        const plusBtn = document.querySelector('button[data-item-id="oloc"]');
        r.plus_code = plusBtn ? plusBtn.innerText.trim() : '';

        // Descricao / About
        const aboutEl = document.querySelector('[aria-label*="About"], [aria-label*="Sobre"]');
        r.description = aboutEl ? aboutEl.innerText.substring(0, 500).trim() : '';

        // Horarios (tentar extrair texto)
        const hoursRows = document.querySelectorAll('table.eK4R0e tr, table.WgFkxc tr');
        if (hoursRows.length > 0) {
            const hoursArr = [];
            for (const row of hoursRows) {
                hoursArr.push(row.innerText.replace(/\t/g, ': ').trim());
            }
            r.hours = hoursArr.join(' | ');
        }

        // Coordenadas do URL
        r.url = window.location.href;

        return r;
    }""")

    if not data or not data.get("name"):
        return None

    # Extrair coordenadas do URL
    url_now = data.get("url", url)
    coord_match = re.search(r'@(-?[\d.]+),(-?[\d.]+)', url_now)
    if coord_match:
        data["lat"] = float(coord_match.group(1))
        data["lng"] = float(coord_match.group(2))

    # Place ID
    data["place_id"] = _extract_place_id(url_now)
    data["google_maps_url"] = url_now

    # Limpar telefone (remover unicode lixo e newlines)
    phone = data.get("phone", "")
    if phone:
        phone = re.sub(r'[^\d()+\-\s]', '', phone).strip()
        phone = re.sub(r'\s+', ' ', phone)
        data["phone"] = phone

    # Detectar se website e rede social
    website = data.get("website", "")
    if website:
        is_social = any(domain in website.lower() for domain in sel.SOCIAL_DOMAINS)
        data["website_status"] = "social_only" if is_social else ""
    else:
        data["website_status"] = "no_url"

    return data


# ============================================================
# SCRAPE BATCH — orquestra todo o processo
# ============================================================

async def scrape_query(
    context: BrowserContext,
    query: str,
    cache: LeadCache,
    max_results: int = 120,
    force: bool = False,
    on_progress=None,
) -> list[dict]:
    """
    Scrape uma query do Google Maps.

    Returns:
        Lista de dicts com dados dos negocios encontrados.
    """
    # Checar cache de buscas
    if not force and cache.is_searched(query):
        if on_progress:
            on_progress(f"  [cache] Query ja executada: {query}")
        # Retornar dados do cache para essa query
        return []

    url = make_maps_url(query)
    page = await context.new_page()

    try:
        await page.goto(url, wait_until="domcontentloaded", timeout=30000)
        await _random_delay(3.0, 5.0)

        if on_progress:
            on_progress(f"  Scrolling: {query}")

        # Scroll e coletar links
        place_links = await _scroll_feed(page, max_results)

        if on_progress:
            on_progress(f"  Encontrados: {len(place_links)} resultados")

    except Exception as e:
        if on_progress:
            on_progress(f"  [erro] Falha ao buscar: {query} — {e}")
        return []
    finally:
        await page.close()

    # Filtrar links ja visitados
    visited_ids = cache.get_visited_place_ids()
    visited_fps = cache.get_visited_fingerprints()

    new_links = []
    for link in place_links:
        pid = _extract_place_id(link)
        if not force and pid and pid in visited_ids:
            continue
        new_links.append(link)

    if on_progress:
        skipped = len(place_links) - len(new_links)
        if skipped > 0:
            on_progress(f"  [cache] {skipped} ja visitados, {len(new_links)} novos")

    # Extrair detalhes (concorrente com semaforo)
    sem = asyncio.Semaphore(CONCURRENT_TABS)
    results = []

    async def extract_one(link: str) -> dict | None:
        async with sem:
            pg = await context.new_page()
            try:
                data = await _extract_detail(pg, link)
                if data:
                    # Double-check dedup por fingerprint
                    fp = make_fingerprint(data.get("name", ""), data.get("address", ""))
                    if not force and fp in visited_fps:
                        return None
                    return data
                return None
            finally:
                await pg.close()

    tasks = [extract_one(link) for link in new_links]

    # Processar em batches para mostrar progresso
    batch_size = CONCURRENT_TABS
    for i in range(0, len(tasks), batch_size):
        batch = tasks[i:i + batch_size]
        batch_results = await asyncio.gather(*batch)
        for data in batch_results:
            if data:
                results.append(data)
                cache.save_visit(data)

        if on_progress and results:
            on_progress(f"  Extraidos: {len(results)}/{len(new_links)}")

    # Registrar busca no cache
    cache.save_search(query, len(place_links))

    return results


async def scrape_all(
    queries: list[str],
    cache: LeadCache,
    max_per_query: int = 120,
    force: bool = False,
    on_progress=None,
) -> list[dict]:
    """
    Executa scraping de multiplas queries.

    Returns:
        Lista combinada e deduplicada de todos os negocios.
    """
    all_results = []
    seen_ids = set()

    try:
        from playwright_stealth import stealth_async
        has_stealth = True
    except ImportError:
        has_stealth = False

    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"],
        )

        viewport_w = random.randint(1280, 1920)
        viewport_h = random.randint(800, 1080)

        context = await browser.new_context(
            user_agent=random.choice(USER_AGENTS),
            viewport={"width": viewport_w, "height": viewport_h},
            locale="pt-BR",
            timezone_id="America/Sao_Paulo",
            extra_http_headers={
                "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            },
        )

        # Consent cookie bypass
        await context.add_cookies([CONSENT_COOKIE])

        # Block imagens/fonts para velocidade
        await context.route("**/*.{png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf}", lambda route: route.abort())

        for i, query in enumerate(queries):
            if on_progress:
                on_progress(f"\n[{i+1}/{len(queries)}] {query}")

            results = await scrape_query(
                context, query, cache,
                max_results=max_per_query,
                force=force,
                on_progress=on_progress,
            )

            for r in results:
                pid = r.get("place_id", "")
                if pid and pid not in seen_ids:
                    seen_ids.add(pid)
                    all_results.append(r)
                elif not pid:
                    all_results.append(r)

            # Pausa entre queries
            if i < len(queries) - 1:
                await _random_delay(3.0, 6.0)

        await browser.close()

    return all_results


def run_scraper(
    queries: list[str],
    cache: LeadCache,
    max_per_query: int = 120,
    force: bool = False,
    on_progress=None,
) -> list[dict]:
    """Wrapper sincrono para scrape_all."""
    return asyncio.run(scrape_all(
        queries, cache, max_per_query, force, on_progress
    ))
