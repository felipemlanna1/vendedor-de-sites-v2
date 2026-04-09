#!/usr/bin/env bash
# gate-signature-element.sh — Validate signature element exists in src/components/ui/
# Usage: gate-signature-element.sh <LEAD_ID>
# Checks: at least 1 .jsx with SVG/keyframes/clip-path (excluding Button, LanguageToggle), 30+ lines each
# Exit 0 on pass, exit 1 on failure

set -euo pipefail
BASE="/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2"

LEAD_ID="${1:-}"
if [ -z "$LEAD_ID" ]; then
  echo "ERROR: Usage: gate-signature-element.sh <LEAD_ID>"
  exit 1
fi

SITE_DIR="$BASE/sites/$LEAD_ID"
UI_DIR="$SITE_DIR/src/components/ui"

echo "=== GATE: SIGNATURE ELEMENT ==="

if [ ! -d "$UI_DIR" ]; then
  echo "BLOCKED: Directory $UI_DIR does not exist"
  exit 1
fi

# Find .jsx files containing signature-like patterns, excluding Button and LanguageToggle
SIGNATURE_FILES=$(find "$UI_DIR" -name "*.jsx" -exec grep -l "svg\|SVG\|viewBox\|@keyframes\|cursor.*url\|clip-path" {} \; 2>/dev/null | grep -iv "Button\|LanguageToggle" || true)
SIGNATURE_COUNT=$(echo "$SIGNATURE_FILES" | grep -c ".jsx" 2>/dev/null || echo 0)

if [ "$SIGNATURE_COUNT" -lt 1 ]; then
  echo "BLOCKED: No component found with thematic SVG or unique CSS animation in $UI_DIR"
  echo "Need at least 1 .jsx file containing: svg, SVG, viewBox, @keyframes, cursor url, or clip-path"
  exit 1
fi

FAILED=false
for f in $SIGNATURE_FILES; do
  LINES=$(wc -l < "$f" | tr -d ' ')
  if [ "$LINES" -lt 30 ]; then
    echo "BLOCKED: $f has $LINES lines — looks like a stub (need 30+)"
    FAILED=true
  else
    echo "OK: $f ($LINES lines)"
  fi
done

if [ "$FAILED" = true ]; then
  exit 1
fi

# Check component is imported somewhere in App.jsx or sections/
IMPORTED=false
for f in $SIGNATURE_FILES; do
  COMPONENT=$(basename "$f" .jsx)
  if grep -rq "$COMPONENT" "$SITE_DIR/src/App.jsx" "$SITE_DIR/src/components/sections/" 2>/dev/null; then
    echo "OK: $COMPONENT is imported in App.jsx or sections/"
    IMPORTED=true
  else
    echo "WARN: $COMPONENT is NOT imported in App.jsx or sections/ — unused signature element"
  fi
done

if [ "$IMPORTED" = false ]; then
  echo "BLOCKED: No signature element is imported/used in App.jsx or sections/"
  exit 1
fi

echo "=== GATE SIGNATURE ELEMENT: PASS ==="
exit 0
