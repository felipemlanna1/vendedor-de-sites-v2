---
name: site-phase-3
description: "Creative concept, design system, and per-section technical blueprint for a premium React website build"
user-invocable: false
allowed-tools: WebSearch, WebFetch, Read, Bash, mcp__playwright__*, mcp__stock-images__*, mcp__mcp-pexels__*, mcp__pixabay__*, mcp__freepik__*
model: opus
effort: high
context: fork
---

# Phase 3 — Creative Concept + Technical Blueprint

## Objective

Define the complete creative direction and per-section technical blueprint for the site. This phase produces `mapa-encantamento.md` — the single artifact that governs ALL decisions in subsequent phases. Phase 6 MUST implement exactly what this blueprint specifies.

## Required Reading

Load these references before starting:

```
Read: sites/_templates/creative-guidelines.md
Read: .claude/skills/taste-skill/SKILL.md
Read: .claude/skills/frontend-design/SKILL.md
```

**Available component MCPs for the build:**
- `magic-ui` — animated React components (blur-fade, aurora-text, marquee, grid backgrounds)
- `aceternity-ui` — 100+ premium components (parallax, 3D cards, spotlights, text effects)
- `shadcn-ui` — solid base of accessible components

## Pre-Gate — Anti-Repetition Scan

**BEFORE any creative decision**, run the anti-similarity scan to discover banned fonts, hero layouts, UI components, and navbar patterns from the last 3 sites:

```bash
bash .claude/scripts/gate-anti-similarity.sh $LEAD_ID --report-only
```

Save the output. ANY decision that repeats a banned item will be rejected by the exit gate.

## Step 1 — Discover Unique References via WebSearch

**The PRIMARY source of references is the WEB, not a static catalog.**

Run creative WebSearches based on THIS client's unique concept:

1. **Emotional concept search:**
   WebSearch: "[client concept/theme] website design inspiration"

2. **Desired experience search:**
   WebSearch: "[experience type] web animation award"

3. **Visual differentiator search:**
   WebSearch: "[unique visual element] interactive website"

From results, select sites that solve something relevant for THIS client.

**SUPPLEMENTARY:** Load the curated catalog for additional references:
```
Read: sites/_templates/design-references.md
```

For each reference site, answer ONE question: **"What does this site do that creates an emotion in the visitor?"**

## Step 2 — Navigate and Study References (MANDATORY)

**Cascade strategy (try in order, only fall through if previous fails):**

**Level A — Real navigation (preferred):**
1. `browser_navigate` to the URL
2. `browser_take_screenshot` — SEE the page
3. Answer: what emotion? How? What surprised you?

**Level B — WebFetch (if browser fails)**
**Level C — Pure search (last resort)**

**ANTI-RATIONALIZATION:** "I already have enough data" without having SEEN the sites = Phase 3 FAILED.

## Step 3 — Build the Blueprint

Create the blueprint artifact following the standardized template:

```
Read: sites/_templates/blueprint-template.md
```

The blueprint MUST contain all five parts:
- **Part A** — Emotional Map (concept, narrative, references learned, aesthetic direction)
- **Part B** — Technical Blueprint per Section (LAYOUT + ENTRY ANIMATION + VISUAL TECHNIQUE for each)
- **Part C** — Animation Budget (1 showstopper, 2-3 supporting, baseline)
- **Part D** — Design System (semantic color tokens, @fontsource typography, 8px grid spacing)
- **Part E** — Signature Element (unique visual element only THIS client can have)

### Design System Rules

**Colors** — semantic named tokens derived from the concept:
- NO generic names (primary, secondary, accent)
- USE names reflecting the concept (e.g., for "forest": `--canopy`, `--moss`, `--sunbeam`)
- 6-12 tokens. MUST include: 1 background, 1 text-primary, 1 CTA accent
- Contrast WCAG AA: 4.5:1 normal text, 3:1 large text
- If briefing has colors, use as base. Avoid repetition with competitors.

**Typography** — @fontsource packages (exact npm names):
- 1-3 fonts (display + body, optionally accent/mono)
- Based on THIS individual client's tone
- NEVER use fonts from section 3.0 banned list
- NEVER use Inter, Roboto, Arial (generic — taste-skill Section 7)

**Spacing:** 8px grid, responsive, max-width appropriate to concept.

## Step 4 — Source Stock Images

If the concept needs images the briefing does NOT have, use MCPs:
- `mcp__stock-images`, `mcp__mcp-pexels`, `mcp__pixabay`, `mcp__freepik`

Search by the CREATIVE CONCEPT, not by niche.

**NEVER for:** professional's photo, storefront, products, team, logo (deceives visitors).
**If no real photo AND stock is inappropriate:** Bold typographic design instead.

## Step 5 — Evaluate Floating CTA Need

Analyze contact channels and expected visitor behavior. Document the decision with justification.

## Step 6 — Define Site Sections

- Each section: name, emotional purpose, content, layout (from blueprint)
- NOT a fixed list. Order follows the emotional journey.
- Rich material: social proof, value demonstration, progressive CTAs.

## Verification

Present to the user: concept, colors, fonts, blueprint, section list.

Save everything to: `sites/$LEAD_ID/mapa-encantamento.md`

## Exit Gate (blocking)

```bash
bash .claude/scripts/gate-blueprint.sh $LEAD_ID
```

## Constraints

| Constraint | Enforced by |
|---|---|
| No font reuse from last 3 sites | `gate-anti-similarity.sh` + `gate-blueprint.sh` |
| No generic fonts (Inter, Roboto, Arial) | `gate-blueprint.sh` |
| Every section has LAYOUT + ENTRY ANIMATION + VISUAL TECHNIQUE | `gate-blueprint.sh` (min 5 layouts) |
| No 2 consecutive sections share layout type | Phase 6 verification |
| Animation budget defined (SHOWSTOPPER present) | `gate-blueprint.sh` |
| Semantic color token names (not primary/secondary) | Manual review |
| References actually navigated, not just searched | Anti-rationalization rule |
| Signature element documented | Blueprint completeness check |
| `mapa-encantamento.md` exists with all 5 parts | `gate-blueprint.sh` |

## Exit Criteria

- [ ] Reference sites STUDIED (navigated, not just read)
- [ ] `mapa-encantamento.md` saved with Part A (emotional) + Part B (technical blueprint) + Part C (animation budget) + Part D (design system) + Part E (signature element)
- [ ] Blueprint has LAYOUT + ANIMATION for each section
- [ ] Chosen fonts do NOT repeat from last 3 sites
- [ ] Color tokens have semantic names (not generic)
- [ ] Aesthetic direction chosen and committed
- [ ] `gate-blueprint.sh` passes with exit code 0
