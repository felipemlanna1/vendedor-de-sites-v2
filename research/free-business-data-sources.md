# Free Business Data Sources - Research Report

**Date:** 2026-03-31
**Objective:** Find ANY free source of local business data that could replace or complement Google Maps scraping for lead generation.

---

## TIER 1: BEST OPTIONS (High value, truly free, actionable now)

### 1. Brazilian CNPJ Open Data (Receita Federal)

**THE SINGLE BEST SOURCE FOR BRAZIL-FOCUSED LEADS**

The Brazilian Federal Revenue Service (Receita Federal) publishes the COMPLETE national registry of legal entities (CNPJ) as open data. This is updated quarterly and contains 60+ million records.

**Data includes:**
- Razao social, nome fantasia
- CNAE codes (primary and secondary) -- this IS the business category/niche
- Full address (street, city, state, zip)
- Date of incorporation (data de abertura) -- CRITICAL for finding new businesses
- Registration status (ativa/inativa)
- Capital social (company size indicator)
- Email and phone (when available)

**Download sources:**
- Official: https://dados.gov.br/dados/conjuntos-dados/cadastro-nacional-da-pessoa-juridica---cnpj
- Receita Federal direct: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/cadastros
- Casa dos Dados (faster CDN mirror): https://dados-abertos-rf-cnpj.casadosdados.com.br/
- Base dos Dados (SQL/Python/R access): https://basedosdados.org/dataset/33b49786-fb5f-496f-bb7c-9811c985af8e

**Format:** Multiple compressed CSV files, ~85GB uncompressed total

**Tools to process:**
- GitHub `turicas/socios-brasil` -- downloads, extracts, cleans, converts to CSV: https://github.com/turicas/socios-brasil
- GitHub `aphonsoar/Receita_Federal_do_Brasil_-_Dados_Publicos_CNPJ` -- ETL pipeline: https://github.com/aphonsoar/Receita_Federal_do_Brasil_-_Dados_Publicos_CNPJ
- R package `qsacnpj`: https://github.com/georgevbsantiago/qsacnpj

**Free CNPJ APIs (for individual lookups):**
- CNPJa (free, no auth required): https://cnpja.com/api/open
- OpenCNPJ: https://opencnpj.org/

**Assessment: 10/10 for Brazil** -- This is GOLD. You can filter by CNAE (business type), date of incorporation (find NEW businesses), city, and status. Combined with the lead_finder.py approach, this provides a massive pre-qualified lead list.

---

### 2. OpenStreetMap + Overpass API

**FREE, LEGAL, GLOBAL business POI data**

OpenStreetMap contains millions of business Points of Interest (POIs) worldwide, all under the Open Database License (ODbL) -- free for commercial use.

**How to extract business data:**

**Overpass Turbo (web UI):** https://overpass-turbo.eu/

Example query to get all restaurants in a city with CSV output:
```
[out:csv(::id,::lat,::lon,"name","addr:city","addr:street","addr:housenumber","phone","website","opening_hours";true;";")][timeout:60];
area[name="Curitiba"]->.searchArea;
(
  node["amenity"="restaurant"](area.searchArea);
  way["amenity"="restaurant"](area.searchArea);
);
out center;
```

Example query for ALL shops in a city:
```
[out:csv(::id,::lat,::lon,"name","shop","addr:city","addr:street","phone","website";true;";")][timeout:60];
area[name="Curitiba"]->.searchArea;
(
  node["shop"](area.searchArea);
  way["shop"](area.searchArea);
);
out center;
```

**Bulk downloads:**
- Geofabrik (daily updated regional extracts): https://download.geofabrik.de/
- Brazil extract: https://download.geofabrik.de/south-america/brazil.html
- R package `osmextract`: https://docs.ropensci.org/osmextract/

**Key OSM tags for businesses:**
- `shop=*` (all retail shops)
- `amenity=restaurant|cafe|dentist|doctors|pharmacy|bank|etc`
- `office=*` (offices)
- `craft=*` (craftsmen/tradespeople)
- `healthcare=*` (healthcare providers)

**Assessment: 8/10** -- Excellent coverage in urban Brazil. Data quality varies by region but is strong in major cities. Completely free and legal. The key limitation is that not all businesses are mapped, and data may lack phone/email. Best used as a complementary source.

**Resources:**
- OSM Wiki examples: https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example
- Download guide: https://wiki.openstreetmap.org/wiki/Downloading_data
- Geofabrik: https://download.geofabrik.de/

---

### 3. Kaggle Datasets

**Pre-scraped Google Maps data, free to download**

Several Kaggle datasets contain Google Maps business data that has already been scraped:

- **Location Intelligence Data from Google Map**: https://www.kaggle.com/datasets/azharsaleem/location-intelligence-data-from-google-map
- **Google Maps Dataset**: https://www.kaggle.com/datasets/danieldelro/googlemaps
- **Google Maps Restaurant Reviews**: https://www.kaggle.com/datasets/denizbilginn/google-maps-restaurant-reviews
- **Bright Data sample** (1000+ businesses): https://github.com/luminati-io/Google-Maps-dataset-samples

**Assessment: 6/10** -- Useful as starter datasets but typically limited in scope (specific regions/categories). May be outdated. Good for prototyping and testing your lead scoring algorithms before building a live pipeline.

---

## TIER 2: GOOD FREE TIERS (APIs with generous free limits)

### 4. HERE Places API

**250,000 free requests/month -- no credit card required**

- Free tier: 250,000 transactions/month (Freemium plan)
- No daily limit, ~5 req/sec
- No payment information required
- Includes POI search, geocoding, and place details
- Pricing page: https://www.here.com/get-started/pricing

**Assessment: 8/10** -- This is arguably the best free API tier available. 250K requests/month is generous enough for serious lead generation. Returns business name, address, phone, category, and coordinates.

---

### 5. Apple MapKit JS

**25,000 free requests/day**

- Daily quota: 25,000 API calls
- Includes place search, business details, geocoding
- Returns POI data including businesses
- Requires Apple Developer account (free)
- Docs: https://developer.apple.com/documentation/mapkitjs/
- Server API: https://developer.apple.com/documentation/applemapsserverapi/

**Assessment: 7/10** -- Good free tier. 25K/day = 750K/month. Less commonly scraped than Google Maps, so the data may provide unique leads. Apple Maps business data quality has improved significantly.

---

### 6. Foursquare Places API

**$200/month free credits (developer sandbox)**

- Developer sandbox: $200/month in free usage credits
- Free tier: 10,000 calls/month to Pro endpoints
- Data includes: business name, address, phone, categories, ratings, hours
- Premium endpoints (photos, tips, ratings) cost extra
- Pricing: https://foursquare.com/pricing/
- API docs: https://docs.foursquare.com/

**Assessment: 7/10** -- Good data quality, especially for restaurants, cafes, and nightlife. The $200 free credit is generous for testing. Coverage in Brazil is decent in major cities.

---

### 7. TomTom Search API

**2,500 free requests/day -- no credit card required**

- Free tier: 2,500 non-tile requests/day (~75K/month)
- No credit card required
- POI search, fuzzy search, geocoding
- Commercial use allowed on Freemium plan
- Developer portal: https://developer.tomtom.com/
- Pricing: https://developer.tomtom.com/pricing

**Assessment: 6/10** -- Solid free tier. Good for supplementary data. POI database is particularly strong in Europe but has global coverage.

---

### 8. Mapbox Geocoding

**100,000 free requests/month**

- Free tier: 100,000 requests/month (Temporary API)
- IMPORTANT LIMITATION: Results from Temporary API cannot be stored in a database
- Permanent Geocoding (for storage) has NO free tier
- Pricing: https://www.mapbox.com/pricing
- Docs: https://docs.mapbox.com/api/search/geocoding/

**Assessment: 5/10** -- The storage restriction makes this less useful for lead generation databases. Good for real-time search/discovery but you technically cannot persist the results without paying.

---

### 9. Yelp Places API

**30-day free trial**

- 30-day free trial period
- Up to 1000 businesses per search query
- Data: name, address, phone, photos, ratings, price levels, hours
- Only returns businesses WITH reviews
- Docs: https://docs.developer.yelp.com/docs/places-intro

**Assessment: 5/10 for Brazil** -- Yelp coverage in Brazil is limited compared to the US. The 30-day trial is useful for a one-time data grab but not sustainable. Strong for US-based leads.

---

## TIER 3: SUPPLEMENTARY SOURCES (Useful for enrichment or specific use cases)

### 10. OpenCorporates

**Free for open data projects; largest open database of companies**

- 145+ jurisdictions worldwide
- API endpoint: https://api.opencorporates.com/
- Free access for: open data projects, academics, NGOs, journalists, nonprofits
- Data: company name, registration number, status, officers, filings
- API docs: https://api.opencorporates.com/documentation/API-Reference

**Assessment: 5/10** -- Good for verifying company legitimacy and finding corporate details, but not designed for local business discovery. Better as an enrichment source.

**Resource:** Bellingcat guide: https://www.bellingcat.com/resources/2023/08/24/following-the-money-a-beginners-guide-to-using-the-opencorporates-api/

---

### 11. SafeGraph Places Data

**Free for academics ($15K credits)**

- Academic program: $15,000 in free data credits
- Sample datasets available for free download (100 rows)
- Open Census Data: free under CC0 license
- Access via Dewey for university subscribers
- Website: https://www.safegraph.com/free-data
- Academic program: https://www.safegraph.com/academics

**Assessment: 4/10** -- Only useful if you qualify for the academic program. Not practical for commercial lead generation.

---

### 12. Wikidata SPARQL

**Free, unlimited queries**

- Query endpoint: https://query.wikidata.org/
- Can query for businesses by type, location, etc.
- Uses SPARQL query language
- Tutorial: https://www.wikidata.org/wiki/Wikidata:SPARQL_tutorial

**Assessment: 3/10** -- Wikidata contains notable businesses (chains, well-known establishments) but NOT local small businesses. Useful for research but not for lead generation.

---

### 13. Google Maps Chrome Extensions (Free tiers)

Several Chrome extensions offer limited free scraping:

- **Google Maps Extractor**: 200 free listings, export to CSV: https://github.com/LeadGenerationTools/google-maps-extractor
- **Instant Data Scraper**: Free, ~117 results per search (~4 min)
- **GMPlus**: Free tier with CSV export: https://gmplus.io/
- **Maps Scraper**: https://mapsscraper.net/

**LIMITATION:** Google Maps caps at ~120 businesses per search query.

**Assessment: 5/10** -- Quick and easy but very limited scale. Good for spot-checking a niche/city but not for building a comprehensive database.

---

### 14. Yellow Pages Scrapers

- Chrome extension (free, 100 listings/export): https://chromewebstore.google.com/detail/yellow-pages-scraper-%E2%80%93-fr/mmibhnbgahgckfofpindpgaphgocbkhi
- WebScraper.io tutorial: https://webscraper.io/blog/how-to-scrape-yellow-pages-businesses
- Outscraper free tier: https://outscraper.com/yellowpages-scraper/
- Python + LXML guide: https://www.scrapehero.com/how-to-scrape-business-details-from-yellowpages-com-using-python-and-lxml/

**Assessment: 4/10** -- Limited to US/Canada. Data quality varies. May trigger CAPTCHAs at scale.

---

### 15. Government Open Data Portals

**US:**
- Data.gov: https://data.gov/
- SBA Open Data: https://data.sba.gov/
- USPTO: https://data.uspto.gov/
- GSA Open Data: https://open.gsa.gov/data/

**Brazil:**
- Portal de Dados Abertos: https://dados.gov.br/
- Portal da Transparencia: https://portaldatransparencia.gov.br/download-de-dados
- Brasil.IO (aggregator): https://brasil.io/datasets/
- Base dos Dados: https://basedosdados.org/

**Global directory:** https://dataportals.org/

**Assessment: 6/10 for Brazil, 4/10 for US** -- The Brazilian CNPJ data (covered in #1) is the standout. US government portals have business registration data but are fragmented across states.

---

### 16. Azure Maps (successor to Bing Maps)

Bing Maps Local Search API has been deprecated for free accounts (June 2025). Microsoft now directs users to Azure Maps.

- Bing Maps deprecation notice: June 30, 2025 for free accounts
- Azure Maps: https://azure.microsoft.com/en-us/products/azure-maps/
- Azure Maps has a free tier but requires Azure account with credit card

**Assessment: 3/10** -- The free Bing Maps option is dead. Azure Maps requires more setup and a credit card.

---

## RECOMMENDED STRATEGY FOR VENDEDOR-DE-SITES

Based on this research, here is the optimal free data pipeline:

### Phase 1: Brazilian CNPJ Database (Primary Source)
1. Download the Receita Federal CNPJ open data
2. Filter by CNAE codes matching target niches (dentistas, nutricionistas, personal trainers, etc.)
3. Filter by `data_de_abertura` to find businesses opened in the last 6-12 months (NEW businesses = need websites)
4. Filter by city/state
5. Cross-reference with existing website data (check if domain exists)

### Phase 2: OpenStreetMap Enrichment
1. Use Overpass API to get business POIs with phone/website data for the same cities
2. Match against CNPJ data to enrich with coordinates, opening hours, website info

### Phase 3: HERE API for Missing Data
1. Use HERE Places API (250K free/month) to fill gaps in phone numbers and addresses
2. Verify business existence and get additional details

### Phase 4: Existing Instagram Pipeline
1. Continue using the current `lead_finder.py` for Instagram-based discovery
2. Cross-reference Instagram profiles with CNPJ data to validate and enrich

### Why This Works:
- **CNPJ data tells you WHO opened a new business** (date of incorporation)
- **CNAE codes tell you WHAT type of business** (perfect niche targeting)
- **Address data tells you WHERE** (city/neighborhood targeting)
- **No website in their registration = they probably NEED one**
- **100% legal, 100% free, 60M+ records**

---

## QUICK REFERENCE: FREE API LIMITS COMPARISON

| Source | Free Tier | Credit Card Required | Best For |
|---|---|---|---|
| CNPJ Receita Federal | Unlimited (bulk download) | No | Brazil businesses (complete) |
| OpenStreetMap/Overpass | Unlimited | No | Global POI data |
| HERE Places API | 250K/month | No | Place search & details |
| Apple MapKit JS | 25K/day (~750K/month) | No (Apple Dev acct) | Place search |
| Foursquare | $200/month credits | Yes | Restaurants, nightlife |
| TomTom Search | 2.5K/day (~75K/month) | No | POI search |
| Mapbox Geocoding | 100K/month (no storage) | Yes | Real-time only |
| Yelp Fusion | 30-day trial | Yes | US businesses |
| OpenCorporates | Free for open/academic | No | Company verification |
| Google Maps Extensions | ~120-200 per search | No | Quick spot checks |

---

## Sources

- [Receita Federal Open Data](https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/dados-abertos/cadastros)
- [dados.gov.br CNPJ Dataset](https://dados.gov.br/dados/conjuntos-dados/cadastro-nacional-da-pessoa-juridica---cnpj)
- [Casa dos Dados CNPJ Mirror](https://dados-abertos-rf-cnpj.casadosdados.com.br/)
- [Brasil.IO Datasets](https://brasil.io/datasets/)
- [Base dos Dados](https://basedosdados.org/dataset/33b49786-fb5f-496f-bb7c-9811c985af8e)
- [OpenCNPJ API](https://opencnpj.org/)
- [CNPJa Free API](https://cnpja.com/api/open)
- [GitHub socios-brasil](https://github.com/turicas/socios-brasil)
- [GitHub CNPJ ETL](https://github.com/aphonsoar/Receita_Federal_do_Brasil_-_Dados_Publicos_CNPJ)
- [OpenStreetMap Downloads](https://wiki.openstreetmap.org/wiki/Downloading_data)
- [Overpass API Examples](https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example)
- [Overpass Turbo](https://overpass-turbo.eu/)
- [Geofabrik Downloads](https://download.geofabrik.de/)
- [osmextract R Package](https://docs.ropensci.org/osmextract/)
- [Kaggle Location Intelligence Dataset](https://www.kaggle.com/datasets/azharsaleem/location-intelligence-data-from-google-map)
- [Kaggle Google Maps Dataset](https://www.kaggle.com/datasets/danieldelro/googlemaps)
- [HERE Pricing](https://www.here.com/get-started/pricing)
- [Apple MapKit JS Docs](https://developer.apple.com/documentation/mapkitjs/)
- [Foursquare Pricing](https://foursquare.com/pricing/)
- [TomTom Developer Portal](https://developer.tomtom.com/)
- [Mapbox Pricing](https://www.mapbox.com/pricing)
- [Yelp Places API](https://docs.developer.yelp.com/docs/places-intro)
- [OpenCorporates API](https://api.opencorporates.com/)
- [SafeGraph Free Data](https://www.safegraph.com/free-data)
- [Wikidata Query Service](https://query.wikidata.org/)
- [Google Maps Extractor Extension](https://github.com/LeadGenerationTools/google-maps-extractor)
- [Yellow Pages Scraper](https://outscraper.com/yellowpages-scraper/)
- [Data.gov](https://data.gov/)
- [DataPortals.org](https://dataportals.org/)
- [Bright Data Google Maps Samples](https://github.com/luminati-io/Google-Maps-dataset-samples)
