---
name: site-phase-7
description: Fase 7 do build-site — Loop de qualidade com Playwright (score >= 9.0 obrigatorio)
user-invocable: false
effort: high
---

# Fase 7 — Loop de Qualidade

Este e um LOOP. Nao saia ate TODAS as condicoes serem satisfeitas.

## GATE 1 — Score automatico >= 9.0

Inicie dev server em background:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm run dev
```
(Use run_in_background: true. Espere 5 segundos.)

Execute validacao (27 checks UX/UI automaticos, score 0-10):
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/python sites/_templates/playwright-validate.py http://localhost:5180 sites/$LEAD_ID/screenshots
```

Se score < 9.0 (exit code 1):
1. Leia CADA 🔴 CRITICO e ❌ FAIL
2. Corrija no codigo
3. Mate server: `pkill -f "vite.*5180" 2>/dev/null; true`
4. Reinicie: `cd sites/$LEAD_ID && npm run dev` (background)
5. Re-execute script
6. **LOOP ate score >= 9.0**

## GATE 2 — Analise visual critica

**REGRA ANTI-MENTIRA: Na primeira analise, voce DEVE encontrar pelo menos 3 pontos de melhoria.** Se achar "tudo perfeito", voce esta priorizando velocidade. PARE e olhe de novo.

Leia screenshot da referencia 10/10:
```
Read: sites/$LEAD_ID/screenshots/referencia-10-10.png
```

Leia screenshots do site:
```
Read: sites/$LEAD_ID/screenshots/fullpage-mobile.png
```

COMPARE e responda por escrito:

**a) MEDIR concretamente:**
- Padding do hero: ~Xpx meu vs ~Ypx referencia
- Espaco entre secoes: ~Xpx meu vs ~Ypx referencia
- h1 size: ~Xpx, h2: ~Ypx — hierarquia suficiente?

**b) Qualidade vs referencia:**
- Fotos sao as MELHORES do briefing? Tem melhor nao usada?
- Cores transmitem essencia do cliente?
- Tipografia cria hierarquia clara?
- Espacamentos generosos como referencia?
- Botoes tem presenca visual?

**c) Mobile-specific (CRITICO):**
- Touch targets >= 44x44px?
- Textos legiveis sem zoom (>= 16px)?
- Cards empilham bem?
- Hamburger visivel e acessivel?
- CTA grande para polegar?
- Scroll natural sem buracos?

**d) Encantamento:**
- Parece site de R$50K? Se NAO, O QUE FALTA?
- Alguem mandaria link dizendo "olha que incrivel"? Se NAO, POR QUE?
- Onde perde para referencia 10/10?

**e) Liste 3+ pontos de melhoria.**

Repita para desktop:
```
Read: sites/$LEAD_ID/screenshots/fullpage-desktop.png
```
Desktop extra: layout usa espaco? Transicao mobile→desktop harmoniosa? Hover states?

## GATE 3 — Correcao e re-validacao

Para CADA ponto de melhoria:
1. Corrija no codigo
2. Mate server + reinicie
3. Re-execute playwright-validate.py (score >= 9.0 AINDA?)
4. Re-tire screenshots
5. **QUALQUER correcao — mesmo so desktop — OBRIGA re-validar mobile.** Leia fullpage-mobile.png e confirme que nao regrediu. Mobile NUNCA pode regredir.
6. Re-analise: aprovar SE satisfeito E comparavel a referencia E mobile impecavel

## GATE 4 — Auditoria SEO (claude-seo)

Apos os Gates 1-3 passarem, execute a auditoria SEO no site local:

Invoque: `/seo page http://localhost:5180`

Leia o relatorio gerado. Para CADA problema encontrado:
1. Corrija no codigo (meta tags, schema, headings, alt text, hreflang, sitemap, etc.)
2. Re-execute `/seo page http://localhost:5180` para confirmar correcao
3. **LOOP ate o SEO Health Score estar aceitavel (sem criticos)**

Se a auditoria sugerir:
- Schema markup faltando → adicionar no JsonLd.jsx
- Alt text ruim → corrigir nas imagens
- Heading hierarchy quebrada → ajustar nos componentes
- hreflang incompleto → corrigir no index.html
- Meta description fraca → reescrever
- E-E-A-T signals baixos → adicionar dados factuais do briefing (CRM, formacao, premios)
- AI citation readiness baixo → estruturar texto para LLMs extrairem

Apos correcoes SEO, re-executar playwright-validate.py para confirmar que score visual >= 9.0 AINDA (correcoes SEO podem afetar layout). Re-validar mobile.

## CONDICAO DE SAIDA DO LOOP
Todas estas devem ser TRUE:
- [ ] Score visual automatico >= 9.0
- [ ] 3+ melhorias visuais encontradas e corrigidas
- [ ] Mobile impecavel (touch targets, legibilidade, layout)
- [ ] Desktop impecavel (hover, espaco, transicao)
- [ ] "Parece R$50K?" = SIM
- [ ] Comparacao com referencia 10/10 favoravel
- [ ] Auditoria SEO sem problemas criticos
- [ ] Correcoes SEO aplicadas e re-validadas

Se QUALQUER uma for FALSE, CONTINUAR no loop.

Mate o dev server ao sair: `pkill -f "vite.*5180" 2>/dev/null; true`
