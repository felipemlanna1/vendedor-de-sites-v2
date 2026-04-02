---
name: site-phase-1
description: Fase 1 do build-site — Carregar briefing do vendedor.db
user-invocable: false
---

# Fase 1 — Carregar Briefing

Receba o ID do briefing dos argumentos passados pelo orchestrator.

Execute substituindo ID_AQUI:

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/python3 -c "
import sqlite3, json, sys
db = sqlite3.connect('data/vendedor.db')
row = db.execute('SELECT id, lead_source, lead_id, lead_name, lead_city, detected_niche, briefing_json FROM briefings WHERE id = ? OR lead_id = ?', ('ID_AQUI', 'ID_AQUI')).fetchone()
if not row: print('ERRO: Briefing nao encontrado'); sys.exit(1)
b = json.loads(row[6])
print(json.dumps({'db_id':row[0],'source':row[1],'lead_id':row[2],'name':row[3],'city':row[4],'niche':row[5],'data_points':len(b.get('data_points',[])), 'briefing':b}, ensure_ascii=False, indent=2))
db.close()
"
```

Salve todo o JSON retornado — voce precisa de TODOS os data_points nas fases seguintes.

Mostre ao usuario: nome, cidade, nicho, total data_points, total imagens.

Salve o lead_id no state:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
mkdir -p sites/_state
echo '{"current_phase":1,"lead_id":"LEAD_ID_AQUI","phases":{"phase_1":{"status":"complete"}}}' > sites/_state/progress.json
```

## CRITERIO DE CONCLUSAO
- Briefing carregou com sucesso (nao deu erro)
- lead_id salvo no state file
- Usuario viu o resumo
