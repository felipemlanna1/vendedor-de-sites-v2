<!-- Source: .claude/skills/site-phase-6/SKILL.md -->

# Code Principles

## SOLID Principles in React

- **S (Single Responsibility):** Each component does ONE thing
- **O (Open/Closed):** Use props for customization without editing source
- **L (Liskov Substitution):** Wrappers must behave like the element they replace
- **I (Interface Segregation):** Never pass unnecessary props
- **D (Dependency Inversion):** Components depend on abstractions (content.js, i18n)

## File Organization

```
src/
  data/
    content.js          — All data. Components NEVER read briefing directly.
  hooks/
    useXxx.js           — Reusable logic (scroll, intersection, animation)
  components/
    ui/                 — Atomic components, no business logic
    sections/           — Composition: ui + data + i18n
    layout/             — Navbar, Footer, Section wrapper
    seo/                — Schema.org, meta tags (JsonLd, SEO)
```

**Rule:** `content.js` is the single source of truth for all text and data. Section components import from `content.js` and render via `t()` for i18n.

## Tailwind CSS v4 Rules

1. **No `tailwind.config.js`** — Tailwind v4 does not use config files
2. **Preflight is INCLUDED** — NEVER add `* { margin: 0; padding: 0 }` (destroys all paddings)
3. **Colors via `@theme` or CSS custom properties** — Define semantic tokens in `tokens.css`
4. **Mobile-first breakpoints:**
   - No prefix = mobile (< 768px)
   - `md:` = 768px+
   - `lg:` = 1024px+
5. **Container pattern:** `mx-auto max-w-7xl px-5 md:px-8 lg:px-16`
6. **`index.css` structure:**
   ```css
   @import "tailwindcss";
   @import "./design-system/tokens.css";
   /* Tailwind v4 already includes Preflight. Do NOT use * { margin:0; padding:0 } */
   *, *::before, *::after { box-sizing: border-box; }
   html { scroll-behavior: auto; }
   body { font-family: var(--font-body); color: var(--color-text-primary); background: var(--color-background); -webkit-font-smoothing: antialiased; }
   @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
   ```

## Animation Rules

### GPU-Only Properties
Only animate `transform` and `opacity` for smooth 60fps. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.

### GSAP Cleanup
Always use `gsap.context()` with cleanup in `useEffect`:
```jsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // animations here
  }, containerRef);
  return () => ctx.revert();
}, []);
```

### Reduced Motion
Always respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Accessibility Minimums
- Touch targets: >= 44x44px
- Body text: >= 16px on mobile
- Color contrast: WCAG AA (4.5:1 normal text, 3:1 large text)

### Motion Library
- `whileInView` needs `viewport={{ once: true }}` to prevent re-animation on every scroll
- Use `motion` (v12+), not `framer-motion`

### Lenis Smooth Scroll
- Initialize with `requestAnimationFrame` loop, destroy in cleanup
- Parameters MUST come from blueprint or concept (never use default `lerp:0.1 duration:1.2`)
- Energetic concept: `lerp:0.15 duration:0.8`
- Cinematic concept: `lerp:0.06 duration:1.6`
- Minimalist concept: `lerp:0.08 duration:1.0`

### Banned Patterns
- ScrollReveal with template-identical params: `y:60 duration:0.8 power3.out`
- AnimatedText with template-identical timings: `delay:i*0.08 ease:[0.25,0.46,0.45,0.94]`
- Generic fade-up (`opacity:0 y:20 -> 1 y:0`) in more than 1 section
- Same easing across all animations
- 3+ consecutive sections with same background-color
