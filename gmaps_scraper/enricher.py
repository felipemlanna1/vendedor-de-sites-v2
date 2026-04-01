"""
Enriquecimento de leads:
- Verificacao real de website (HEAD request, detect social redirect)
- Lookup de CNPJ via BrasilAPI / OpenCNPJ (gratis, sem auth)
"""

import re
import time
from datetime import datetime
from urllib.parse import urlparse

import requests

from .selectors import SOCIAL_DOMAINS


# ============================================================
# WEBSITE VERIFICATION
# ============================================================

def check_website(url: str, timeout: int = 10) -> dict:
    """
    Verifica se um website esta vivo e qual o seu status.

    Returns:
        dict com keys: website_status, ssl, pagespeed (None se nao checado)
    """
    if not url:
        return {"website_status": "no_url"}

    # Checar se e rede social
    parsed = urlparse(url)
    domain = parsed.netloc.lower().replace("www.", "")
    if any(social in domain for social in SOCIAL_DOMAINS):
        return {"website_status": "social_only"}

    try:
        resp = requests.head(
            url, timeout=timeout, allow_redirects=True,
            headers={"User-Agent": "Mozilla/5.0 (compatible; SiteChecker/1.0)"},
        )

        # Checar redirect para rede social
        final_domain = urlparse(resp.url).netloc.lower().replace("www.", "")
        if any(social in final_domain for social in SOCIAL_DOMAINS):
            return {"website_status": "social_only"}

        ssl = 1 if resp.url.startswith("https") else 0

        if resp.status_code < 400:
            return {"website_status": "good_website", "ssl": ssl}
        else:
            return {"website_status": "dead", "ssl": ssl}

    except requests.exceptions.Timeout:
        return {"website_status": "dead"}
    except requests.exceptions.ConnectionError:
        return {"website_status": "dead"}
    except Exception:
        return {"website_status": "dead"}


def verify_websites(leads: list[dict], on_progress=None) -> list[dict]:
    """Verifica websites de uma lista de leads."""
    for i, lead in enumerate(leads):
        website = lead.get("website", "")
        current_status = lead.get("website_status", "")

        # Pular se ja tem status definido como no_url
        if current_status == "no_url" or not website:
            lead["website_status"] = "no_url"
            continue

        # Pular se ja verificado (social_only detectado no scraper)
        if current_status == "social_only":
            continue

        result = check_website(website)
        lead.update(result)

        if on_progress and (i + 1) % 10 == 0:
            on_progress(f"  Verificados: {i+1}/{len(leads)}")

    return leads


# ============================================================
# CNPJ LOOKUP
# ============================================================

CNPJ_REGEX = re.compile(r'\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}')


def _clean_cnpj(cnpj: str) -> str:
    """Remove formatacao do CNPJ."""
    return re.sub(r'[./-]', '', cnpj)


def _find_cnpj_google(name: str, city: str) -> str | None:
    """Tenta encontrar CNPJ via Google search (usando googlesearch-python)."""
    try:
        from googlesearch import search as gsearch
        query = f'CNPJ "{name}" "{city}"'
        for url in gsearch(query, num_results=5, sleep_interval=2, lang="pt"):
            try:
                resp = requests.get(url, timeout=8, headers={
                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"
                })
                matches = CNPJ_REGEX.findall(resp.text)
                if matches:
                    return _clean_cnpj(matches[0])
            except Exception:
                continue
    except ImportError:
        pass
    return None


def fetch_cnpj_data(cnpj: str) -> dict | None:
    """Consulta dados de CNPJ via BrasilAPI (gratis) com fallback para OpenCNPJ."""
    cnpj_clean = _clean_cnpj(cnpj)

    # Tentar BrasilAPI primeiro
    try:
        resp = requests.get(
            f"https://brasilapi.com.br/api/cnpj/v1/{cnpj_clean}",
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            founded = data.get("data_inicio_atividade", "")
            age_months = _calc_age_months(founded)
            return {
                "cnpj": cnpj_clean,
                "razao_social": data.get("razao_social", ""),
                "nome_fantasia": data.get("nome_fantasia", ""),
                "data_abertura": founded,
                "idade_meses": age_months,
                "porte": _map_porte(data.get("porte", "")),
                "cnae": f"{data.get('cnae_fiscal', '')}",
                "cnpj_status": data.get("descricao_situacao_cadastral", ""),
            }
    except Exception:
        pass

    # Fallback: OpenCNPJ
    try:
        time.sleep(0.7)  # Rate limit: 100/min
        resp = requests.get(
            f"https://kitana.opencnpj.com/cnpj/{cnpj_clean}",
            timeout=10,
        )
        if resp.status_code == 200:
            data = resp.json()
            founded = data.get("dataInicioAtividades", "")
            age_months = _calc_age_months(founded)
            return {
                "cnpj": cnpj_clean,
                "razao_social": data.get("razaoSocial", ""),
                "nome_fantasia": data.get("nomeFantasia", ""),
                "data_abertura": founded,
                "idade_meses": age_months,
                "porte": _map_porte(data.get("porte", "")),
                "cnae": str(data.get("cnaeFiscal", "")),
                "cnpj_status": data.get("situacaoCadastral", ""),
            }
    except Exception:
        pass

    return None


def _calc_age_months(date_str: str) -> int | None:
    """Calcula idade em meses a partir de uma data."""
    if not date_str:
        return None
    for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%Y-%m-%dT%H:%M:%S"):
        try:
            dt = datetime.strptime(date_str[:10], fmt)
            now = datetime.now()
            return (now.year - dt.year) * 12 + (now.month - dt.month)
        except ValueError:
            continue
    return None


def _map_porte(porte_raw: str) -> str:
    """Normaliza porte da empresa."""
    porte = porte_raw.upper().strip()
    if "MEI" in porte or "INDIVIDUAL" in porte:
        return "MEI"
    if "MICRO" in porte or "ME" == porte:
        return "ME"
    if "PEQUENO" in porte or "EPP" in porte:
        return "EPP"
    if porte:
        return "DEMAIS"
    return ""


def enrich_with_cnpj(leads: list[dict], on_progress=None) -> list[dict]:
    """Enriquece leads com dados de CNPJ."""
    for i, lead in enumerate(leads):
        name = lead.get("name", "")
        city = lead.get("city", "")

        if not name:
            continue

        # Tentar encontrar CNPJ
        if on_progress:
            on_progress(f"  [{i+1}/{len(leads)}] Buscando CNPJ: {name}")

        cnpj = _find_cnpj_google(name, city)
        if cnpj:
            data = fetch_cnpj_data(cnpj)
            if data:
                lead.update(data)
                if on_progress:
                    age = data.get("idade_meses")
                    status = data.get("cnpj_status", "")
                    on_progress(f"    ✓ CNPJ encontrado: {cnpj} | {age} meses | {status}")
                continue

        lead["cnpj_status"] = "not_found"
        if on_progress:
            on_progress(f"    ✗ CNPJ nao encontrado")

        # Rate limit
        time.sleep(1)

    return leads
