---
name: Filter out Instagram video thumbnails
description: Phase 4 downloads og:image from Reels which shows play button overlay — must detect and discard
type: feedback
---

Phase 4 extracts og:image from Instagram posts, but for Reels/videos the og:image has a PLAY BUTTON rendered on the image plus subtitle text. These are unusable as website photos.

**Why:** 3 of 6 downloaded images for _afadadodente had giant play buttons and subtitle text overlays. The site used them anyway.

**How to apply:**
- After downloading each image, Read it visually (multimodal) and check for: play button overlay, video UI elements, subtitle text bars, Stories UI
- If ANY video artifacts are detected → DISCARD immediately, do not use
- For Instagram URLs containing "/reel/" → expect video thumbnail, try to find a static photo instead
- User-specified image URLs take HIGHEST priority — navigate to them individually and extract the best quality version
