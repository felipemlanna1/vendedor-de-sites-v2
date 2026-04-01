#!/usr/bin/env python3
"""
Instagram Lead MCP Server — v2 (Google-first)

Abordagem: Descoberta via Google (gratis, sem risco) → Validacao via Instagram API (seletiva).
A skill usa WebSearch para encontrar perfis, este MCP so valida e enriquece.

Tools de VALIDACAO (usam Instagram API — economizar ao maximo):
  - instagram_login / instagram_logout
  - instagram_get_profile          → dados completos de 1 perfil
  - instagram_get_posts            → posts com datas (so se media_count < 50)
  - instagram_get_similar_accounts → chain discovery a partir de 1 lead
  - instagram_analyze_profile      → analise completa + score
  - instagram_check_session / instagram_get_rate_status

Tools de CACHE (nao usam Instagram API):
  - instagram_check_cooldown
  - instagram_check_visited / instagram_mark_visited
  - instagram_append_lead
  - instagram_get_cache_stats
"""

import csv
import json
import os
import random
import time
from datetime import datetime
from typing import Optional

from instagrapi import Client
from instagrapi.exceptions import (
    ChallengeRequired,
    PleaseWaitFewMinutes,
)
from mcp.server.fastmcp import FastMCP

# ============================================================
# CONFIG
# ============================================================

MCP_NAME = "instagram-lead-mcp"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SESSION_FILE = os.path.join(BASE_DIR, "ig_session.json")
LEADS_DIR = os.path.join(BASE_DIR, "leads")
CACHE_DIR = os.path.join(LEADS_DIR, "_cache")
VISITED_FILE = os.path.join(CACHE_DIR, "visited_profiles.json")
COOLDOWN_FILE = os.path.join(CACHE_DIR, "cooldown.json")

# Anti-ban: delays mais conservadores (v2)
DELAY_MIN = 8
DELAY_MAX = 15
MAX_CALLS_PER_SESSION = 30  # Reduzido de 50 para 30

# Cooldown: chamadas → horas de espera
# Dominios que NAO sao sites reais (cartoes de visita / agregadores)
NOT_REAL_SITE_DOMAINS = [
    "linktr.ee", "linktree.com",
    "taplink.cc", "tap.link",
    "beacons.ai",
    "bio.link", "bio.site",
    "lnk.bio",
    "campsite.bio",
    "linkme.bio",
    "hoo.be",
    "snipfeed.co",
    "allmylinks.com",
    "solo.to",
    "withkoji.com",
    "carrd.co",
    "about.me",
    "flow.page",
    "stan.store",
    "whats.link",
    "wa.me",
    "bit.ly", "tinyurl.com",  # encurtadores genericos
]

COOLDOWN_TABLE = {
    10: 0,   # 0-10 chamadas: sem cooldown
    20: 1,   # 11-20: 1 hora
    30: 2,   # 21-30: 2 horas
    999: 3,  # 30+: 3 horas
}

# ============================================================
# MCP SERVER
# ============================================================

mcp = FastMCP(MCP_NAME)

_client: Optional[Client] = None
_call_count = 0
_session_start: Optional[datetime] = None


def _get_client() -> Client:
    global _client
    if _client is None:
        raise ValueError("Nao esta logado. Use instagram_login primeiro.")
    return _client


def _is_real_site(url: str) -> bool:
    """Verifica se a URL e um site real ou apenas um cartao de visita (Linktree etc)."""
    if not url:
        return False
    url_lower = url.lower().strip().rstrip("/")
    for domain in NOT_REAL_SITE_DOMAINS:
        if domain in url_lower:
            return False
    return True


def _anti_ban_delay():
    delay = random.uniform(DELAY_MIN, DELAY_MAX)
    time.sleep(delay)
    global _call_count
    _call_count += 1
    return delay


def _check_rate_limit():
    if _call_count >= MAX_CALLS_PER_SESSION:
        _save_cooldown()
        raise ValueError(
            f"Limite de {MAX_CALLS_PER_SESSION} chamadas atingido. "
            "Faca logout e aguarde o cooldown."
        )


# ============================================================
# CACHE DE PERFIS VISITADOS
# ============================================================

def _load_visited() -> dict:
    os.makedirs(CACHE_DIR, exist_ok=True)
    if os.path.exists(VISITED_FILE):
        with open(VISITED_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}


def _save_visited(visited: dict):
    os.makedirs(CACHE_DIR, exist_ok=True)
    with open(VISITED_FILE, "w", encoding="utf-8") as f:
        json.dump(visited, f, ensure_ascii=False, indent=2)


def _is_visited(username: str, param_key: str) -> bool:
    visited = _load_visited()
    entry = visited.get(username)
    if not entry:
        return False
    return entry.get("parametros") == param_key


def _mark_visited(username: str, param_key: str, resultado: str, score: int):
    visited = _load_visited()
    visited[username] = {
        "visitado_em": datetime.now().isoformat(),
        "parametros": param_key,
        "resultado": resultado,
        "score": score,
    }
    _save_visited(visited)


# ============================================================
# COOLDOWN
# ============================================================

def _save_cooldown():
    os.makedirs(CACHE_DIR, exist_ok=True)
    data = {
        "ultima_sessao_fim": datetime.now().isoformat(),
        "chamadas_ultima_sessao": _call_count,
    }
    with open(COOLDOWN_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def _get_cooldown_hours(calls: int) -> int:
    for threshold, hours in sorted(COOLDOWN_TABLE.items()):
        if calls <= threshold:
            return hours
    return 3


def _check_cooldown() -> Optional[str]:
    if not os.path.exists(COOLDOWN_FILE):
        return None
    with open(COOLDOWN_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    last_end = datetime.fromisoformat(data["ultima_sessao_fim"])
    last_calls = data.get("chamadas_ultima_sessao", 0)
    cooldown_hours = _get_cooldown_hours(last_calls)
    if cooldown_hours == 0:
        return None
    elapsed = datetime.now() - last_end
    elapsed_hours = elapsed.total_seconds() / 3600
    if elapsed_hours < cooldown_hours:
        remaining_min = int((cooldown_hours * 60) - (elapsed.total_seconds() / 60))
        return (
            f"COOLDOWN ATIVO. Ultima sessao: {last_calls} chamadas, "
            f"terminou ha {int(elapsed.total_seconds() / 60)} min. "
            f"Cooldown: {cooldown_hours}h. Restam: {remaining_min} min."
        )
    return None


# ============================================================
# TOOL 1: LOGIN
# ============================================================

@mcp.tool()
def instagram_login(username: str, password: str) -> str:
    """
    Faz login no Instagram. Use conta SECUNDARIA!
    Reutiliza sessao salva se existir.
    """
    global _client, _call_count, _session_start

    # Verifica cooldown antes de logar
    cooldown_msg = _check_cooldown()
    if cooldown_msg:
        return f"BLOQUEADO: {cooldown_msg}"

    _client = Client()
    _client.delay_range = [DELAY_MIN, DELAY_MAX]

    if os.path.exists(SESSION_FILE):
        try:
            _client.load_settings(SESSION_FILE)
            _client.login(username, password)
            _client.get_timeline_feed()
            _call_count = 0
            _session_start = datetime.now()
            return f"Login OK (sessao reutilizada) como @{username}."
        except Exception:
            pass

    try:
        _client.login(username, password)
        _client.dump_settings(SESSION_FILE)
        _call_count = 0
        _session_start = datetime.now()
        return f"Login OK como @{username}. Sessao salva."
    except ChallengeRequired:
        _client = None
        return "CHALLENGE: Resolva a verificacao no celular e tente novamente."
    except Exception as e:
        _client = None
        return f"Erro no login: {e}"


# ============================================================
# TOOL 2: LOGOUT
# ============================================================

@mcp.tool()
def instagram_logout() -> str:
    """Encerra sessao e salva cooldown."""
    global _client, _call_count
    _save_cooldown()
    calls_made = _call_count
    cooldown_hours = _get_cooldown_hours(calls_made)
    if _client:
        try:
            _client.logout()
        except Exception:
            pass
    _client = None
    _call_count = 0
    return (
        f"Logout OK. Chamadas: {calls_made}. "
        f"Cooldown: {cooldown_hours}h."
    )


# ============================================================
# TOOL 3: GET PROFILE (validacao — 1 API call)
# ============================================================

@mcp.tool()
def instagram_get_profile(username: str) -> str:
    """
    Dados completos de 1 perfil. Usa 1 chamada API.
    Retorna: seguidores, posts, bio, site, tipo de conta, contato.
    """
    _check_rate_limit()
    cl = _get_client()
    _anti_ban_delay()

    try:
        user = cl.user_info_by_username(username)
        ext_url = user.external_url or ""
        return json.dumps({
            "username": user.username,
            "full_name": user.full_name or "",
            "user_id": str(user.pk),
            "bio": user.biography or "",
            "external_url": ext_url,
            "has_real_site": _is_real_site(ext_url),
            "follower_count": user.follower_count,
            "following_count": user.following_count,
            "media_count": user.media_count,
            "is_business": user.is_business,
            "is_professional": getattr(user, "is_professional_account", False),
            "account_type": (
                "Business" if user.is_business
                else "Professional" if getattr(user, "is_professional_account", False)
                else "Personal"
            ),
            "category": getattr(user, "category_name", "") or getattr(user, "business_category_name", "") or "",
            "public_email": getattr(user, "public_email", "") or "",
            "contact_phone": getattr(user, "contact_phone_number", "") or "",
            "is_verified": user.is_verified,
            "is_private": user.is_private,
        }, ensure_ascii=False)
    except Exception as e:
        return f"ERRO: {e}"


# ============================================================
# TOOL 4: GET POSTS (validacao — 1-2 API calls)
# ============================================================

@mcp.tool()
def instagram_get_posts(username: str, amount: int = 10) -> str:
    """
    Posts de um usuario com datas. SO USE se media_count < 50
    (contas com muitos posts sao antigas — nao gaste API nisso).
    """
    _check_rate_limit()
    cl = _get_client()
    _anti_ban_delay()

    try:
        user_id = cl.user_id_from_username(username)
        _anti_ban_delay()
        medias = cl.user_medias(user_id, amount=amount)

        dates = [m.taken_at for m in medias if m.taken_at]
        oldest = min(dates).isoformat() if dates else ""
        newest = max(dates).isoformat() if dates else ""

        return json.dumps({
            "username": username,
            "total_posts_fetched": len(medias),
            "oldest_post_date": oldest,
            "newest_post_date": newest,
        }, ensure_ascii=False)
    except Exception as e:
        return f"ERRO: {e}"


# ============================================================
# TOOL 5: SIMILAR ACCOUNTS (chain discovery — 1 API call)
# ============================================================

@mcp.tool()
def instagram_get_similar_accounts(user_id: str) -> str:
    """
    Contas similares a um perfil. Use SOMENTE apos encontrar um lead valido.
    Retorna usernames para adicionar a fila de candidatos.
    """
    _check_rate_limit()
    cl = _get_client()
    _anti_ban_delay()

    try:
        users = cl.fbsearch_suggested_profiles(int(user_id))
        results = []
        for u in users:
            results.append({
                "username": u.username,
                "full_name": u.full_name or "",
                "user_id": str(u.pk),
            })
        return json.dumps(results, ensure_ascii=False)
    except Exception as e:
        return f"ERRO: {e}"


# ============================================================
# TOOL 6: ANALYZE PROFILE (validacao completa — 1-3 API calls)
# ============================================================

@mcp.tool()
def instagram_analyze_profile(username: str) -> str:
    """
    Analise completa: perfil + posts (se conta pequena) + score.
    INTELIGENTE: se media_count > 100, pula busca de posts (economia).
    """
    _check_rate_limit()
    cl = _get_client()

    # 1. Get profile (1 API call)
    _anti_ban_delay()
    try:
        user = cl.user_info_by_username(username)
    except Exception as e:
        return f"ERRO: {e}"

    ext_url = user.external_url or ""
    has_real_site = _is_real_site(ext_url)

    profile = {
        "username": user.username,
        "full_name": user.full_name or "",
        "user_id": str(user.pk),
        "bio": user.biography or "",
        "external_url": ext_url,
        "has_real_site": has_real_site,
        "follower_count": user.follower_count,
        "following_count": user.following_count,
        "media_count": user.media_count,
        "is_business": user.is_business,
        "account_type": (
            "Business" if user.is_business
            else "Professional" if getattr(user, "is_professional_account", False)
            else "Personal"
        ),
        "category": getattr(user, "category_name", "") or "",
        "public_email": getattr(user, "public_email", "") or "",
        "contact_phone": getattr(user, "contact_phone_number", "") or "",
        "oldest_post_date": "",
        "newest_post_date": "",
    }

    # 2. Get posts SOMENTE se conta pequena (economia de API)
    if user.media_count <= 50:
        _anti_ban_delay()
        try:
            medias = cl.user_medias(user.pk, amount=user.media_count)
            dates = [m.taken_at for m in medias if m.taken_at]
            if dates:
                profile["oldest_post_date"] = min(dates).isoformat()
                profile["newest_post_date"] = max(dates).isoformat()
        except Exception:
            pass

    # 3. Score
    score = 0
    reasons = []

    if not has_real_site:
        score += 3
        if ext_url:
            reasons.append(f"sem site real (tem {ext_url})")
        else:
            reasons.append("sem site")
    if profile["is_business"] or profile["account_type"] != "Personal":
        score += 2
        reasons.append("conta comercial")
    if profile["follower_count"] < 1000:
        score += 1
        reasons.append(f"{profile['follower_count']} seguidores")
    if profile["public_email"] or profile["contact_phone"]:
        score += 1
        reasons.append("tem contato")
    if profile["media_count"] > 100:
        score -= 2
        reasons.append(f"conta antiga ({profile['media_count']} posts)")
    if profile["oldest_post_date"]:
        try:
            oldest_dt = datetime.fromisoformat(profile["oldest_post_date"])
            now = datetime.now(oldest_dt.tzinfo) if oldest_dt.tzinfo else datetime.now()
            days_old = (now - oldest_dt).days
            if days_old <= 90:
                score += 3
                reasons.append(f"conta nova ({days_old}d)")
            elif days_old <= 180:
                score += 1
                reasons.append(f"conta recente ({days_old}d)")
        except Exception:
            pass

    profile["score"] = score
    profile["classificacao"] = (
        "QUENTE" if score >= 6
        else "MORNO" if score >= 3
        else "FRIO"
    )
    profile["motivos"] = "; ".join(reasons)

    return json.dumps(profile, ensure_ascii=False)


# ============================================================
# TOOL 7: CHECK SESSION
# ============================================================

@mcp.tool()
def instagram_check_session() -> str:
    """Verifica se sessao esta ativa."""
    if _client is None:
        return "Nao logado. Use instagram_login."
    try:
        _client.get_timeline_feed()
        elapsed = ""
        if _session_start:
            mins = (datetime.now() - _session_start).seconds // 60
            elapsed = f" | {mins} min"
        return f"Sessao ativa. API: {_call_count}/{MAX_CALLS_PER_SESSION}{elapsed}"
    except Exception:
        return "Sessao expirada. Faca login novamente."


# ============================================================
# TOOL 8: RATE STATUS
# ============================================================

@mcp.tool()
def instagram_get_rate_status() -> str:
    """Mostra chamadas API restantes."""
    remaining = MAX_CALLS_PER_SESSION - _call_count
    return (
        f"API: {_call_count}/{MAX_CALLS_PER_SESSION} usadas, "
        f"{remaining} restantes. Delay: {DELAY_MIN}-{DELAY_MAX}s."
    )


# ============================================================
# TOOL 9: CHECK COOLDOWN
# ============================================================

@mcp.tool()
def instagram_check_cooldown() -> str:
    """Verifica cooldown. SEMPRE chame antes de iniciar."""
    msg = _check_cooldown()
    if msg:
        return f"BLOQUEADO: {msg}"
    return "LIBERADO."


# ============================================================
# TOOL 10: CHECK VISITED
# ============================================================

@mcp.tool()
def instagram_check_visited(username: str, param_key: str) -> str:
    """Verifica se perfil ja foi validado com mesmos parametros."""
    if _is_visited(username, param_key):
        visited = _load_visited()
        entry = visited.get(username, {})
        return (
            f"VISITADO: @{username} ({entry.get('resultado', '?')}, "
            f"score: {entry.get('score', '?')})"
        )
    return f"NOVO: @{username}"


# ============================================================
# TOOL 11: MARK VISITED
# ============================================================

@mcp.tool()
def instagram_mark_visited(username: str, param_key: str, resultado: str, score: int) -> str:
    """Marca perfil no cache apos validacao."""
    _mark_visited(username, param_key, resultado, score)
    return f"@{username} → {resultado} (cache: {len(_load_visited())} perfis)"


# ============================================================
# TOOL 12: APPEND LEAD
# ============================================================

@mcp.tool()
def instagram_append_lead(lead_json: str, filename: str = "") -> str:
    """Adiciona 1 lead ao CSV em tempo real."""
    try:
        lead = json.loads(lead_json)
    except json.JSONDecodeError:
        return "Erro: JSON invalido."

    os.makedirs(LEADS_DIR, exist_ok=True)
    if not filename:
        filename = f"leads_{datetime.now().strftime('%Y%m%d')}.csv"
    filepath = os.path.join(LEADS_DIR, filename)
    file_exists = os.path.exists(filepath)

    fieldnames = [
        "classificacao", "score", "username", "full_name", "follower_count",
        "media_count", "oldest_post_date", "newest_post_date", "account_type",
        "category", "external_url", "public_email", "contact_phone", "bio",
        "motivos",
    ]
    with open(filepath, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
        if not file_exists:
            writer.writeheader()
        writer.writerow(lead)
    return f"@{lead.get('username', '?')} → {filepath}"


# ============================================================
# TOOL 13: CACHE STATS
# ============================================================

@mcp.tool()
def instagram_get_cache_stats() -> str:
    """Estatisticas do cache e cooldown."""
    visited = _load_visited()
    total = len(visited)
    leads = sum(1 for v in visited.values() if v.get("resultado") == "lead")
    descartados = total - leads
    cooldown = "BLOQUEADO" if _check_cooldown() else "LIBERADO"
    return (
        f"Cache: {total} perfis ({leads} leads, {descartados} descartados). "
        f"Cooldown: {cooldown}. API: {_call_count}/{MAX_CALLS_PER_SESSION}."
    )


# ============================================================
# MAIN
# ============================================================

if __name__ == "__main__":
    mcp.run(transport="stdio")
