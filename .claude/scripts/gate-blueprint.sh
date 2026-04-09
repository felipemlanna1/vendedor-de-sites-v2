#!/usr/bin/env bash
# gate-blueprint.sh — Validate mapa-encantamento.md completeness
# Usage: gate-blueprint.sh <LEAD_ID>
# Checks: file exists, 5+ LAYOUT lines, 5+ ANIMACAO lines, animation budget, fonts not repeated
# Exit 0 on pass, exit 1 on failure

set -euo pipefail
BASE="/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2"

LEAD_ID="${1:-}"
if [ -z "$LEAD_ID" ]; then
  echo "ERROR: Usage: gate-blueprint.sh <LEAD_ID>"
  exit 1
fi

MAPA="$BASE/sites/$LEAD_ID/mapa-encantamento.md"
FAILED=false

echo "=== GATE: BLUEPRINT VALIDATION ==="

# 1. File exists
if [ ! -f "$MAPA" ]; then
  echo "BLOCKED: mapa-encantamento.md DOES NOT EXIST at $MAPA"
  exit 1
fi
echo "OK: mapa-encantamento.md exists"

# 2. Has 5+ lines starting with "- LAYOUT:"
LAYOUTS=$(grep -c "^- LAYOUT:" "$MAPA" 2>/dev/null || true)
echo "LAYOUT lines: $LAYOUTS"
if [ "$LAYOUTS" -lt 5 ]; then
  echo "BLOCKED: Blueprint has $LAYOUTS LAYOUT definitions. Need 5+ sections with LAYOUT defined."
  FAILED=true
fi

# 3. Has 5+ lines starting with "- ANIMACAO" (with or without accent)
ANIMS=$(grep -c "^- ANIMAC" "$MAPA" 2>/dev/null || true)
echo "ANIMACAO lines: $ANIMS"
if [ "$ANIMS" -lt 5 ]; then
  echo "BLOCKED: Blueprint has $ANIMS animation definitions. Need 5+ sections with ANIMACAO defined."
  FAILED=true
fi

# 4. Has "Animation Budget" or "SHOWSTOPPER" keyword
if grep -qi "Animation Budget\|SHOWSTOPPER" "$MAPA" 2>/dev/null; then
  echo "OK: Animation Budget / SHOWSTOPPER found"
else
  echo "BLOCKED: No 'Animation Budget' or 'SHOWSTOPPER' keyword found in blueprint."
  FAILED=true
fi

# 5. Fonts mentioned don't repeat from last 3 sites (@fontsource grep)
CHOSEN_FONTS=$(grep -i '@fontsource' "$MAPA" 2>/dev/null | sed 's/.*@fontsource\///' | sed "s/[/\"';].*//" | tr '[:upper:]' '[:lower:]' | sort -u)
if [ -n "$CHOSEN_FONTS" ]; then
  BANNED_FONTS=""
  for f in $(ls -td "$BASE"/sites/*/src/main.jsx 2>/dev/null | head -3); do
    BANNED_FONTS="$BANNED_FONTS $(grep '@fontsource' "$f" 2>/dev/null | sed 's/.*@fontsource\///' | sed "s/[/\"';].*//" | tr '[:upper:]' '[:lower:]')"
  done
  for font in $CHOSEN_FONTS; do
    if echo "$BANNED_FONTS" | grep -qw "$font" 2>/dev/null; then
      echo "BLOCKED: Font '$font' was used in the last 3 sites. Choose another."
      FAILED=true
    fi
  done
  if [ "$FAILED" = false ]; then
    echo "OK: Fonts are original"
  fi
else
  echo "INFO: No @fontsource references found in blueprint (fonts may be listed differently)"
fi

if [ "$FAILED" = true ]; then
  echo "=== GATE BLUEPRINT: FAIL ==="
  exit 1
fi

echo "=== GATE BLUEPRINT: PASS ==="
exit 0
