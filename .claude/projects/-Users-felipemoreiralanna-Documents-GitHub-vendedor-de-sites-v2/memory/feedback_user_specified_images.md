---
name: User-specified images are highest priority
description: When user provides specific Instagram post URLs, those MUST be downloaded and used prominently — they are the best photos
type: feedback
---

When the user says "leve em consideracao essas imagens" and provides specific Instagram post URLs, those are the MOST IMPORTANT images for the site.

**Why:** User provided 2 professional photo URLs for _afadadodente and neither was used. The pipeline grabbed random og:images from other posts instead.

**How to apply:**
- User-specified image URLs must be processed FIRST, before any briefing images
- Navigate to each URL with Playwright, extract the actual image (not just og:image which may be video thumbnail)
- These images should go in Hero and About sections — the most prominent positions
- The orchestrator must pass user-specified URLs explicitly to Phase 4 agent with "PRIORITY IMAGES" label
