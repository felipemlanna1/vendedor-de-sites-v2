---
name: site-phase-6
description: "Phase 6 of build-site — Implement blueprint: navbar, sections, footer, App, main"
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
model: opus
effort: high
context: fork
user-invocable: false
---

# Phase 6 — Implement the Blueprint

## Auto-loaded Context

```
!cat sites/$LEAD_ID/mapa-encantamento.md
```

## Objective

Transform the blueprint (mapa-encantamento.md) into a fully functional React site. Every section, animation, layout, and visual technique specified in the blueprint MUST be implemented exactly as written. The blueprint is a CONTRACT, not a suggestion.

## Pre-Gate — Verify Images

```bash
.claude/scripts/gate-images.sh $LEAD_ID
```

## Step 1 — Load Blueprint

Read and memorize from `sites/$LEAD_ID/mapa-encantamento.md`:
1. **Layout Map** — which layout PER SECTION
2. **Animations** PER SECTION (entry animation + scroll animation)
3. **Visual techniques** PER SECTION (grain, blend mode, mask, etc.)
4. **Signature element** — what it is and where it appears
5. **Navbar** — which pattern was chosen
6. **Aesthetic direction** committed in the concept
7. **Semantic color tokens** and their names
8. **Animation Budget** — showstopper, supporting, baseline assignments

**ABSOLUTE RULE: Implement EXACTLY what the blueprint specifies.**
If the blueprint says "bento grid 2fr 1fr 1fr" the code MUST have `grid-template-columns: 2fr 1fr 1fr`.
If the blueprint says "clip-path reveal circular" the code MUST have a `clip-path` animation.
Do NOT substitute with "easier" alternatives.

## Step 2 — Real Images Rule

If the briefing has images, the site MUST use them:
- Hero or About MUST feature the client's professional photo
- `<img>` with `src="/images/name.jpg"`, descriptive `alt`, `loading="lazy"` (hero: `fetchpriority="high"`)
- FORBIDDEN to replace real photos with giant letters, empty gradients, or generic icons
- Stock images ONLY for: textures, patterns, abstract backgrounds. NEVER for people/facades/products.

## Step 3 — Code Principles

```
Read: sites/_templates/code-principles.md
```

Follow all SOLID, Tailwind v4, and animation rules defined in the reference file.

## Step 4 — Build Order

Execute in this exact order: signature element -> navbar -> sections -> footer -> App -> main.

### 4.1 Signature Element (BEFORE sections)

Create as specified in the blueprint. Separate component in `src/components/ui/`.
- If blueprint says animated SVG -> SVG inline with CSS `@keyframes` or Motion
- If blueprint says interactive background -> Canvas or CSS
- If blueprint says custom cursor -> CSS cursor with SVG data URI

**The element MUST be imported in 1+ sections or App.jsx.**

### 4.2 Navbar (MUST differ from last site)

Check what NOT to repeat:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
LAST=$(ls -td sites/*/src/components/layout/Navbar.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -1)
[ -f "$LAST" ] && echo "=== LAST NAVBAR ===" && head -20 "$LAST" && echo "=== DO NOT REPEAT THIS PATTERN ==="
```

For available patterns and functional requirements:
```
Read: sites/_templates/navbar-patterns.md
```

### 4.3 Sections — Implement the Blueprint

For EACH section in the blueprint:
1. **Read LAYOUT** from blueprint -> implement THIS layout (not another)
2. **Use the animation component** created in Phase 5 for ENTRY ANIMATION
3. **Implement SCROLL ANIMATION** if specified
4. **Apply VISUAL TECHNIQUE** described (grain, blend mode, mask shape, etc.)
5. **Follow ANIMATION BUDGET**: showstopper on the designated section, supporting where indicated, baseline elsewhere

For EACH section:
- ALL text via `t('section.key')` — ZERO hardcoded strings
- Images from `/images/` with descriptive alt
- IMAGE-SECTION COHERENCE: image content must match section topic
- MOBILE-FIRST: write for 375px FIRST, then `md:` and `lg:`

**MCP component references (consult BEFORE building from scratch):**
- `mcp__magic-ui` — blur-fade, aurora-text, number-ticker, shimmer-button
- `mcp__aceternity-ui` — parallax-scroll, spotlight, hero-highlight, 3D-card
- `mcp__shadcn-ui` — button, card, tabs, accordion, dialog
- `mcp__gsap` — ScrollTrigger patterns in React

### 4.4 Floating CTA

If the blueprint defined a floating CTA, implement as specified. If not defined, do NOT create one by default.

### 4.5 Footer

Create `src/components/layout/Footer.jsx`:
- Style derived from the design system (no fixed recipe)
- Real data from the briefing
- All text via `t()`

### 4.6 App.jsx + main.jsx

**App.jsx:** Assemble all sections per blueprint order, with Lenis (parameters from blueprint), HelmetProvider, SEO components.

**main.jsx:** Import i18n BEFORE App, `@fontsource` fonts, `index.css`.

Generate `sitemap.xml` and `robots.txt` in `public/`.

## Verification — Build Check

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm run build 2>&1
```

If ANY error, fix until build passes.

## Exit Gate — Signature Element (blocking)

```bash
.claude/scripts/gate-signature-element.sh $LEAD_ID
```

## Exit Gate — Anti-Similarity (blocking)

```bash
.claude/scripts/gate-anti-similarity.sh $LEAD_ID
```

## Constraints

| Constraint | Enforced by |
|---|---|
| Blueprint implemented exactly as written | Manual review + anti-similarity gate |
| Real images used (no stock for people/products) | `gate-images.sh` |
| Signature element exists and is non-trivial | `gate-signature-element.sh` |
| 3+ layout types across sections | `gate-anti-similarity.sh` |
| 3+ animation types across sections | `gate-anti-similarity.sh` |
| No banned template timings | `gate-anti-similarity.sh` |
| Hero layout differs from last site | `gate-anti-similarity.sh` |
| Fonts differ from last 3 sites | `gate-anti-similarity.sh` |
| Navbar pattern differs from last site | Anti-repetition check in step 4.2 |
| All text via `t()`, zero hardcoded strings | Phase 7 validation |
| `npm run build` passes with zero errors | Build check |

## Exit Criteria

- [ ] `npm run build` passes without errors
- [ ] Blueprint implemented faithfully (each section as specified)
- [ ] Navbar uses a DIFFERENT style from the last site
- [ ] Signature element is REAL and non-trivial (gate passed)
- [ ] Anti-similarity gate PASS (diverse layouts, diverse animations, no banned timings, unique hero, original fonts)
- [ ] All text via `t()` — zero hardcoded strings
- [ ] Real client images used prominently (hero/about)
- [ ] Mobile-first responsive design (375px base)
