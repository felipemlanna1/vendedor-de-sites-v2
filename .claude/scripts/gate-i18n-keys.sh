#!/usr/bin/env bash
# gate-i18n-keys.sh — Compare JSON keys in pt-BR.json and en.json recursively
# Usage: gate-i18n-keys.sh <LEAD_ID>
# Reports keys missing in either direction
# Exit 0 if identical keys, exit 1 if different

set -euo pipefail
BASE="/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2"

LEAD_ID="${1:-}"
if [ -z "$LEAD_ID" ]; then
  echo "ERROR: Usage: gate-i18n-keys.sh <LEAD_ID>"
  exit 1
fi

PT_FILE="$BASE/sites/$LEAD_ID/src/i18n/pt-BR.json"
EN_FILE="$BASE/sites/$LEAD_ID/src/i18n/en.json"

echo "=== GATE: I18N KEYS ==="

if [ ! -f "$PT_FILE" ]; then
  echo "BLOCKED: $PT_FILE does not exist"
  exit 1
fi
if [ ! -f "$EN_FILE" ]; then
  echo "BLOCKED: $EN_FILE does not exist"
  exit 1
fi

RESULT=$(python3 -c "
import json, sys

def get_keys(obj, prefix=''):
    keys = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            full = f'{prefix}.{k}' if prefix else k
            if isinstance(v, dict):
                keys.update(get_keys(v, full))
            else:
                keys.add(full)
    return keys

with open('$PT_FILE', 'r') as f:
    pt = json.load(f)
with open('$EN_FILE', 'r') as f:
    en = json.load(f)

pt_keys = get_keys(pt)
en_keys = get_keys(en)

missing_in_en = sorted(pt_keys - en_keys)
missing_in_pt = sorted(en_keys - pt_keys)

failed = False
if missing_in_en:
    print(f'Keys in pt-BR.json but MISSING in en.json ({len(missing_in_en)}):')
    for k in missing_in_en:
        print(f'  - {k}')
    failed = True

if missing_in_pt:
    print(f'Keys in en.json but MISSING in pt-BR.json ({len(missing_in_pt)}):')
    for k in missing_in_pt:
        print(f'  - {k}')
    failed = True

if not failed:
    print(f'OK: Both files have identical keys ({len(pt_keys)} keys)')
    sys.exit(0)
else:
    print(f'BLOCKED: Key mismatch detected')
    sys.exit(1)
" 2>&1)

echo "$RESULT"

# Propagate python exit code
if echo "$RESULT" | grep -q "BLOCKED"; then
  echo "=== GATE I18N KEYS: FAIL ==="
  exit 1
fi

echo "=== GATE I18N KEYS: PASS ==="
exit 0
