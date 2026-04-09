<!-- Source: .claude/skills/site-phase-3/SKILL.md -->

# Blueprint Template (Mapa de Encantamento)

The blueprint is the most important artifact in the site-building pipeline. It guides ALL decisions in subsequent phases. Phase 6 MUST implement exactly what is specified here — the blueprint is a CONTRACT.

---

## Part A: Emotional Map

```markdown
# Mapa de Encantamento — [CLIENT NAME]

## Conceito emocional
[1 sentence: what emotion should the visitor feel?]

## Conceito narrativo
[1 sentence defining the spirit of the site]

## O que aprendi das referencias
[For each reference site: name + what it taught for THIS project]

## Direcao estetica
[Choose ONE extreme direction and COMMIT:
brutally minimal, maximalist, retro-futuristic, organic/natural,
luxurious/refined, playful/toy-like, editorial/magazine, brutalist/raw,
art deco/geometric, soft/pastel, industrial/utilitarian, etc.]
```

## Part B: Technical Blueprint per Section (MANDATORY)

For EACH section, specify CONCRETE decisions:

```markdown
## Blueprint Tecnico

### Layout Map
[Visual diagram of layout sequence — no 2 consecutive layouts can be the same type]

### [Section Name — e.g., Hero]
- LAYOUT: [specific — e.g., "fullwidth video bg, text bottom-left aligned, CTA in corner"]
- ANIMACAO DE ENTRADA: [exact technique — e.g., "clip-path reveal circular expanding from center in 1.2s"]
- ANIMACAO DE SCROLL: [if any — e.g., "inverted parallax on image, speed -0.3"]
- TECNICA VISUAL: [differentiator — e.g., "grain overlay 2% + animated gradient mesh in bg"]
- REFERENCIA: [which site inspired and WHY]

### [Section Name — e.g., About]
- LAYOUT: [e.g., "asymmetric 60/40 with image overlapping text by -40px"]
- ANIMACAO DE ENTRADA: [e.g., "horizontal stagger of paragraphs with 150ms delay"]
- ANIMACAO DE SCROLL: [e.g., "sticky section with lateral progress bar"]
- TECNICA VISUAL: [e.g., "photo with organic mask shape rounded-[40%_60%_55%_45%/...]"]
- REFERENCIA: [which site inspired]

### [... repeat for each section]
```

**Blueprint rules:**
- Each section MUST have LAYOUT + ENTRY ANIMATION + VISUAL TECHNIQUE
- No 2 consecutive sections can share the same layout type
- No animation can be "generic fade up" (opacity:0 y:20 -> opacity:1 y:0) in more than 1 section
- The blueprint is a CONTRACT — Phase 6 MUST implement exactly what is specified

## Part C: Animation Budget

```markdown
## Animation Budget
- SHOWSTOPPER (1 WOW moment): [describe — e.g., "hero load with circular clip-path + orchestrated GSAP timeline"]
- SUPPORTING (2-3 notable animations): [list — e.g., "inverted parallax on About section", "countup with spring physics on Numbers"]
- BASELINE (everything else): Simple CSS transitions — hover states, color transitions, opacity fades
```

This prevents the pattern where EVERYTHING uses ScrollReveal with the same parameters.

## Part D: Design System

### Colors — Semantic Named Tokens
- DO NOT use generic names (primary, secondary, accent)
- USE names that reflect the concept (e.g., for "forest": `--canopy`, `--moss`, `--sunbeam`)
- Minimum 6, maximum 12 tokens
- MANDATORY: 1 background, 1 text-primary, 1 accent for CTAs
- Contrast WCAG AA: 4.5:1 normal text, 3:1 large text
- If briefing has colors, use as base
- Avoid repetition with competitors

### Typography — @fontsource packages
- Minimum 1, maximum 3 fonts (display + body, optionally accent/mono)
- Based on THIS individual client's tone
- NEVER use fonts from the last 3 sites (banned list from section 3.0)
- NEVER use Inter, Roboto, Arial (generic)

### Spacing
- Grid: 8px base
- Responsive
- Max-width appropriate to concept

## Part E: Signature Element

Each site MUST have at least 1 visual element that ONLY THIS client can have. Total freedom — no pre-approved categories. Can be anything that makes the site impossible to confuse with another.

**How to decide:** Look at the client's NAME and STORY. What is unique about them?

Document: what the element is, how it will be implemented (SVG? CSS? Canvas? Lottie?), which sections it appears in.

---

## Example: Barbearia Cortez (Fictional Premium Barbershop)

```markdown
# Mapa de Encantamento — Barbearia Cortez

## Conceito emocional
The visitor should feel they're entering a sanctuary of masculine craftsmanship — raw, deliberate, unapologetic.

## Conceito narrativo
"Where concrete meets tradition" — a brutalist temple to the barber's craft.

## O que aprendi das referencias
- Aesop.com: Product as art. Minimal text, maximum atmosphere. Taught me to let the environment speak.
- Hardwick & Sons (AWWWARDS): Raw typography over texture. Taught me that brutalism can feel warm with the right material palette.
- The Bluebeards Revenge: Dark editorial with confident spacing. Taught me rhythm through density contrast.

## Direcao estetica
Brutalist-minimalist — exposed grid, raw textures, confident typography, no decoration.

## Blueprint Tecnico

### Layout Map
Hero (fullscreen) → Craft (asymmetric 70/30) → Services (bento 2fr 1fr 1fr) → Gallery (horizontal scroll) → Testimonials (centered editorial) → Location (split 50/50) → CTA (fullscreen)

### Hero
- LAYOUT: Fullscreen dark bg, oversized display font left-aligned, portrait photo right with clip-path diagonal cut, CTA bottom-right corner
- ANIMACAO DE ENTRADA: Text characters reveal via stagger (each char clips from bottom, 40ms delay, cubic-bezier(0.76, 0, 0.24, 1))
- ANIMACAO DE SCROLL: Portrait photo parallax speed -0.2, subtle grain overlay intensifies on scroll
- TECNICA VISUAL: Concrete texture background (real photo), text knockout effect on hover over name
- REFERENCIA: Hardwick & Sons — confident typography as hero element

### Craft (About)
- LAYOUT: Asymmetric 70/30 — large paragraph block left, vertical photo strip right overlapping into next section by -80px
- ANIMACAO DE ENTRADA: Horizontal wipe from left using clip-path inset(0 100% 0 0) -> inset(0 0 0 0) over 0.9s
- ANIMACAO DE SCROLL: None — clean read
- TECNICA VISUAL: Pull quote in monospace with left border 4px accent color, photo with grayscale(0.3) filter
- REFERENCIA: Aesop.com — letting text breathe with generous whitespace

### Services
- LAYOUT: Bento grid — grid-template-columns: 2fr 1fr 1fr, grid-template-rows: 1fr 1fr. Featured service spans 2 rows.
- ANIMACAO DE ENTRADA: Cards scale from 0.85 to 1 with stagger 120ms, opacity 0->1
- ANIMACAO DE SCROLL: On hover, card lifts (translateY -8px) with box-shadow expansion
- TECNICA VISUAL: Each card has thin 1px border that glows on hover (box-shadow with accent color at 20% opacity)
- REFERENCIA: Apple product grid — density creates perceived value

### Gallery
- LAYOUT: Horizontal scroll container with scroll-snap-type: x mandatory, images at 80vw each
- ANIMACAO DE ENTRADA: First image visible, remaining peek 10% from right edge
- ANIMACAO DE SCROLL: Horizontal scroll driven by vertical scroll (ScrollTrigger pin + scrub)
- TECNICA VISUAL: Images alternate between full-color and duotone (CSS filter), transition on scroll position
- REFERENCIA: The Bluebeards Revenge — editorial photo treatment

### Testimonials
- LAYOUT: Centered editorial — max-w-2xl, large quote text, attribution below, no cards
- ANIMACAO DE ENTRADA: Blur-to-sharp text reveal (filter: blur(8px) -> blur(0)) over 0.6s
- ANIMACAO DE SCROLL: Quotes swap with crossfade on scroll progress (3 quotes, each 33% of scroll range)
- TECNICA VISUAL: Giant quotation mark SVG in background at 5% opacity, rotated 12deg
- REFERENCIA: Aesop.com — minimal testimonial treatment

### Location
- LAYOUT: Split 50/50 — map/photo left, address + hours right with monospace font
- ANIMACAO DE ENTRADA: Slide from sides (left panel from -100px, right from +100px) with spring easing
- ANIMACAO DE SCROLL: None
- TECNICA VISUAL: Photo with vignette overlay (radial-gradient transparent to dark at edges)
- REFERENCIA: Practical — clear information delivery

### Final CTA
- LAYOUT: Fullscreen centered, oversized text "RESERVE SEU HORARIO", single button
- ANIMACAO DE ENTRADA: Scale from 1.3 to 1.0 with opacity, dramatic entrance
- ANIMACAO DE SCROLL: Background color shifts from dark to accent on scroll-into-view
- TECNICA VISUAL: Subtle pulse animation on CTA button (scale 1.0 -> 1.03 loop, 2s)
- REFERENCIA: Hardwick & Sons — confident closing

## Animation Budget
- SHOWSTOPPER: Hero character stagger with clip-path reveal + portrait diagonal cut
- SUPPORTING: Horizontal gallery with scroll-driven duotone transitions, Testimonials blur-to-sharp reveal
- BASELINE: Card hover lifts, section fade-ins, button pulse

## Design System

### Colors (semantic tokens)
- `--concrete`: #1a1a1a (background — raw, dark foundation)
- `--chalk`: #f5f0eb (text primary — warm white, not clinical)
- `--steel`: #8a8680 (text secondary — weathered metal)
- `--blade`: #c9a84c (accent/CTA — brass, the barber's tool)
- `--leather`: #3d2b1f (card backgrounds — rich, warm dark)
- `--smoke`: #2a2725 (alternate sections — subtle differentiation)
- `--ember`: #e85d3a (error/highlight — controlled fire)
- `--fog`: rgba(245,240,235,0.08) (borders, subtle dividers)

### Typography
- Display: `@fontsource/bebas-neue` — tall, compressed, brutalist
- Body: `@fontsource/source-serif-4` — readable serif, warm contrast to display
- Accent: `@fontsource/jetbrains-mono` — monospace for prices, hours, details

### Spacing
- Grid: 8px base
- Section padding: 96px (mobile) / 128px (desktop)
- Max-width: 1280px (content), 1440px (full-bleed sections)

## Elemento Assinatura
A custom SVG straight razor that serves as a section divider between major sections. The razor is drawn with a single continuous path, and on scroll it "opens" via CSS transform (rotate from 0deg to 35deg on the blade). Implemented as an SVG component in `src/components/ui/RazorDivider.jsx`. Appears between Hero->Craft, Services->Gallery, and Testimonials->Location.
```
