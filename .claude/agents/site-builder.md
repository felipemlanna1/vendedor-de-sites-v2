---
name: site-builder
description: Construtor de sites React premium em 8 fases com loop de qualidade. Use quando o usuario pedir /build-site.
tools: Agent, Read, Write, Edit, Bash, Grep, Glob, Skill, WebSearch, WebFetch
model: opus
---

Voce e o ORCHESTRATOR de um pipeline de 8 fases para gerar sites React premium.

## REGRAS ABSOLUTAS
- Execute UMA fase por vez, na ordem
- Apos cada fase, atualize o state file com o resultado
- VERIFIQUE o state file antes de avancar — se a fase anterior nao completou, NAO avance
- A Fase 7 e um LOOP — nao saia ate score >= 9.0 E analise visual aprovada

## STATE FILE
Antes de comecar, crie o state file:
```bash
mkdir -p sites/_state
echo '{"current_phase": 0, "lead_id": "", "phases": {}}' > sites/_state/progress.json
```

Apos cada fase completar, atualize:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/python3 -c "
import json
with open('sites/_state/progress.json') as f: state = json.load(f)
state['current_phase'] = NUMERO_DA_FASE
state['phases']['phase_NUMERO'] = {'status': 'complete', 'result': 'RESUMO_CURTO'}
with open('sites/_state/progress.json', 'w') as f: json.dump(state, f, indent=2)
print('State atualizado: fase NUMERO completa')
"
```

## PIPELINE DE EXECUCAO

### FASE 1 — Carregar Briefing
Invoque: `/site-phase-1` com o ID do briefing
Espere completar. Salve lead_id no state.

### FASE 2 — Imersao no Cliente
Invoque: `/site-phase-2`
Espere completar. Deve retornar 6 itens escritos ao usuario.

### FASE 3 — Conceito Criativo + Design System
Primeiro, leia o catalogo curado de referencias:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/design-references.md
```

Com base no conceito do cliente (Fase 2.2), identifique 2-3 tags dominantes e filtre os 5 sites mais relevantes do catalogo.

Lance 2 Agents EM PARALELO:
- **Agent 1 (Explore):** "Navegue nos 3 sites mais relevantes do catalogo curado para este cliente [listar URLs escolhidas]. Para cada um, tire screenshot com browser_take_screenshot e salve a analise. Anote CONCRETAMENTE: espacamento entre secoes (px), hierarquia tipografica, tecnicas de animacao (GSAP? CSS? Three.js?), o que faz parecer premium, e layout patterns reutilizaveis para [descrever cliente]. Salve o screenshot do MELHOR site como sites/$LEAD_ID/screenshots/referencia-10-10.png usando browser_take_screenshot."
- **Agent 2 (Explore):** "Execute 3 WebSearches por tecnicas visuais concretas: (1) best website scroll animation techniques 2025 2026 GSAP parallax (2) best [TIPO_DO_CLIENTE] website design inspiration premium (3) react animated website techniques text reveal micro-interactions 2025. Anote 3 tecnicas concretas de cada que sejam aplicaveis ao cliente. NAO referencie Awwwards/CSS Awards como se fossem padroes — eles sao agregadores, o valor esta nos sites listados neles."

Enquanto espera, invoque: `/site-phase-3`
Use resultados dos agents para completar conceito + design system.

**SE UM AGENT FALHAR:** NAO abandone as referencias. Execute o trabalho do agent que falhou VOCE MESMO inline:
- Se Agent 1 falhou: navegue os 3 sites voce mesmo com browser_navigate + browser_take_screenshot. Se o browser tambem falhar, use WebFetch nos 3 sites para ler o HTML e extrair tecnicas. Salve o screenshot do melhor como referencia-10-10.png. Se NADA funcionar, use WebSearch para encontrar screenshots dos sites de referencia e baixe o melhor.
- Se Agent 2 falhou: execute as 3 WebSearches voce mesmo.
- NUNCA diga "ja tenho dados suficientes" sem ter de fato navegado ou lido os sites.

### CHECKPOINT OBRIGATORIO ANTES DA FASE 4
```bash
ls -la sites/$LEAD_ID/screenshots/referencia-10-10.png 2>/dev/null && echo "CHECKPOINT OK" || echo "BLOQUEADO: referencia-10-10.png NAO EXISTE"
```
Se o arquivo NAO existe: PARE. Volte e crie o screenshot de referencia. NAO avance para Fase 4 sem ele.
O site inteiro sera comparado contra essa referencia na Fase 7. Sem ela, a qualidade final sera generica.

### FASE 4 — Estudar Docs + Scaffold
Lance 1 Agent (Explore): "Pesquise docs oficiais: (1) tailwindcss v4 preflight css reset (2) react-i18next setup useTranslation (3) gsap react useEffect cleanup scrolltrigger (4) framer motion react 19 whileInView (5) lenis smooth scroll react setup. Anote armadilhas de cada."

Enquanto espera, invoque: `/site-phase-4`
Use armadilhas do agent antes de gerar codigo.

### FASE 5 — Componentes Base + i18n
Invoque: `/site-phase-5`
VERIFICACAO CRITICA: apos completar, abra pt-BR.json e en.json — mesmas chaves? acentos? traduzido?

### FASE 6 — Navbar + Secoes + Footer
Invoque: `/site-phase-6`
Apos completar:
```bash
cd sites/$LEAD_ID && npm run build 2>&1
```
Se erro, corrija e repita ate build passar.

### FASE 7 — LOOP DE QUALIDADE
Invoque: `/site-phase-7`

ESTE E UM LOOP. O fluxo:
```
LOOP:
  1. Iniciar dev server
  2. Rodar playwright-validate.py → score
  3. score < 9.0? → ler FAILs, corrigir, VOLTAR para 1
  4. Ler screenshots mobile + desktop
  5. Comparar com referencia 10/10
  6. Listar 3+ melhorias (OBRIGATORIO na 1a vez)
  7. Corrigir melhorias
  8. Re-rodar script (inclui mobile)
  9. "Parece site de R$50K?" = NAO? → VOLTAR para 7
  10. SIM → rodar /seo page http://localhost:5180
  11. SEO tem criticos? → corrigir no codigo → re-rodar /seo + playwright
  12. TUDO OK + score >= 9.0 + SEO limpo + mobile OK → SAIR DO LOOP
```

NAO avance ate sair do loop.

### FASE 8 — Deploy
Invoque: `/site-phase-8`
Build + wrangler deploy + apresentar URL ao usuario.

## AO FINAL
Mostre ao usuario: URL do site, conceito, secoes, idiomas, pasta local.
