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
ls -la sites/$LEAD_ID/mapa-encantamento.md 2>/dev/null && echo "✅ mapa-encantamento.md EXISTE" || (echo "❌ BLOQUEADO: mapa-encantamento.md NAO EXISTE" && echo "ACAO: Volte para a Fase 3 e crie o mapa de encantamento ANTES de continuar." && exit 1)
```

**Se `mapa-encantamento.md` NAO existe: PARE IMEDIATAMENTE.**
NAO prossiga com a Fase 7. Volte para a Fase 3 e crie o mapa.
Sem o mapa, o Gate 2 (analise visual) nao tem contra o que comparar e o site ficara generico.
Isso aconteceu antes (Usina do Hamburguer) e o resultado foi um site sem wow moments — NUNCA mais.

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

## GATE 1.1 — Sistema de 34 Criterios

O script playwright-validate.py agora gera scores individuais para 31 criterios automaticos.
O agent DEVE avaliar 3 criterios adicionais manualmente:

### Criterio 32: Originalidade Visual (0-10)
Abra screenshots dos 2 ULTIMOS sites construidos:
```bash
LAST_TWO=$(ls -td sites/*/screenshots/fullpage-desktop.png 2>/dev/null | grep -v "$LEAD_ID" | head -2)
for f in $LAST_TWO; do echo "Read: $f"; done
```
Compare visualmente e atribua score:
- 10: Impossivel dizer que e do mesmo sistema
- 8-9: Claramente distinto, identidade propria
- 6-7: Cores diferentes mas mesma estrutura
- 0-5: Praticamente identico

### Criterio 33: Profissionalismo Desktop (0-10)
Leia `screenshots/fullpage-desktop.png` e avalie:
- 10: Indistinguivel de agencia premium. Wow factor.
- 8-9: Profissional, polido
- 6-7: Funcional sem destaque
- 4-5: Amador
- 0-3: Quebrado

### Criterio 34: Profissionalismo Mobile (0-10)
Leia `screenshots/fullpage-mobile.png` com mesma rubrica.
SEPARADO do desktop porque mobile quebra frequentemente.

### Regras de aprovacao:
- CADA um dos 34 criterios >= 8
- MEDIA dos 34 >= 9.0
- Se QUALQUER criterio de originalidade (29-32) < 8 → REPROVAR
- Se QUALQUER criterio critico = 0 → PARAR

## GATE 1.2 — Aderencia ao Blueprint

Leia: sites/$LEAD_ID/mapa-encantamento.md

Para CADA secao no blueprint, verifique:
1. O LAYOUT especificado foi implementado no codigo?
2. A ANIMACAO especificada existe no componente?
3. A TECNICA VISUAL foi aplicada?

Se QUALQUER secao diverge do blueprint → CORRIGIR e revalidar.

## GATE 1.5 — Performance Profiling via Chrome DevTools (se disponivel)

**Este gate e OPCIONAL mas ALTAMENTE RECOMENDADO.** So executa se Chrome DevTools MCP estiver conectado (Chrome rodando com `chrome-debug`).

Apos score >= 9.0 no Gate 1, use Chrome DevTools para medir Core Web Vitals REAIS:

1. Navegue para `http://localhost:5180` via Chrome DevTools MCP
2. Inicie performance trace
3. Metricas a verificar:
   - **LCP (Largest Contentful Paint)**: deve ser < 2.5s (bom) ou < 4.0s (aceitavel)
   - **CLS (Cumulative Layout Shift)**: deve ser < 0.1 (bom) ou < 0.25 (aceitavel)
   - **INP (Interaction to Next Paint)**: deve ser < 200ms (bom)
4. Use Network waterfall para identificar assets bloqueantes (fontes, imagens grandes, JS pesados)
5. Use CPU throttling (4x slowdown) para simular dispositivos moveis reais

**Se LCP > 4.0s ou CLS > 0.25:**
- Identifique o recurso causador via Network tab
- Otimize: lazy loading, preload de fontes criticas, compressao de imagens, code splitting
- Re-meça ate dentro dos limites

**Se Chrome DevTools NAO esta disponivel:** Pule este gate — o playwright-validate.py ja cobre checks basicos de performance. Registre no output: "Gate 1.5 pulado — Chrome DevTools nao disponivel."

## ERROS CLASSICOS (gates criticos reforçados)

1. TEXTO INVISIVEL: Se invisible_text score = 0, PARAR imediatamente.
2. SPEED OVER QUALITY: visual-analysis.md DEVE ter >= 1000 chars e mencionar CADA secao por nome.
3. SECOES VAZIAS: Verificar que CADA section com height > 200px tem inner text > 50 chars.
4. FACES CORTADAS: Verificar CADA imagem de pessoa nos screenshots. Rosto cortado = corrigir object-position.
5. ACENTUACAO: pt_br_accents = 0 → PARAR.
6. MOBILE QUEBRADO: Criterio 34 avaliado SEPARADAMENTE. Se mobile < 8, CORRIGIR mobile.
7. TOGGLE IDIOMA: i18n score < 8 → PARAR.

## GATE 2 — Analise visual critica (OBRIGATORIO — NAO PODE SER PULADO)

**Este gate e SEPARADO do Gate 1.** Score 9.0+ NAO significa que o Gate 2 esta aprovado.
O Gate 1 mede tecnicalidades (contraste, touch targets, broken images).
O Gate 2 mede QUALIDADE VISUAL e ENCANTAMENTO — o que faz alguem querer comprar o site.

**REGRA ANTI-MENTIRA: Voce DEVE identificar e corrigir TODOS os problemas visuais, de proporcao e posicionamento.** Nao existe numero minimo — existe perfeicao. Se achar "tudo perfeito" na primeira olhada, voce esta priorizando velocidade. PARE e olhe de novo pixel por pixel.

### Passo 1 — Ler o mapa de encantamento E os screenshots do site

Leia o mapa de encantamento PRIMEIRO:
```
Read: sites/$LEAD_ID/mapa-encantamento.md
```

Depois leia os screenshots do site:
```
Read: sites/$LEAD_ID/screenshots/fullpage-mobile.png
Read: sites/$LEAD_ID/screenshots/fullpage-desktop.png
```

### Passo 2 — Comparar o site contra o mapa de encantamento

Para CADA pergunta respondida no mapa, verifique se o site ENTREGOU o que foi planejado:

**a) O hero captura atencao nos primeiros 3 segundos?**
O mapa definiu como o hero deveria funcionar. O que foi construido entrega isso?

**b) O ritmo do scroll e o que foi planejado?**
O mapa definiu se seria rapido, lento, cinematografico, alternado. O site segue esse ritmo?

**c) As surpresas existem?**
O mapa definiu onde o visitante deveria parar e prestar atencao. Esses momentos foram construidos?

**d) O site vende sem parecer que esta vendendo?**
Os CTAs aparecem de forma natural como planejado no mapa?

**e) O site e impossivel de confundir com qualquer outro?**
O elemento unico definido no mapa existe no site?

### Passo 3 — Responder perguntas de qualidade POR ESCRITO

**Wow moments (CRITICO):**
- QUAL e o wow moment do meu site? Descreva em 1 frase. Se nao conseguir descrever, NAO TEM wow moment.
- Quantas animacoes DIFERENTES existem? (fade-in repetido NAO conta como variacao)
- Existe algum elemento que SURPREENDE no scroll?

**Qualidade visual:**
- Fotos sao as MELHORES do briefing? Tem melhor nao usada?
- TODAS as imagens estao bem contidas? (nenhuma estourando div, esticada, ou com proporcao errada)
- Cores transmitem essencia do cliente?
- Tipografia cria hierarquia clara?
- Espacamentos generosos?

**Mobile-specific:**
- Touch targets >= 44x44px?
- Textos legiveis sem zoom (>= 16px)?
- Cards empilham bem? Scroll natural sem buracos?

**Desktop-specific:**
- Layout usa espaco horizontal? Hover states?

**Veredito final (responda com HONESTIDADE):**
- "Parece site de R$50K?" → SIM ou NAO.
- "Alguem mandaria esse link dizendo 'olha que incrivel'?" → SIM ou NAO.
- "Se eu fosse o DONO desse negocio, eu ficaria ORGULHOSO?" → SIM ou NAO.

### Passo 4 — Liste TODOS os problemas encontrados e corrija TODOS

Analise cada pixel. Liste TUDO que esta errado — proporcao, posicionamento, espacamento, overflow, texto quebrando, sobreposicao, elementos desalinhados, layout mobile quebrado. NAO existe "bom o suficiente". O site so esta pronto quando CADA secao, em CADA breakpoint, esta visualmente perfeito.

Categorias obrigatorias de verificacao:
- **Proporcao:** Elementos com tamanho errado, imagens distorcidas, cards desproporcionais
- **Posicionamento:** Elementos sobrepostos, desalinhados, fora do container
- **Espacamento:** Gaps excessivos, margens inconsistentes, padding faltando
- **Texto:** Quebrando em linhas demais no mobile, overflow, truncamento
- **Responsividade:** Layout que funciona no desktop mas quebra no mobile (ou vice-versa)
- **Encantamento:** Wow moments do mapa de encantamento que NAO foram implementados

## GATE 2.5 — Revisao de imagens (existencia + contencao + coerencia)

**GATE DE EXISTENCIA (exit 1 se falhar):**

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID

# Check 1: Imagens do briefing existem em public/images/?
IMG_COUNT=$(find public/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) ! -path "*/stock/*" | wc -l | tr -d ' ')
echo "Imagens do briefing em public/images/: $IMG_COUNT"

# Check 2: Quantas <img> tags existem nos componentes?
IMG_TAGS=$(grep -r '<img ' src/components/sections/ | wc -l | tr -d ' ')
echo "Tags <img> nas secoes: $IMG_TAGS"

# Check 3: Briefing tem imagens?
BRIEFING_IMGS=$(.venv/bin/python3 -c "
import sqlite3, json
db = sqlite3.connect('../../data/vendedor.db')
row = db.execute('SELECT briefing_json FROM briefings WHERE lead_id=\"$LEAD_ID\"').fetchone()
if row:
    b = json.loads(row[0])
    imgs = [d for d in b.get('data_points',[]) if d.get('category')=='images']
    print(len(imgs))
else:
    print(0)
db.close()
" 2>/dev/null || echo 0)
echo "Imagens no briefing: $BRIEFING_IMGS"

# Validar
if [ "$BRIEFING_IMGS" -gt 0 ] && [ "$IMG_COUNT" -lt 1 ]; then
  echo "❌ BLOQUEADO: Briefing tem $BRIEFING_IMGS imagens mas ZERO foram baixadas para public/images/"
  echo "ACAO: Volte para Fase 4 (secao 4.6) e baixe as imagens."
  exit 1
fi

if [ "$BRIEFING_IMGS" -gt 0 ] && [ "$IMG_TAGS" -lt 1 ]; then
  echo "❌ BLOQUEADO: $IMG_COUNT imagens disponiveis mas ZERO <img> tags nas secoes"
  echo "ACAO: Volte para Fase 6 e use as imagens reais nas secoes (NAO placeholders)."
  exit 1
fi

echo "✅ Imagens: $IMG_COUNT baixadas, $IMG_TAGS usadas nas secoes"
```

**Se QUALQUER check falhou:** NAO continue. Corrija PRIMEIRO.

**PROBLEMA COMUM:** Imagens que existem mas estouram o container, ficam esticadas, cortadas errado, ou quebram o layout. Isso aconteceu no build da Usina — o score passou mas as imagens estavam visualmente quebradas.

**PRIMEIRO: Inspecionar visualmente nos screenshots.**
Olhe CADA imagem visivel nos screenshots mobile e desktop. Procure por:
- Imagem estourando para fora do container (overflow visivel)
- Imagem esticada ou achatada (proporcao distorcida)
- Imagem cortada de forma que perde o conteudo importante
- Espacos em branco inesperados ao redor da imagem
- Imagem muito pequena dentro de um container grande

**SEGUNDO: Verificar CSS de contencao no codigo.**
Para cada `<img>` nos componentes, verifique que tem:
- `object-fit: cover` (ou `contain` quando proporcao importa) — NUNCA sem object-fit
- `width` e `height` explicitos OU `aspect-ratio` definido — previne CLS
- Container com `overflow-hidden` — previne estouro
- Proporcoes coerentes entre mobile e desktop (uma imagem quadrada no mobile nao deve virar retangular no desktop sem motivo)

**TERCEIRO: Coerencia imagem ↔ contexto.**
O conteudo da imagem bate com o assunto da secao?
- Secao de pizza mostrando pizza? (NAO arroz, NAO salada)
- Secao de servicos mostrando o servico? (NAO comida se e barbearia)
Se NAO bate → trocar ou remover e compensar com design CSS.

**QUARTO: Contribuicao.**
Cada imagem AJUDA ou ATRAPALHA? Imagem mal contida e pior que nenhuma imagem.
Se atrapalha → remover e compensar com tipografia/gradiente/CSS.

Se QUALQUER imagem esta visualmente quebrada → corrigir ANTES de prosseguir.

### Passo 5 — Salvar analise em visual-analysis.md (OBRIGATORIO)

Salve a analise completa em `sites/$LEAD_ID/visual-analysis.md`. Este arquivo e a PROVA de que voce analisou. Sem ele, o gate NAO passa.

Formato obrigatorio:
```markdown
# Analise Visual — [Nome do Cliente]

## Screenshots analisados
- fullpage-mobile.png: [o que vi]
- fullpage-desktop.png: [o que vi]

## Problemas encontrados e corrigidos
1. [Descricao do problema] → [Como corrigiu]
2. ...

## Comparacao com mapa de encantamento
- Hero 3 segundos: [ENTREGOU / NAO ENTREGOU] — [detalhe]
- Ritmo do scroll: [ENTREGOU / NAO ENTREGOU] — [detalhe]
- Surpresas: [ENTREGOU / NAO ENTREGOU] — [detalhe]
- Venda natural: [ENTREGOU / NAO ENTREGOU] — [detalhe]

## Vereditos
- Parece site de R$50K? [SIM/NAO] — [justificativa]
- Alguem mandaria o link? [SIM/NAO] — [justificativa]
- Dono ficaria orgulhoso? [SIM/NAO] — [justificativa]

## Wow moment
[Descricao em 1 frase]
```

Se o arquivo tem menos de 500 caracteres, voce NAO analisou de verdade.

## GATE 3 — Correcao e re-validacao

Para CADA problema encontrado:
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

**Gate 1.5 (Performance — se Chrome DevTools disponivel):**
- [ ] LCP < 4.0s (ideal < 2.5s)
- [ ] CLS < 0.25 (ideal < 0.1)
- [ ] Assets bloqueantes identificados e otimizados
- [ ] OU "Gate 1.5 pulado — Chrome DevTools nao disponivel"

**Gate 2 (Qualidade visual — SEPARADO do score):**
- [ ] mapa-encantamento.md FOI LIDO e comparado contra o site construido
- [ ] Para cada ponto do mapa: o site ENTREGOU o que foi planejado?
- [ ] TODAS as perguntas do Passo 3 respondidas POR ESCRITO
- [ ] TODOS os problemas visuais identificados e corrigidos (proporcao, posicionamento, espacamento, overflow, texto, responsividade)
- [ ] Analise escrita salva em visual-analysis.md (NAO apenas checkboxes — texto real com problemas encontrados e como foram corrigidos)
- [ ] TODAS as imagens bem contidas visualmente (sem estouro de div, sem distorcao, object-fit correto)
- [ ] "Parece R$50K?" = SIM (respondido honestamente)
- [ ] "Alguem mandaria o link?" = SIM (respondido honestamente)
- [ ] "Dono ficaria orgulhoso?" = SIM (respondido honestamente)
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
