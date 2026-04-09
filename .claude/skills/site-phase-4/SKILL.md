---
name: site-phase-4
description: Phase 4 of build-site — Doc research results + React project scaffold
allowed-tools: Read, Write, Edit, Bash
model: sonnet
effort: medium
context: fork
user-invocable: false
---

# Phase 4 — Docs + Scaffold

## Objective

Use doc research results from the orchestrator to scaffold a complete React project with correct dependencies, config files, downloaded images, and design tokens — ready for component implementation in Phase 5.

---

## Step 1 — Use doc research results

The orchestrator launched a research agent for the top libraries. Apply the pitfalls found.

For known pitfalls and version-specific issues:
> `Read: sites/_templates/package-libs.md` (section "Known Pitfalls" + "Lenis Parameters")

---

## Step 2 — Create directories

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
LEAD_ID="SLUG_DO_LEAD"
mkdir -p sites/$LEAD_ID/public/images/stock
mkdir -p sites/$LEAD_ID/src/{components/{layout,seo,ui,sections},pages,hooks,i18n,data,design-system}
mkdir -p sites/$LEAD_ID/screenshots
```

---

## Step 3 — Generate package.json

**Do NOT copy blindly.** Build package.json based on the Phase 3 creative concept.

For required dependencies, devDependencies, animation lib mapping, and conditional packages:
> `Read: sites/_templates/package-libs.md`

Key rules:
- If multi-page (Phase 2.6): add `react-router-dom`
- Always include Radix UI for accessible components
- Add `@fontsource/` packages from Phase 3 fonts
- Animation libs: derive ONLY from blueprint — if blueprint doesn't mention it, do NOT include it

---

## Step 4 — Install

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm install
```

---

## Step 5 — Generate config files

### vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()], server: { port: 5173 } })
```

### index.html (full SEO)

Include directly: optimized `<title>`, `<meta description>` 150-160 chars, Open Graph complete (og:title, og:description, og:image REAL, og:url, og:type, og:locale pt_BR), Twitter Card, canonical, hreflang pt-BR and en, favicon.

---

## Step 6 — Download ALL images

For the complete image analysis methodology (video filter, per-image analysis, coherence rules):
> `Read: sites/_templates/image-analysis-guide.md`

### A0) Priority user images (if provided by orchestrator)

If the orchestrator included URLs labeled "PRIORITY IMAGES" or "professional images":
1. Navigate with Playwright (`browser_navigate`) to each URL
2. Instagram post (`/p/`): extract og:image with `browser_evaluate`
3. Instagram Reel (`/reel/`): do NOT use og:image (play button overlay) — try carousel extraction or discard
4. Download with curl and validate
5. Place in the MOST prominent positions: Hero and About

### A) Real images from briefing (data_points category "images")

For each image URL, try in order:
1. **curl direct**: `curl -sfL -o sites/$LEAD_ID/public/images/DESCRIPTIVE-NAME.jpg "URL"`
2. **If curl failed or file < 5KB** (CDN/Instagram URLs expire): navigate with Playwright, extract og:image, download
3. **Validate**: file must be > 5KB. Under 5KB = thumbnail or error — discard and retry

Name descriptively: `portrait-dra-ariel.jpg`, `logo-usina.png`, `hamburguer-classico.jpg`.

After downloading, apply the video thumbnail filter and per-image visual analysis from the image analysis guide.

### B) Stock images from Phase 3.4

```bash
curl -sL -o sites/$LEAD_ID/public/images/stock/NAME.jpg "URL"
```

Only for backgrounds/textures/atmosphere. NEVER for people, locations, products, or team.

### C) Additional images during build (Phase 6)

Use image MCPs: `mcp__stock-images`, `mcp__mcp-pexels`, `mcp__pixabay`, `mcp__freepik`.
Rule: "could this image deceive the visitor?" If yes, do NOT use.

---

## Step 7 — Generate tokens.css + index.css

### tokens.css

Generate with hex colors and fonts from Phase 3 design system.

### index.css

```css
@import "tailwindcss";
@import "./design-system/tokens.css";
/* Tailwind v4 already includes Preflight. Do NOT use * { margin:0; padding:0 } */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; }
body { font-family: var(--font-body); color: var(--color-text-primary); background: var(--color-background); -webkit-font-smoothing: antialiased; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
```

---

## Verification

List to the user: each image downloaded, what it contains, where it will be used, and which were discarded (with reason).

---

## Exit Gate (blocking)

```bash
.claude/scripts/gate-images.sh $LEAD_ID
```

If the gate fails: go back to Step 6 and execute it. Do NOT skip.
CDN images (Instagram/scontent) can expire — if curl fails, use Playwright to re-capture.

---

## Constraints

| Constraint | Enforced by |
|---|---|
| Animation libs only from blueprint | Phase 3 blueprint review |
| No `* { padding: 0 }` with Tailwind v4 | gate-quality-loop.sh (Phase 7) |
| Images > 5KB each | gate-images.sh |
| At least 1 real client image | gate-images.sh |
| Video thumbnails discarded | Image analysis guide (manual) |
| Image-section coherence | Image analysis guide (manual) |
| Lenis params from concept (not default) | package-libs.md rules |

---

## Exit Criteria

- [ ] `sites/$LEAD_ID/node_modules/.package-lock.json` exists
- [ ] Images downloaded in `sites/$LEAD_ID/public/images/` (gate passed)
- [ ] `tokens.css`, `index.css`, `vite.config.js`, `index.html` generated
- [ ] Each image visually analyzed and mapped to a specific section
- [ ] gate-images.sh exited 0
