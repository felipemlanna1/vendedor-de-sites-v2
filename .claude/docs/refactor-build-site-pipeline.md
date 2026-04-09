# Build-Site Pipeline Refactor — Complete Briefing

## Mission

Rewrite the build-site pipeline (site-builder orchestrator + 8 phase skills) to produce websites of the highest standards — sites that look worth R$50K+, are completely original, deeply study the brand, and convert through enchantment. Apply patterns from Anthropic's official best practices and a proven production pipeline (arena-app).

## Sources Used

### Anthropic Official (8 sources)
1. "Building Effective Agents" — blog: orchestrator-workers pattern, heuristics over rigid rules
2. "Multi-Agent Research System" — engineering: explicit subagent instructions, artifact pattern, model routing
3. "Effective Context Engineering" — engineering: just-in-time loading, smallest high-signal token set
4. "Writing Tools for Agents" — engineering: clear naming, actionable errors, token-efficient returns
5. Skills Docs (code.claude.com) — frontmatter spec, < 500 lines, dynamic injection, context: fork
6. Subagents Docs — tools restriction, model override, condensed summaries
7. Best Practices — CLAUDE.md < 300 lines, progressive disclosure
8. Agent Teams — parallel coordination patterns

### Reference Pipeline (arena-app)
An 11-phase pipeline for React Native development with 21 specialized agents, 18 knowledge skills, 4 validation scripts, and hooks. Key patterns to adopt:
- Agents = pipeline phases (WHO does), Skills = knowledge bases (WHAT to know)
- Structured I/O (JSON contracts between phases)
- PostToolUse hooks for automated validation
- Conditional phase execution based on metadata
- Formal loopback/diagnostic mechanism
- Zero Python in scripts (bash + sqlite3 + jq)
- Rich frontmatter (allowed-tools, model, skills, effort)

---

## Current State

The build-site pipeline already works and has evolved significantly:
- 1-agent-per-phase architecture with gate enforcement
- playwright-validate.py with 34 automated criteria
- Anti-similarity gates (fonts, layouts, animations, hero, navbar)
- Blueprint contract enforcement (mapa-encantamento.md)
- Orchestrator visual verification (screenshots comparison)

### What needs to change:
1. **Language**: All Portuguese → English (Claude follows English instructions more consistently)
2. **Frontmatter**: Minimal → full spec (allowed-tools, model, effort, context: fork)
3. **Inline bash**: 200+ lines of bash inside skills → external gate scripts
4. **Model routing**: All opus → opus for creative/judgment, sonnet for execution
5. **Reference material**: Mixed into skills → separate files loaded on demand
6. **Rule distribution**: Scattered/duplicated → constraints table per skill
7. **Skill structure**: Irregular sections → standardized anatomy

---

## Standardized Skill Anatomy

Every phase skill MUST follow this structure:

```markdown
---
name: site-phase-N
description: >-
  Phase N — [what this phase produces]. [key constraint or pattern].
  Max 250 chars, English, front-load the use case.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
context: fork
model: opus|sonnet
effort: low|medium|high
user-invocable: false
---

# Phase N — [Title]

## Auto-loaded Context (optional)
!`command that loads dynamic context before the skill runs`

## Objective
1-3 sentences: what this phase produces and why it matters.

## Pre-Gate (if needed)
```bash
.claude/scripts/gate-*.sh $LEAD_ID [--flag]
```

## Step 1 — [Action]
What to do + how to do it. Rules embedded in the relevant step.

## Step 2 — [Action]
...

## Verification
```bash
concrete command to verify the output
```

## Exit Gate (blocking)
```bash
.claude/scripts/gate-*.sh $LEAD_ID
```

## Constraints
| Rule | Enforced by |
|------|-------------|
| ... | gate-*.sh / visual review / playwright-validate.py |

## Exit Criteria
- [ ] Checklist of completion conditions
```

---

## Standardized Orchestrator Anatomy

```markdown
---
name: site-builder
description: >-
  Premium React website builder in 8 phases with quality loop.
  Use when user requests /build-site.
tools: Agent, Read, Write, Edit, Bash, Grep, Glob, Skill, WebSearch, WebFetch
model: opus
---

# Site Builder — Orchestrator

## Role
You are an ORCHESTRATOR. You launch agents, run gates, review screenshots.
You NEVER execute skills directly or write code yourself.

## Architecture
[ASCII diagram of 8-phase flow with gates]

## Absolute Rules
[Translated to English, concise]

## Creative Directives (inject into ALL subagent prompts)
- Never predefine sections/colors/fonts by niche — derive from individual client
- Each site MUST have signature elements tied to THIS brand
- Site must enchant maximally AND keep service/CTA clear at all times
- Don't copy template components — create components derived from blueprint

## Setup
```bash
mkdir -p data/reports/site-$LEAD_ID
```

## Subagent Launch Template
For each phase, launch one Agent:

model: See routing table
prompt: |
  Execute Phase {N} of the build-site pipeline.
  Base path: [path]
  Lead ID: {LEAD_ID}
  
  CONTEXT: Read reports: {CONTEXT_REPORTS}
  
  CREATIVE DIRECTIVES: [injected from above]
  
  EXECUTE:
  1. Invoke skill /site-phase-{N}
  2. Write report via .claude/scripts/write-report.sh
  3. Run gate: .claude/scripts/check-gate.sh
  
  {PHASE_OVERRIDES}
  
  Return (max 1500 tokens): {RETURN_FIELDS}

## Model Routing

| Phase | Model | Reason |
|-------|-------|--------|
| 1 Load Briefing | sonnet | Simple DB query |
| 2 Client Immersion | sonnet | Structured analysis |
| 3 Creative Concept | opus | Highest creativity needed |
| 4 Docs + Scaffold | sonnet | Mechanical setup |
| 5 Base Components | sonnet | Following blueprint |
| 6 Implementation | opus | Complex code generation |
| 7 Quality Loop | opus | Visual judgment, iteration |
| 8 Deploy | sonnet | Build + deploy commands |

## Phase-Specific Overrides
[Only phases with special logic: 3 (parallel agents), 4 (image gate), 6 (contract), 7 (loop + visual verification)]

## Completion
Show user: URL, concept, sections, languages, local path. List all reports.
```

---

## Gate Scripts to Create

All in `.claude/scripts/`, bash-only (ZERO Python), `set -euo pipefail`:

| Script | Checks | Used by |
|--------|--------|---------|
| `gate-anti-similarity.sh` | Fonts unique (last 3 sites), 3+ layout types, 3+ animation types, no banned timings, hero/navbar different from last site. Flags: `--report-only`, `--navbar-only` | phase-3, phase-6 |
| `gate-blueprint.sh` | mapa-encantamento.md exists, 5+ LAYOUT, 5+ ANIMACAO, animation budget, fonts not banned | phase-3 |
| `gate-signature-element.sh` | Component in ui/ with SVG/keyframes/clip-path, 30+ lines, imported | phase-6 |
| `gate-images.sh` | Images >5KB in public/images/. `--full`: also checks <img> tags + briefing count | phase-4, phase-7 |
| `gate-i18n-keys.sh` | Same keys in pt-BR.json and en.json (use bash jq or python-free parsing) | phase-5 |
| `gate-quality-loop.sh` | `--pre`: mapa exists, screenshots/ dir. `--post`: visual-analysis.md >500 chars | phase-7 |

---

## Reference Files to Create

All in `sites/_templates/`, English, loaded on demand via `Read:`:

| File | Content | Loaded by |
|------|---------|-----------|
| `code-principles.md` | SOLID in React, file organization, Tailwind v4 rules, animation cleanup, accessibility | phase-6 |
| `blueprint-template.md` | Parts A-E format + one few-shot example (fictional barbershop) | phase-3 |
| `navbar-patterns.md` | 6+ navbar styles with description, when to use, functional requirements | phase-6 |
| `image-analysis-guide.md` | Video thumbnail filter, per-image visual analysis, image-section coherence | phase-4, phase-7 |
| `quality-rubric.md` | Criteria 32-34 rubrics, Gate 2 questions, visual-analysis.md format, verdicts | phase-7 |
| `package-libs.md` | Required deps, animation keyword→lib mapping, Lenis parameter recommendations | phase-4 |

---

## Model Routing per Skill

| Skill | Model | Effort | Allowed Tools |
|-------|-------|--------|---------------|
| site-phase-1 | sonnet | low | Read, Bash |
| site-phase-2 | sonnet | medium | Read, Bash, WebSearch |
| site-phase-3 | opus | high | Read, Bash, WebSearch, WebFetch, Glob |
| site-phase-4 | sonnet | medium | Read, Write, Edit, Bash |
| site-phase-5 | sonnet | medium | Read, Write, Edit, Bash |
| site-phase-6 | opus | high | Read, Write, Edit, Bash, Glob, Grep |
| site-phase-7 | opus | high | Read, Write, Edit, Bash, Glob, Grep |
| site-phase-8 | sonnet | low | Read, Bash |

---

## Key Transformations by Phase

### Phase 3 (Creative Concept) — 285 → ~180 lines
- Extract banned fonts/layouts bash → `gate-anti-similarity.sh --report-only`
- Extract gate bash → `gate-blueprint.sh`
- Move blueprint format → `blueprint-template.md` (with few-shot example)
- Keep: WebSearch-first references, anti-repetition, signature element definition

### Phase 6 (Implementation) — 293 → ~150 lines
- Auto-load blueprint via `!`cat sites/$LEAD_ID/mapa-encantamento.md``
- Extract anti-similarity gate (90 lines) → `gate-anti-similarity.sh`
- Extract signature element gate → `gate-signature-element.sh`
- Move code principles → `code-principles.md`
- Move navbar options → `navbar-patterns.md`
- Constraints in single table with "enforced by" column

### Phase 7 (Quality Loop) — 387 → ~200 lines
- Extract image check bash → `gate-images.sh --full`
- Move rubrics → `quality-rubric.md`
- Keep: 34-criteria system, Gate 2 visual analysis, blueprint adherence check, SEO audit
- Condense "ERROS CLASSICOS" to table

### Phase 4 (Scaffold) — 231 → ~140 lines
- Move package.json template → `package-libs.md`
- Move image analysis → `image-analysis-guide.md`
- Extract image gate → `gate-images.sh --pre-check`

### Phases 1, 2, 5, 8 — Already well-sized
- Translate + add full frontmatter + model routing

---

## Implementation Order

### Wave 1: Infrastructure
1. Create 6 gate scripts in `.claude/scripts/`
2. Create 6 reference files in `sites/_templates/`
3. `chmod +x` all scripts, test against existing sites

### Wave 2: Orchestrator
1. Rewrite `site-builder.md` in English with model routing and consolidated template

### Wave 3: Skills (priority order)
1. site-phase-3 (most impact on originality)
2. site-phase-6 (most impact on quality)
3. site-phase-7 (most impact on validation)
4. site-phase-4 (heavy bash extraction)
5. site-phase-5, 2, 1, 8 (translate + frontmatter)

### Wave 4: Verification
1. Run each gate script against existing sites
2. Grep for Portuguese in refactored files (`voce|nao|deve|cada|fase|obrigatorio`)
3. Verify all file references exist
4. Run one complete pipeline on a real lead

---

## Anti-Patterns to Avoid

From Anthropic research:
- Don't micromanage with rigid rules — use heuristics that guide judgment
- Don't pre-load everything — use just-in-time context loading
- Don't duplicate rules across orchestrator and skills
- Don't use Python when bash does the job
- Don't exceed 500 lines per SKILL.md
- Don't spawn subagents without explicit objective + output format + task limits

From arena-app lessons:
- Don't mix knowledge (rules) with execution (steps) — separate them
- Don't skip gates with instructions alone — use exit 1
- Don't use generic descriptions — front-load the use case
- Don't leave validation manual — automate with hooks and scripts

---

## Quality Standards (Non-Negotiable)

The refactored pipeline MUST produce sites that:
1. Score ≥ 9.0 on 34 automated criteria (playwright-validate.py)
2. Pass visual analysis against blueprint (mapa-encantamento.md)
3. Have zero font/layout/animation repetition from last 3 sites
4. Include a real signature element (30+ lines, imported, non-generic)
5. Use real client images (never stock for people/products/facade)
6. Support PT-BR + EN with identical i18n keys
7. Pass SEO audit without critical issues
8. Get 3x YES on quality verdicts ("R$50K?", "Share link?", "Owner proud?")
