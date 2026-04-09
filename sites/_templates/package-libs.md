# Package & Libraries Reference

Reference for phase 4 (scaffold). Loaded on demand.

---

## Required Dependencies (every site)

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-helmet-async": "^2.0.0",
  "react-i18next": "^15.0.0",
  "i18next": "^24.0.0",
  "i18next-browser-languagedetector": "^8.0.0",
  "lucide-react": "^0.469.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-tabs": "^1.1.0"
}
```

## Required DevDependencies (always the same)

```json
{
  "@vitejs/plugin-react": "^4.3.4",
  "@tailwindcss/vite": "^4.1.0",
  "tailwindcss": "^4.1.0",
  "vite": "^6.0.0"
}
```

## Conditional: Multi-page sites

If Phase 2 decided multi-page (2.6): add `react-router-dom`.

## Conditional: Fonts

Add `@fontsource/[font-name]` packages from Phase 3 design system.

---

## Animation Libraries — DERIVE FROM BLUEPRINT

Read the blueprint at `sites/$LEAD_ID/mapa-encantamento.md`.
For each animation/technique specified, include ONLY the required lib:

| Blueprint mentions | Library to add |
|---|---|
| "clip-path" or "CSS animation" | None (pure CSS) |
| "spring physics" or "whileInView" | `motion` |
| "ScrollTrigger" or "scrub" or "pin" | `gsap` |
| "smooth scroll" (cinematic) | `lenis` |
| "3D" or "WebGL" | `@react-three/fiber` + `drei` + `three` |
| "particles" | `@tsparticles/react` + `@tsparticles/slim` |

**Do NOT include libs "just in case".** If the blueprint doesn't mention it, do NOT include it.

---

## Known Pitfalls

| Library | Pitfall | Correct approach |
|---------|---------|-----------------|
| Tailwind v4 | Already includes Preflight | Do NOT add `* { padding: 0 }` — destroys all paddings |
| GSAP | Memory leaks without cleanup | Always use `gsap.context()` with `ctx.revert()` in useEffect cleanup |
| Motion | Re-animates on every scroll | Use `viewport={{ once: true }}` for entry animations |
| Lenis | Needs RAF loop + cleanup | Initialize with `requestAnimationFrame` loop, destroy on cleanup |
| react-i18next | Import order matters | Import `./i18n` BEFORE App in main.jsx |

---

## Lenis Parameters — DERIVE FROM CONCEPT

Do NOT use `lerp:0.1 duration:1.2` (banned default — identical across all previous sites).

| Concept type | lerp | duration | Notes |
|---|---|---|---|
| Energetic | 0.15 | 0.8 | Fast, responsive |
| Cinematic | 0.06 | 1.6 | Slow, dramatic |
| Minimalist | 0.08 | 1.0 | Clean, neutral |
| Custom | derive from concept | derive from concept | Preferred approach |

Parameters MUST come from the blueprint or the creative concept.
