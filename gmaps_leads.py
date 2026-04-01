#!/usr/bin/env python3
"""
Google Maps Lead Finder — Encontra negocios locais sem website.

Scrape Google Maps → Verifica websites → Filtra → Enriquece com CNPJ → Exporta.
100% gratuito, sem API keys, sem Docker.

Uso:
    python gmaps_leads.py --nicho "dentista" --local "Savassi, Belo Horizonte"
    python gmaps_leads.py --nicho "restaurante" --local "Curitiba" --sem-site --com-telefone
    python gmaps_leads.py --nicho "salao" --local "BH" --subdividir --limite 200
    python gmaps_leads.py --nicho "academia" --local "Centro, SP" --enrich-cnpj --max-idade-empresa 12
"""

import argparse
import csv
import json
import os
import sys
import time
from datetime import datetime

from gmaps_scraper.cache import LeadCache
from gmaps_scraper.enricher import verify_websites
from gmaps_scraper.geo import generate_queries
from gmaps_scraper.niches import get_keywords, get_niche
from gmaps_scraper.scraper import run_scraper


# ============================================================
# CONFIG
# ============================================================

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "leads")


# ============================================================
# HELPERS
# ============================================================

def _progress(msg: str):
    """Imprime progresso no terminal."""
    print(msg, flush=True)


def _extract_city_from_local(local: str) -> str:
    """Extrai cidade do string de local."""
    parts = [p.strip() for p in local.split(",")]
    return parts[-1] if len(parts) > 1 else parts[0]


def _apply_filters(leads: list[dict], args) -> list[dict]:
    """Aplica filtros flexiveis — todos opcionais."""
    filtered = leads

    if args.sem_site:
        filtered = [l for l in filtered if l.get("website_status") in ("no_url", "dead", "social_only")]

    if args.nota_min is not None:
        filtered = [l for l in filtered if (l.get("rating") or 0) >= args.nota_min]

    if args.min_reviews is not None:
        filtered = [l for l in filtered if (l.get("reviews") or 0) >= args.min_reviews]

    if args.max_reviews is not None:
        filtered = [l for l in filtered if (l.get("reviews") or 0) <= args.max_reviews]

    if args.com_telefone:
        filtered = [l for l in filtered if l.get("phone")]

    return filtered


# ============================================================
# EXPORT
# ============================================================

CSV_FIELDS = [
    "name", "address", "phone", "category", "rating", "reviews",
    "website", "website_status", "price_range", "status",
    "cnpj", "razao_social", "data_abertura", "idade_meses", "porte", "cnae", "cnpj_status",
    "google_maps_url", "lat", "lng",
]


def export_csv(leads: list[dict], filename: str) -> str:
    """Exporta leads para CSV."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    filepath = os.path.join(OUTPUT_DIR, filename)

    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_FIELDS, extrasaction="ignore")
        writer.writeheader()
        for lead in leads:
            writer.writerow(lead)

    return filepath


def print_summary(leads: list[dict], total_found: int, elapsed: float):
    """Imprime resumo dos resultados."""
    sem_site = [l for l in leads if l.get("website_status") in ("no_url", "dead", "social_only")]
    com_tel = [l for l in leads if l.get("phone")]

    mins = int(elapsed // 60)
    secs = int(elapsed % 60)

    print("\n" + "=" * 50)
    print("  RESULTADO — Google Maps")
    print("=" * 50)
    print(f"  Negocios encontrados:  {total_found}")
    print(f"  Apos filtros:          {len(leads)}")
    print(f"  Sem website:           {len(sem_site)}")
    print(f"  Com telefone:          {len(com_tel)}")

    if leads:
        print(f"\n{'─' * 50}")
        print("  TOP LEADS:")
        print(f"{'─' * 50}")
        for lead in leads[:15]:
            name = lead.get("name", "?")
            phone = lead.get("phone", "sem tel")
            rating = lead.get("rating", "?")
            reviews = lead.get("reviews", 0)
            ws = lead.get("website_status", "?")
            print(f"  {name}")
            print(f"    Tel: {phone} | Nota: {rating} | {reviews} aval. | Site: {ws}")

    print(f"\n  Tempo total: {mins}m {secs}s")
    print("=" * 50)


# ============================================================
# MAIN
# ============================================================

def main():
    parser = argparse.ArgumentParser(
        description="Google Maps Lead Finder — encontra negocios sem website",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Exemplos:
  python gmaps_leads.py --nicho "dentista" --local "Savassi, BH"
  python gmaps_leads.py --nicho "restaurante" --local "Curitiba" --sem-site --com-telefone
  python gmaps_leads.py --nicho "salao" --local "BH" --subdividir --limite 200
  python gmaps_leads.py --local "Centro, Sao Paulo"   # sem filtros = retorna TUDO
        """,
    )

    # Parametros principais
    parser.add_argument("--nicho", type=str, default="",
                        help="Nicho/profissao (ex: dentista, restaurante)")
    parser.add_argument("--local", type=str, required=True,
                        help="Local (ex: 'Savassi, Belo Horizonte' ou 'Curitiba')")

    # Filtros flexiveis (TODOS opcionais)
    parser.add_argument("--sem-site", action="store_true",
                        help="Apenas negocios sem website")
    parser.add_argument("--nota-min", type=float, default=None,
                        help="Nota minima no Google (ex: 3.5)")
    parser.add_argument("--min-reviews", type=int, default=None,
                        help="Minimo de avaliacoes")
    parser.add_argument("--max-reviews", type=int, default=None,
                        help="Maximo de avaliacoes (exclui redes grandes)")
    parser.add_argument("--com-telefone", action="store_true",
                        help="Apenas negocios com telefone")
    parser.add_argument("--subdividir", action="store_true",
                        help="Subdividir busca por bairros da cidade")
    # CNPJ removido por enquanto
    # parser.add_argument("--enrich-cnpj", ...)
    # parser.add_argument("--max-idade-empresa", ...)
    parser.add_argument("--limite", type=int, default=60,
                        help="Max negocios por query (default: 60)")
    parser.add_argument("--force", action="store_true",
                        help="Ignorar cache, re-scrape tudo")
    parser.add_argument("--keywords-extra", type=str, default="",
                        help="Keywords extras separadas por virgula (ex: 'escola de surf,escola de danca')")
    parser.add_argument("--target", type=int, default=None,
                        help="Parar assim que encontrar N leads que passam nos filtros")

    args = parser.parse_args()

    start_time = time.time()

    # ---- FASE 1: Gerar queries ----
    _progress("\n\U0001f50d FASE 1: Gerando queries de busca...")

    keywords = get_keywords(args.nicho) if args.nicho else []

    # Adicionar keywords extras do usuario
    if args.keywords_extra:
        extras = [k.strip() for k in args.keywords_extra.split(",") if k.strip()]
        keywords.extend(extras)
        _progress(f"  Keywords extras adicionadas: {len(extras)}")

    if not keywords:
        keywords = None

    nicho_name = args.nicho or "todos"

    queries = generate_queries(
        nicho=args.nicho or "",
        local=args.local,
        keywords=keywords,
        subdividir=args.subdividir,
    )

    # Se nenhum nicho especificado e nao subdividir, busca generica
    if not queries:
        queries = [args.local]

    _progress(f"  Queries geradas: {len(queries)}")
    for q in queries[:5]:
        _progress(f"    • {q}")
    if len(queries) > 5:
        _progress(f"    ... e mais {len(queries) - 5}")

    # ---- FASE 2: Scraping + Filtro em tempo real ----
    _progress(f"\n\U0001f30d FASE 2: Scraping Google Maps...")
    if args.target:
        _progress(f"  Target: parar ao encontrar {args.target} leads validos")

    cache = LeadCache()
    city = _extract_city_from_local(args.local)
    filtered = []
    total_found = 0
    target_reached = False

    for i, query in enumerate(queries):
        if target_reached:
            break

        _progress(f"\n[{i+1}/{len(queries)}] {query}")

        # Scrape esta query
        batch = run_scraper(
            queries=[query],
            cache=cache,
            max_per_query=args.limite,
            force=args.force,
            on_progress=_progress,
        )

        total_found += len(batch)

        if not batch:
            continue

        # Verificar websites deste batch
        batch = verify_websites(batch, on_progress=None)

        # Aplicar filtros
        batch_filtered = _apply_filters(batch, args)

        # Dedup contra leads ja encontrados
        existing_ids = {l.get("place_id") for l in filtered if l.get("place_id")}
        for lead in batch_filtered:
            pid = lead.get("place_id", "")
            if pid and pid in existing_ids:
                continue
            existing_ids.add(pid)
            filtered.append(lead)

            _progress(f"  \u2713 LEAD: {lead.get('name', '?')} | {lead.get('phone', 'sem tel')} | {lead.get('reviews', 0)} aval. | {lead.get('website_status', '?')}")

            # Checar target
            if args.target and len(filtered) >= args.target:
                _progress(f"\n  \u2705 Target de {args.target} leads atingido! Parando busca.")
                target_reached = True
                break

    _progress(f"\n  Total scrapeados: {total_found} | Leads validos: {len(filtered)}")

    if not filtered:
        _progress("\n  Nenhum lead passou nos filtros. Tente criterios mais flexiveis.")
        cache.close()
        return

    # CNPJ removido por enquanto — pode ser adicionado no futuro

    # ---- EXPORT ----
    _progress(f"\n\U0001f4be Exportando resultados...")

    local_slug = args.local.replace(",", "").replace(" ", "_").lower()[:30]
    nicho_slug = args.nicho.replace(" ", "_").lower()[:20] if args.nicho else "todos"
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"gmaps_{nicho_slug}_{local_slug}_{ts}.csv"

    filepath = export_csv(filtered, filename)
    _progress(f"  CSV: {filepath}")

    # ---- Resumo ----
    elapsed = time.time() - start_time
    print_summary(filtered, total_found, elapsed)

    stats = cache.get_stats()
    _progress(f"\n  Cache: {stats['total_visitados']} negocios visitados, {stats['total_buscas']} buscas")

    cache.close()


if __name__ == "__main__":
    main()
