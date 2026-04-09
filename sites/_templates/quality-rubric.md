# Quality Rubric

Reference for phase 7 (quality loop). Loaded on demand.

---

## Manual Criteria (32-34)

The playwright-validate.py script scores 31 automated criteria. The agent MUST manually evaluate 3 additional criteria:

### Criterion 32: Visual Originality (0-10)

Open screenshots of the last 2 built sites:
```bash
LAST_TWO=$(ls -td sites/*/screenshots/fullpage-desktop.png 2>/dev/null | grep -v "$LEAD_ID" | head -2)
```
Compare visually and score:
- **10**: Impossible to tell it's from the same system
- **8-9**: Clearly distinct, own identity
- **6-7**: Different colors but same structure
- **0-5**: Practically identical

### Criterion 33: Desktop Professionalism (0-10)

Read `screenshots/fullpage-desktop.png` and evaluate:
- **10**: Indistinguishable from premium agency. Wow factor.
- **8-9**: Professional, polished
- **6-7**: Functional without distinction
- **4-5**: Amateur
- **0-3**: Broken

### Criterion 34: Mobile Professionalism (0-10)

Read `screenshots/fullpage-mobile.png` with same rubric.
SEPARATE from desktop because mobile breaks frequently.

---

## Approval Rules

- EACH of the 34 criteria >= 8
- AVERAGE of all 34 >= 9.0
- If ANY originality criterion (29-32) < 8 → FAIL
- If ANY critical criterion = 0 → STOP immediately

---

## Gate 2 — Visual Analysis Questions

### Blueprint Comparison (read mapa-encantamento.md FIRST)

For EACH question answered in the blueprint, verify the site DELIVERED what was planned:

| Question | What to check |
|----------|--------------|
| Hero captures attention in 3 seconds? | Does the built hero deliver what the blueprint defined? |
| Scroll rhythm matches plan? | Fast/slow/cinematic/alternating as specified? |
| Surprises exist? | Are the planned attention moments built? |
| Sells without looking like selling? | CTAs appear naturally as planned? |
| Impossible to confuse with another site? | Does the signature element from the blueprint exist? |

### Visual Quality Questions (answer IN WRITING)

**Wow moments (CRITICAL):**
- WHAT is my site's wow moment? Describe in 1 sentence. If you can't describe it, there IS NO wow moment.
- How many DIFFERENT animations exist? (repeated fade-in does NOT count as variation)
- Is there any element that SURPRISES on scroll?

**Visual quality:**
- Photos are the BEST from the briefing? Is there a better one unused?
- ALL images well contained? (none overflowing div, stretched, or wrong aspect ratio)
- Colors convey client's essence?
- Typography creates clear hierarchy?
- Generous spacing?

**Mobile-specific:**
- Touch targets >= 44x44px?
- Readable text without zoom (>= 16px)?
- Cards stack well? Natural scroll without gaps?

**Desktop-specific:**
- Layout uses horizontal space? Hover states?

### Quality Verdicts (answer HONESTLY)

- "Looks like a $50K site?" → YES or NO
- "Would someone share this link saying 'look how amazing'?" → YES or NO
- "If I were the business OWNER, would I be PROUD?" → YES or NO

---

## visual-analysis.md Format (MANDATORY)

Save at `sites/$LEAD_ID/visual-analysis.md`. Must be > 500 characters. Without it, the gate does NOT pass.

```markdown
# Visual Analysis — [Client Name]

## Screenshots analyzed
- fullpage-mobile.png: [what I saw]
- fullpage-desktop.png: [what I saw]

## Problems found and fixed
1. [Problem description] → [How it was fixed]
2. ...

## Blueprint comparison
- Hero 3 seconds: [DELIVERED / NOT DELIVERED] — [detail]
- Scroll rhythm: [DELIVERED / NOT DELIVERED] — [detail]
- Surprises: [DELIVERED / NOT DELIVERED] — [detail]
- Natural selling: [DELIVERED / NOT DELIVERED] — [detail]

## Verdicts
- Looks like $50K site? [YES/NO] — [justification]
- Would someone share the link? [YES/NO] — [justification]
- Would the owner be proud? [YES/NO] — [justification]

## Wow moment
[Description in 1 sentence]
```

---

## Classic Errors (reinforced critical gates)

| Error | Detection | Action |
|-------|-----------|--------|
| Invisible text | invisible_text score = 0 | STOP immediately |
| Speed over quality | visual-analysis.md < 1000 chars or missing section names | STOP — re-analyze properly |
| Empty sections | Section height > 200px but inner text < 50 chars | Fix content |
| Cropped faces | Person image with face cut off in screenshots | Fix object-position |
| Missing accents | pt_br_accents = 0 | STOP — fix all accents |
| Broken mobile | Criterion 34 < 8 | Fix mobile separately |
| Language toggle | i18n score < 8 | STOP — fix toggle |

---

## Anti-Shortcut Rule

Do NOT try to exit the loop just because score >= 9.0. The score measures TECHNIQUE. Gate 2 measures QUALITY. A site can have score 10.0 and be generic — that is UNACCEPTABLE. Gate 2 only passes when the site ENCHANTS.
