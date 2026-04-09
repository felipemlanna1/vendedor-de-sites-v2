# Image Analysis Guide

Reference for phases 4 (scaffold) and 7 (quality loop). Loaded on demand.

---

## Video Thumbnail Filter (MANDATORY)

After downloading each image, open with Read (multimodal) and check:

1. **Play button overlay** — white semi-transparent triangle in center? **DISCARD**
2. **Subtitle/caption text** at the bottom? **DISCARD**
3. **Instagram Stories UI** — progress bar, icons? **DISCARD**
4. **Text overlay** — "POV:", "TUTORIAL:", hashtags? **DISCARD**
5. **Vertical 9:16 with screenshot quality** — SUSPECT, inspect carefully

If original URL contains `/reel/`: High chance of video thumbnail. Extract og:image BUT visually verify.

For each discarded image: note the reason. Better fewer images than images with play buttons.

---

## Per-Image Visual Analysis

For EACH briefing image, open with Read (multimodal) and classify:

### Step 1 — What is in this image?
Describe objectively: "margherita pizza", "store facade", "woman portrait", "green logo", "rice and beans plate".

### Step 2 — Where does it belong?
Map to a SPECIFIC site section based on the REAL content of the image:
- Person photo → About section or Hero. NEVER in a plumbing services section
- Food photo → menu/food section matching THAT food. NEVER in desserts if it's a burger
- Facade photo → location/contact section. NEVER as hero background for services
- Logo → navbar and footer. NEVER as a section image
- Product photo → the section featuring THAT product

### Step 3 — Technical quality
Resolution, focus, lighting. Needs CSS treatment (overlay, filter, crop)?

### Decision per image:
- **USE in [section X]** — image content matches section content
- **USE WITH TREATMENT in [section X]** — matches but needs overlay/crop/filter
- **DISCARD** — poor quality, or doesn't match any site section

---

## Image-Section Coherence (CRITICAL RULE)

The image MUST correspond to the content of the section where it's used. Examples of GRAVE ERRORS:
- Section talks about pizza, shows rice plate
- Section talks about houses, shows person portrait
- Section talks about pharmacy, shows restaurant interior
- Beauty services section shows food photo
- Barbershop hero shows bakery facade

If NO image matches a section → leave without image and compensate with typographic/CSS design.
NEVER force an image into a section just because "it needs an image there."

---

## Image Containment Verification (Phase 7)

For each `<img>` in section components, verify:
- `object-fit: cover` (or `contain` when aspect ratio matters) — NEVER without object-fit
- Explicit `width` and `height` OR `aspect-ratio` defined — prevents CLS
- Container with `overflow-hidden` — prevents overflow
- Coherent proportions between mobile and desktop

### Visual inspection in screenshots:
- Image overflowing container (visible overflow)?
- Image stretched or squashed (distorted aspect ratio)?
- Image cropped losing important content?
- Unexpected whitespace around the image?
- Image too small inside a large container?

### Contribution test:
Does each image HELP or HURT? A poorly contained image is worse than no image.
If it hurts → remove and compensate with typography/gradient/CSS.

---

## Priority Ordering

1. **User-specified images** (orchestrator "PRIORITY IMAGES") — most prominent positions (Hero, About)
2. **Real briefing images** (data_points category "images") — mapped to matching sections
3. **Stock images** — ONLY for textures, patterns, abstract backgrounds. NEVER for people/facades/products/team
