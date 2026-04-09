# Vendedor de Sites v2

Platform to discover leads, enrich their data, and build premium React websites that look worth R$50K+. Solo developer — maximize automation and quality through multi-phase pipelines.

## Tech Stack

- **Sites**: React 19, Vite 6, Tailwind CSS v4, GSAP/Motion, react-i18next (PT-BR + EN)
- **Data**: SQLite (vendedor.db, gmaps_leads.db), JSON state files
- **Scraping**: Playwright MCP (stealth), WebSearch/WebFetch
- **Validation**: playwright-validate.py (34 automated criteria), bash gate scripts
- **Deploy**: Cloudflare Pages (wrangler)
- **Frontend Dashboard**: React 19, Vite, Express, better-sqlite3, Recharts

## Project Structure

```
.claude/agents/          -> Pipeline orchestrators (1 per pipeline)
.claude/skills/          -> Phase execution instructions + knowledge bases
.claude/scripts/         -> Gate validation scripts (bash, zero Python)
sites/_templates/        -> Reference files (loaded on demand by skills)
sites/{lead_id}/         -> Built websites
data/vendedor.db         -> Briefings database
data/reports/{pipeline}-{id}/  -> Phase reports
data/_state/             -> Pipeline state files
```

## Pipelines

| Pipeline | Orchestrator | Phases | Purpose |
|----------|-------------|--------|---------|
| build-site | site-builder.md | 8 | Build premium React website from briefing |
| enrich-lead | enrichment-builder.md | 7 | Enrich lead with web data + images |
| lead-finder | lead-finder-builder.md | 6 | Discover leads via Instagram |
| gmaps-leads | gmaps-builder.md | 4 | Discover leads via Google Maps |

## Architecture Rules

### Pipeline Architecture: Orchestrator → Agent-per-Phase → Skill

```
Orchestrator (.claude/agents/*.md)
  ├─ Launches 1 Agent per phase (fresh context each)
  ├─ Runs gate scripts between phases (exit 1 = BLOCK)
  ├─ Model routing: opus for creative/judgment, sonnet for execution
  └─ Never executes skills directly — always delegates to subagents

Phase Agent (spawned by orchestrator)
  ├─ Invokes skill (/site-phase-N)
  ├─ Writes report via write-report.sh
  ├─ Runs check-gate.sh
  └─ Returns condensed summary (max 1500 tokens)

Skill (.claude/skills/*/SKILL.md)
  └─ Complete execution instructions for one phase
```

### Skill Types

| Type | Purpose | Example |
|------|---------|---------|
| Phase skill | Step-by-step execution for a pipeline phase | site-phase-6 |
| Knowledge skill | Domain rules and patterns (referenced, not invoked) | taste-skill, frontend-design |

### Gate Enforcement

Every phase MUST pass gates before the next phase starts:
- `check-gate.sh` — validates report exists, no CRITICAL/FAIL keywords
- `gate-*.sh` — validates code output (images, fonts, layouts, i18n, blueprint)
- Gates use `exit 1` to block. Instructions alone don't prevent skipping.

### File Size Limits

- SKILL.md: < 500 lines (reference material in separate files)
- CLAUDE.md: < 300 lines
- Reference material: sites/_templates/*.md (loaded on demand)

## Code Style

### Language

- Agent/skill definitions: English (Claude follows English instructions more consistently)
- User-facing output: Portuguese (PT-BR) — reports, banners, summaries
- Site content: Bilingual (PT-BR + EN via react-i18next)

### Scripts

- ALL gate scripts in bash — zero Python dependencies
- DB queries via `sqlite3` CLI, JSON via bash parsing
- Scripts must be executable (`chmod +x`), use `set -euo pipefail`

## Design Principles (Sites)

Every site MUST:
1. **Enchant maximally** — wow moments, scroll surprises, signature elements
2. **Convert through enchantment** — CTAs appear naturally, never pushy
3. **Be completely original** — no two sites share fonts, hero layout, navbar style, or animation patterns
4. **Derive everything from the individual client** — never predefine by niche
5. **Have a signature element** — a visual element only THIS client can have

Quality verdicts (all must be YES):
- "Parece site de R$50K?" (Looks like a $50K site?)
- "Alguem mandaria esse link?" (Would someone share this link?)
- "Dono ficaria orgulhoso?" (Would the owner be proud?)

## Browser Automation

- **Playwright MCP**: Primary — stealth, Instagram, anti-bot sites
- **Chrome DevTools MCP**: Secondary — CSS inspection, performance profiling
- **NEVER**: claude-in-chrome (unstable, random disconnections)

## Skills Reference

### Site Building
- `/site-phase-{1-8}` — 8-phase website build pipeline
- `taste-skill` — Anti-AI-slop, premium UI patterns
- `frontend-design` — Aesthetic direction, component architecture

### Lead Discovery
- `/lead-phase-{1-6}` — Instagram lead discovery
- `/gmaps-phase-{1-4}` — Google Maps lead discovery
- `/enrich-phase-{1-7}` — Lead enrichment with web data

### SEO & Quality
- `/seo` — Comprehensive SEO analysis
- `/seo page` — Single-page deep SEO audit
- `playwright-validate.py` — 34-criteria automated UX validation
