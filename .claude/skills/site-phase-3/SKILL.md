---
name: site-phase-3
description: Fase 3 do build-site — Conceito criativo, design system, blueprint tecnico por secao
user-invocable: false
---

# Fase 3 — Conceito Criativo + Blueprint Tecnico

Leia as guidelines criativas:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/creative-guidelines.md
```

Leia a taste-skill (anti-AI-slop):
```
Read: /Users/felipemoreiralanna/.claude/skills/taste-skill/SKILL.md
```

Leia a frontend-design skill (direcao estetica):
```
Read: /Users/felipemoreiralanna/.claude/skills/frontend-design/SKILL.md
```

**MCPs de componentes disponiveis para usar no build:**
- `magic-ui` — componentes React animados (blur-fade, aurora-text, marquee, grid backgrounds)
- `aceternity-ui` — 100+ componentes premium (parallax, cards 3D, spotlights, text effects)
- `shadcn-ui` — base solida de componentes acessiveis

## 3.0 Anti-repeticao: Fontes e layouts banidos

**ANTES de qualquer decisao criativa**, execute este script para saber o que NAO repetir:

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
echo "=== FONTES BANIDAS (ultimos 3 sites) ==="
for f in $(ls -td sites/*/src/main.jsx 2>/dev/null | head -3); do
  SITE=$(echo "$f" | sed 's|sites/||;s|/src/main.jsx||')
  echo "  $SITE:"
  grep '@fontsource' "$f" 2>/dev/null | sed 's/.*@fontsource\//    /; s/[/"'\'';].*//'
done
echo ""
echo "=== HERO LAYOUTS BANIDOS (ultimos 3 sites) ==="
for f in $(ls -td sites/*/src/components/sections/Hero.jsx 2>/dev/null | head -3); do
  SITE=$(echo "$f" | sed 's|sites/||;s|/src/.*||')
  LAYOUT=$(grep -c "grid-cols-2\|flex.*row\|md:flex-row" "$f" 2>/dev/null)
  CENTER=$(grep -c "text-center\|items-center.*justify-center" "$f" 2>/dev/null)
  FULL=$(grep -c "min-h-screen\|min-h-\[100\|h-screen" "$f" 2>/dev/null)
  echo "  $SITE: split=$LAYOUT center=$CENTER fullscreen=$FULL"
done
echo ""
echo "=== COMPONENTES UI BANIDOS (ultimos 3 sites) ==="
for d in $(ls -td sites/*/src/components/ui/ 2>/dev/null | head -3); do
  SITE=$(echo "$d" | sed 's|sites/||;s|/src/.*||')
  echo "  $SITE: $(ls "$d" 2>/dev/null | tr '\n' ' ')"
done
echo ""
echo "=== NAVBAR PATTERNS BANIDOS (ultimos 3 sites) ==="
for f in $(ls -td sites/*/src/components/layout/Navbar.jsx 2>/dev/null | head -3); do
  SITE=$(echo "$f" | sed 's|sites/||;s|/src/.*||')
  FIXED=$(grep -c "fixed\|sticky" "$f" 2>/dev/null)
  TRANSPARENT=$(grep -c "transparent\|bg-transparent\|backdrop" "$f" 2>/dev/null)
  echo "  $SITE: fixed=$FIXED transparent=$TRANSPARENT"
done
echo ""
echo "REGRA: Nenhuma fonte, layout de hero, ou nome de componente listado acima pode ser reutilizado."
```

Salve a saida. QUALQUER decisao que repita um item banido sera rejeitada pelo gate.

## 3.1 Descobrir referencias UNICAS para ESTE cliente (WebSearch obrigatorio)

**A fonte PRIMARIA de referencias e a WEB, nao um catalogo estatico.**

Faca WebSearches criativos baseados no CONCEITO UNICO deste cliente:

1. **Busca pelo conceito emocional:**
   WebSearch: "[conceito/tema do cliente] website design inspiration"

2. **Busca pela experiencia desejada:**
   WebSearch: "[tipo de experiencia] web animation award"

3. **Busca pelo diferencial visual:**
   WebSearch: "[elemento visual unico] interactive website"

Dos resultados, selecione sites que resolvem algo relevante para este cliente.

**COMPLEMENTAR:** Leia o catalogo curado para referencias adicionais:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/design-references.md
```

Para cada site, responda UMA pergunta: **"o que esse site faz que cria uma emocao no visitante?"**

## 3.2 Navegar e estudar as referencias (OBRIGATORIO)

**Estrategia em cascata (tente na ordem, so passe para a proxima se a anterior falhar):**

**Nivel A — Navegacao real (preferido):**
1. `browser_navigate` para a URL
2. `browser_take_screenshot` — VEJA a pagina
3. Responda: qual emocao? Como faz? O que surpreendeu?

**Nivel B — WebFetch (se browser falhar)**
**Nivel C — Pesquisa pura (ultimo recurso)**

**ANTI-RACIONALIZACAO:** "Ja tenho dados suficientes" sem ter VISTO os sites = Fase 3 FALHOU.

## 3.3 Criar o Mapa de Encantamento + Blueprint Tecnico

Este e o artefato mais importante do pipeline. Ele guia TODAS as decisoes das fases seguintes.

### Parte A: Mapa Emocional

```markdown
# Mapa de Encantamento — [NOME DO CLIENTE]

## Conceito emocional
[1 frase: qual emocao o visitante deve sentir?]

## Conceito narrativo
[1 frase que define o espirito do site]

## O que aprendi das referencias
[Para cada site: nome + o que ensinou para ESTE projeto]

## Direcao estetica
[Escolha UMA direcao extrema da frontend-design skill e COMPROMETA-SE:
brutalmente minimal, maximalista, retro-futurista, organico/natural,
luxuoso/refinado, playful/toy-like, editorial/magazine, brutalist/raw,
art deco/geometrico, soft/pastel, industrial/utilitario, etc]
```

### Parte B: Blueprint Tecnico por Secao (OBRIGATORIO)

Para CADA secao do site, especifique decisoes CONCRETAS:

```markdown
## Blueprint Tecnico

### Layout Map
[Diagrama visual da sequencia de layouts — nenhuma 2 consecutivas iguais]

### [Nome da Secao 1 — ex: Hero]
- LAYOUT: [especifico — ex: "fullwidth video bg, texto bottom-left alinhado a esquerda, CTA no canto"]
- ANIMACAO DE ENTRADA: [tecnica exata — ex: "clip-path reveal circular expandindo do centro em 1.2s"]
- ANIMACAO DE SCROLL: [se houver — ex: "parallax invertido na imagem, speed -0.3"]
- TECNICA VISUAL: [diferencial — ex: "grain overlay 2% + gradient mesh animado no bg"]
- REFERENCIA: [qual site inspirou e POR QUE]

### [Nome da Secao 2 — ex: Sobre]
- LAYOUT: [ex: "asymmetric 60/40 com imagem overlapping texto em -40px"]
- ANIMACAO DE ENTRADA: [ex: "stagger horizontal dos paragrafos com 150ms delay"]
- ANIMACAO DE SCROLL: [ex: "sticky section com progress bar lateral"]
- TECNICA VISUAL: [ex: "foto com mask shape organica rounded-[40%_60%_55%_45%/...]"]
- REFERENCIA: [qual site inspirou]

### [... repetir para cada secao]
```

**REGRAS DO BLUEPRINT:**
- Cada secao DEVE ter LAYOUT + ANIMACAO DE ENTRADA + TECNICA VISUAL
- Nenhuma 2 secoes consecutivas podem ter o MESMO tipo de layout
- Nenhuma animacao pode ser "fade up generico" (opacity:0 y:20 → opacity:1 y:0) em mais de 1 secao
- O blueprint e um CONTRATO — Phase 6 DEVE implementar exatamente o que esta aqui

### Parte C: Animation Budget

```markdown
## Animation Budget
- SHOWSTOPPER (1 momento WOW): [descreva — ex: "hero load com clip-path circular + GSAP timeline orquestrada"]
- SUPPORTING (2-3 animacoes notaveis): [liste — ex: "parallax invertido na secao Sobre", "countup com spring physics nos Numeros"]
- BASELINE (resto): CSS transitions simples — hover states, color transitions, opacity fades
```

Isso previne o padrao onde TUDO usa ScrollReveal com os mesmos parametros.

### Parte D: Design System

**Cores** — defina tokens com NOMES SEMANTICOS derivados do conceito:
- NAO use nomes genericos (primary, secondary, accent)
- USE nomes que reflitam o conceito (ex: para "floresta": `--canopy`, `--moss`, `--sunbeam`)
- Minimo 6, maximo 12 tokens
- OBRIGATORIO incluir: 1 background, 1 text-primary, 1 accent para CTAs
- Contraste WCAG AA: 4.5:1 texto normal, 3:1 texto grande
- Se briefing tem cores → usar como base
- Evitar repeticao com concorrentes

**Tipografia** — fontes @fontsource (nomes exatos dos pacotes npm):
- Minimo 1, maximo 3 (display + body, opcionalmente accent/mono)
- Baseado no TOM deste cliente individual
- NUNCA usar fontes listadas na secao 3.0 (banidas dos ultimos 3 sites)
- NUNCA usar Inter, Roboto, Arial (genericas — taste-skill Section 7)
- Consultar taste-skill Rule 1 para opcoes premium

**Espacamento:** grid 8px, responsivo, max-width adequado ao conceito

### Parte E: Elemento Assinatura

Cada site DEVE ter pelo menos 1 elemento visual que so ESSE cliente pode ter.
Liberdade total — nao ha categorias pre-aprovadas. Pode ser qualquer coisa que torne o site impossivel de confundir com outro.

**Como decidir:** Olhe para o NOME e a HISTORIA do cliente. O que e unico sobre ele?

Documente: qual o elemento, como sera implementado (SVG? CSS? Canvas? Lottie?), em quais secoes aparece.

## 3.4 Buscar imagens stock (MCPs disponiveis)

Se o conceito precisa de imagens que o briefing NAO tem, use MCPs:
- `mcp__stock-images`, `mcp__mcp-pexels`, `mcp__pixabay`, `mcp__freepik`

Busque pelo CONCEITO CRIATIVO, nao pelo nicho.

**NUNCA para:** foto do profissional, fachada, produtos, equipe, logo (engana visitante).
**Se nao tem foto real E nao pode usar stock:** Design tipografico ousado.

## 3.5 Avaliar necessidade de CTA flutuante

Analise canais de contato e comportamento esperado. Documente decisao com justificativa.

## 3.6 Definir secoes do site

- Cada secao: nome, proposito emocional, conteudo, layout (do blueprint)
- NAO lista fixa. Ordem segue jornada emocional
- Material rico: prova social, demonstracao de valor, CTAs progressivos

Mostre ao usuario: conceito, cores, fontes, blueprint, lista de secoes.

Salve tudo em: `sites/$LEAD_ID/mapa-encantamento.md`

## CRITERIO DE CONCLUSAO

**Gate bloqueante (EXECUTE OBRIGATORIAMENTE):**
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
echo "=== CHECKPOINT FASE 3 ==="

# 1. Mapa existe?
ls -la sites/$LEAD_ID/mapa-encantamento.md 2>/dev/null && echo "✅ mapa-encantamento.md EXISTE" || { echo "❌ BLOQUEADO: mapa-encantamento.md NAO EXISTE"; exit 1; }

# 2. Blueprint tem layouts por secao?
LAYOUTS=$(grep -c "^- LAYOUT:" sites/$LEAD_ID/mapa-encantamento.md 2>/dev/null)
echo "Layouts definidos: $LAYOUTS"
if [ "$LAYOUTS" -lt 5 ]; then
  echo "❌ BLOQUEADO: Blueprint tem $LAYOUTS layouts. Minimo 5 secoes com LAYOUT definido."
  exit 1
fi

# 3. Blueprint tem animacoes por secao?
ANIMS=$(grep -c "^- ANIMACAO" sites/$LEAD_ID/mapa-encantamento.md 2>/dev/null)
echo "Animacoes definidas: $ANIMS"
if [ "$ANIMS" -lt 5 ]; then
  echo "❌ BLOQUEADO: Blueprint tem $ANIMS animacoes. Minimo 5 secoes com ANIMACAO definida."
  exit 1
fi

# 4. Fontes nao estao na lista banida?
CHOSEN_FONTS=$(grep -i '@fontsource' sites/$LEAD_ID/mapa-encantamento.md 2>/dev/null | sed 's/.*@fontsource\///' | sed 's/[/"'\'';].*//' | tr '[:upper:]' '[:lower:]')
BANNED_FONTS=""
for f in $(ls -td sites/*/src/main.jsx 2>/dev/null | head -3); do
  BANNED_FONTS="$BANNED_FONTS $(grep '@fontsource' "$f" 2>/dev/null | sed 's/.*@fontsource\///' | sed 's/[/"'\'';].*//' | tr '[:upper:]' '[:lower:]')"
done
for font in $CHOSEN_FONTS; do
  if echo "$BANNED_FONTS" | grep -qw "$font"; then
    echo "❌ BLOQUEADO: Fonte '$font' foi usada nos ultimos 3 sites. Escolha outra."
    exit 1
  fi
done
echo "✅ Fontes sao originais"

# 5. Animation budget existe?
grep -q "SHOWSTOPPER\|showstopper\|Animation Budget" sites/$LEAD_ID/mapa-encantamento.md 2>/dev/null && echo "✅ Animation budget definido" || echo "⚠️ Animation budget nao encontrado (recomendado)"

# 6. Layouts consecutivos nao se repetem?
echo "✅ Verificacao de layouts consecutivos sera feita na Fase 6"

echo "=== GATE FASE 3: PASS ==="
```

Checklist:
- [ ] Sites de referencia ESTUDADOS (navegados, nao apenas lidos)
- [ ] `mapa-encantamento.md` salvo com Parte A (emocional) + Parte B (blueprint tecnico) + Parte C (animation budget) + Parte D (design system) + Parte E (elemento assinatura)
- [ ] Blueprint tem LAYOUT + ANIMACAO para cada secao
- [ ] Fontes escolhidas NAO repetem dos ultimos 3 sites
- [ ] Tokens de cor com nomes semanticos (nao genericos)
- [ ] Direcao estetica escolhida e comprometida
