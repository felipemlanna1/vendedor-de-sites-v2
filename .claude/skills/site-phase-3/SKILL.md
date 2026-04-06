---
name: site-phase-3
description: Fase 3 do build-site — Conceito criativo, design system, referencias premiadas
user-invocable: false
---

# Fase 3 — Conceito Criativo + Design System

Leia as guidelines criativas:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/creative-guidelines.md
```

Leia tambem a taste-skill (anti-AI-slop):
```
Read: /Users/felipemoreiralanna/.claude/skills/taste-skill/SKILL.md
```

**MCPs de componentes disponiveis para usar no build:**
- `magic-ui` — componentes React animados (blur-fade, aurora-text, marquee, grid backgrounds)
- `aceternity-ui` — 100+ componentes premium (parallax, cards 3D, spotlights, text effects)
- `shadcn-ui` — base solida de componentes acessiveis
Use estes MCPs nas fases 5 e 6 para buscar componentes prontos em vez de inventar do zero.

## 3.0 Selecionar referencias do catalogo curado

Leia o catalogo curado:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/design-references.md
```

Com base no conceito narrativo (Fase 2.2) e no tipo de cliente:
1. Identifique 2-3 tags dominantes (ex: "warm + servico-local + micro-interactions")
2. Use o mapeamento rapido por tipo de cliente como ponto de partida
3. Selecione 3-5 sites que RESOLVEM problemas parecidos com os deste cliente
4. Para cada site selecionado, anote: "o que deste site eu vou ROUBAR para o meu cliente?"

NAO copie layouts inteiros. Extraia TECNICAS e SOLUCOES especificas:
- Como resolveram a hierarquia de informacao?
- Qual tecnica de animacao cria o "wow moment"?
- Como o CTA aparece sem ser invasivo?
- Qual o ritmo do scroll (rapido/lento/misto)?
- Como lidam com mobile?

## 3.1 Navegar e estudar as referencias (OBRIGATORIO)

**REGRA INVIOLAVEL:** Voce NAO pode concluir a Fase 3 sem ter ESTUDADO pelo menos 3 sites do catalogo.

**Estrategia em cascata (tente na ordem, so passe para a proxima se a anterior falhar):**

**Nivel A — Navegacao real (preferido):**
Para cada um dos 3-5 sites selecionados:
1. `browser_navigate` para a URL
2. `browser_take_screenshot` — VEJA a pagina
3. Anote CONCRETAMENTE: espacamento entre secoes (px), hierarquia tipografica, tecnicas de animacao, o que faz parecer premium
4. Salve o screenshot do MELHOR site como `sites/$LEAD_ID/screenshots/referencia-10-10.png`

**Nivel B — WebFetch (se browser falhar):**
Se o Playwright nao esta disponivel ou deu timeout:
1. `WebFetch` na URL de cada site — leia o HTML
2. Identifique: frameworks usados (GSAP? Three.js? Framer Motion?), estrutura de secoes, CSS patterns
3. Use `WebSearch` para encontrar screenshots ou reviews visuais dos sites (ex: "site.com design review screenshot")
4. Baixe a melhor imagem encontrada como `referencia-10-10.png`

**Nivel C — Pesquisa pura (ultimo recurso):**
Se WebFetch tambem falhar em todos os sites:
1. Execute 3+ WebSearches: "site.com design analysis", "site.com screenshot full page", "[TIPO_CLIENTE] best website design 2025 2026"
2. Encontre screenshots ou analises detalhadas dos sites de referencia
3. Baixe o melhor screenshot como `referencia-10-10.png`
4. Documente quais tecnicas cada site usa baseado nas analises encontradas

**ANTI-RACIONALIZACAO:** Se voce esta pensando "ja tenho dados suficientes do catalogo markdown" — NAO TEM. O markdown lista NOMES e TAGS. Voce precisa VER os sites para entender espacamento, timing, polish, e o "feeling" que faz um site parecer premium. Pular isso e o motivo #1 de sites genericos.

## 3.1b Usar resultados dos agents de pesquisa (se aplicavel)

Se o orchestrator lancou agents em paralelo, use os resultados:
- **Agent 1 — Referencias curadas navegadas:** Analise os screenshots e anotacoes dos sites do catalogo.
- **Agent 2 — WebSearches de tecnicas:** 3+ tecnicas concretas de cada WebSearch que voce VAI USAR neste site.

Se os agents NAO foram lancados (execucao manual), voce JA fez o trabalho equivalente na secao 3.1 acima.

Combine as tecnicas do catalogo curado com as descobertas do WebSearch para definir o "toolkit visual" deste site.

## 3.2 Conceito narrativo
Escreva UMA FRASE que define o espirito do site (derivada da narrativa da Fase 2.2). Mostre ao usuario.

## 3.3 Design system (derivado do CLIENTE, nao do nicho)

**Cores** — defina 10 tokens hex:
primary, primary-light, primary-dark, secondary, accent, background, surface, text-primary, text-secondary, text-muted.
- Se briefing tem cores → usar como base
- Se nao → derivar das imagens reais. Evitar repeticao com concorrentes (NAO usar concorrentes como benchmark — benchmark = catalogo curado)
- Contraste WCAG AA: 4.5:1 texto normal, 3:1 texto grande

**Tipografia** — 2 fontes @fontsource (nomes exatos dos pacotes npm):
- Display/heading + body
- Baseado no TOM deste cliente. NAO seguir regras de nicho ("serif para medico")
- NUNCA usar Inter, Roboto, Arial (genericas)

**Espacamento:** grid 8px, mobile 20-24px horizontal / 80-100px vertical, desktop max-width 1280px

## 3.4 Buscar imagens stock (MCPs disponiveis)

Se o conceito criativo precisa de imagens que o briefing NAO tem, use ESTES MCPs:

**MCPs de imagem disponíveis (use por nome exato):**
- `mcp__stock-images` — busca em Unsplash + Pexels + Pixabay simultaneamente
- `mcp__mcp-pexels` — busca especifica no Pexels (alta qualidade)
- `mcp__pixabay` — busca especifica no Pixabay (videos tambem)
- `mcp__freepik` — busca no Freepik (vetores, fotos, PSD)

**COMO usar:** Busque pelo conceito criativo, nao pelo nicho.
Ex: se conceito = "ciencia + elegancia" → buscar "abstract elegant science texture"
Ex: se conceito = "artesanal + proposito" → buscar "warm handcraft wood texture dark"

**QUANDO usar:**
- ✅ Backgrounds atmosfericos e texturas (wood, marble, abstract, gradient, smoke)
- ✅ Elementos decorativos (patterns, grain, bokeh, light leaks)
- ✅ Videos curtos para background de hero (se conceito pedir)
- ✅ Icones e ilustracoes vetoriais (via freepik)

**QUANDO NAO usar (REGRA INVIOLAVEL):**
- ❌ NUNCA para foto do profissional/dono — isso ENGANA o visitante
- ❌ NUNCA para fachada/interior do local — mostra um lugar que nao existe
- ❌ NUNCA para produtos/pratos do cardapio — mostra comida que nao e a deles
- ❌ NUNCA para equipe/funcionarios — mostra pessoas que nao trabalham la
- ❌ NUNCA para logo — o logo e do briefing ou nao existe

**Se nao tem foto real E nao pode usar stock:** Design tipografico ousado.
Texto grande + cores vibrantes + geometria CSS. Sites como Stripe provam que funciona.

Anote URLs de todas as imagens stock selecionadas. Baixe na Fase 4 para `public/images/stock/`.

## 3.5 Definir secoes do site
- Cada secao: nome, proposito emocional, conteudo, animacao planejada
- NAO lista fixa. Ordem segue jornada emocional
- Cada secao com CTA ou elemento de conversao
- Micro-secoes criativas: contadores, frases de impacto, parallax, transicoes
- Material rico: prova social, demonstracao de valor, indicadores confianca, CTAs progressivos

Mostre ao usuario: conceito, cores hex, fontes, lista de secoes.

## CRITERIO DE CONCLUSAO

**Checkpoint de arquivos (EXECUTE ANTES DE PROSSEGUIR):**
```bash
echo "=== CHECKPOINT FASE 3 ===" && \
ls -la sites/$LEAD_ID/screenshots/referencia-10-10.png 2>/dev/null && echo "✅ referencia-10-10.png EXISTE" || echo "❌ BLOQUEADO: referencia-10-10.png NAO EXISTE — volte para 3.1" && \
echo "=== FIM CHECKPOINT ==="
```
**Se `referencia-10-10.png` NAO existe, a Fase 3 NAO esta completa. Volte para 3.1.**

Checklist completo:
- [ ] 3+ sites do catalogo ESTUDADOS (navegados, lidos via WebFetch, ou pesquisados — NAO apenas lidos no markdown)
- [ ] Para CADA site estudado: tecnicas concretas anotadas com "o que vou ROUBAR"
- [ ] `referencia-10-10.png` salvo em `sites/$LEAD_ID/screenshots/`
- [ ] 3+ WebSearches feitas e tecnicas anotadas
- [ ] Conceito narrativo em 1 frase
- [ ] 10 cores hex definidas
- [ ] 2 fontes @fontsource com nomes npm exatos
- [ ] Lista de secoes com conteudo mapeado
- [ ] "Wow moment" definido: qual tecnica/elemento vai fazer o visitante dizer "olha que incrivel" (ex: hero 3D, parallax em camadas, text reveal cinematografico, particulas, video background)
