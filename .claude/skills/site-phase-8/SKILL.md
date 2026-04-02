---
name: site-phase-8
description: Fase 8 do build-site — Build final e deploy no Cloudflare Pages
user-invocable: false
---

# Fase 8 — Build + Deploy

## 8.1 Build final
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm run build
```
Deve completar sem erros. Se falhar, corrija.

## 8.2 Deploy Cloudflare Pages
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID
wrangler pages deploy dist/ --project-name SLUG-LIMPO
```
Slug: lowercase, hifens, sem acentos (ex: `dra-ariel-cordova`).

## 8.3 Apresentar resultado
```
========================================
  SITE PRONTO!
========================================
  Cliente: [nome]
  URL: https://[slug].pages.dev
  Conceito: "[frase]"
  Secoes: [lista]
  Idiomas: PT-BR + EN
  Score qualidade: [X]/10
  Pasta: sites/[lead_id]/
  Screenshots: sites/[lead_id]/screenshots/

  Rodar local: cd sites/[lead_id] && npm run dev
  Re-deploy: cd sites/[lead_id] && npm run build && wrangler pages deploy dist/
========================================
```

## CRITERIO DE CONCLUSAO
- `npm run build` passou sem erros
- `wrangler pages deploy` executou com sucesso
- URL do site mostrada ao usuario
