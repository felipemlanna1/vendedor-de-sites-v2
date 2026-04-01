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
