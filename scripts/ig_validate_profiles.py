#!/usr/bin/env python3
"""Instagram profile validation via Playwright - Phase 4."""
import sys
import time
import json
import re
import csv
from pathlib import Path
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright

STORAGE_PATH = Path("data/_state/ig-browser-state.json")
STATE_PATH = Path("data/_state/lead-finder-progress.json")
SCREENSHOT_DIR = Path("data/reports/lead-saude-mg")
CSV_PATH = Path("data/leads/leads_saude_mg.csv")

# Links that are NOT real websites
LINKTREE_DOMAINS = [
    "linktr.ee", "linktree.com", "taplink.cc", "beacons.ai", "bio.link",
    "bio.site", "lnk.bio", "campsite.bio", "hoo.be", "snipfeed.co",
    "allmylinks.com", "solo.to", "carrd.co", "about.me", "flow.page",
    "stan.store", "whats.link", "wa.me", "bit.ly", "tinyurl.com",
    "linkme.bio", "manylink.co", "direct.me", "milkshake.app"
]

# Health-related keywords for bio matching
HEALTH_KEYWORDS = [
    "medic", "dra.", "dr.", "crm", "cro", "crefito", "crn",
    "dentist", "odonto", "fisio", "nutri", "dermat", "ortoped",
    "clinica", "consultorio", "saude", "saúde", "health",
    "atendimento", "paciente", "tratamento", "cirurgi"
]

# MG cities <= 40k (approximate)
MG_SMALL_CITIES = [
    "visconde do rio branco", "carandai", "carandaí", "machado",
    "manhumirim", "oliveira", "santos dumont", "diamantina",
    "salinas", "januaria", "januária", "nanuque", "itauna", "itaúna",
    "curvelo", "para de minas", "pará de minas", "monte carmelo",
    "raul soares", "caratinga", "itabira", "ouro preto",
    "passos", "alfenas", "tres pontas", "três pontas",
    "manhuacu", "manhuaçu", "campo belo", "frutal",
    "cachoeira do campo", "congonhas", "conselheiro lafaiete",
    "sao joao del rei", "são joão del-rei", "lavras",
    "uba", "ubá", "muriae", "muriaé", "leopoldina",
    "ponte nova", "viçosa", "vicosa", "guaxupe", "guaxupé",
    "pouso alegre", "varginha", "pocos de caldas", "poços de caldas"
]

def parse_followers(raw):
    """Parse follower count from raw string."""
    if not raw:
        return 0
    raw = raw.strip().replace(",", "").replace(".", "")
    raw_lower = raw.lower()
    if "k" in raw_lower:
        return int(float(raw_lower.replace("k", "")) * 1000)
    if "m" in raw_lower:
        return int(float(raw_lower.replace("m", "")) * 1000000)
    try:
        return int(raw)
    except:
        return 0

def has_real_site(url):
    """Check if URL is a real website (not linktree etc)."""
    if not url:
        return False
    url_lower = url.lower()
    for domain in LINKTREE_DOMAINS:
        if domain in url_lower:
            return False
    return True

def is_health_profile(bio_text):
    """Check if bio mentions health-related terms."""
    if not bio_text:
        return False
    text_lower = bio_text.lower()
    return any(kw in text_lower for kw in HEALTH_KEYWORDS)

def is_mg_small_city(text):
    """Check if text mentions a small MG city."""
    if not text:
        return False
    text_lower = text.lower()
    # Check for MG state indicators
    has_mg = "minas gerais" in text_lower or " mg" in text_lower or "/mg" in text_lower or "-mg" in text_lower
    if not has_mg:
        return False
    # Check for small cities
    for city in MG_SMALL_CITIES:
        if city in text_lower:
            return city.title()
    return None

def calculate_score(profile_data):
    """Calculate lead score."""
    score = 0
    reasons = []

    # No real website = good lead
    if not profile_data.get("has_real_site"):
        score += 3
        reasons.append("sem site real (+3)")
    else:
        reasons.append("TEM site real (0)")

    # Business/Creator account
    if profile_data.get("has_contact") or profile_data.get("category"):
        score += 2
        reasons.append("conta comercial (+2)")

    # Low followers = newer account
    followers = profile_data.get("followers", 0)
    if followers < 1000:
        score += 1
        reasons.append(f"<1k seguidores ({followers}) (+1)")
    elif followers > 10000:
        score -= 1
        reasons.append(f">10k seguidores ({followers}) (-1)")

    # Has contact info
    if profile_data.get("has_email_phone"):
        score += 1
        reasons.append("email/tel visivel (+1)")

    # Post count
    posts = profile_data.get("posts", 0)
    if posts > 100:
        score -= 2
        reasons.append(f">100 posts ({posts}) (-2)")

    # Account age (based on oldest post)
    oldest = profile_data.get("oldest_post_date")
    if oldest:
        try:
            oldest_dt = datetime.fromisoformat(oldest.replace("Z", "+00:00"))
            days_old = (datetime.now(timezone.utc) - oldest_dt).days
            if days_old < 90:
                score += 3
                reasons.append(f"conta <90 dias ({days_old}d) (+3)")
            elif days_old < 180:
                score += 1
                reasons.append(f"conta <180 dias ({days_old}d) (+1)")
            else:
                reasons.append(f"conta {days_old} dias (0)")
        except:
            pass

    # Health professional
    if profile_data.get("is_health"):
        score += 1
        reasons.append("perfil de saude (+1)")

    # In MG small city
    city = profile_data.get("city_match")
    if city:
        score += 1
        reasons.append(f"cidade pequena MG: {city} (+1)")

    # Classification
    if score >= 6:
        classification = "QUENTE"
    elif score >= 3:
        classification = "MORNO"
    else:
        classification = "FRIO"

    return score, classification, reasons


def validate_profiles():
    """Main validation loop."""
    with open(STATE_PATH) as f:
        state = json.load(f)

    candidates = state["candidates"]
    limite = state["limite"]
    filtros = state["filtros"]

    results = {
        "validated": [],
        "quentes": [],
        "mornos": [],
        "frios": [],
        "skipped": [],
        "errors": []
    }

    CSV_PATH.parent.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            storage_state=str(STORAGE_PATH) if STORAGE_PATH.exists() else None,
        )
        page = context.new_page()

        leads_found = 0

        for idx, username in enumerate(candidates):
            if leads_found >= limite:
                print(f"\n[DONE] Meta atingida: {leads_found}/{limite} leads")
                break

            print(f"\n{'='*60}")
            print(f"[{idx+1}/{len(candidates)}] Validando @{username}...")

            try:
                # Navigate to profile
                page.goto(f"https://www.instagram.com/{username}/",
                         wait_until="domcontentloaded", timeout=20000)
                time.sleep(4)

                # Check if profile exists
                page_text = page.inner_text("body")
                page_url = page.url

                if "sorry" in page_text.lower() and "page isn" in page_text.lower():
                    print(f"  [SKIP] Perfil nao existe")
                    results["skipped"].append({"username": username, "reason": "not_found"})
                    time.sleep(3)
                    continue

                if "this account is private" in page_text.lower() or "conta privada" in page_text.lower():
                    print(f"  [SKIP] Conta privada")
                    results["skipped"].append({"username": username, "reason": "private"})
                    time.sleep(3)
                    continue

                # Extract profile data via meta tags
                profile_data_raw = page.evaluate("""() => {
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

                profile_meta = json.loads(profile_data_raw)

                # Parse followers/following/posts from og:description
                og_desc = profile_meta.get("og_desc", "")
                # Try different patterns
                followers_match = re.search(r'([\d,.KkMm]+)\s*(?:Followers?|Seguidores?)', og_desc, re.I)
                following_match = re.search(r'([\d,.KkMm]+)\s*(?:Following|Seguindo)', og_desc, re.I)
                posts_match = re.search(r'([\d,.KkMm]+)\s*(?:Posts?|Publicaç)', og_desc, re.I)

                followers = parse_followers(followers_match.group(1) if followers_match else "0")
                following = parse_followers(following_match.group(1) if following_match else "0")
                posts = parse_followers(posts_match.group(1) if posts_match else "0")

                # Extract external links and contact info
                links_data_raw = page.evaluate("""() => {
                    const links = document.querySelectorAll('a[href]');
                    let externalUrl = null;
                    let hasEmailPhone = false;

                    links.forEach(a => {
                        const href = a.href || '';
                        if (href.includes('l.instagram.com/') || href.includes('linktr.ee') ||
                            href.includes('taplink.cc') || href.includes('beacons.ai') ||
                            href.includes('bio.link') || href.includes('.com.br') ||
                            (href.includes('http') && !href.includes('instagram.com') &&
                             !href.includes('facebook.com') && !href.includes('cdninstagram'))) {
                            if (!externalUrl) externalUrl = href;
                        }
                        if (href.includes('mailto:')) hasEmailPhone = true;
                        if (href.includes('tel:')) hasEmailPhone = true;
                    });

                    const bodyText = document.body.innerText;
                    const hasContact = bodyText.includes('Contact') || bodyText.includes('Contato') ||
                                      bodyText.includes('Ligar') || bodyText.includes('E-mail');

                    // Check for category text (Business accounts show this)
                    const headerSection = document.querySelector('header section');
                    let category = null;
                    if (headerSection) {
                        const spans = headerSection.querySelectorAll('span');
                        spans.forEach(s => {
                            const t = s.textContent.trim();
                            if (['Dentist', 'Doctor', 'Health', 'Medical', 'Nutrição',
                                 'Dentista', 'Médico', 'Saúde', 'Fisioterapeuta',
                                 'Nutricionista', 'Dermatologista', 'Clínica',
                                 'Health/beauty', 'Medical & health', 'Health/Beauty',
                                 'Medical & Health', 'Physical Therapist',
                                 'Alternative & Holistic Health Service',
                                 'Consultório médico', 'Consultório odontológico'
                                ].some(cat => t.includes(cat))) {
                                category = t;
                            }
                        });
                    }

                    return JSON.stringify({
                        external_url: externalUrl,
                        has_contact: hasContact,
                        has_email_phone: hasEmailPhone,
                        category: category
                    });
                }""")

                links_data = json.loads(links_data_raw)

                # Get post links for date checking
                posts_data_raw = page.evaluate("""() => {
                    const postLinks = document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]');
                    const links = [...new Set([...postLinks].map(a => a.href))].slice(0, 6);
                    return JSON.stringify({ post_links: links });
                }""")

                posts_data = json.loads(posts_data_raw)
                post_links = posts_data.get("post_links", [])

                # Visit up to 2 posts to get dates
                post_dates = []
                post_images = []
                for pi, post_url in enumerate(post_links[:3]):
                    time.sleep(2)
                    try:
                        page.goto(post_url, wait_until="domcontentloaded", timeout=15000)
                        time.sleep(2)

                        post_info_raw = page.evaluate("""() => {
                            const ogImg = document.querySelector('meta[property="og:image"]');
                            const timeEl = document.querySelector('time[datetime]');
                            return JSON.stringify({
                                image_hd: ogImg ? ogImg.content : null,
                                date: timeEl ? timeEl.getAttribute('datetime') : null
                            });
                        }""")

                        post_info = json.loads(post_info_raw)
                        if post_info.get("date"):
                            post_dates.append(post_info["date"])
                        if post_info.get("image_hd"):
                            post_images.append(post_info["image_hd"])
                    except Exception as e:
                        print(f"    [WARN] Erro ao visitar post {pi}: {e}")

                # Determine oldest/newest post dates
                oldest_post_date = None
                newest_post_date = None
                if post_dates:
                    sorted_dates = sorted(post_dates)
                    oldest_post_date = sorted_dates[0]
                    newest_post_date = sorted_dates[-1]

                # Combine all data
                bio_text = profile_meta.get("bio", "") + " " + og_desc
                profile = {
                    "username": username,
                    "full_name": profile_meta.get("full_name"),
                    "bio": profile_meta.get("bio", "")[:300],
                    "followers": followers,
                    "following": following,
                    "posts": posts,
                    "profile_pic": profile_meta.get("profile_pic"),
                    "external_url": links_data.get("external_url"),
                    "has_real_site": has_real_site(links_data.get("external_url")),
                    "has_contact": links_data.get("has_contact", False),
                    "has_email_phone": links_data.get("has_email_phone", False),
                    "category": links_data.get("category"),
                    "oldest_post_date": oldest_post_date,
                    "newest_post_date": newest_post_date,
                    "post_images": post_images[:3],
                    "is_health": is_health_profile(bio_text),
                    "city_match": is_mg_small_city(bio_text),
                }

                # Apply filters BEFORE scoring
                # Filter: sem_site
                if filtros.get("sem_site") and profile["has_real_site"]:
                    print(f"  [FILTER] TEM site real: {profile['external_url']}")
                    # Still score it but note it was filtered
                    profile["filtered_reason"] = "has_site"

                # Filter: perfis_recentes (5 months = ~150 days, first post since Nov 2025)
                if oldest_post_date:
                    try:
                        oldest_dt = datetime.fromisoformat(oldest_post_date.replace("Z", "+00:00"))
                        cutoff = datetime(2025, 11, 1, tzinfo=timezone.utc)
                        if oldest_dt < cutoff:
                            profile["filtered_reason"] = profile.get("filtered_reason", "") + "|old_account"
                            print(f"  [FILTER] Conta antiga (1o post: {oldest_post_date})")
                    except:
                        pass

                # Calculate score
                score, classification, reasons = calculate_score(profile)
                profile["score"] = score
                profile["classification"] = classification
                profile["reasons"] = reasons

                # Check if it passes all filters
                is_filtered = bool(profile.get("filtered_reason"))

                # Report
                print(f"  Nome: {profile['full_name']}")
                print(f"  Seguidores: {followers} | Posts: {posts}")
                print(f"  Bio: {profile['bio'][:100]}...")
                print(f"  Site: {profile['external_url'] or 'nenhum'}")
                print(f"  Categoria: {profile.get('category', 'N/A')}")
                print(f"  Cidade MG: {profile.get('city_match', 'N/A')}")
                print(f"  1o post: {oldest_post_date or 'N/A'}")
                print(f"  Score: {score} → {classification}")
                print(f"  Motivos: {', '.join(reasons)}")

                if is_filtered:
                    print(f"  >>> FILTRADO: {profile.get('filtered_reason')}")
                    results["frios"].append(profile)
                elif classification == "QUENTE":
                    results["quentes"].append(profile)
                    leads_found += 1
                    print(f"  >>> LEAD QUENTE #{leads_found}")
                elif classification == "MORNO":
                    results["mornos"].append(profile)
                    leads_found += 1
                    print(f"  >>> LEAD MORNO #{leads_found}")
                else:
                    results["frios"].append(profile)
                    print(f"  >>> FRIO - descartado")

                results["validated"].append(profile)

            except Exception as e:
                print(f"  [ERROR] {e}")
                results["errors"].append({"username": username, "error": str(e)})

            # Progress report every 5 profiles
            if (idx + 1) % 5 == 0:
                print(f"\n--- Progresso: {idx+1}/{len(candidates)} validados, {leads_found}/{limite} leads ---")
                print(f"    QUENTES: {len(results['quentes'])} | MORNOS: {len(results['mornos'])} | FRIOS: {len(results['frios'])}")
                print(f"    Skipped: {len(results['skipped'])} | Errors: {len(results['errors'])}")

            # Natural delay between profiles
            delay = 5 + (idx % 3) * 2  # 5, 7, or 9 seconds
            print(f"  [DELAY] {delay}s...")
            time.sleep(delay)

        # Save browser state
        context.storage_state(path=str(STORAGE_PATH))
        browser.close()

    # Save results to CSV
    all_leads = results["quentes"] + results["mornos"]
    if all_leads:
        with open(CSV_PATH, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "username", "full_name", "bio", "followers", "posts",
                "external_url", "has_real_site", "category", "city_match",
                "oldest_post_date", "score", "classification", "profile_pic"
            ])
            writer.writeheader()
            for lead in all_leads:
                writer.writerow({
                    "username": lead["username"],
                    "full_name": lead.get("full_name", ""),
                    "bio": lead.get("bio", "")[:200],
                    "followers": lead.get("followers", 0),
                    "posts": lead.get("posts", 0),
                    "external_url": lead.get("external_url", ""),
                    "has_real_site": lead.get("has_real_site", False),
                    "category": lead.get("category", ""),
                    "city_match": lead.get("city_match", ""),
                    "oldest_post_date": lead.get("oldest_post_date", ""),
                    "score": lead.get("score", 0),
                    "classification": lead.get("classification", ""),
                    "profile_pic": lead.get("profile_pic", ""),
                })
        print(f"\n[CSV] Salvo em {CSV_PATH}: {len(all_leads)} leads")

    # Update state
    with open(STATE_PATH) as f:
        state = json.load(f)

    state["current_phase"] = 4
    state["leads_found"] = leads_found
    state["csv_path"] = str(CSV_PATH)
    state["validated"] = [
        {"username": p["username"], "score": p["score"], "classification": p["classification"]}
        for p in results["validated"]
    ]
    state["phases"]["phase_4"] = {
        "status": "complete",
        "result": f"{len(results['validated'])} validados, {len(results['quentes'])} QUENTES, {len(results['mornos'])} MORNOS, {len(results['frios'])} FRIOS"
    }

    with open(STATE_PATH, "w") as f:
        json.dump(state, f, indent=2, ensure_ascii=False)

    # Save full results for report
    with open("data/_state/phase4-results.json", "w") as f:
        # Remove non-serializable data
        clean_results = {
            "quentes": [{"username": p["username"], "full_name": p.get("full_name"), "score": p["score"],
                        "classification": p["classification"], "reasons": p["reasons"],
                        "followers": p.get("followers"), "posts": p.get("posts"),
                        "bio": p.get("bio", "")[:150], "city_match": p.get("city_match"),
                        "external_url": p.get("external_url"), "oldest_post_date": p.get("oldest_post_date")}
                       for p in results["quentes"]],
            "mornos": [{"username": p["username"], "full_name": p.get("full_name"), "score": p["score"],
                       "classification": p["classification"], "reasons": p["reasons"],
                       "followers": p.get("followers"), "posts": p.get("posts"),
                       "bio": p.get("bio", "")[:150], "city_match": p.get("city_match"),
                       "external_url": p.get("external_url"), "oldest_post_date": p.get("oldest_post_date")}
                      for p in results["mornos"]],
            "frios": [{"username": p["username"], "score": p.get("score", 0),
                      "filtered_reason": p.get("filtered_reason", "")}
                     for p in results["frios"]],
            "skipped": results["skipped"],
            "errors": results["errors"],
            "total_validated": len(results["validated"]),
            "total_leads": leads_found,
        }
        json.dump(clean_results, f, indent=2, ensure_ascii=False)

    print(f"\n{'='*60}")
    print(f"RESULTADO FASE 4:")
    print(f"  Total validados: {len(results['validated'])}")
    print(f"  QUENTES: {len(results['quentes'])}")
    print(f"  MORNOS: {len(results['mornos'])}")
    print(f"  FRIOS: {len(results['frios'])}")
    print(f"  Skipped: {len(results['skipped'])}")
    print(f"  Errors: {len(results['errors'])}")
    print(f"  CSV: {CSV_PATH}")

    return results

if __name__ == "__main__":
    results = validate_profiles()
    sys.exit(0)
