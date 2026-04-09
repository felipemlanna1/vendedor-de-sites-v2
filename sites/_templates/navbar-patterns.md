<!-- Source: .claude/skills/site-phase-6/SKILL.md (section 6.2) -->

# Navbar Patterns

Choose ONE pattern that is DIFFERENT from the last site built. Run the anti-repetition check before deciding.

---

## 1. Fixed Transparent -> Solid on Scroll
**Description:** Navbar starts with transparent background over hero, transitions to solid background color with shadow when user scrolls past a threshold (typically 100px).

**When to use:** Classic approach for hero-dominant designs with full-bleed images or videos. Works well when the hero needs maximum visual impact without navbar interference.

**Implementation notes:**
- Use `scroll` event or `IntersectionObserver` on hero section
- Transition: `background-color 300ms, box-shadow 300ms`
- Text color may also need to change (white on hero -> dark on solid)

---

## 2. Fixed with Backdrop-Blur (Glassmorphism)
**Description:** Navbar is always fixed with a semi-transparent background and `backdrop-filter: blur()`. Subtle `border-bottom` with translucent color creates a frosted glass effect.

**When to use:** Modern, refined designs. Works on any background since the blur adapts. Great for sites with varied section backgrounds where a solid navbar color would clash.

**Implementation notes:**
- `backdrop-filter: blur(12px)` + `background: rgba(bg, 0.7)`
- `border-bottom: 1px solid rgba(255,255,255,0.1)` (or adapted to theme)
- Ensure contrast remains WCAG AA against blurred content

---

## 3. Hide-on-Scroll (Show on Scroll Up)
**Description:** Navbar hides when user scrolls down (content-focused browsing) and reappears when user scrolls up (navigation intent). Smooth `translateY` transition.

**When to use:** Content-heavy pages, long-scroll experiences, or editorial layouts where the navbar would distract from immersive reading. Maximizes viewport for content.

**Implementation notes:**
- Track scroll direction via `lastScrollY` comparison
- `transform: translateY(-100%)` to hide, `translateY(0)` to show
- Use `IntersectionObserver` or scroll event with throttle
- Always show at page top (scroll position 0)

---

## 4. Sidebar Fixed (Desktop) + Bottom Bar (Mobile)
**Description:** On desktop, navigation lives in a fixed sidebar (left or right) with vertical links. On mobile, it transforms into a bottom navigation bar with icon-based items.

**When to use:** Portfolio-style sites, creative agencies, or any design that wants to break away from the horizontal navbar convention. Works well for sites with few navigation items (4-6).

**Implementation notes:**
- Desktop: `position: fixed; left: 0; top: 0; height: 100vh; width: 80px`
- Mobile: `position: fixed; bottom: 0; width: 100%; height: 64px`
- Main content needs `margin-left` (desktop) or `margin-bottom` (mobile)
- Icons + labels vertical on desktop, horizontal on mobile

---

## 5. Minimal (Logo + Hamburger Only)
**Description:** Only the logo and a hamburger icon are visible. No navigation links shown by default. Clicking the hamburger opens a full-screen overlay menu with large, centered links.

**When to use:** Ultra-minimal or luxury designs where the navbar should be nearly invisible. The full-screen menu becomes a design moment itself. Best when the site has a strong visual identity that doesn't need constant navigation reinforcement.

**Implementation notes:**
- Default state: just logo + hamburger, no links visible
- Overlay: `position: fixed; inset: 0; z-index: 50`
- Links displayed large (text-3xl+) with stagger animation on open
- Close button or click-outside to dismiss
- Consider animating overlay entrance (clip-path, scale, or opacity)

---

## 6. Dynamic Pill
**Description:** A floating pill-shaped container that changes size, content, or position based on the active section. May show the current section name, shrink to just a dot, or expand to show all links.

**When to use:** Playful, interactive, or tech-forward designs. Creates a sense of dynamism and spatial awareness. Works well for single-page scrolling sites with distinct sections.

**Implementation notes:**
- `position: fixed; top: 20px; left: 50%; transform: translateX(-50%)`
- `border-radius: 9999px` for pill shape
- Use `IntersectionObserver` on each section to detect active section
- Animate `width`, `padding`, and content swap with transitions
- Can include a progress indicator or section counter

---

## Functional Requirements (All Patterns)

Regardless of the chosen style, every navbar MUST include:
1. **Links to each section** — smooth scroll or router navigation
2. **LanguageToggle** — i18n switcher component
3. **Primary CTA** — booking, contact, or WhatsApp button
4. **Functional mobile menu** — accessible, touch-friendly, closeable
5. **All text via `t()`** — zero hardcoded strings

## Anti-Repetition Rule

Before choosing, run:
```bash
LAST=$(ls -td sites/*/src/components/layout/Navbar.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -1)
[ -f "$LAST" ] && head -20 "$LAST"
```
Choose a DIFFERENT pattern from whatever the last site used.
