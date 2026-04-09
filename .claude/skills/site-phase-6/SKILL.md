---
name: site-phase-6
description: Fase 6 do build-site — Implementar blueprint, navbar, secoes, footer, App, main
user-invocable: false
---

# Fase 6 — Implementar o Blueprint

## 6.0 CARREGAR BLUEPRINT (OBRIGATORIO — ANTES DE TUDO)

```
Read: sites/$LEAD_ID/mapa-encantamento.md
```

Extraia e MEMORIZE:
1. O **Layout Map** (qual layout POR SECAO)
2. As **animacoes especificas** POR SECAO (ANIMACAO DE ENTRADA + SCROLL)
3. As **tecnicas visuais** POR SECAO
4. O **elemento assinatura** e onde aparece
5. A **navbar** definida (se houver)
6. A **direcao estetica** comprometida
7. Os **tokens de cor semanticos** e seus nomes
8. O **Animation Budget** (showstopper, supporting, baseline)

**REGRA ABSOLUTA: Implemente EXATAMENTE o que o blueprint especifica.**
Se o blueprint diz "bento grid 2fr 1fr 1fr" → o codigo DEVE ter `grid-template-columns: 2fr 1fr 1fr`.
Se o blueprint diz "clip-path reveal circular" → o codigo DEVE ter `clip-path` animation.
NAO substitua por alternativas "mais faceis". O blueprint e um CONTRATO.

## 6.0b GATE 0 — Verificar imagens

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID
IMG_COUNT=$(find public/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) ! -path "*/stock/*" | wc -l | tr -d ' ')
echo "Imagens do briefing: $IMG_COUNT"
if [ "$IMG_COUNT" -lt 1 ]; then
  echo "BLOQUEADO: ZERO imagens. Volte para Fase 4."
  exit 1
fi
echo "OK: $IMG_COUNT imagens disponiveis"
```

## REGRA CRITICA — IMAGENS REAIS

Se o briefing tem imagens, o site DEVE usa-las:
- Hero ou About DEVE ter foto profissional do cliente
- `<img>` com `src="/images/nome.jpg"`, `alt` descritivo, `loading="lazy"` (hero: `fetchpriority="high"`)
- PROIBIDO substituir foto real por letra gigante, gradiente vazio, ou icone generico
- Imagens stock apenas para: texturas, patterns, backgrounds abstratos. NUNCA para pessoas/fachadas/produtos.

Ordem de build: elemento assinatura → navbar → secoes → footer → App → main.

## PRINCIPIOS DE CODIGO

**SOLID no React:**
- S: Cada componente faz UMA coisa
- O: Props para customizacao sem editar source
- L: Wrappers se comportam como o elemento que substituem
- I: Nao passe props desnecessarias
- D: Componentes dependem de abstracoes (content.js, i18n)

**Separacao de logica:**
- `src/data/content.js` — dados. Componentes NUNCA leem briefing direto
- `src/hooks/` — logica reutilizavel
- `src/components/ui/` — atomicos sem logica de negocio
- `src/components/sections/` — composicao: ui + dados + i18n
- `src/components/layout/` — Navbar, Footer, Section
- `src/components/seo/` — Schema.org, meta tags

**Tailwind CSS v4:**
- NAO existe tailwind.config.js no v4
- Preflight JA INCLUSO — NUNCA adicione `* { margin: 0; padding: 0 }`
- Cores via `@theme` ou CSS custom properties
- Mobile-first: sem prefixo = mobile, `md:` = 768px+, `lg:` = 1024px+
- Container: `mx-auto max-w-7xl px-5 md:px-8 lg:px-16`

**Animacoes:**
- GPU-only: transform e opacity
- GSAP sempre com cleanup: `return () => ctx.revert()`
- Respeitar prefers-reduced-motion
- Touch targets >= 44x44px, textos body >= 16px mobile

## 6.1 Elemento Assinatura (ANTES das secoes)

Crie conforme o blueprint. Componente separado em `src/components/ui/`.
Se o blueprint diz SVG animado → SVG inline com CSS @keyframes ou Motion.
Se o blueprint diz background interativo → Canvas ou CSS.
Se o blueprint diz cursor custom → CSS cursor com SVG data URI.

**O elemento DEVE ser importado em 1+ secoes ou App.jsx.**

## 6.2 Navbar (VARIAVEL — NAO usar o padrao de sempre)

Execute para saber o que NAO repetir:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
LAST=$(ls -td sites/*/src/components/layout/Navbar.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -1)
[ -f "$LAST" ] && echo "=== ULTIMO NAVBAR ===" && head -20 "$LAST" && echo "=== NAO REPETIR ESTE PADRAO ==="
```

Opcoes de navbar (escolha UMA diferente do ultimo site):
- **Fixa transparente → solida ao scroll** (padrao atual — SO se nenhum outro site recente usou)
- **Fixa com backdrop-blur** (glassmorphism sutil — blur + border-bottom translucido)
- **Hide-on-scroll** (esconde ao scroll down, aparece ao scroll up via IntersectionObserver)
- **Sidebar fixa (desktop) + bottom bar (mobile)** (navegacao lateral)
- **Minima** (apenas logo + hamburger, sem links visiveis — menu overlay)
- **Dynamic pill** (pill que muda de tamanho/conteudo conforme secao ativa)

Requisitos funcionais (independente do estilo):
- Links para cada secao
- LanguageToggle
- CTA principal
- Menu mobile funcional
- TODOS os textos via `t()`

## 6.3 Secoes — IMPLEMENTAR O BLUEPRINT

Para CADA secao no blueprint, implemente EXATAMENTE o que foi especificado:

1. **Ler LAYOUT** do blueprint → implementar ESTE layout (nao outro)
2. **Usar o componente de animacao** criado na Phase 5 para a ANIMACAO DE ENTRADA
3. **Implementar ANIMACAO DE SCROLL** se especificada
4. **Aplicar TECNICA VISUAL** descrita (grain, blend mode, mask shape, etc)
5. **Seguir o ANIMATION BUDGET**: showstopper na secao designada, supporting onde indicado, baseline no resto

**PROIBIDO:**
- Usar ScrollReveal generico (opacity:0 y:20 → 1 y:0) em mais de 1 secao
- Usar o MESMO easing em todas as animacoes
- Ter 3+ secoes consecutivas com o mesmo background-color
- Ignorar o blueprint e fazer "o que e mais facil"

Para CADA secao:
- TODOS textos via `t('secao.chave')` — ZERO string hardcoded
- Imagens do `/images/` com alt descritivo
- COERENCIA IMAGEM ↔ SECAO: conteudo da imagem deve bater com assunto da secao
- MOBILE-FIRST: escreva PRIMEIRO para 375px, depois `md:` e `lg:`

**MCPs de componentes (consulte ANTES de inventar do zero):**
- `mcp__magic-ui` — blur-fade, aurora-text, number-ticker, shimmer-button
- `mcp__aceternity-ui` — parallax-scroll, spotlight, hero-highlight, 3D-card
- `mcp__shadcn-ui` — button, card, tabs, accordion, dialog
- `mcp__gsap` — patterns de ScrollTrigger em React

## 6.4 GATE — Elemento assinatura REAL (exit 1)

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID
echo "=== GATE: Elemento Assinatura ==="
SIGNATURE_FILES=$(find src/components/ui/ -name "*.jsx" -exec grep -l "svg\|SVG\|viewBox\|@keyframes\|cursor.*url\|clip-path" {} \; 2>/dev/null | grep -iv "Button\|LanguageToggle")
SIGNATURE_COUNT=$(echo "$SIGNATURE_FILES" | grep -c ".jsx" 2>/dev/null || echo 0)
if [ "$SIGNATURE_COUNT" -lt 1 ]; then
  echo "BLOQUEADO: Nenhum componente com SVG tematico ou animacao CSS unica"
  exit 1
fi
for f in $SIGNATURE_FILES; do
  LINES=$(wc -l < "$f" | tr -d ' ')
  if [ "$LINES" -lt 30 ]; then
    echo "BLOQUEADO: $f tem $LINES linhas — parece stub"
    exit 1
  fi
  echo "OK: $f ($LINES linhas)"
done
echo "=== GATE PASS ==="
```

## 6.5 CTA Flutuante (se decidido no blueprint)

Se o blueprint definiu CTA flutuante, implemente conforme especificado.
Se nao definiu, NAO criar por padrao.

## 6.6 Footer

Crie `src/components/layout/Footer.jsx`:
- Estilo derivado do design system (nao receita fixa)
- Dados reais do briefing
- Textos via `t()`

## 6.7 App.jsx + main.jsx

App.jsx: montar todas as secoes conforme blueprint, com Lenis (parametros do blueprint), HelmetProvider, SEO components.
main.jsx: import i18n ANTES de App, fontes @fontsource, index.css.

Sitemap e robots.txt em `public/`.

## VERIFICACAO
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm run build 2>&1
```
Se QUALQUER erro, corrija ate build passar.

## GATE FINAL — Anti-Similaridade BLOQUEANTE (exit 1)

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
echo "=== GATE: Anti-Similaridade ==="
CURRENT="sites/$LEAD_ID"

# 1. Layouts DISTINTOS (minimo 3 tipos)
SPLIT=$(grep -rl 'md:flex-row\|grid-cols-2' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
GRID=$(grep -rl 'grid-cols-[34]' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
CENTER=$(grep -rl 'text-center.*mx-auto\|items-center.*justify-center.*min-h' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
BENTO=$(grep -rl 'grid-template\|bento\|masonry\|asymmetric\|2fr\|3fr' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
OTHER=$(grep -rl 'scroll-snap\|timeline\|accordion\|sticky.*pin\|horizontal' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')

TYPES=0
[ "$SPLIT" -gt 0 ] && TYPES=$((TYPES+1))
[ "$GRID" -gt 0 ] && TYPES=$((TYPES+1))
[ "$CENTER" -gt 0 ] && TYPES=$((TYPES+1))
[ "$BENTO" -gt 0 ] && TYPES=$((TYPES+1))
[ "$OTHER" -gt 0 ] && TYPES=$((TYPES+1))

echo "Tipos de layout: $TYPES (split=$SPLIT grid=$GRID center=$CENTER bento=$BENTO other=$OTHER)"
if [ "$TYPES" -lt 3 ]; then
  echo "BLOQUEADO: Apenas $TYPES tipos de layout. Minimo 3 diferentes."
  exit 1
fi

# 2. Animacoes DIVERSAS (minimo 3 tipos diferentes)
ANIM_Y=$(grep -rl 'opacity.*0.*y:' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
ANIM_SCALE=$(grep -rl 'scale' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
ANIM_CLIP=$(grep -rl 'clipPath\|clip-path' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
ANIM_ROTATE=$(grep -rl 'rotate' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
ANIM_X=$(grep -rl 'opacity.*0.*x:' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')
ANIM_BLUR=$(grep -rl 'blur(' $CURRENT/src/components/sections/*.jsx 2>/dev/null | wc -l | tr -d ' ')

ANIM_TYPES=0
[ "$ANIM_Y" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
[ "$ANIM_SCALE" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
[ "$ANIM_CLIP" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
[ "$ANIM_ROTATE" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
[ "$ANIM_X" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))
[ "$ANIM_BLUR" -gt 0 ] && ANIM_TYPES=$((ANIM_TYPES+1))

echo "Tipos de animacao: $ANIM_TYPES"
if [ "$ANIM_TYPES" -lt 3 ]; then
  echo "BLOQUEADO: Apenas $ANIM_TYPES tipos de animacao. Minimo 3 diferentes."
  exit 1
fi

# 3. Timings BANIDOS do template antigo
if grep -r "duration.*0\.8.*ease.*power3" $CURRENT/src/components/ui/ 2>/dev/null | grep -q "y.*60"; then
  echo "BLOQUEADO: ScrollReveal com parametros identicos ao template antigo (y:60 duration:0.8 power3.out)"
  exit 1
fi
if grep -r "delay.*0\.08.*ease.*0\.25.*0\.46" $CURRENT/src/components/ 2>/dev/null | grep -q "."; then
  echo "BLOQUEADO: AnimatedText com timings identicos ao template antigo (delay:i*0.08 ease:[0.25,0.46,0.45,0.94])"
  exit 1
fi

# 4. Hero NAO repete layout do ultimo site
LAST_HERO=$(ls -td sites/*/src/components/sections/Hero.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -1)
if [ -f "$LAST_HERO" ]; then
  LAST_SPLIT=$(grep -c "md:flex-row\|grid-cols-2" "$LAST_HERO" 2>/dev/null)
  CURR_SPLIT=$(grep -c "md:flex-row\|grid-cols-2" "$CURRENT/src/components/sections/Hero.jsx" 2>/dev/null)
  LAST_FULL=$(grep -c "min-h-screen\|min-h-\[100" "$LAST_HERO" 2>/dev/null)
  CURR_FULL=$(grep -c "min-h-screen\|min-h-\[100" "$CURRENT/src/components/sections/Hero.jsx" 2>/dev/null)

  if [ "$LAST_SPLIT" -gt 0 ] && [ "$CURR_SPLIT" -gt 0 ]; then
    echo "BLOQUEADO: Hero usa layout split — mesmo do ultimo site. Mude para outro layout."
    exit 1
  fi
  if [ "$LAST_FULL" -gt 0 ] && [ "$CURR_FULL" -gt 0 ] && [ "$LAST_SPLIT" -eq 0 ] && [ "$CURR_SPLIT" -eq 0 ]; then
    echo "BLOQUEADO: Hero usa layout fullscreen — mesmo do ultimo site. Mude para outro layout."
    exit 1
  fi
  echo "OK: Hero tem layout diferente do ultimo site"
fi

# 5. Fontes NAO repetem dos ultimos 3 sites
CURR_FONTS=$(grep '@fontsource' "$CURRENT/src/main.jsx" 2>/dev/null | sed 's/.*@fontsource\///' | sed "s/[/\"';].*//" | tr '[:upper:]' '[:lower:]' | sort -u)
for f in $(ls -td sites/*/src/main.jsx 2>/dev/null | grep -v "$LEAD_ID" | head -3); do
  PREV_FONTS=$(grep '@fontsource' "$f" 2>/dev/null | sed 's/.*@fontsource\///' | sed "s/[/\"';].*//" | tr '[:upper:]' '[:lower:]' | sort -u)
  for font in $CURR_FONTS; do
    if echo "$PREV_FONTS" | grep -qw "$font"; then
      PREV_SITE=$(echo "$f" | sed 's|sites/||;s|/src/main.jsx||')
      echo "BLOQUEADO: Fonte '$font' ja usada em $PREV_SITE. Escolha outra."
      exit 1
    fi
  done
done
echo "OK: Fontes sao originais"

echo "=== GATE ANTI-SIMILARIDADE: PASS ==="
```

## CRITERIO DE CONCLUSAO
- `npm run build` passa sem erros
- Blueprint implementado FIELMENTE (cada secao conforme especificado)
- Navbar com estilo DIFERENTE do ultimo site
- Elemento assinatura REAL (gate passed)
- Gate anti-similaridade PASS (layouts diversos, animacoes diversas, sem timings banidos, hero unico, fontes originais)
- Todos textos via t() — zero hardcoded
