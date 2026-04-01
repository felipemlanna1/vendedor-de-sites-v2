"""
Scoring de leads adaptado do propensity_v3 da V1.
Classifica como QUENTE / MORNO / FRIO.
"""

import re

from .niches import HIGH_TICKET_NICHES, is_franchise


def score_lead(lead: dict) -> dict:
    """
    Calcula score e classificacao de um lead.

    Adiciona ao dict: score, qualification, score_detail, motivos
    """
    score = 0
    detail = {}
    motivos = []

    # ============================================================
    # A. NECESSIDADE DO PRODUTO (0-25 pts)
    # ============================================================
    ws = lead.get("website_status", "")
    website = lead.get("website", "")

    if ws == "no_url" or (not website and not ws):
        pts = 25
        motivos.append("sem website")
    elif ws == "dead":
        pts = 22
        motivos.append("site morto/offline")
    elif ws == "bad_website":
        pts = 18
        motivos.append("site ruim (pagespeed baixo)")
    elif ws == "social_only":
        pts = 15
        motivos.append("só tem rede social como site")
    elif ws == "good_website":
        pts = 0
    else:
        pts = 0

    detail["necessidade"] = pts
    score += pts

    # ============================================================
    # B. VOLUME E ATIVIDADE (0-15 pts)
    # ============================================================
    reviews = lead.get("reviews") or 0

    if reviews >= 500:
        pts = 15
        motivos.append(f"{reviews} avaliações (muito ativo)")
    elif reviews >= 200:
        pts = 12
        motivos.append(f"{reviews} avaliações")
    elif reviews >= 100:
        pts = 9
        motivos.append(f"{reviews} avaliações")
    elif reviews >= 50:
        pts = 6
    elif reviews >= 20:
        pts = 3
    elif reviews >= 5:
        pts = 1
    elif reviews == 0:
        pts = -3
        motivos.append("zero avaliações")
    else:
        pts = 0

    detail["volume"] = pts
    score += pts

    # ============================================================
    # C. QUALIDADE E REPUTACAO (0-8 pts)
    # ============================================================
    rating = lead.get("rating")

    if rating is not None:
        if rating >= 4.8:
            pts = 8
            motivos.append(f"nota excepcional ({rating})")
        elif rating >= 4.5:
            pts = 7
        elif rating >= 4.0:
            pts = 5
        elif rating >= 3.5:
            pts = 3
        elif rating >= 3.0:
            pts = 1
        else:
            pts = -5
            motivos.append(f"nota baixa ({rating})")
    else:
        pts = 0

    detail["qualidade"] = pts
    score += pts

    # ============================================================
    # D. CONTACTABILIDADE (0-7 pts)
    # ============================================================
    phone = lead.get("phone", "")

    pts = 0
    if phone:
        pts += 4
        # Checar se e celular (provavel WhatsApp)
        phone_digits = re.sub(r'\D', '', phone)
        if len(phone_digits) >= 10 and phone_digits[-9] == '9':
            pts += 2
            motivos.append("tem celular (provável WhatsApp)")
    if lead.get("address"):
        pts += 1

    detail["contactabilidade"] = pts
    score += pts

    # ============================================================
    # E. FORMALIZACAO (0-10 pts, requer CNPJ)
    # ============================================================
    pts = 0
    idade = lead.get("idade_meses")

    if idade is not None:
        if idade <= 6:
            pts += 5
            motivos.append(f"empresa nova ({idade} meses)")
        elif idade <= 12:
            pts += 3
            motivos.append(f"empresa recente ({idade} meses)")
        elif idade <= 24:
            pts += 1

    niche = lead.get("niche", "")
    if niche in HIGH_TICKET_NICHES:
        pts += 3
        motivos.append("nicho ticket alto")

    porte = lead.get("porte", "")
    if porte in ("MEI", "ME"):
        pts += 2

    detail["formalizacao"] = pts
    score += pts

    # ============================================================
    # RED FLAGS (negativo)
    # ============================================================
    name = lead.get("name", "")
    if is_franchise(name):
        score = 0
        detail["red_flag"] = "franquia"
        motivos = ["FRANQUIA — desqualificado"]
        lead["score"] = 0
        lead["qualification"] = "DESCARTADO"
        lead["score_detail"] = detail
        lead["motivos"] = "; ".join(motivos)
        return lead

    # ============================================================
    # BONUS (0-10 pts)
    # ============================================================
    bonus = 0
    has_no_site = ws in ("no_url", "dead", "social_only")

    if has_no_site and reviews >= 100:
        bonus += 5
        motivos.append("sem site + 100+ avaliações (ocupado)")

    if has_no_site and niche in HIGH_TICKET_NICHES:
        bonus += 5
        motivos.append("sem site + ticket alto (incongruente)")

    detail["bonus"] = bonus
    score += bonus

    # ============================================================
    # CLASSIFICACAO
    # ============================================================
    score = max(0, score)

    if score >= 40:
        qualification = "QUENTE"
    elif score >= 25:
        qualification = "MORNO"
    else:
        qualification = "FRIO"

    lead["score"] = score
    lead["qualification"] = qualification
    lead["score_detail"] = detail
    lead["motivos"] = "; ".join(motivos)

    return lead


def score_all(leads: list[dict]) -> list[dict]:
    """Aplica scoring a todos os leads e ordena por score."""
    scored = [score_lead(lead) for lead in leads]
    scored.sort(key=lambda x: x.get("score", 0), reverse=True)
    return scored
