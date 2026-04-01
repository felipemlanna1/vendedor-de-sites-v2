# Google Maps Scraping Solutions Research

## Research Date: 2026-03-31

Comprehensive survey of free/open-source Google Maps scraping solutions found across English, Chinese, and Japanese tech communities.

---

## TIER 1: Best Open-Source GitHub Repositories (Fully Free)

### 1. gosom/google-maps-scraper [GO] -- BEST OVERALL
- **URL**: https://github.com/gosom/google-maps-scraper
- **Stars**: 3,500+
- **Language**: Go (Golang 1.25.6+)
- **License**: MIT -- truly free, no hidden costs or usage limits
- **Technique**: Browser automation via Playwright (default) or Rod/Chromium
- **Data Points (33+)**: Business name, address, phone, website, ratings, review counts, coordinates, images, user reviews, email extraction from websites
- **Output Formats**: CSV, JSON, PostgreSQL, S3, LeadsDB
- **Deployment**: Docker, Web UI, REST API, CLI, Kubernetes/AWS Lambda
- **Key Features**:
  - Grid-based scraping with bounding boxes for systematic geographic coverage
  - Configurable concurrency and scroll depth
  - Proxy rotation (SOCKS5/HTTP/HTTPS)
  - AI Agent integration (Claude Code, Cursor, etc.) via `npx skills add gosom/google-maps-scraper`
  - LeadsDB export with automatic deduplication
  - Email extraction from business websites
- **Install**: `docker pull gosom/google-maps-scraper`
- **Unique Insight**: The grid-based bounding box approach overcomes Google's 120-place result limit by dividing geographic areas into smaller cells

### 2. zohaibbashir/Google-Maps-Scrapper [PYTHON/PLAYWRIGHT]
- **URL**: https://github.com/zohaibbashir/Google-Maps-Scrapper
- **Stars**: 134
- **Language**: Python 3.8-3.9
- **License**: MIT -- truly free
- **Technique**: Playwright (visible browser, non-headless)
- **Data Points**: Name, address, website, phone, review counts, ratings, service types (in-store/pickup/delivery), operating hours, business descriptions
- **Install**: `pip install -r requirements.txt && playwright install`
- **Key Feature**: Service type detection (in-store, pickup, delivery) -- unique among scrapers
- **Unique Insight**: Runs in visible browser mode for visual monitoring during scraping

### 3. HasData/google-maps-scraper [PYTHON + NODE.JS]
- **URL**: https://github.com/HasData/google-maps-scraper
- **Language**: Python 3.10+ and Node.js 18+
- **License**: Open source
- **Technique**: Three approaches in one repo -- Selenium, Playwright (stealth), and HasData API
- **Data Points**: Business name, rating, reviews, category, services, image, detail URL
- **Output**: CSV and JSON
- **Anti-Detection**: Playwright stealth mode, random delays, proxy support
- **Install (Python)**: `pip install selenium pandas playwright playwright-stealth && playwright install`
- **Install (Node.js)**: `npm install selenium-webdriver playwright playwright-extra playwright-extra-plugin-stealth axios`
- **Unique Insight**: Having 3 different scraping approaches in one repo lets you switch techniques when one gets blocked

### 4. noworneverev/google-maps-scraper [PYTHON/ASYNC]
- **URL**: https://github.com/noworneverev/google-maps-scraper
- **Language**: Python with Playwright (Firefox) and asyncio
- **License**: MIT -- free, available on PyPI
- **Technique**: Async batch processing with Playwright Firefox
- **Data Points (20+)**: Name, rating, review count, address, phone, website, category, hours, lat/lng, place ID, images, description, photos count, closure status
- **Performance**: ~2,000 URLs/hour at concurrency 5; ~4,000/hour at concurrency 10 with proxies
- **Key Features**:
  - Auto-save with resume capability for crash recovery
  - Multi-language support across Google Maps locales
  - Headless-compatible for CI/CD
  - CLI and Python API interfaces
- **Unique Insight**: Smart auto-click on first result when queries return multiple matches; Firefox-based (less detection than Chrome)

### 5. Honeiapp/google-review-scraper [NODE.JS/PUPPETEER] -- BEST FOR REVIEWS
- **URL**: https://github.com/Honeiapp/google-review-scraper
- **Language**: JavaScript/Node.js 18+
- **License**: MIT
- **Technique**: Puppeteer with stealth plugin + request interception
- **Data Points**: reviewId, name, rating, text, date, likes count, images, profile picture, profile link, owner responses, timestamps
- **Speed**: Claims 3-5x faster than traditional scrapers
- **Anti-Detection**:
  - Stealth plugin to avoid bot detection
  - Keyboard PageDown events (more realistic than scrollTo)
  - Request interception blocks images/fonts/media for speed
- **Unique Insight**: Request interception technique -- blocks unnecessary resources (images, fonts, media) during scraping for 3-5x speed improvement; uses keyboard events instead of JS scrollTo for more human-like behavior

### 6. FenrirDWolf/Google-Map-Scraper [ELECTRON + REACT + PLAYWRIGHT] -- BEST GUI
- **URL**: https://github.com/FenrirDWolf/Google-Map-Scraper
- **Language**: JavaScript (React frontend, Express backend, Electron desktop)
- **License**: MIT
- **Technique**: Playwright as scraping engine
- **Data Points**: Business names, locations, phone numbers, websites, social media profiles
- **Key Features**: Desktop GUI app with tabbed interface (New Search, Jobs, Database, Settings), pause/resume, configurable delays, headless mode
- **Unique Insight**: Full desktop application with job management -- good for non-technical users

### 7. Code-Media-Labs/google-maps-scraper [NODE.JS/PUPPETEER]
- **URL**: https://github.com/Code-Media-Labs/google-maps-scraper
- **NPM**: `@cml/google-maps-scraper`
- **Language**: JavaScript/TypeScript, Node.js 18+
- **License**: Open source
- **Technique**: Puppeteer with auto-scrolling and deduplication
- **Data Points**: Name, star rating, total reviews, phone number, Google Maps URL
- **Output**: JSON and XLSX (via ExcelJS)
- **Usage**: CLI (`gmaps-scraper scrape -q "query"`) or library import
- **Unique Insight**: Author's key observation -- "Google changes class names, container structure, layout, nested DOM elements" frequently, requiring ongoing selector maintenance

---

## TIER 2: AI-Enhanced Lead Generation Tools

### 8. kaymen99/google-maps-lead-generator [PYTHON + AI]
- **URL**: https://github.com/kaymen99/google-maps-lead-generator
- **Stars**: 26
- **Language**: Python 3.8+
- **License**: Open source
- **Technique**: Serper Maps API + Playwright + LLM enrichment (GPT-4.1/Claude/DeepSeek via OpenRouter)
- **Data Points**: Business name, address, phone, website, emails, Facebook/Twitter/Instagram profiles, contact person info
- **Cost**: ~$0.2 per 1,000 leads; Serper gives free credits at signup
- **Key Innovation**: Two-stage extraction -- regex first finds potential emails/links, then LLM validates which are real business contacts (reduces hallucination and API costs)
- **UI**: Streamlit web interface
- **Unique Insight**: Regex-first + LLM-validation approach is a cost-optimization breakthrough for contact enrichment

---

## TIER 3: Tutorials with Full Code Examples

### 9. DEV.to: Playwright Stealth Guide (HasData)
- **URL**: https://dev.to/hasdata_com/simple-google-maps-scraper-using-playwright-e72
- **Language**: Python
- **Technique**: Playwright + playwright-stealth + Pandas + regex
- **Code**: ~100 lines, complete working scraper
- **Eight-Stage Implementation**: Setup -> Browser launch with stealth -> Navigate -> Search -> Scroll -> Extract -> CSV save -> Close
- **Anti-Detection**: `stealth_sync(page)` function masks bot activity
- **Truly Free**: Yes (code only, no paid APIs)

### 10. Medium: 16 Lines of Python (EmilDev)
- **URL**: https://medium.com/@19emilabos/web-scrape-google-maps-in-under-20-lines-of-python-0298cc6cefa4
- **Language**: Python
- **Technique**: Selenium + urllib + WebDriverWait
- **Code**: 16 lines, minimal viable scraper
- **Data**: 7-10 business results per search
- **Key Trick**: `driver.execute_script("window.scrollTo(0, 100)")` triggers pagination; re-fetch results after each scroll
- **Truly Free**: Yes
- **Limitation**: Very basic -- just names and text, no structured data extraction

### 11. GeeksforGeeks: Selenium Tutorial
- **URL**: https://www.geeksforgeeks.org/web-scraping/how-to-scrape-data-from-google-maps-using-python/
- **Language**: Python
- **Technique**: Selenium + Chrome WebDriver
- **Data**: Names, ratings, descriptions, reviews, addresses, contact numbers
- **Truly Free**: Yes (educational tutorial)

### 12. ScrapeOps: BeautifulSoup + Requests Guide
- **URL**: https://scrapeops.io/python-web-scraping-playbook/python-scrape-google-maps/
- **Language**: Python
- **Technique**: Requests + BeautifulSoup + concurrent.futures (multithreaded)
- **Two-Phase Approach**:
  - Phase 1: Search crawler extracts business cards across multiple localities
  - Phase 2: Individual scraper visits each business detail page
- **Data Points**: Name, rating, URL, review count (search); address, city, state/ZIP, 7-day hours (detail)
- **Key Tricks**:
  - DataPipeline class with names_seen list for deduplication
  - Queue-based CSV writing (batches of 50)
  - ThreadPoolExecutor for parallel processing
  - Retry logic with exponential backoff
- **Caveat**: Requires ScrapeOps Proxy API for anti-detection (paid for production)

### 13. DEV.to: Bose Framework Guide
- **URL**: https://dev.to/chetanam/how-to-scrape-google-maps-using-python-selenium-and-bose-framework-20g
- **Language**: Python
- **Technique**: Selenium + Bose Bot Development Framework
- **Bose Framework**: Selenium wrapper that auto-manages browser drivers
- **Data**: Business names, addresses, phones, websites, ratings, reviews -> CSV
- **Truly Free**: Yes (framework is open source)

### 14. kawsarlog/projectMapsData [PYTHON/SELENIUM]
- **URL**: https://github.com/kawsarlog/projectMapsData
- **Stars**: 12
- **Language**: Python 3.9
- **Libraries**: Selenium 4.1.0, BeautifulSoup4, Openpyxl, chromedriver-autoinstaller
- **Output**: Excel files
- **Unique Feature**: chromedriver-autoinstaller handles driver version management automatically

---

## TIER 4: No-Code / Low-Code Solutions

### 15. n8n Workflow for Google Maps Email Extraction [JAPANESE]
- **URL**: https://zenn.dev/norimax/articles/ff694b8f90304d
- **Platform**: Zenn.dev (Japanese)
- **Tool**: n8n (no-code/low-code automation)
- **Technique**: 5-part workflow:
  1. Query setup and loop management
  2. Google Maps search + URL extraction via regex
  3. URL filtering and deduplication
  4. Website traversal and email extraction
  5. Email aggregation, cleaning, Google Sheets export
- **Cost**: Completely free -- no Google Maps API used
- **Anti-Detection**: 2-5 second delays between requests
- **Smart Filtering**: Auto-filters spam (@google.com etc.)
- **Unique Insight**: Entirely avoids Maps API costs by scraping directly + extracting emails from business websites

### 16. Qiita: Chrome Extension CSV Exporter [JAPANESE]
- **URL**: https://qiita.com/landwarrior/items/74d72fb34ea247a40688
- **Platform**: Qiita (Japanese)
- **Language**: JavaScript (vanilla, Manifest v3)
- **Technique**: Chrome extension targeting `div[aria-label*="search results"][role="feed"]`
- **Data**: Business name + Google Maps URL -> CSV with UTF-8 BOM (Excel-compatible)
- **Cost**: Completely free, no dependencies
- **Unique Insight**: Pragmatic Japanese approach -- chose simplest possible solution (Chrome extension) over complex API/scraping setups; built with AI-assisted development (Cursor)

### 17. Apify + n8n Workflow for Japan Contact Extraction [JAPANESE]
- **URL**: https://zenn.dev/koukyo/articles/a00746c08ae7fb
- **Platform**: Zenn.dev (Japanese)
- **Tools**: Apify Actors (compass/crawler-google-places + kyo_kou/japan-contact-scraper)
- **Results**: 94% overall contact acquisition across ~500 companies
  - Contact forms: 90%
  - Phone numbers: 76%
  - Email addresses: 46%
  - SNS profiles: 30%
- **Technique**: Granular geographic targeting -- search by ward (Tokyo's 23 districts) instead of prefecture-wide
- **Japan-Specific Features**: DNS validation for email filtering, phonenumbers-jp for telephone classification, contact form detection via HTML + URL pattern scoring
- **Time Savings**: 10+ hours manual -> ~2 hours automated
- **Unique Insight**: Breaking searches into ward-level + industry-specific keywords dramatically multiplies results beyond Google's limits

---

## TIER 5: Chinese Community Findings

### 18. CSDN: Python + Selenium + BrowserMobProxy [CHINESE]
- **URL**: https://blog.csdn.net/nju_zjy/article/details/114544281
- **Platform**: CSDN (Chinese tech blog)
- **Language**: Python
- **Technique**: Selenium + BrowserMobProxy to intercept Google Maps network requests
- **Approach**: Calculate center coordinates from bounding boxes, construct search URLs, scrape POI data
- **Key Chinese Insight**: Use BrowserMobProxy to capture the actual API calls Google Maps makes internally -- scrape the API responses rather than the HTML DOM
- **Limitation**: Gets blocked after ~10 requests without browser simulation

### 19. Bright.cn (Chinese): Step-by-Step Guide
- **URL**: https://www.bright.cn/blog/web-data/how-to-scrape-google-maps
- **Platform**: Bright Data (Chinese localized)
- **Comprehensive tutorial** covering Python scraping approaches for Chinese market

### 20. CSDN Trending: gosom/google-maps-scraper
- **URL**: https://blog.csdn.net/2501_93086911/article/details/158313846
- **Note**: The gosom/google-maps-scraper project was featured in Chinese tech trending reports, confirming its popularity across communities

---

## TIER 6: Japanese Community Findings

### 21. Job Code: Selenium Scraping Guide [JAPANESE]
- **URL**: https://jobcode.jp/googlemap-scraping/
- **Platform**: Job Code (Japanese)
- **Language**: Python (Selenium + time + csv + traceback)
- **Key Functions**: setup_driver(), search_google_map(), scroll_to_bottom()
- **CSS Selectors Used**: `m6QErb.DxyBCb`, `DUwDvf.fontHeadlineLarge`, `RcCsl.fVHpi.w4vB1d.NOE9ve`
- **Data**: Business names, addresses; reviews via Places API
- **Japanese Community Warning**: Google frequently modifies CSS selectors -- always review class names and XPaths when errors occur
- **Unique Approach**: Compares three methods by cost/setup, recommends context-dependent tool selection

### 22. Octoparse Japan (Qiita): 5 Scraping Tools
- **URL**: https://qiita.com/Octoparse_Japan/items/3cae8a06c3435356bc8e
- **Platform**: Qiita (Japanese)
- **Content**: Comparison of no-code tools (Octoparse, Web Scraper extension, etc.) for Japanese users

---

## KEY TECHNIQUES SUMMARY

| Technique | Speed | Anti-Detection | Complexity | Best For |
|-----------|-------|---------------|------------|----------|
| Playwright + Stealth | Fast | Excellent | Medium | Large-scale scraping |
| Selenium (visible) | Slow | Good | Low | Learning/small projects |
| Puppeteer + Request Interception | Very Fast | Good | Medium | Review scraping |
| Go + Playwright (gosom) | Very Fast | Good | Low (Docker) | Production/deployment |
| n8n Workflow | Medium | Fair | Low | Non-programmers |
| Chrome Extension | Instant | N/A | Very Low | Quick one-off exports |
| Scrapy + Playwright | Fast | Good | High | Large-scale crawls |
| BeautifulSoup + Requests | Fast | Poor | Medium | Needs proxy service |

---

## CRITICAL INSIGHTS FROM INTERNATIONAL COMMUNITIES

### Universal Findings
1. **Google Maps requires browser automation** -- pure HTTP requests get blocked within ~10 requests because Google expects JavaScript-based API calls
2. **CSS selectors break frequently** -- Google changes DOM structure regularly; plan for maintenance
3. **The 120-place limit** -- Google Maps caps search results; overcome via grid-based geographic subdivision
4. **Stealth mode is essential** -- playwright-stealth or Puppeteer stealth plugin dramatically reduces blocking

### Chinese Community Insights
- **BrowserMobProxy technique**: Intercept Google's internal API calls instead of scraping HTML -- more reliable and structured data
- **Coordinate-based crawling**: Calculate center points from bounding boxes and systematically cover areas

### Japanese Community Insights
- **Ward-level geographic targeting**: Break searches into smallest administrative units (e.g., Tokyo's 23 wards) for dramatically more results
- **Chrome extension approach**: Simplest possible solution -- no server, no Python, just extract from the DOM directly
- **n8n workflows**: No-code automation chains that avoid all API costs by scraping directly
- **Japan-specific contact extraction**: DNS validation, phonenumbers-jp library, HTML pattern scoring for contact form detection

### Indian Community Insights
- **Bose Framework**: Selenium wrapper that eliminates driver management pain
- **chromedriver-autoinstaller**: Automatically matches ChromeDriver to browser version
- **Two-phase scraping**: First get listings, then visit each detail page -- more thorough data collection

---

## RECOMMENDED STACK BY USE CASE

### For Maximum Data (Production)
**gosom/google-maps-scraper** (Go) -- 3.5K stars, MIT license, Docker deployment, 33+ data points, grid-based scraping, email extraction, LeadsDB integration

### For Python Developers
**noworneverev/google-maps-scraper** -- async Playwright, 20+ fields, resume capability, PyPI package, 2K-4K URLs/hour

### For Quick Prototyping
**HasData/google-maps-scraper** -- 3 techniques in one repo (Selenium/Playwright/API), Python + Node.js

### For Lead Generation with AI
**kaymen99/google-maps-lead-generator** -- Serper + Playwright + LLM enrichment, email/social extraction, ~$0.2/1000 leads

### For Review Scraping
**Honeiapp/google-review-scraper** -- Puppeteer, request interception, 3-5x speed, stealth mode

### For Non-Programmers
**n8n workflow** (Zenn.dev article) -- completely free, no-code, Google Sheets export

### For Quick One-Off Exports
**Qiita Chrome Extension** -- vanilla JS, zero dependencies, instant CSV download
