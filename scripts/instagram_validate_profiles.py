#!/usr/bin/env python3
"""Validar perfis de candidatos no Instagram via Playwright."""
import sys
import time
import json
import csv
import re
import random
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

BASE = Path(__file__).parent.parent
STATE_DIR = BASE / "data" / "_state"
STORAGE_PATH = STATE_DIR / "instagram_session.json"
SCREENSHOT_DIR = STATE_DIR / "screenshots" / "validation"
SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
STATE_FILE = STATE_DIR / "lead-finder-progress.json"
LEADS_DIR = BASE / "data" / "leads"
LEADS_DIR.mkdir(parents=True, exist_ok=True)

# Links que NAO sao sites reais
LINK_AGGREGATORS = [
    'linktr.ee', 'linktree.com', 'taplink.cc', 'beacons.ai', 'bio.link',
    'bio.site', 'lnk.bio', 'campsite.bio', 'hoo.be', 'snipfeed.co',
    'allmylinks.com', 'solo.to', 'carrd.co', 'about.me', 'flow.page',
    'stan.store', 'whats.link', 'wa.me', 'bit.ly', 'tinyurl.com',
    'linkme.bio', 'manylink.co', 'milkshake.app', 'later.com'
]

# Termos que indicam escritorios/empresas grandes (excluir)
EXCLUIR_TERMOS = ['escritório', 'escritorio', 'construtora', 'incorporadora',
                  'imobiliária', 'imobiliaria', 'empresa', 'group', 'grupo',
                  'associados', 'partners']

# Cidades grandes de MG (>40k hab) para filtrar
CIDADES_GRANDES_MG = {
    'belo horizonte': 2500000, 'uberlândia': 700000, 'uberlandia': 700000,
    'contagem': 660000, 'juiz de fora': 570000, 'betim': 440000,
    'montes claros': 410000, 'ribeirão das neves': 330000,
    'uberaba': 340000, 'governador valadares': 280000,
    'ipatinga': 265000, 'sete lagoas': 240000, 'divinópolis': 240000,
    'divinopolis': 240000, 'santa luzia': 220000, 'ibirité': 180000,
    'poços de caldas': 170000, 'pocos de caldas': 170000,
    'patos de minas': 155000, 'teófilo otoni': 140000,
    'teofilo otoni': 140000, 'conselheiro lafaiete': 130000,
    'barbacena': 140000, 'sabará': 135000, 'varginha': 135000,
    'araguari': 115000, 'itabira': 120000, 'pouso alegre': 150000,
    'passos': 115000, 'coronel fabriciano': 110000, 'muriaé': 108000,
    'muriae': 108000, 'ituiutaba': 105000, 'lavras': 105000,
    'nova lima': 100000, 'itajubá': 97000, 'itajuba': 97000,
    'pará de minas': 92000, 'formiga': 66000, 'manhuaçu': 85000,
    'manhuacu': 85000, 'araxá': 107000, 'araxa': 107000,
    'são sebastião do paraíso': 72000, 'curvelo': 80000,
    'patrocínio': 92000, 'caratinga': 92000, 'alfenas': 80000,
    'três corações': 80000, 'tres coracoes': 80000,
    'joão monlevade': 79000, 'ponte nova': 60000,
    'timóteo': 90000, 'leopoldina': 53000, 'cataguases': 75000,
    'viçosa': 78000, 'vicosa': 78000, 'ubá': 115000, 'uba': 115000,
    'pedro leopoldo': 68000, 'lagoa santa': 65000,
    'ouro preto': 74000, 'itaúna': 92000, 'itauna': 92000,
    'são joão del rei': 90000, 'sao joao del rei': 90000,
}

# Cidades pequenas de MG (<40k hab) - exemplos
CIDADES_PEQUENAS_MG = [
    'diamantina', 'são Thomé das Letras', 'tiradentes', 'são Lourenço',
    'monte sião', 'aiuruoca', 'capitólio', 'serra da canastra',
    'carrancas', 'são Roque de Minas', 'conceição do mato dentro',
    'milho verde', 'serro', 'sabará', 'mariana',
]


def parse_number(raw):
    """Converte '1,234' ou '1.2K' ou '1M' para int."""
    if not raw:
        return 0
    raw = raw.strip().replace(',', '')
    if 'k' in raw.lower():
        return int(float(raw.lower().replace('k', '')) * 1000)
    if 'm' in raw.lower():
        return int(float(raw.lower().replace('m', '')) * 1000000)
    try:
        return int(float(raw))
    except:
        return 0


def is_real_site(url):
    """Verifica se o link e um site real (nao link aggregator)."""
    if not url:
        return False
    url_lower = url.lower()
    for agg in LINK_AGGREGATORS:
        if agg in url_lower:
            return False
    # WhatsApp links nao sao sites
    if 'wa.me' in url_lower or 'whatsapp' in url_lower:
        return False
    return True


def detect_city(bio_text, page_text):
    """Detecta a cidade na bio e texto da pagina."""
    combined = (bio_text + ' ' + page_text).lower()

    # Primeiro, procurar cidades grandes (para excluir)
    for cidade, pop in CIDADES_GRANDES_MG.items():
        if cidade in combined:
            return cidade.title(), pop

    # Procurar indicadores de MG
    mg_indicators = ['minas gerais', '- mg', '/mg', ', mg', 'mg ']
    is_mg = any(ind in combined for ind in mg_indicators)

    # Procurar por padrao "Cidade - MG" ou "Cidade/MG" ou "Cidade, MG"
    city_patterns = [
        r'📍\s*([A-ZÀ-Ú][a-zà-ú]+(?:\s+[a-zà-ú]+)*)\s*[-/,]\s*MG',
        r'([A-ZÀ-Ú][a-zà-ú]+(?:\s+[a-zà-ú]+)*)\s*[-/,]\s*MG',
        r'([A-ZÀ-Ú][a-zà-ú]+(?:\s+[a-zà-ú]+)*)\s*[-/,]\s*Minas',
    ]
    for pattern in city_patterns:
        match = re.search(pattern, bio_text + ' ' + page_text)
        if match:
            city = match.group(1).strip()
            # Checar se e cidade grande
            city_lower = city.lower()
            if city_lower in CIDADES_GRANDES_MG:
                return city, CIDADES_GRANDES_MG[city_lower]
            return city, None  # Cidade encontrada mas populacao desconhecida

    return None, None


def has_exclude_terms(bio, name, page_text):
    """Verifica se o perfil e de escritorio/empresa (excluir)."""
    combined = (bio + ' ' + name + ' ' + page_text).lower()
    for term in EXCLUIR_TERMOS:
        if term in combined:
            return True, term
    return False, None


def calculate_score(data):
    """Calcula score do perfil."""
    score = 0
    razoes = []

    # Sem site real: +3
    if not data.get('has_real_site', False):
        score += 3
        razoes.append('+3 sem site real')

    # Conta Business/Creator: +2
    if data.get('has_contact', False) or data.get('category'):
        score += 2
        razoes.append('+2 conta comercial')

    # Poucos seguidores (<5000): +1
    followers = data.get('followers', 0)
    if followers < 5000:
        score += 1
        razoes.append(f'+1 poucos seguidores ({followers})')

    # Email/telefone visivel: +1
    if data.get('has_email') or data.get('has_phone'):
        score += 1
        razoes.append('+1 contato visivel')

    # Muitos posts (>200): -1
    posts = data.get('posts', 0)
    if posts > 200:
        score -= 1
        razoes.append(f'-1 muitos posts ({posts})')

    # Cidade pequena de MG: +1
    if data.get('cidade_pop') and data['cidade_pop'] < 40000:
        score += 1
        razoes.append(f'+1 cidade pequena ({data.get("cidade", "?")})')

    return score, razoes


def validate_profiles():
    with open(STATE_FILE) as f:
        state = json.load(f)

    candidates = state['candidates']
    limite = state['limite']
    filtros = state['filtros']

    results = []
    leads_found = 0
    total_processed = 0
    quentes = 0
    mornos = 0
    descartados = 0

    csv_path = LEADS_DIR / 'leads_arquiteto_mg_interior.csv'
    csv_fields = ['username', 'full_name', 'especialidade', 'cidade', 'estado',
                  'habitantes_aprox', 'registro', 'posts', 'seguidores',
                  'link_externo', 'tem_site', 'score', 'classificacao']

    with sync_playwright() as p:
        context_opts = {
            "viewport": {"width": 1280, "height": 900},
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        }
        if STORAGE_PATH.exists():
            context_opts["storage_state"] = str(STORAGE_PATH)

        browser = p.chromium.launch(headless=True)
        context = browser.new_context(**context_opts)
        page = context.new_page()

        # Verificar login
        page.goto("https://www.instagram.com/", wait_until="domcontentloaded", timeout=30000)
        time.sleep(3)

        for i, username in enumerate(candidates):
            if leads_found >= limite:
                print(f"\n=== META ATINGIDA: {leads_found}/{limite} leads ===")
                break

            total_processed += 1
            print(f"\n--- [{i+1}/{len(candidates)}] Validando @{username} ---")

            try:
                # 4.1 Navegar no perfil
                page.goto(f"https://www.instagram.com/{username}/",
                          wait_until="domcontentloaded", timeout=30000)
                time.sleep(random.uniform(3, 5))

                # 4.2 Verificar se perfil existe
                content = page.content()
                if "Sorry, this page" in content or "isn't available" in content:
                    print(f"  SKIP: Perfil nao existe")
                    descartados += 1
                    continue

                if "This account is private" in content or "Esta conta é privada" in content:
                    print(f"  SKIP: Perfil privado")
                    descartados += 1
                    continue

                # 4.3 Extrair dados via meta tags
                meta_data = page.evaluate("""() => {
                    const ogImg = document.querySelector('meta[property="og:image"]');
                    const ogDesc = document.querySelector('meta[property="og:description"]');
                    const desc = ogDesc ? ogDesc.content : '';
                    const metaDesc = document.querySelector('meta[name="description"]');
                    const bioText = metaDesc ? metaDesc.content : '';
                    const ogTitle = document.querySelector('meta[property="og:title"]');

                    return JSON.stringify({
                        profile_pic: ogImg ? ogImg.content : null,
                        og_desc: desc.substring(0, 500),
                        full_name: ogTitle ? ogTitle.content.split('(')[0].trim() : null,
                        bio: bioText.substring(0, 500)
                    });
                }""")
                meta = json.loads(meta_data)

                # Parsear contadores
                og_desc = meta.get('og_desc', '')
                count_match = re.search(
                    r'([\d,.KkMm]+)\s*(?:Followers?|seguidores?),?\s*([\d,.KkMm]+)\s*(?:Following|seguindo),?\s*([\d,.KkMm]+)\s*(?:Posts?|publicações)',
                    og_desc, re.IGNORECASE
                )
                followers = parse_number(count_match.group(1)) if count_match else 0
                following = parse_number(count_match.group(2)) if count_match else 0
                posts = parse_number(count_match.group(3)) if count_match else 0

                # Se nao achou com regex, tentar outro padrao
                if not count_match:
                    count_match2 = re.search(r'([\d,.]+)\s*(?:Followers|seguidores)', og_desc, re.IGNORECASE)
                    if count_match2:
                        followers = parse_number(count_match2.group(1))
                    count_match3 = re.search(r'([\d,.]+)\s*(?:Posts|publicações)', og_desc, re.IGNORECASE)
                    if count_match3:
                        posts = parse_number(count_match3.group(1))

                print(f"  Nome: {meta.get('full_name', 'N/A')}")
                print(f"  Seguidores: {followers} | Posts: {posts}")

                # 4.4 Extrair link externo e info da pagina
                page_info = page.evaluate("""() => {
                    const links = document.querySelectorAll('a[href]');
                    let externalUrl = null;
                    links.forEach(a => {
                        const href = a.href || '';
                        if (href.includes('l.instagram.com/') || href.includes('linktr.ee') ||
                            href.includes('taplink.cc') || href.includes('bio.link') ||
                            href.includes('linkme.bio')) {
                            externalUrl = href;
                        }
                    });
                    const allText = document.body.innerText;
                    const hasContact = !!document.querySelector('[href*="mailto:"]') ||
                                      !!document.querySelector('[href*="tel:"]') ||
                                      allText.includes('Contact') || allText.includes('Contato');
                    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/.test(allText);
                    const hasPhone = /\\(?\\d{2}\\)?\\s*\\d{4,5}[-.]?\\d{4}/.test(allText);

                    return JSON.stringify({
                        external_url: externalUrl,
                        has_contact: hasContact,
                        has_email: hasEmail,
                        has_phone: hasPhone,
                        page_text: allText.substring(0, 2000)
                    });
                }""")
                page_data = json.loads(page_info)

                bio = meta.get('bio', '') or meta.get('og_desc', '')
                full_name = meta.get('full_name', username)
                external_url = page_data.get('external_url', '')
                has_real = is_real_site(external_url)
                page_text = page_data.get('page_text', '')

                print(f"  Bio: {bio[:100]}...")
                print(f"  Link: {external_url or 'nenhum'} (site real: {has_real})")

                # Screenshot do perfil
                page.screenshot(path=str(SCREENSHOT_DIR / f"{username}.png"))

                # 4.9 Filtros - excluir escritorios/empresas
                is_excluded, exclude_term = has_exclude_terms(bio, full_name, page_text)
                if is_excluded:
                    print(f"  DESCARTADO: contem termo excluido '{exclude_term}'")
                    descartados += 1
                    continue

                # Filtro sem_site
                if filtros.get('sem_site') and has_real:
                    print(f"  DESCARTADO: tem site real ({external_url})")
                    descartados += 1
                    continue

                # Filtro max_posts
                if filtros.get('max_posts') and posts > filtros['max_posts']:
                    print(f"  DESCARTADO: muitos posts ({posts} > {filtros['max_posts']})")
                    descartados += 1
                    continue

                # Detectar cidade
                cidade, cidade_pop = detect_city(bio, page_text)
                if cidade:
                    print(f"  Cidade: {cidade} (pop: {cidade_pop or 'desconhecida'})")
                else:
                    print(f"  Cidade: nao identificada na bio")

                # Filtro cidade grande (>40k)
                if cidade_pop and cidade_pop > filtros.get('max_habitantes', 40000):
                    print(f"  DESCARTADO: cidade grande ({cidade}, pop {cidade_pop})")
                    descartados += 1
                    continue

                # Detectar CAU
                cau_match = re.search(r'CAU\s*[/:]?\s*[A-Z]{0,2}\s*[\d.-]+', bio + ' ' + page_text, re.IGNORECASE)
                registro = cau_match.group(0) if cau_match else ''

                # 4.7 Scoring
                profile_data = {
                    'has_real_site': has_real,
                    'has_contact': page_data.get('has_contact', False),
                    'has_email': page_data.get('has_email', False),
                    'has_phone': page_data.get('has_phone', False),
                    'followers': followers,
                    'posts': posts,
                    'cidade': cidade,
                    'cidade_pop': cidade_pop,
                    'category': 'Arquitetura' if any(t in bio.lower() for t in ['arquitet', 'arq.', 'arq ']) else None,
                }

                score, razoes = calculate_score(profile_data)

                if score >= 6:
                    classificacao = 'QUENTE'
                    quentes += 1
                    leads_found += 1
                elif score >= 3:
                    classificacao = 'MORNO'
                    mornos += 1
                    leads_found += 1
                else:
                    classificacao = 'FRIO'
                    descartados += 1

                # Determinar tipo de link
                link_tipo = 'Nenhum'
                if external_url:
                    if 'wa.me' in external_url or 'whatsapp' in external_url:
                        link_tipo = 'WhatsApp'
                    elif any(agg in external_url.lower() for agg in LINK_AGGREGATORS):
                        link_tipo = 'LinkTree/Agregador'
                    else:
                        link_tipo = external_url

                result = {
                    'username': username,
                    'full_name': full_name,
                    'especialidade': 'Arquiteta' if 'arquiteta' in bio.lower() else 'Arquiteto',
                    'cidade': cidade or 'N/I',
                    'estado': 'MG',
                    'habitantes_aprox': cidade_pop or 'N/I',
                    'registro': registro,
                    'posts': posts,
                    'seguidores': followers,
                    'link_externo': link_tipo,
                    'tem_site': 'Sim' if has_real else 'Nao',
                    'score': score,
                    'classificacao': classificacao,
                    'razoes': razoes,
                    'bio_resumo': bio[:150],
                }
                results.append(result)

                status_emoji = {'QUENTE': '***', 'MORNO': '**', 'FRIO': '*'}
                print(f"\n  {status_emoji.get(classificacao, '')} {classificacao} (score {score})")
                for r in razoes:
                    print(f"    {r}")

                # Progresso a cada 5
                if total_processed % 5 == 0:
                    print(f"\n  === Progresso: {total_processed} validados, {leads_found} leads (meta: {limite}) ===")
                    print(f"  === QUENTES: {quentes} | MORNOS: {mornos} | Descartados: {descartados} ===")

            except Exception as e:
                print(f"  ERRO ao validar @{username}: {e}")
                descartados += 1
                continue

            # Delay natural entre perfis
            delay = random.uniform(5, 10)
            print(f"  (delay {delay:.1f}s)")
            time.sleep(delay)

        # Salvar sessao
        context.storage_state(path=str(STORAGE_PATH))
        browser.close()

    # Salvar CSV
    valid_results = [r for r in results if r['classificacao'] in ('QUENTE', 'MORNO')]
    if valid_results:
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=csv_fields)
            writer.writeheader()
            for r in valid_results:
                row = {k: v for k, v in r.items() if k in csv_fields}
                writer.writerow(row)
        print(f"\nCSV salvo: {csv_path}")

    # Atualizar state
    with open(STATE_FILE) as f:
        state = json.load(f)

    state['current_phase'] = 4
    state['validated'] = results
    state['leads_found'] = leads_found
    state['csv_path'] = str(csv_path)
    state['phases']['phase_4'] = {
        'status': 'complete',
        'result': f'{total_processed} processados, {quentes} QUENTES, {mornos} MORNOS, {descartados} descartados'
    }

    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

    # Sumario
    print(f"\n{'='*60}")
    print(f"FASE 4 COMPLETA")
    print(f"  Total processados: {total_processed}")
    print(f"  Leads QUENTES: {quentes}")
    print(f"  Leads MORNOS: {mornos}")
    print(f"  Descartados: {descartados}")
    print(f"  CSV: {csv_path}")
    print(f"{'='*60}")

    # Resultado em JSON para o orchestrator
    output = {
        'total_processed': total_processed,
        'quentes': quentes,
        'mornos': mornos,
        'descartados': descartados,
        'leads_found': leads_found,
        'results': results,
    }
    with open(STATE_DIR / 'phase4_results.json', 'w') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    return leads_found >= limite


if __name__ == "__main__":
    success = validate_profiles()
    sys.exit(0 if success else 1)
