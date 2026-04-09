#!/usr/bin/env bash
# gate-anti-similarity.sh — Combined anti-repetition gate
# Usage: gate-anti-similarity.sh <LEAD_ID> [--report-only] [--navbar-only]
# Checks fonts, layouts, animations, banned timings, hero layout, navbar pattern
# Exit 0 on pass (or --report-only), exit 1 on failure

set -uo pipefail
BASE="/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2"

LEAD_ID="${1:-}"
if [ -z "$LEAD_ID" ]; then
  echo "ERROR: Usage: gate-anti-similarity.sh <LEAD_ID> [--report-only] [--navbar-only]"
  exit 1
fi

REPORT_ONLY=false
NAVBAR_ONLY=false
for arg in "${@:2}"; do
  case "$arg" in
    --report-only) REPORT_ONLY=true ;;
    --navbar-only) NAVBAR_ONLY=true ;;
  esac
done

CURRENT="$BASE/sites/$LEAD_ID"
FAILED=false

fail() {
  if [ "$REPORT_ONLY" = true ]; then
    echo "WARN: $1"
  else
    echo "BLOCKED: $1"
    FAILED=true
  fi
}

# --- Navbar pattern check (always runs) ---
echo "=== NAVBAR PATTERN ==="
LAST_NAVBAR=$(ls -td "$BASE"/sites/*/src/components/layout/Navbar.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -1)
if [ -f "$LAST_NAVBAR" ] && [ -f "$CURRENT/src/components/layout/Navbar.jsx" ]; then
  LAST_SITE=$(echo "$LAST_NAVBAR" | sed 's|.*/sites/||;s|/src/.*||')
  LAST_FIXED=$(grep -c "fixed\|sticky" "$LAST_NAVBAR" 2>/dev/null || true)
  LAST_TRANSPARENT=$(grep -c "transparent\|bg-transparent\|backdrop" "$LAST_NAVBAR" 2>/dev/null || true)
  CURR_FIXED=$(grep -c "fixed\|sticky" "$CURRENT/src/components/layout/Navbar.jsx" 2>/dev/null || true)
  CURR_TRANSPARENT=$(grep -c "transparent\|bg-transparent\|backdrop" "$CURRENT/src/components/layout/Navbar.jsx" 2>/dev/null || true)
  echo "  Last ($LAST_SITE): fixed=$LAST_FIXED transparent=$LAST_TRANSPARENT"
  echo "  Current ($LEAD_ID): fixed=$CURR_FIXED transparent=$CURR_TRANSPARENT"

  # Detect if both are same pattern (both fixed+transparent or both fixed+opaque)
  if [ "$LAST_FIXED" -gt 0 ] && [ "$CURR_FIXED" -gt 0 ] && [ "$LAST_TRANSPARENT" -gt 0 ] && [ "$CURR_TRANSPARENT" -gt 0 ]; then
    fail "Navbar uses same fixed+transparent pattern as last site ($LAST_SITE). Change style."
  elif [ "$LAST_FIXED" -gt 0 ] && [ "$CURR_FIXED" -gt 0 ] && [ "$LAST_TRANSPARENT" -eq 0 ] && [ "$CURR_TRANSPARENT" -eq 0 ]; then
    fail "Navbar uses same fixed+opaque pattern as last site ($LAST_SITE). Change style."
  else
    echo "OK: Navbar has different pattern from last site"
  fi
else
  echo "INFO: No previous navbar to compare (or current navbar missing)"
fi

if [ "$NAVBAR_ONLY" = true ]; then
  if [ "$FAILED" = true ]; then exit 1; fi
  echo "=== NAVBAR-ONLY CHECK: PASS ==="
  exit 0
fi

# --- Fonts not repeated from last 3 sites ---
echo ""
echo "=== FONT REPETITION CHECK ==="
FONT_ISSUES=false
if [ -f "$CURRENT/src/main.jsx" ]; then
  CURR_FONTS=$(grep '@fontsource' "$CURRENT/src/main.jsx" 2>/dev/null | sed 's/.*@fontsource\///' | sed "s/[/\"';].*//" | tr '[:upper:]' '[:lower:]' | sort -u)
  for f in $(ls -td "$BASE"/sites/*/src/main.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -3); do
    PREV_FONTS=$(grep '@fontsource' "$f" 2>/dev/null | sed 's/.*@fontsource\///' | sed "s/[/\"';].*//" | tr '[:upper:]' '[:lower:]' | sort -u)
    PREV_SITE=$(echo "$f" | sed 's|.*/sites/||;s|/src/main.jsx||')
    for font in $CURR_FONTS; do
      if echo "$PREV_FONTS" | grep -qw "$font" 2>/dev/null; then
        fail "Font '$font' already used in $PREV_SITE. Choose another."
        FONT_ISSUES=true
      fi
    done
  done
  if [ "$FONT_ISSUES" = false ]; then
    echo "OK: Fonts are original"
  fi
else
  echo "INFO: No main.jsx found for $LEAD_ID"
fi

# --- Layout diversity: 3+ different layout types ---
echo ""
echo "=== LAYOUT DIVERSITY ==="
SECTIONS_DIR="$CURRENT/src/components/sections"
if [ -d "$SECTIONS_DIR" ]; then
  SPLIT=$(grep -rl 'md:flex-row\|grid-cols-2' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  GRID=$(grep -rl 'grid-cols-[34]' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  CENTER=$(grep -rl 'text-center.*mx-auto\|items-center.*justify-center.*min-h' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  BENTO=$(grep -rl 'grid-template\|bento\|masonry\|asymmetric\|2fr\|3fr' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  OTHER=$(grep -rl 'scroll-snap\|timeline\|accordion\|sticky.*pin\|horizontal' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')

  TYPES=0
  [ "$SPLIT" -gt 0 ] && TYPES=$((TYPES+1))
  [ "$GRID" -gt 0 ] && TYPES=$((TYPES+1))
  [ "$CENTER" -gt 0 ] && TYPES=$((TYPES+1))
  [ "$BENTO" -gt 0 ] && TYPES=$((TYPES+1))
  [ "$OTHER" -gt 0 ] && TYPES=$((TYPES+1))

  echo "Layout types: $TYPES (split=$SPLIT grid=$GRID center=$CENTER bento=$BENTO other=$OTHER)"
  if [ "$TYPES" -lt 3 ]; then
    fail "Only $TYPES layout types found. Need 3+ different types."
  fi
else
  echo "INFO: No sections directory found"
fi

# --- Animation diversity: 3+ different animation types ---
echo ""
echo "=== ANIMATION DIVERSITY ==="
if [ -d "$SECTIONS_DIR" ]; then
  ANIM_Y=$(grep -rl 'opacity.*0.*y:' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  ANIM_SCALE=$(grep -rl 'scale' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  ANIM_CLIP=$(grep -rl 'clipPath\|clip-path' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  ANIM_ROTATE=$(grep -rl 'rotate' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  ANIM_X=$(grep -rl 'opacity.*0.*x:' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')
  ANIM_BLUR=$(grep -rl 'blur(' "$SECTIONS_DIR"/*.jsx 2>/dev/null | wc -l | tr -d ' ')

  ANIM_TYPES=0
  [ "$ANIM_Y" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
  [ "$ANIM_SCALE" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
  [ "$ANIM_CLIP" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
  [ "$ANIM_ROTATE" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
  [ "$ANIM_X" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
  [ "$ANIM_BLUR" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))

  echo "Animation types: $ANIM_TYPES (translateY=$ANIM_Y scale=$ANIM_SCALE clip-path=$ANIM_CLIP rotate=$ANIM_ROTATE translateX=$ANIM_X blur=$ANIM_BLUR)"
  if [ "$ANIM_TYPES" -lt 3 ]; then
    fail "Only $ANIM_TYPES animation types found. Need 3+ different types."
  fi
else
  echo "INFO: No sections directory found"
fi

# --- Banned timings from old template ---
echo ""
echo "=== BANNED TIMINGS ==="
if [ -d "$CURRENT/src/components" ]; then
  TIMING_FAIL=false
  if grep -r "duration.*0\.8.*ease.*power3" "$CURRENT/src/components/ui/" 2>/dev/null | grep -q "y.*60"; then
    fail "ScrollReveal with old template timings detected (y:60 duration:0.8 power3.out)"
    TIMING_FAIL=true
  fi
  if grep -r "delay.*0\.08.*ease.*0\.25.*0\.46" "$CURRENT/src/components/" 2>/dev/null | grep -q "."; then
    fail "AnimatedText with old template timings detected (delay:i*0.08 ease:[0.25,0.46,0.45,0.94])"
    TIMING_FAIL=true
  fi
  if [ "$TIMING_FAIL" = false ]; then
    echo "OK: No banned timings found"
  fi
fi

# --- Hero layout different from last site ---
echo ""
echo "=== HERO LAYOUT ==="
LAST_HERO=$(ls -td "$BASE"/sites/*/src/components/sections/Hero.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -1)
if [ -f "$LAST_HERO" ] && [ -f "$CURRENT/src/components/sections/Hero.jsx" ]; then
  LAST_SPLIT=$(grep -c "md:flex-row\|grid-cols-2" "$LAST_HERO" 2>/dev/null || true)
  CURR_SPLIT=$(grep -c "md:flex-row\|grid-cols-2" "$CURRENT/src/components/sections/Hero.jsx" 2>/dev/null || true)
  LAST_FULL=$(grep -c "min-h-screen\|min-h-\[100" "$LAST_HERO" 2>/dev/null || true)
  CURR_FULL=$(grep -c "min-h-screen\|min-h-\[100" "$CURRENT/src/components/sections/Hero.jsx" 2>/dev/null || true)

  LAST_SITE=$(echo "$LAST_HERO" | sed 's|.*/sites/||;s|/src/.*||')
  if [ "$LAST_SPLIT" -gt 0 ] && [ "$CURR_SPLIT" -gt 0 ]; then
    fail "Hero uses split layout — same as last site ($LAST_SITE). Change to another layout."
  elif [ "$LAST_FULL" -gt 0 ] && [ "$CURR_FULL" -gt 0 ] && [ "$LAST_SPLIT" -eq 0 ] && [ "$CURR_SPLIT" -eq 0 ]; then
    fail "Hero uses fullscreen layout — same as last site ($LAST_SITE). Change to another layout."
  else
    echo "OK: Hero has different layout from last site ($LAST_SITE)"
  fi
else
  echo "INFO: No previous hero to compare (or current hero missing)"
fi

# --- Final verdict ---
echo ""
if [ "$FAILED" = true ]; then
  echo "=== GATE ANTI-SIMILARITY: FAIL ==="
  exit 1
else
  echo "=== GATE ANTI-SIMILARITY: PASS ==="
  exit 0
fi
