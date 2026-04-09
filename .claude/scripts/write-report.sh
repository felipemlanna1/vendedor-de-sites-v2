#!/bin/bash
set -euo pipefail

# Gera um relatorio padronizado para uma fase do pipeline.
# Usage: write-report.sh <report-path> <phase-name> <pipeline> <id> <status> <summary> [checks...]
#
# Exemplo:
#   write-report.sh .claude/reports/site-usina/phase1-briefing.md \
#     "Phase 1 - Briefing" "build-site" "usina" "PASS" "41 data points carregados" \
#     "PASS:Briefing carregado" "PASS:Imagens encontradas" "PASS:Score calculado"
#
# Checks format: "PASS:descricao" ou "FAIL:descricao" ou "CRITICAL:descricao"

REPORT_PATH="${1:-}"
PHASE_NAME="${2:-}"
PIPELINE="${3:-}"
ID="${4:-}"
STATUS="${5:-}"
SUMMARY="${6:-}"
shift 6 2>/dev/null || true

if [ -z "$REPORT_PATH" ] || [ -z "$PHASE_NAME" ]; then
  echo "Usage: write-report.sh <path> <phase> <pipeline> <id> <status> <summary> [checks...]"
  exit 1
fi

# Criar diretorio se nao existe
mkdir -p "$(dirname "$REPORT_PATH")"

# Gerar relatorio
cat > "$REPORT_PATH" << EOF
# ${PHASE_NAME} Report — ${PIPELINE} — ${ID}

## Resultado
${SUMMARY}

## Self-Check
EOF

# Adicionar checks
for check in "$@"; do
  STATUS_CHECK="${check%%:*}"
  DESC_CHECK="${check#*:}"
  if [ "$STATUS_CHECK" = "PASS" ]; then
    echo "- [x] ${DESC_CHECK}: PASS" >> "$REPORT_PATH"
  elif [ "$STATUS_CHECK" = "FAIL" ]; then
    echo "- [ ] ${DESC_CHECK}: FAIL" >> "$REPORT_PATH"
  elif [ "$STATUS_CHECK" = "CRITICAL" ]; then
    echo "- [ ] [CRITICAL] ${DESC_CHECK}: FAIL" >> "$REPORT_PATH"
  fi
done

echo "" >> "$REPORT_PATH"
echo "Overall: ${STATUS}" >> "$REPORT_PATH"
echo "" >> "$REPORT_PATH"
echo "Generated: $(date -u '+%Y-%m-%dT%H:%M:%SZ')" >> "$REPORT_PATH"

echo "Report written: $REPORT_PATH (Overall: $STATUS)"
