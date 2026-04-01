#!/usr/bin/env python3
"""
Lead Finder - Encontra perfis novos do Instagram por nicho via Google Search.

Estratégia: Busca no Google (não no Instagram) → Extrai metadados públicos → Filtra contas novas.
100% gratuito, sem login, sem risco de ban.

Uso:
    python lead_finder.py --nicho "nutricionista" --cidade "Curitiba"
    python lead_finder.py --nicho "personal trainer" --cidade "São Paulo" --max 50
    python lead_finder.py --nicho "esteticista" --estado "MG"
"""

import argparse
import csv
import json
import os
import re
import sys
import time
from datetime import datetime
from urllib.parse import quote_plus

import requests
from bs4 import BeautifulSoup
from googlesearch import search


# ============================================================
# CONFIG
# ============================================================

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
}

# Sinais de "conta nova" — ajuste conforme necessário
MAX_FOLLOWERS_NEW = 1000    # Menos de 1000 seguidores
MAX_POSTS_NEW = 50          # Menos de 50 posts
MIN_FOLLOWERS = 5           # Mínimo para não pegar contas fake/vazias

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "leads")


# ============================================================
# GOOGLE SEARCH — Descobre perfis do Instagram
# ============================================================

def build_queries(nicho: str, cidade: str = "", estado: str = "") -> list[str]:
    """Gera variações de busca no Google para maximizar resultados."""
    local = cidade or estado or ""
    queries = []

    # Busca principal: perfil do Instagram com nicho + localidade
    base = f'site:instagram.com "{nicho}"'
    if local:
        queries.append(f'{base} "{local}"')
    queries.append(base)

    # Variações com termos que contas novas costumam usar
    termos_novos = [
        "agende", "whatsapp", "atendimento",
        "consultório", "studio", "clínica",
    ]
    for termo in termos_novos:
        q = f'site:instagram.com "{nicho}" "{termo}"'
        if local:
            q += f' "{local}"'
        queries.append(q)

    return queries


def search_google(queries: list[str], max_results: int = 30) -> list[dict]:
    """Busca no Google e retorna URLs de perfis do Instagram."""
    found = {}
    results_per_query = max(5, max_results // len(queries))

    for i, query in enumerate(queries):
        print(f"\n🔍 Buscando ({i+1}/{len(queries)}): {query}")
        try:
            results = search(
                query,
                num_results=results_per_query,
                lang="pt",
                sleep_interval=3,
            )
            for url in results:
                # Filtra apenas URLs de perfil (não posts, reels, etc.)
                username = extract_username(url)
                if username and username not in found:
                    found[username] = {
                        "username": username,
                        "url": f"https://www.instagram.com/{username}/",
                        "source_query": query,
                    }
                    print(f"   ✅ @{username}")

        except Exception as e:
            print(f"   ⚠️  Erro na busca: {e}")

        # Pausa entre buscas para não ser bloqueado pelo Google
        if i < len(queries) - 1:
            time.sleep(5)

    print(f"\n📊 Total de perfis únicos encontrados: {len(found)}")
    return list(found.values())


def extract_username(url: str) -> str | None:
    """Extrai o username de uma URL do Instagram."""
    # Padrão: https://www.instagram.com/username/ ou /username
    match = re.match(
        r"https?://(?:www\.)?instagram\.com/([a-zA-Z0-9_.]+)/?$",
        url.rstrip("/") + "/",
    )
    if not match:
        return None

    username = match.group(1)

    # Ignora páginas que não são perfis
    ignored = {
        "p", "reel", "reels", "stories", "explore", "accounts",
        "about", "legal", "developer", "directory", "tv",
    }
    if username.lower() in ignored:
        return None

    return username


# ============================================================
# INSTAGRAM METADATA — Extrai dados públicos (sem login)
# ============================================================

def fetch_profile_metadata(username: str) -> dict | None:
    """
    Extrai metadados de um perfil público do Instagram via og:meta tags.
    Isso é equivalente a um browser acessando a página — sem login, sem API.
    """
    url = f"https://www.instagram.com/{username}/"

    try:
        resp = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)

        if resp.status_code == 404:
            return None
        if resp.status_code != 200:
            return {"error": f"HTTP {resp.status_code}"}

        soup = BeautifulSoup(resp.text, "html.parser")

        # Extrai og:description — formato típico:
        # "1,234 Followers, 567 Following, 89 Posts - See Instagram photos..."
        # ou "1.234 seguidores, 567 seguindo, 89 publicações..."
        meta_desc = soup.find("meta", property="og:description")
        meta_title = soup.find("meta", property="og:title")

        data = {
            "username": username,
            "url": url,
            "nome": "",
            "bio": "",
            "seguidores": -1,
            "seguindo": -1,
            "posts": -1,
            "tem_site": False,
        }

        if meta_title:
            # Formato: "Nome (@username) • Instagram photos and videos"
            title = meta_title.get("content", "")
            name_match = re.match(r"^(.+?)\s*\(@", title)
            if name_match:
                data["nome"] = name_match.group(1).strip()

        if meta_desc:
            desc = meta_desc.get("content", "")
            data["bio_raw"] = desc

            # Parse números — funciona com formato EN e PT-BR
            numbers = re.findall(r"([\d,.]+[KkMm]?)\s+(?:Followers|Seguidores|followers|seguidores)", desc)
            if numbers:
                data["seguidores"] = parse_number(numbers[0])

            numbers = re.findall(r"([\d,.]+[KkMm]?)\s+(?:Following|Seguindo|following|seguindo)", desc)
            if numbers:
                data["seguindo"] = parse_number(numbers[0])

            numbers = re.findall(r"([\d,.]+[KkMm]?)\s+(?:Posts|Publicações|publicações|posts)", desc)
            if numbers:
                data["posts"] = parse_number(numbers[0])

            # Bio geralmente vem depois do " - " no og:description
            bio_parts = desc.split(" - ", 1)
            if len(bio_parts) > 1:
                data["bio"] = bio_parts[1].strip()

        # Verifica se tem link de site na página
        # Procura por padrões de link externo no HTML
        page_text = resp.text.lower()
        data["tem_site"] = any(
            marker in page_text
            for marker in ['"external_url":', '"link_in_bio"']
        )

        return data

    except requests.RequestException as e:
        return {"error": str(e), "username": username}


def parse_number(text: str) -> int:
    """Converte '1,234' ou '1.234' ou '12.5K' em inteiro."""
    text = text.strip().upper()

    multiplier = 1
    if text.endswith("K"):
        multiplier = 1000
        text = text[:-1]
    elif text.endswith("M"):
        multiplier = 1_000_000
        text = text[:-1]

    # Remove separadores de milhar
    text = text.replace(",", "").replace(".", "")

    try:
        return int(float(text) * multiplier)
    except ValueError:
        return -1


# ============================================================
# FILTROS — Identifica contas novas/leads quentes
# ============================================================

def classify_lead(profile: dict, max_followers: int = MAX_FOLLOWERS_NEW, max_posts: int = MAX_POSTS_NEW) -> dict:
    """Classifica o perfil como lead quente, morno ou frio."""
    score = 0
    reasons = []

    seg = profile.get("seguidores", -1)
    posts = profile.get("posts", -1)
    tem_site = profile.get("tem_site", False)

    # Conta nova (poucos seguidores)
    if 0 < seg <= max_followers:
        score += 3
        reasons.append(f"poucos seguidores ({seg})")
    elif seg > max_followers:
        score -= 1

    # Poucos posts = começou recentemente
    if 0 < posts <= max_posts:
        score += 2
        reasons.append(f"poucos posts ({posts})")

    # Sem site = PRECISA de um!
    if not tem_site:
        score += 3
        reasons.append("sem site na bio")

    # Conta muito pequena pode ser fake
    if 0 < seg < MIN_FOLLOWERS:
        score -= 2
        reasons.append("possível conta fake (muito poucos seguidores)")

    # Classificação
    if score >= 5:
        classification = "🔥 QUENTE"
    elif score >= 3:
        classification = "🟡 MORNO"
    else:
        classification = "🔵 FRIO"

    profile["score"] = score
    profile["classificacao"] = classification
    profile["motivos"] = "; ".join(reasons)

    return profile


# ============================================================
# EXPORT — Salva leads em CSV
# ============================================================

def export_csv(leads: list[dict], filename: str) -> str:
    """Exporta leads para CSV."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, filename)

    fieldnames = [
        "classificacao", "score", "username", "nome", "seguidores",
        "posts", "seguindo", "tem_site", "bio", "url", "motivos",
    ]

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        writer.writeheader()
        # Ordena por score (leads mais quentes primeiro)
        for lead in sorted(leads, key=lambda x: x.get("score", 0), reverse=True):
            writer.writerow(lead)

    return filepath


def print_summary(leads: list[dict]):
    """Imprime resumo dos leads encontrados."""
    quentes = [l for l in leads if "QUENTE" in l.get("classificacao", "")]
    mornos = [l for l in leads if "MORNO" in l.get("classificacao", "")]
    frios = [l for l in leads if "FRIO" in l.get("classificacao", "")]

    print("\n" + "=" * 60)
    print("📋 RESUMO DOS LEADS")
    print("=" * 60)
    print(f"  🔥 Quentes: {len(quentes)}")
    print(f"  🟡 Mornos:  {len(mornos)}")
    print(f"  🔵 Frios:   {len(frios)}")
    print(f"  📊 Total:   {len(leads)}")

    if quentes:
        print(f"\n{'─' * 60}")
        print("🔥 LEADS QUENTES (prioridade de contato):")
        print(f"{'─' * 60}")
        for lead in quentes:
            seg = lead.get("seguidores", "?")
            posts = lead.get("posts", "?")
            print(f"  @{lead['username']:<30} {seg} seg | {posts} posts")
            if lead.get("nome"):
                print(f"    Nome: {lead['nome']}")
            if lead.get("motivos"):
                print(f"    → {lead['motivos']}")
            print()


# ============================================================
# MAIN
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="Lead Finder - Encontra perfis novos do Instagram por nicho",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python lead_finder.py --nicho "nutricionista" --cidade "Curitiba"
  python lead_finder.py --nicho "personal trainer" --cidade "São Paulo" --max 50
  python lead_finder.py --nicho "esteticista" --estado "MG"
  python lead_finder.py --nicho "dentista" --cidade "Belo Horizonte" --max-seguidores 500
        """,
    )
    parser.add_argument("--nicho", required=True, help="Nicho/profissão para buscar (ex: nutricionista)")
    parser.add_argument("--cidade", default="", help="Cidade para filtrar")
    parser.add_argument("--estado", default="", help="Estado para filtrar (sigla)")
    parser.add_argument("--max", type=int, default=30, help="Máximo de perfis para buscar (default: 30)")
    parser.add_argument("--max-seguidores", type=int, default=MAX_FOLLOWERS_NEW, help=f"Limite de seguidores para 'conta nova' (default: {MAX_FOLLOWERS_NEW})")
    parser.add_argument("--max-posts", type=int, default=MAX_POSTS_NEW, help=f"Limite de posts para 'conta nova' (default: {MAX_POSTS_NEW})")
    parser.add_argument("--skip-enrich", action="store_true", help="Pula a etapa de enriquecimento (só busca no Google)")

    args = parser.parse_args()

    max_followers = args.max_seguidores
    max_posts = args.max_posts

    local = args.cidade or args.estado or "Brasil"
    print("=" * 60)
    print(f"🎯 LEAD FINDER — Vendedor de Sites")
    print(f"=" * 60)
    print(f"   Nicho:  {args.nicho}")
    print(f"   Local:  {local}")
    print(f"   Max:    {args.max} perfis")
    print(f"   Filtro: < {max_followers} seguidores, < {max_posts} posts")
    print(f"=" * 60)

    # FASE 1: Descoberta via Google
    print("\n📡 FASE 1: Buscando perfis no Google...")
    queries = build_queries(args.nicho, args.cidade, args.estado)
    profiles = search_google(queries, max_results=args.max)

    if not profiles:
        print("\n❌ Nenhum perfil encontrado. Tente outros termos ou localidade.")
        sys.exit(1)

    # FASE 2: Enriquecimento (metadados do Instagram)
    if not args.skip_enrich:
        print(f"\n📡 FASE 2: Extraindo metadados de {len(profiles)} perfis...")
        print("   (Isso pode levar alguns minutos para não ser bloqueado)")

        enriched = []
        for i, profile in enumerate(profiles):
            username = profile["username"]
            print(f"   [{i+1}/{len(profiles)}] @{username}...", end=" ", flush=True)

            meta = fetch_profile_metadata(username)
            if meta and "error" not in meta:
                profile.update(meta)
                seg = meta.get("seguidores", "?")
                posts = meta.get("posts", "?")
                print(f"✅ {seg} seg | {posts} posts")
            else:
                error = meta.get("error", "desconhecido") if meta else "sem resposta"
                print(f"⚠️  ({error})")

            enriched.append(profile)

            # Pausa entre requests para não ser bloqueado
            if i < len(profiles) - 1:
                time.sleep(3)

        profiles = enriched

    # FASE 3: Classificação
    print("\n📡 FASE 3: Classificando leads...")
    leads = [classify_lead(p, max_followers, max_posts) for p in profiles]

    # FASE 4: Exportação
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    nicho_clean = re.sub(r"[^a-zA-Z0-9]", "_", args.nicho.lower())
    filename = f"leads_{nicho_clean}_{timestamp}.csv"
    filepath = export_csv(leads, filename)

    print_summary(leads)
    print(f"\n💾 Leads exportados para: {filepath}")
    print(f"   Abra no Excel/Google Sheets para gerenciar.\n")


if __name__ == "__main__":
    main()
