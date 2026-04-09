#!/usr/bin/env bash
# gate-quality-loop.sh — Pre/post checks for quality loop (phase 7)
# Usage: gate-quality-loop.sh <LEAD_ID> [--pre] [--post]
# --pre: checks mapa-encantamento.md exists, screenshots/ dir exists
# --post: checks visual-analysis.md exists, >500 chars, has required sections
# Default (no flag): runs both --pre and --post
# Exit 0 on pass, exit 1 on failure

set -euo pipefail
BASE="/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2"

LEAD_ID="${1:-}"
if [ -z "$LEAD_ID" ]; then
  echo "ERROR: Usage: gate-quality-loop.sh <LEAD_ID> [--pre] [--post]"
  exit 1
fi

RUN_PRE=false
RUN_POST=false
for arg in "${@:2}"; do
  case "$arg" in
    --pre) RUN_PRE=true ;;
    --post) RUN_POST=true ;;
  esac
done

# Default: run both
if [ "$RUN_PRE" = false ] && [ "$RUN_POST" = false ]; then
  RUN_PRE=true
  RUN_POST=true
fi

SITE_DIR="$BASE/sites/$LEAD_ID"
FAILED=false

# --- PRE checks ---
if [ "$RUN_PRE" = true ]; then
  echo "=== GATE: QUALITY LOOP PRE-REQUISITES ==="

  # mapa-encantamento.md exists
  if [ -f "$SITE_DIR/mapa-encantamento.md" ]; then
    echo "OK: mapa-encantamento.md exists"
  else
    echo "BLOCKED: mapa-encantamento.md DOES NOT EXIST"
    echo "ACTION: Go back to Phase 3 and create the enchantment map BEFORE continuing."
    FAILED=true
  fi

  # screenshots/ dir exists
  if [ -d "$SITE_DIR/screenshots" ]; then
    echo "OK: screenshots/ directory exists"
  else
    echo "BLOCKED: screenshots/ directory does not exist"
    echo "ACTION: Create the screenshots directory: mkdir -p $SITE_DIR/screenshots"
    FAILED=true
  fi
fi

# --- POST checks ---
if [ "$RUN_POST" = true ]; then
  echo "=== GATE: QUALITY LOOP POST-VALIDATION ==="

  VA_FILE="$SITE_DIR/visual-analysis.md"

  # visual-analysis.md exists
  if [ ! -f "$VA_FILE" ]; then
    echo "BLOCKED: visual-analysis.md DOES NOT EXIST at $VA_FILE"
    echo "ACTION: Complete Gate 2 visual analysis and save results."
    FAILED=true
  else
    echo "OK: visual-analysis.md exists"

    # Check file size >500 chars
    CHAR_COUNT=$(wc -c < "$VA_FILE" | tr -d ' ')
    if [ "$CHAR_COUNT" -lt 500 ]; then
      echo "BLOCKED: visual-analysis.md has only $CHAR_COUNT chars (need 500+). Analysis is too shallow."
      FAILED=true
    else
      echo "OK: visual-analysis.md has $CHAR_COUNT chars"
    fi

    # Check required sections
    MISSING_SECTIONS=""
    for section in "Screenshots" "Problemas" "mapa de encantamento\|Comparacao" "Veredito\|R\$50K\|orgulhoso" "Wow moment"; do
      if ! grep -qi "$section" "$VA_FILE" 2>/dev/null; then
        MISSING_SECTIONS="$MISSING_SECTIONS $section"
      fi
    done

    if [ -n "$MISSING_SECTIONS" ]; then
      echo "BLOCKED: visual-analysis.md is missing required sections:$MISSING_SECTIONS"
      FAILED=true
    else
      echo "OK: visual-analysis.md has all required sections"
    fi
  fi
fi

if [ "$FAILED" = true ]; then
  echo "=== GATE QUALITY LOOP: FAIL ==="
  exit 1
fi

echo "=== GATE QUALITY LOOP: PASS ==="
exit 0
