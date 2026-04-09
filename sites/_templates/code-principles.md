<!-- Source: .claude/skills/site-phase-6/SKILL.md -->

# Code Principles — React + Tailwind v4 + Animation

## SOLID Principles in React

- **S (Single Responsibility):** Each component does ONE thing
- **O (Open/Closed):** Use props for customization without editing source
- **L (Liskov Substitution):** Wrappers behave like the element they replace
- **I (Interface Segregation):** Don't pass unnecessary props
- **D (Dependency Inversion):** Components depend on abstractions (`content.js`, `i18n`)

## File Organization

```
src/
  data/
    content.js          — All data. Components NEVER read briefing directly
  hooks/
    useScrollAnimation.js — Reusable logic (custom hooks)
  components/
    ui/                 — Atomic components, no business logic
    sections/           — Composition: ui + data + i18n
    layout/             — Navbar, Footer, Section wrappers
    seo/                — Schema.org, meta tags (JsonLd, SEO)
  i18n/
    pt.json / en.json   — Translation files
  design-system/
    tokens.css          — CSS custom properties (@theme colors, fonts)
```

### Key rules:
- `src/data/content.js` is the single source of truth for all text/data
- Components get content via `t()` (react-i18next), NEVER hardcoded strings
- UI components are pure — no data fetching, no side effects
- Section components compose UI + data + translations

## Tailwind CSS v4 Rules

### Critical differences from v3:
- **NO `tailwind.config.js`** — v4 does not use config files
- **Preflight is ALREADY INCLUDED** — NEVER add `* { margin: 0; padding: 0 }` (this destroys all paddings)
- Colors defined via `@theme` block or CSS custom properties in `tokens.css`
- Mobile-first: no prefix = mobile, `md:` = 768px+, `lg:` = 1024px+

### Container pattern:
```html
<div class="mx-auto max-w-7xl px-5 md:px-8 lg:px-16">
```

### Color tokens with semantic names:
```css
@theme {
  --color-canopy: #1a2f1a;
  --color-moss: #2d4a2d;
  --color-sunbeam: #f4d03f;
}
```
Use names derived from the client concept, NEVER generic names like `primary`, `secondary`, `accent`.

### CSS setup (index.css):
```css
@import "tailwindcss";
@import "./design-system/tokens.css";
/* Tailwind v4 already includes Preflight. DO NOT use * { margin:0; padding:0 } */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; }
body {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Animation Rules

### GPU-only transforms:
- Only animate `transform` and `opacity` for 60fps
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`

### GSAP cleanup:
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations here
  }, containerRef);
  return () => ctx.revert(); // ALWAYS cleanup
}, []);
```

### Motion (framer-motion) gotcha:
- `whileInView` needs `viewport={{ once: true }}` — otherwise re-animates on every scroll

### Lenis smooth scroll:
- Initialize with `requestAnimationFrame` loop, destroy on cleanup
- Parameters MUST come from blueprint/concept — NOT hardcoded defaults
- **Banned default:** `lerp:0.1 duration:1.2` (identical across all previous sites)
- Energetic concept: `lerp:0.15 duration:0.8`
- Cinematic concept: `lerp:0.06 duration:1.6`
- Minimalist concept: `lerp:0.08 duration:1.0`

### Accessibility:
- Respect `prefers-reduced-motion` — disable all animations
- Touch targets >= 44x44px
- Body text >= 16px on mobile

### Animation diversity (anti-similarity gate):
- NEVER use the same `ScrollReveal` pattern (opacity:0 y:20 -> 1 y:0) in more than 1 section
- NEVER use the same easing across all animations
- No 3+ consecutive sections with the same background-color
- Minimum 3 different layout types across sections
- Minimum 3 different animation types across sections
- **Banned timings:** `y:60 duration:0.8 power3.out` and `delay:i*0.08 ease:[0.25,0.46,0.45,0.94]`
