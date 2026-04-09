#!/bin/bash
set -euo pipefail

REPORT="${1:-}"
GATE="${2:-}"

if [ -z "$REPORT" ] || [ -z "$GATE" ]; then
  echo "Usage: check-gate.sh <report-file> <gate-name>"
  echo "Exit 0 = PASS, Exit 1 = FAIL"
  exit 1
fi

if [ ! -f "$REPORT" ]; then
  echo "GATE $GATE: FAIL - Report not found: $REPORT"
  echo ""
  echo "A fase anterior NAO produziu o relatorio obrigatorio."
  echo "Volte e execute a fase corretamente antes de prosseguir."
  exit 1
fi

CRITICAL_COUNT=0
FAIL_COUNT=0

if grep -cq "CRITICAL.*FAIL\|CRITICAL.*:.*[1-9]\|\[CRITICAL\]" "$REPORT" 2>/dev/null; then
  CRITICAL_COUNT=$(grep -c "CRITICAL" "$REPORT" 2>/dev/null || echo "0")
fi

if grep -q "Overall:.*FAIL\|Overall:.*CHANGES REQUESTED\|Overall:.*INCOMPLETE" "$REPORT" 2>/dev/null; then
  FAIL_COUNT=1
fi

if grep -q "BLOCK" "$REPORT" 2>/dev/null; then
  FAIL_COUNT=1
fi

if [ "$CRITICAL_COUNT" -gt 0 ] || [ "$FAIL_COUNT" -gt 0 ]; then
  echo "GATE $GATE: FAIL"
  echo ""
  echo "Issues encontrados:"
  grep -n "CRITICAL\|FAIL\|BLOCK\|INCOMPLETE" "$REPORT" 2>/dev/null | head -20
  echo ""
  echo "Relatorio completo: $REPORT"
  exit 1
fi

# Fase 4 especifica (build-site): verificar que imagens foram baixadas
if echo "$REPORT" | grep -q "site-.*/phase4"; then
  LEAD_SLUG=$(echo "$REPORT" | sed -n 's|.*site-\([^/]*\)/phase4.*|\1|p')
  SITE_DIR="sites/$LEAD_SLUG"
  IMG_DIR="$SITE_DIR/public/images"
  IMG_COUNT=$(find "$IMG_DIR" -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) -size +5k 2>/dev/null | wc -l | tr -d ' ')
  if [ "$IMG_COUNT" -eq 0 ]; then
    echo "GATE $GATE: FAIL"
    echo ""
    echo "Nenhuma imagem real encontrada em $IMG_DIR (>5KB)"
    echo "A Fase 4 DEVE baixar imagens do briefing. Use Playwright se curl falhar."
    exit 1
  fi
  echo "Imagens verificadas: $IMG_COUNT arquivos >5KB em $IMG_DIR"
fi

# Fase 7 especifica (build-site): verificar que visual-analysis.md existe e tem conteudo real
if echo "$REPORT" | grep -q "site-.*/phase7"; then
  LEAD_SLUG7=$(echo "$REPORT" | sed -n 's|.*site-\([^/]*\)/phase7.*|\1|p')
  SITE_DIR="sites/$LEAD_SLUG7"
  VISUAL_ANALYSIS="$SITE_DIR/visual-analysis.md"

  if [ ! -f "$VISUAL_ANALYSIS" ]; then
    echo "GATE $GATE: FAIL"
    echo ""
    echo "visual-analysis.md NAO EXISTE em $VISUAL_ANALYSIS"
    echo "A Fase 7 EXIGE analise visual escrita com problemas encontrados e corrigidos."
    echo "Voce NAO pode aprovar o gate sem ter analisado os screenshots de verdade."
    exit 1
  fi

  CHAR_COUNT=$(wc -c < "$VISUAL_ANALYSIS" | tr -d ' ')
  if [ "$CHAR_COUNT" -lt 500 ]; then
    echo "GATE $GATE: FAIL"
    echo ""
    echo "visual-analysis.md tem apenas ${CHAR_COUNT} caracteres (minimo: 500)"
    echo "Uma analise visual real descreve problemas encontrados, como foram corrigidos,"
    echo "e compara o site contra o mapa de encantamento. ${CHAR_COUNT} caracteres NAO e analise."
    exit 1
  fi

  # Verificar que tem secoes obrigatorias
  MISSING_SECTIONS=""
  grep -q "Problemas encontrados" "$VISUAL_ANALYSIS" || MISSING_SECTIONS="${MISSING_SECTIONS} 'Problemas encontrados'"
  grep -q "mapa de encantamento\|Comparacao" "$VISUAL_ANALYSIS" || MISSING_SECTIONS="${MISSING_SECTIONS} 'Comparacao com mapa'"
  grep -q "Veredito\|R\$50K\|50K" "$VISUAL_ANALYSIS" || MISSING_SECTIONS="${MISSING_SECTIONS} 'Vereditos'"

  if [ -n "$MISSING_SECTIONS" ]; then
    echo "GATE $GATE: FAIL"
    echo ""
    echo "visual-analysis.md existe mas faltam secoes obrigatorias:${MISSING_SECTIONS}"
    echo "A analise deve conter: problemas encontrados, comparacao com mapa, vereditos."
    exit 1
  fi

  echo "visual-analysis.md verificado: ${CHAR_COUNT} chars, secoes obrigatorias presentes."
fi

echo "GATE $GATE: PASS"
exit 0
