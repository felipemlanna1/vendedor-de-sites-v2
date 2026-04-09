# Visual Review — Complete 34-Criteria Reference

Reference for phase 7b (visual review agent). Contains all criteria the agent must evaluate.

---

## Automated Criteria (31 checks — from playwright-validate.py)

These are scored automatically. The visual review agent reads the output and verifies any flagged issues are actually fixed.

### Layout (5 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 1 | overflow | Horizontal overflow | critical | -0.5 | body.scrollWidth <= viewport.width |
| 2 | touching_edge | Text touching viewport edge | critical | -0.5 | No text within 16px (mobile) / 32px (desktop) of edge |
| 3 | grid_8px | 8px grid alignment | fail | -0.3 | >= 70% of section spacings align to 4px grid |
| 4 | section_spacing | Section spacing | fail | -0.3 | Avg section padding >= 64px (mobile) / 80px (desktop) |
| 5 | max_width | Text line length | fail | -0.2 | No paragraph exceeds 85 chars/line |

### Typography (4 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 6 | custom_fonts | Custom fonts loaded | critical | -0.5 | h1 and body use non-generic fonts |
| 7 | type_scale | Modular type scale | fail | -0.2 | At most 1 font-size ratio jump > 2.0x |
| 8 | heading_hierarchy | Heading size hierarchy | fail | -0.2 | h1 > h2 > body font size |
| 9 | line_height | Body line-height | fail | -0.2 | Between 1.4 and 2.2 |

### Colors (4 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 10 | contrast_wcag | WCAG contrast | critical | -0.5 | All text meets 4.5:1 (normal) / 3:1 (large) |
| 10b | invisible_text | Invisible text detection | critical | -0.5 | No serif-thin-on-dark, near-invisible contrast, or low opacity text |
| 11 | color_palette | Restricted palette | warn | -0.1 | <= 12 unique colors |
| 12 | cta_distinct | CTA color distinct | fail | -0.2 | At least 1 CTA element exists |

### Images (3 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 13 | broken_images | Broken images | critical | -0.5 | All <img> loaded (complete + naturalWidth > 0) |
| 14 | img_alt | Image alt text | fail | -0.3 | All <img> have non-empty alt |
| 15 | img_ratio | Aspect ratio distortion | fail | -0.3 | Display ratio within 20% of natural ratio |

### Motion (3 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 16 | animations | Animations present | fail | -0.3 | CSS transitions/animations OR GSAP/Motion detected |
| 17 | hover_states | Hover states | fail | -0.2 | :hover rules exist in stylesheets |
| 18 | smooth_scroll | Smooth scroll | fail | -0.2 | scroll-behavior: smooth OR Lenis detected |

### SEO (2 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 19 | json_ld | JSON-LD schema | fail | -0.3 | At least 1 script[type="application/ld+json"] |
| 20 | meta_tags | Meta tags | fail | -0.3 | title > 10 chars (not "Vite"), description >= 50 chars, og:title present |

### Conversion (3 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 22 | whatsapp_cta | WhatsApp CTA | warn | -0.1 | At least 1 link to wa.me or whatsapp |
| 23 | cta_above_fold | CTA above fold | fail | -0.2 | CTA visible in first viewport height |
| 24 | multiple_ctas | Multiple CTAs | warn | -0.1 | >= 2 CTA elements on page |

### Buttons (1 check)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 25 | button_padding | Button padding | critical | -0.5 | All buttons have pt >= 8, pb >= 8, pl >= 12, pr >= 12 |

### Mobile (2 checks — mobile viewport only)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 26 | touch_targets | Touch target size | fail | -0.3 | At most 2 interactive elements < 44x44px |
| 27 | min_font_mobile | Min font mobile | fail | -0.3 | At most 3 text elements < 14px |

### PT-BR (1 check)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 28 | pt_br_accents | Portuguese accents | critical | -0.5 | No unaccented words that require diacritics |

### Diversity (3 checks)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| 29 | animation_diversity | Animation variety | fail | -0.3 | >= 3 different animation types |
| 30 | layout_diversity | Layout variety | fail | -0.3 | >= 3 unique layout types across sections |
| 31 | empty_sections | Empty sections | critical | -0.5 | No section with height > 200px and text < 50 chars |

### Runtime (2 checks — during validation)

| # | ID | Check | Severity | Penalty |
|---|---|---|---|---|
| - | i18n_toggle | Language toggle works | fail/critical | -0.3/-0.5 |
| - | hamburger_menu | Mobile menu opens | warn | -0.0 |

### Originality (2 checks — file comparison)

| # | ID | Check | Severity | Penalty | Pass condition |
|---|---|---|---|---|---|
| - | font_originality | Font uniqueness | critical | -0.5 | No font overlap with last 3 sites |
| - | component_originality | Component names | warn | -0.3 | No banned template names (ScrollReveal, AnimatedText, ParallaxImage, CountUp) |

---

## Manual Criteria (3 checks — evaluated by visual review agent)

### Criterion 32: Visual Originality (0-10)

Compare screenshots with the last 2 built sites:
```bash
LAST_TWO=$(ls -td sites/*/screenshots/fullpage-desktop.png 2>/dev/null | grep -v "$LEAD_ID" | head -2)
```

| Score | Description |
|---|---|
| 10 | Impossible to tell it's from the same system |
| 8-9 | Clearly distinct, own identity |
| 6-7 | Different colors but same structure |
| 0-5 | Practically identical |

### Criterion 33: Desktop Professionalism (0-10)

Read `screenshots/fullpage-desktop.png`:

| Score | Description |
|---|---|
| 10 | Indistinguishable from premium agency. Wow factor. |
| 8-9 | Professional, polished |
| 6-7 | Functional without distinction |
| 4-5 | Amateur |
| 0-3 | Broken |

### Criterion 34: Mobile Professionalism (0-10)

Read `screenshots/fullpage-mobile.png` — SEPARATE from desktop because mobile breaks frequently.
Same rubric as criterion 33.

---

## Approval Rules

- **EVERY** one of the 34 criteria must score >= 8
- **AVERAGE** of all 34 must be >= 9.0
- If ANY originality criterion (29, 30, 32) < 8 → **FAIL**
- If ANY critical criterion = 0 → **STOP immediately**
- All 3 verdicts must be YES:
  - "Looks like a $50K site?"
  - "Would someone share this link?"
  - "Would the owner be proud?"

---

## Weights by Category

| Category | Weight | Criteria count |
|---|---|---|
| Layout | 25% | 5 |
| Typography | 15% | 4 |
| Colors | 15% | 4 |
| Images | 15% | 3 |
| Motion | 10% | 3 |
| SEO | 10% | 2 |
| Conversion | 10% | 3 |
| Buttons + Mobile + Accents + Diversity | distributed | 7+ |
| Manual (originality + professionalism) | pass/fail gate | 3 |
