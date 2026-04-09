#!/usr/bin/env bash
# gate-images.sh — Validate images downloaded and used
# Usage: gate-images.sh <LEAD_ID> [--pre-check] [--full]
# --pre-check (phase 4): counts images >5KB in public/images/ excluding stock/, fails if 0
# --full (phase 7): also checks <img> tags in sections, compares against briefing image count
# Default (no flag): same as --pre-check
# Exit 0 on pass, exit 1 on failure

set -euo pipefail
BASE="/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2"

LEAD_ID="${1:-}"
if [ -z "$LEAD_ID" ]; then
  echo "ERROR: Usage: gate-images.sh <LEAD_ID> [--pre-check] [--full]"
  exit 1
fi

MODE="pre-check"
for arg in "${@:2}"; do
  case "$arg" in
    --pre-check) MODE="pre-check" ;;
    --full) MODE="full" ;;
  esac
done

SITE_DIR="$BASE/sites/$LEAD_ID"
IMAGES_DIR="$SITE_DIR/public/images"

echo "=== GATE: IMAGES ($MODE) ==="

if [ ! -d "$IMAGES_DIR" ]; then
  echo "BLOCKED: Directory $IMAGES_DIR does not exist"
  exit 1
fi

# Count images >5KB excluding stock/
IMG_COUNT=0
while IFS= read -r img; do
  SIZE=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null || echo 0)
  if [ "$SIZE" -gt 5000 ]; then
    IMG_COUNT=$((IMG_COUNT+1))
  fi
done < <(find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) ! -path "*/stock/*" 2>/dev/null)

echo "Briefing images >5KB in public/images/: $IMG_COUNT"

if [ "$IMG_COUNT" -lt 1 ]; then
  echo "BLOCKED: ZERO valid images (>5KB) found in public/images/ (excluding stock/)"
  echo "ACTION: Download briefing images before proceeding."
  exit 1
fi

echo "OK: $IMG_COUNT valid images found"

if [ "$MODE" = "full" ]; then
  echo ""
  echo "--- Full validation (phase 7) ---"

  # Check <img> tags in sections
  IMG_TAGS=$(grep -r '<img ' "$SITE_DIR/src/components/sections/" 2>/dev/null | wc -l | tr -d ' ')
  echo "<img> tags in sections: $IMG_TAGS"

  # Check briefing image count from vendedor.db
  BRIEFING_IMGS=$(python3 -c "
import sqlite3, json, sys
db_path = '$BASE/data/vendedor.db'
try:
    db = sqlite3.connect(db_path)
    row = db.execute(\"SELECT briefing_json FROM briefings WHERE lead_id='$LEAD_ID'\").fetchone()
    if row:
        b = json.loads(row[0])
        imgs = [d for d in b.get('data_points',[]) if d.get('category')=='images']
        print(len(imgs))
    else:
        print(0)
    db.close()
except Exception:
    print(0)
" 2>/dev/null || echo 0)
  echo "Images in briefing DB: $BRIEFING_IMGS"

  # Validate
  if [ "$BRIEFING_IMGS" -gt 0 ] && [ "$IMG_COUNT" -lt 1 ]; then
    echo "BLOCKED: Briefing has $BRIEFING_IMGS images but ZERO were downloaded to public/images/"
    exit 1
  fi

  if [ "$BRIEFING_IMGS" -gt 0 ] && [ "$IMG_TAGS" -lt 1 ]; then
    echo "BLOCKED: $IMG_COUNT images available but ZERO <img> tags in sections"
    echo "ACTION: Use real images in sections (not placeholders)."
    exit 1
  fi

  echo "OK: $IMG_COUNT downloaded, $IMG_TAGS used in sections (briefing has $BRIEFING_IMGS)"
fi

echo "=== GATE IMAGES: PASS ==="
exit 0
