---
name: site-phase-7
description: Fase 7 do build-site — Loop de qualidade com Playwright (score >= 9.0 obrigatorio)
user-invocable: false
effort: high
---

# Fase 7 — Loop de Qualidade

Este e um LOOP. Nao saia ate TODAS as condicoes serem satisfeitas.

## GATE 0 — Verificar pre-requisitos (ANTES DE TUDO)

```bash
echo "=== PRE-REQUISITOS FASE 7 ===" && \
ls -la sites/$LEAD_ID/screenshots/referencia-10-10.png 2>/dev/null && echo "✅ referencia-10-10.png EXISTE" || (echo "❌ BLOQUEADO: referencia-10-10.png NAO EXISTE" && echo "ACAO: Volte para a Fase 3, secao 3.1, e crie o screenshot de referencia ANTES de continuar." && exit 1)
```

**Se `referencia-10-10.png` NAO existe: PARE IMEDIATAMENTE.**
NAO prossiga com a Fase 7. Volte para a Fase 3 e crie o screenshot.
Sem referencia, o Gate 2 (analise visual) sera impossivel e o site ficara generico.
Isso aconteceu antes e o resultado foi um site sem wow moments — NUNCA mais.

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

## GATE 2 — Analise visual critica (OBRIGATORIO — NAO PODE SER PULADO)

**Este gate e SEPARADO do Gate 1.** Score 9.0+ NAO significa que o Gate 2 esta aprovado.
O Gate 1 mede tecnicalidades (contraste, touch targets, broken images).
O Gate 2 mede QUALIDADE VISUAL e ENCANTAMENTO — o que faz alguem querer comprar o site.

**REGRA ANTI-MENTIRA: Na primeira analise, voce DEVE encontrar pelo menos 3 pontos de melhoria.** Se achar "tudo perfeito", voce esta priorizando velocidade. PARE e olhe de novo.

### Passo 1 — Ler referencia E site lado a lado

Leia a referencia 10/10 PRIMEIRO:
```
Read: sites/$LEAD_ID/screenshots/referencia-10-10.png
```

Depois leia o site mobile:
```
Read: sites/$LEAD_ID/screenshots/fullpage-mobile.png
```

E o site desktop:
```
Read: sites/$LEAD_ID/screenshots/fullpage-desktop.png
```

### Passo 2 — Responder TODAS estas perguntas POR ESCRITO (nao pule nenhuma)

**a) MEDIR concretamente (referencia vs meu site):**
- Padding do hero: ~Xpx referencia vs ~Ypx meu
- Espaco entre secoes: ~Xpx referencia vs ~Ypx meu
- h1 size: ~Xpx referencia vs ~Ypx meu — hierarquia suficiente?
- Qual o "ritmo" do scroll da referencia? E do meu? (rapido/lento/misto/monotono)

**b) Wow moments (CRITICO — o que diferencia um site de R$50K de um template):**
- QUAL e o wow moment do meu site? Descreva em 1 frase. Se nao conseguir descrever, NAO TEM wow moment.
- A referencia tem hero 3D, parallax em camadas, text reveal, particulas, video? O meu tem o que?
- Quantas animacoes DIFERENTES existem? (fade-in repetido NAO conta como variacao)
- Existe algum elemento que SURPREENDE no scroll? Que faz o visitante parar e prestar atencao?
- O site usa alguma lib avancada (Three.js, Lottie, tsParticles)? Se NAO, POR QUE NAO?

**c) Qualidade vs referencia:**
- Fotos sao as MELHORES do briefing? Tem melhor nao usada?
- Cores transmitem essencia do cliente?
- Tipografia cria hierarquia clara?
- Espacamentos generosos como referencia?
- Botoes tem presenca visual?

**d) Mobile-specific:**
- Touch targets >= 44x44px?
- Textos legiveis sem zoom (>= 16px)?
- Cards empilham bem?
- Hamburger visivel e acessivel?
- CTA grande para polegar?
- Scroll natural sem buracos?

**e) Desktop-specific:**
- Layout usa espaco horizontal? Transicao mobile→desktop harmoniosa? Hover states?

**f) Veredito final (responda com HONESTIDADE):**
- "Parece site de R$50K?" → responda SIM ou NAO. Se NAO, liste O QUE FALTA.
- "Alguem mandaria esse link dizendo 'olha que incrivel'?" → responda SIM ou NAO. Se NAO, POR QUE NAO.
- "Se eu fosse o DONO desse negocio, eu ficaria ORGULHOSO deste site?" → SIM ou NAO.
- "Onde meu site perde para a referencia 10/10?" → liste pontos concretos.

### Passo 3 — Liste 3+ pontos de melhoria OBRIGATORIOS

Na primeira passada, voce DEVE listar pelo menos 3 melhorias.
Pelo menos 1 melhoria DEVE ser sobre wow moments/animacoes/encantamento (nao tecnica).
Exemplos de melhorias validas:
- "Adicionar hero 3D com Three.js (WavePlane ou geometria animada)"
- "Trocar fade-in generico por text-stagger com GSAP no titulo principal"
- "Adicionar parallax em camadas entre secoes com ScrollTrigger"
- "Usar tsParticles como background atmosferico no hero"
- "Adicionar Lottie icons animados nos cards de servico"
- "Criar transicao de cor entre secoes (scroll-driven)"

Exemplos de melhorias que NAO contam como wow moment:
- "Aumentar contraste do botao" (tecnico)
- "Corrigir touch target" (tecnico)
- "Melhorar alt text" (SEO)

## GATE 2.5 — Revisao de imagens (coerencia + qualidade)

Para CADA imagem visivel nos screenshots (mobile + desktop), abra o arquivo original com Read:
```
Read: sites/$LEAD_ID/public/images/NOME.jpg
```

Valide TRES coisas:

**a) COERENCIA imagem ↔ contexto (CRITICO):**
O conteudo da imagem bate com o texto/assunto da secao onde esta?
- Secao fala de pizza → imagem mostra pizza? (NAO arroz, NAO salada, NAO pessoa)
- Secao fala de corte de cabelo → imagem mostra barbearia? (NAO restaurante, NAO farmacia)
- Secao fala de imovel → imagem mostra casa/apartamento? (NAO retrato, NAO comida)
Se NAO bate → FAIL CRITICO. Trocar imagem ou remover e compensar com design CSS.

**b) QUALIDADE visual:**
- Resolucao suficiente para o tamanho exibido? (nao pixelada, nao esticada)
- Proporcao correta? (nao distorcida por object-fit errado)
- Contraste com texto sobre ela legivel? (se tem texto overlay)

**c) CONTRIBUICAO:**
- Essa imagem AJUDA ou ATRAPALHA? Imagem ruim e pior que nenhuma imagem.
- Se atrapalha → remover e compensar com tipografia/gradiente/CSS.

Se QUALQUER imagem falhou em coerencia → corrigir ANTES de prosseguir.

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

Todas estas devem ser TRUE — organizadas por gate:

**Gate 1 (Score tecnico):**
- [ ] Score visual automatico >= 9.0
- [ ] Zero checks CRITICOS

**Gate 2 (Qualidade visual — SEPARADO do score):**
- [ ] referencia-10-10.png FOI LIDA e comparada
- [ ] TODAS as perguntas do Passo 2 respondidas POR ESCRITO
- [ ] 3+ melhorias encontradas (pelo menos 1 de wow moment/animacao)
- [ ] Melhorias implementadas e verificadas
- [ ] "Parece R$50K?" = SIM (respondido honestamente)
- [ ] "Alguem mandaria o link?" = SIM (respondido honestamente)
- [ ] "Dono ficaria orgulhoso?" = SIM (respondido honestamente)
- [ ] Site usa pelo menos 1 lib avancada de animacao (GSAP ScrollTrigger, Three.js, Lottie, ou tsParticles) — fade-in com Motion sozinho NAO conta
- [ ] Existe pelo menos 1 "wow moment" descritivel em 1 frase

**Gate 2.5 (Imagens):**
- [ ] TODAS as imagens coerentes com suas secoes
- [ ] Imagens com qualidade/proporcao/contraste adequados

**Gate 3 (Mobile + Desktop):**
- [ ] Mobile impecavel (touch targets, legibilidade, layout)
- [ ] Desktop impecavel (hover, espaco, transicao)

**Gate 4 (SEO):**
- [ ] Auditoria SEO sem problemas criticos
- [ ] Correcoes SEO aplicadas e re-validadas

Se QUALQUER uma for FALSE, CONTINUAR no loop.

**ANTI-ATALHO:** NAO tente sair do loop apenas porque o score >= 9.0. O score mede TECNICA. O Gate 2 mede QUALIDADE. Um site pode ter score 10.0 e ser generico — e isso e INACEITAVEL. O Gate 2 so passa quando o site ENCANTA.

Mate o dev server ao sair: `pkill -f "vite.*5180" 2>/dev/null; true`
