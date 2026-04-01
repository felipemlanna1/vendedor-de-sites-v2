# Research: Detecting When a Local Business Was Created/Registered

**Date:** 2026-03-31
**Goal:** Determine if a business is NEW (recently created) to target as leads for website creation.

---

## EXECUTIVE SUMMARY

**Best approach for Brazil: Use CNPJ APIs (free) to get the exact company registration date.** This is the most reliable, cheapest, and most automatable method. For businesses found on Google Maps, cross-reference with CNPJ data.

| Method | Reliability | Cost | Automation | Verdict |
|--------|-------------|------|------------|---------|
| **CNPJ API (Receita Federal)** | **EXACT date** | **Free** | **Trivial** | **BEST for Brazil** |
| Google Maps "Years in Business" scraping | High (when present) | Free (scraping) | Medium | Good supplement |
| Google Places API `openingDate` | ONLY for future openings | $17/1000 reqs | Easy | NOT useful |
| First review date (proxy) | Approximate | Free-$5/mo | Medium | Decent fallback |
| Oldest photo date (proxy) | Very approximate | Free (manual) | Hard | Last resort |

---

## 1. GOOGLE MAPS / GOOGLE BUSINESS PROFILE

### 1A. "Years in Business" Label

Google displays a "Years in Business" label directly under reviews in the local pack (search results). This was launched in February 2021.

**How it works:**
- The label is pulled from the "Opened on Date" field in Google Business Profile
- Business owners set this manually in their GBP dashboard (Info > Add Opening Date)
- Only year and month are required
- If the owner does NOT set it, Google guesses from other sources (and often gets it wrong)

**Can you scrape it?**
- YES -- it appears in the HTML of Google Search local pack results
- It shows as text like "3+ years in business" or "10+ years in business"
- CSS selectors change frequently; requires maintenance
- NOT available via official API

**Limitations:**
- Not all businesses have this label
- Self-reported by business owners (can be inaccurate)
- Google may auto-populate with wrong data
- Only shows in Google Search local pack, NOT reliably on the Google Maps listing page itself

**Sources:**
- [Google launches Years in Business in Search](https://localsearchforum.com/threads/google-launches-years-in-business-in-search.57484/)
- [Google officially displays years in business](https://searchengineland.com/google-officially-displays-years-in-business-in-local-pack-345986)
- [Opened On Date / Years in Business on GBP](https://www.themediacaptain.com/opened-on-date-google-business-profile/)
- [How to Influence "Years in Business"](https://www.sterlingsky.ca/gmb-opening-dates/)

### 1B. Business Creation/Listing Date

**Google does NOT expose when a listing was created.** Google Map Maker used to show this data, but it was discontinued. There is NO official way to determine when a Google Business Profile listing was first created.

**Workarounds:**
- Look at the oldest photos (they have date stamps)
- Look at the date of the oldest review (see Section 3)
- Check Wayback Machine for earliest cached version
- Check business directories (Yelp, Facebook) for earlier mentions

**Sources:**
- [Is it possible to know when a place was added to Google Maps?](https://support.google.com/maps/thread/180160566)
- [Checking the date a local business was launched](https://support.google.com/maps/thread/228208334)
- [Is there a place to find the creation date of my listing?](https://support.google.com/business/thread/87438473)

### 1C. Google Places API -- `openingDate` Field

The Places API (New) has an `openingDate` field. However, **it is NOT useful for your use case.**

**Critical limitation:** The `openingDate` field is ONLY populated for businesses with `businessStatus: "FUTURE_OPENING"` -- businesses that haven't opened yet. For already-operating businesses, this field is empty/null.

- Available in: Place Details (New), Text Search (New), Nearby Search (New)
- Field mask: `places.openingDate`
- Returns: `{ "year": 2026, "month": 4, "day": 15 }`
- Billing: Triggers Place Details Pro SKU ($17 per 1,000 requests)
- Nearby Search only returns it if the opening date is <90 days away

**Feature request for creation date:** There is an open feature request on Google's Issue Tracker ([#35830022](https://issuetracker.google.com/issues/35830022)) titled "Expose creation date and date of last update in Place Details" -- this has been open for YEARS and has not been implemented.

**Verdict: The Google Places API cannot tell you when an existing business was created or registered.**

**Sources:**
- [Place Data Fields (New)](https://developers.google.com/maps/documentation/places/web-service/data-fields)
- [Place Details (New)](https://developers.google.com/maps/documentation/places/web-service/place-details)
- [Issue Tracker #35830022](https://issuetracker.google.com/issues/35830022)

### 1D. Google Business Profile API

The GBP API (for verified business owners managing their own listings) also does NOT expose listing creation date to third parties. The `accounts.locations` resource does not include a creation timestamp in its public documentation.

**Source:** [REST Resource: accounts.locations](https://developers.google.com/my-business/reference/rest/v4/accounts.locations)

---

## 2. CNPJ APIs -- THE BEST SOLUTION FOR BRAZIL

In Brazil, every formal business has a CNPJ (Cadastro Nacional da Pessoa Juridica). The Receita Federal publishes this data, and multiple free APIs expose it -- including the **exact date the company was registered** (`data_inicio_atividade` or `abertura`).

### 2A. ReceitaWS (receitaws.com.br)

| Feature | Detail |
|---------|--------|
| **Endpoint** | `GET https://receitaws.com.br/v1/cnpj/{cnpj}` |
| **Field name** | `abertura` |
| **Format** | `dd/mm/aaaa` (e.g., `"15/03/2026"`) |
| **Rate limit (free)** | 3 requests per minute (20s between requests) |
| **Auth required** | No (free tier) |
| **Cost** | Free (limited) / Paid plans available |

**Sources:**
- [ReceitaWS](https://receitaws.com.br/)
- [ReceitaWS API Documentation](https://receitaws.com.br/api)
- [GitHub - lsfalcao/receitaws](https://github.com/lsfalcao/receitaws)

### 2B. OpenCNPJ (opencnpj.com / opencnpj.org)

| Feature | Detail |
|---------|--------|
| **Endpoint** | `GET https://kitana.opencnpj.com/cnpj/{cnpj}` |
| **Field name** | `dataInicioAtividades` |
| **Format** | `YYYY-MM-DD` (e.g., `"2026-03-15"`) |
| **Rate limit** | 100 requests/minute per IP (up to 50 req/sec bursts) |
| **Auth required** | No |
| **Cost** | 100% free, open source |
| **Update frequency** | Monthly (follows Receita Federal publication) |

**Sources:**
- [OpenCNPJ](https://opencnpj.com/)
- [OpenCNPJ API publica](https://opencnpj.org/)
- [OpenCNPJ on Casa do Dev](https://casado.dev/consultar-cnpjs-api-gratuita-opencnpj)

### 2C. CNPJa (cnpja.com)

| Feature | Detail |
|---------|--------|
| **Free endpoint** | `GET https://open.cnpja.com/office/{cnpj}` |
| **Field name** | `founded` |
| **Rate limit** | Not specified (free tier) |
| **Auth required** | No (free API) |
| **Advanced feature** | Can SEARCH/FILTER companies by founding date |
| **Filter parameters** | `founded.gte` (date >=), `founded.lte` (date <=) |
| **Cost** | Free API (open) / Commercial API (paid, more features) |

**KEY ADVANTAGE:** CNPJa's commercial API lets you **search for recently created companies** by filtering on founding date. This means you can proactively find NEW businesses without needing to know their CNPJ first.

**Sources:**
- [CNPJa Free API](https://cnpja.com/api/open)
- [CNPJa Commercial API Reference](https://cnpja.com/en/api/reference)
- [CNPJa Platform](https://cnpja.com/en)

### 2D. Minha Receita (minhareceita.org)

| Feature | Detail |
|---------|--------|
| **Endpoint** | `GET https://minhareceita.org/{cnpj}` |
| **Field name** | `data_inicio_atividade` |
| **Format** | `YYYY-MM-DD` (e.g., `"1967-06-30"`) |
| **Rate limit** | Not specified |
| **Auth required** | No |
| **Cost** | Free (open source, self-hostable) |
| **Code** | [github.com/cuducos/minha-receita](https://github.com/cuducos/minha-receita) |

**Sources:**
- [Minha Receita Documentation](https://docs.minhareceita.org/como-usar/)
- [GitHub - cuducos/minha-receita](https://github.com/cuducos/minha-receita)
- [DEV Community tutorial](https://dev.to/camilacrdoso/obtendo-dados-de-cnpj-s-com-a-api-minha-receita-2hcd)

### 2E. Government API (Plataforma Conecta)

| Feature | Detail |
|---------|--------|
| **Portal** | [gov.br/conecta/catalogo/apis/consulta-cnpj](https://www.gov.br/conecta/catalogo/apis/consulta-cnpj) |
| **Services** | 3 tiers (basic, QSA, full) |
| **Auth required** | Yes (gov.br account) |
| **Cost** | Free |

**Source:** [Consulta CNPJ - Catalogo de APIs governamentais](https://www.gov.br/conecta/catalogo/apis/consulta-cnpj)

### 2F. Receita Federal Bulk Data (Dados Abertos)

The Receita Federal publishes the entire CNPJ database as downloadable bulk CSV files, updated periodically. These contain `data_inicio_atividade` for every registered company in Brazil. You can download and filter locally for recently created businesses.

### Comparison Table: CNPJ APIs

| API | Free? | Rate Limit | Auth? | Can Search by Date? | Best For |
|-----|-------|------------|-------|-------------------|----------|
| **ReceitaWS** | Yes (limited) | 3/min | No | No (lookup only) | Quick lookups |
| **OpenCNPJ** | Yes | 100/min | No | No (lookup only) | High-volume lookups |
| **CNPJa (free)** | Yes | Unknown | No | No (lookup only) | Simple lookups |
| **CNPJa (paid)** | No | Higher | Yes | **YES (filter by date)** | **Finding new businesses** |
| **Minha Receita** | Yes | Unknown | No | No (lookup only) | Self-hosted lookups |
| **Gov.br Conecta** | Yes | Unknown | Yes | Unknown | Official data |
| **Bulk CSV** | Yes | N/A | No | Yes (local filter) | Full database analysis |

---

## 3. SCRAPING FIRST REVIEW DATE AS A PROXY

The date of the oldest/first review on a Google Maps listing is a reasonable proxy for when the business started operating (or at least when it first had a Google Maps presence).

### How to Get It

**Option A: Apify Google Maps Reviews Scraper**
- Cost: ~$0.25 per 1,000 reviews
- Sort reviews by "Newest" and paginate to the end, or use "Oldest" sort
- Extract the `publishedAtDate` field from the last page
- [Apify Reviews Scraper](https://apify.com/compass/google-maps-reviews-scraper)

**Option B: Custom scraper (Python + Selenium/Playwright)**
- Navigate to the business listing on Google Maps
- Click "Reviews" tab
- Sort by "Newest" (no direct "Oldest" sort in UI)
- Scroll to load ALL reviews, then take the last one's date
- OR use Google's internal API calls (reverse-engineered) to paginate reviews

**Option C: Outscraper Reviews Scraper**
- Outscraper can extract all reviews with dates
- [Outscraper Reviews Scraper](https://outscraper.com/google-maps-reviews-scraper/)

### Limitations

- A business may have existed for years before getting its first review
- Some businesses have zero reviews
- Scraping all reviews is expensive for businesses with thousands of reviews
- Google may show relative dates ("2 years ago") instead of exact dates
- In February 2026, Google locked reviews behind a "limited view" for non-logged users (workaround exists via search-based navigation)

### Reliability as a Proxy

- **Good for:** Detecting very new businesses (if first review is from last 1-3 months, the business is likely new)
- **Bad for:** Determining exact business age (first review could be months or years after opening)
- **Best combined with:** CNPJ data for exact registration date

---

## 4. OTHER PROXY METHODS

### 4A. Outscraper Company Insights (Enrichment)

Outscraper's enrichment service can provide "founding year" by aggregating data from Whitepages, Yellowpages, and other public sources. This is a paid service added on top of Google Maps scraping.

- [Outscraper Enrichment Features](https://outscraper.com/outscraper-enrichment-features/)
- [Outscraper Enrichment Services](https://outscraper.com/enrichment-services/)

### 4B. Wayback Machine / Web Archives

Check when the business's website first appeared on the Wayback Machine (web.archive.org). If the business has no website (your target market), this won't work -- but lack of an archived website is itself a signal.

### 4C. Domain Registration Date (WHOIS)

If the business HAS a website, the domain's WHOIS creation date can indicate business age. But since your target is businesses WITHOUT websites, this is mostly useful as a negative signal.

### 4D. Social Media Account Creation

Instagram and Facebook account creation dates can be estimated via:
- First post date
- Account ID (older accounts have lower IDs on some platforms)
- Your existing `lead_finder.py` already checks post count as a proxy for account age

---

## 5. RECOMMENDED STRATEGY FOR VENDEDOR DE SITES V2

### The Optimal Pipeline for Finding NEW Businesses in Brazil

```
STEP 1: Scrape Google Maps (existing pipeline)
   - Get business name, address, phone, website status
   - Filter: NO website

STEP 2: Extract CNPJ
   - From the business name + address, search for CNPJ
   - Options: Google search "CNPJ + business name + city"
   - Or: Use CNPJa's search API (paid) to find by name

STEP 3: Query CNPJ API for registration date
   - Use OpenCNPJ (free, 100 req/min) or ReceitaWS (free, 3 req/min)
   - Get data_inicio_atividade / abertura field
   - Filter: registered in last 6-12 months = NEW business = hot lead

STEP 4: (Optional) Cross-reference with first review date
   - If CNPJ not found (informal business), use first review date as fallback
```

### Alternative: Proactive Search for New Businesses

```
STEP 1: Use CNPJa's commercial API to SEARCH for companies
   - Filter: founded.gte = 6 months ago
   - Filter: CNAE code matching target nicho (e.g., dentista, nutricionista)
   - Filter: city/state matching target location

STEP 2: Check if they have a website
   - Google search for their name
   - Check if Google Maps listing has website field

STEP 3: Those without websites = leads
```

### Scoring Enhancement for lead_finder.py

Add business age as a scoring factor:

| Signal | Score Modifier | Rationale |
|--------|---------------|-----------|
| Registered < 3 months ago | +4 | Brand new, definitely needs website |
| Registered 3-6 months ago | +3 | Still very new |
| Registered 6-12 months ago | +2 | New-ish, may need website |
| Registered 1-2 years ago | +1 | Established but maybe ready to invest |
| Registered 2+ years ago | 0 | May already have solutions |
| No CNPJ found (informal) | +1 | May be very new/small |
| First review < 3 months old | +2 | Recent Google presence |
| Zero reviews | +1 | Very new or very small |

---

## 6. EXAMPLE API CALLS

### OpenCNPJ (Free, recommended for volume)
```bash
curl https://kitana.opencnpj.com/cnpj/12345678000199
```
Response includes: `"dataInicioAtividades": "2026-01-15"`

### ReceitaWS (Free, recommended for simplicity)
```bash
curl https://receitaws.com.br/v1/cnpj/12345678000199
```
Response includes: `"abertura": "15/01/2026"`

### Minha Receita (Free, self-hostable)
```bash
curl https://minhareceita.org/12345678000199
```
Response includes: `"data_inicio_atividade": "2026-01-15"`

### Python Example (OpenCNPJ)
```python
import requests
from datetime import datetime, timedelta

def get_business_age(cnpj: str) -> dict:
    """Query OpenCNPJ for business registration date."""
    cnpj_clean = cnpj.replace(".", "").replace("/", "").replace("-", "")
    url = f"https://kitana.opencnpj.com/cnpj/{cnpj_clean}"

    resp = requests.get(url, timeout=10)
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}"}

    data = resp.json()
    abertura = data.get("dataInicioAtividades")

    if not abertura:
        return {"error": "No opening date found"}

    dt = datetime.strptime(abertura, "%Y-%m-%d")
    age_days = (datetime.now() - dt).days

    return {
        "cnpj": cnpj,
        "razao_social": data.get("razaoSocial", ""),
        "nome_fantasia": data.get("nomeFantasia", ""),
        "data_abertura": abertura,
        "idade_dias": age_days,
        "idade_meses": age_days // 30,
        "is_new": age_days <= 365,  # Less than 1 year old
        "is_very_new": age_days <= 180,  # Less than 6 months old
    }
```

---

## 7. KEY CONCLUSIONS

1. **Google Maps/Places API CANNOT tell you when an existing business was created.** The `openingDate` field only works for FUTURE_OPENING businesses. There is no creation date, no listing date, no founding date field.

2. **Google's "Years in Business" label** is visible in search results but is NOT exposed via API. It can be scraped from HTML but is unreliable (self-reported, often auto-populated incorrectly).

3. **CNPJ APIs are the gold standard for Brazil.** They give you the EXACT registration date, for free, at high volume. OpenCNPJ (100 req/min, no auth) is the best for automation.

4. **CNPJa's commercial API** is the only option that lets you PROACTIVELY SEARCH for recently created businesses (filter by founding date + CNAE code + location), eliminating the need to scrape Google Maps first.

5. **First review date** is a useful supplementary signal but should not be the primary method.

6. **The challenge is connecting Google Maps data to CNPJ.** Google Maps listings don't include CNPJ numbers, so you need to search for the CNPJ by business name + location. This can be done via Google search or the CNPJa search API.
