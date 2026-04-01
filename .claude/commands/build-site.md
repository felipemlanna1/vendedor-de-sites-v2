SEMPRE comece mostrando este guia ao usuario:

```
========================================
  BUILD SITE — Gerador de Sites React
  Custo: $0 | Sites nivel Awwwards
========================================

O QUE FAZ:
  Le o briefing de um cliente no vendedor.db
  e gera um site React premium com animacoes,
  i18n PT-BR/EN, SEO extremo, validado via
  Playwright, deployado no Cloudflare Pages.

PARAMETROS:
  --id "X"       ID do briefing ou lead_id (obrigatorio)
  --source "X"   instagram ou gmaps (opcional)

EXEMPLOS:
  /build-site --id 5
  /build-site --id "arielcordova.dermato" --source "instagram"
========================================
```

Agora lance o agent orchestrator `site-builder` para executar o pipeline completo de 8 fases.

Passe como contexto: os argumentos recebidos ($ARGUMENTS), o caminho base (/Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2), e instrua-o a seguir o pipeline fase por fase.

O agent tem acesso a todas as tools necessarias e invoca as skills de cada fase automaticamente.

## FASE FINAL — Marcar no banco

OBRIGATORIO apos deploy bem sucedido. Marcar o lead como site construido:

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/python3 -c "
import sqlite3
db = sqlite3.connect('data/vendedor.db')
# Garantir colunas existem
for col in ['site_built INTEGER DEFAULT 0', 'site_sold INTEGER DEFAULT 0', 'site_url TEXT DEFAULT \"\"', 'site_built_at TEXT DEFAULT \"\"']:
    try: db.execute(f'ALTER TABLE briefings ADD COLUMN {col}')
    except: pass
# Marcar como construido
db.execute('''UPDATE briefings SET 
    site_built = 1, 
    site_url = 'URL_DO_DEPLOY',
    site_built_at = datetime('now'),
    updated_at = datetime('now')
WHERE lead_id = 'LEAD_ID_AQUI'
''')
db.commit()
db.close()
print('Site marcado como construido no banco.')
"
```

Substituir `URL_DO_DEPLOY` pela URL do Cloudflare Pages e `LEAD_ID_AQUI` pelo lead_id.

**NOTA:** `site_sold` deve ser marcado manualmente pelo vendedor quando a venda for confirmada. O build marca apenas `site_built = 1`.
