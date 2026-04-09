# Mapa de Encantamento — Talita Soares Arquitetura

## Conceito emocional
O visitante deve sentir que esta entrando num espaco onde cada detalhe foi pensado com intencao — como se o proprio site fosse um projeto de interiores, onde nada e acaso e tudo convida a permanecer.

## Conceito narrativo
"O obvio que voce nao ve" — revelar a beleza escondida nos detalhes que passam despercebidos, assim como Talita revela em sua serie viral.

## O que aprendi das referencias
- Speckyboy curtain effects: O efeito cortina cria uma metafora perfeita para "revelar o que esta por tras" — o olhar da arquiteta desvelando espacos. Ensinou que clip-path transitions sao mais elegantes que slides.
- Home Societe (interior design): Simplicidade rica — poucos elementos mas cada um com vida propria. Ensinou que em sites de interiores, o espaco vazio (whitespace) e tao importante quanto o preenchido.
- Splitscreen scroll animations (Webflow showcase): Divisao de tela como metafora do "antes e depois" invisivel que uma arquiteta ve. Ensinou que split layouts criam tensao visual sofisticada.

## Direcao estetica
Editorial-arquitetonica — linhas limpas, grid rigido como planta baixa, tipografia como elemento estrutural, espacos generosos que "respiram" como ambientes bem projetados. Nao e minimal frio — e calidez intencional.

## Blueprint Tecnico

### Layout Map
Hero (split-screen assimetrico) -> Manifesto (texto editorial full-width) -> Servicos (bento grid escalonado) -> Portfolio (galeria masonry com lightbox) -> Processo (timeline horizontal) -> Social Proof (ticker + metricas) -> Contato (split com mapa conceitual)

### Hero
- LAYOUT: Split-screen assimetrico 55/45 — lado esquerdo com tipografia oversized empilhada verticalmente (nome + tagline), lado direito com imagem de projeto com mascara organica (border-radius complexo). Background com grid sutil de linhas finas como planta baixa.
- ANIMACAO DE ENTRADA: Texto revela via clip-path horizontal wipe da esquerda (clip-path: inset(0 100% 0 0) -> inset(0 0 0 0) em 1s, cubic-bezier(0.77, 0, 0.175, 1)). Imagem entra com scale de 1.15 para 1.0 em 1.4s com leve delay.
- ANIMACAO DE SCROLL: Parallax invertido na imagem (y: -30 com scrub), grid de linhas no bg se desvanece gradualmente.
- TECNICA VISUAL: Grid de linhas finas (#e5ddd3 a 15% opacity) como planta baixa no background, mascara de imagem com border-radius: 40% 60% 55% 45% / 60% 40% 45% 55% que pulsa sutilmente.
- REFERENCIA: Splitscreen scroll — divisao como metafora arquitetonica

### Manifesto (Sobre)
- LAYOUT: Full-width editorial — frase grande centralizada em display font ocupando 80% da viewport width, seguida de 2 colunas de texto menor abaixo (60/40). Citacao destacada com barra lateral.
- ANIMACAO DE ENTRADA: Palavras-chave da frase principal surgem uma a uma com blur-to-sharp (filter: blur(12px) -> blur(0)) com stagger de 200ms. "O obvio" aparece primeiro, depois "que voce nao ve", criando suspense.
- ANIMACAO DE SCROLL: Nenhuma — leitura limpa, sem distracoes.
- TECNICA VISUAL: Palavras-chave em cor de destaque (--terracota). Background sutil com gradiente radial centralizado do tipo "luz de janela" (--linho claro para --linho).
- REFERENCIA: Aesop.com — tipografia como arquitetura

### Servicos
- LAYOUT: Bento grid escalonado — grid-template-columns: 1fr 1fr 1fr, com cards de alturas variadas. Card principal (Projeto Residencial) ocupa 2 colunas. Hover revela descricao expandida.
- ANIMACAO DE ENTRADA: Cards surgem em cascade diagonal (top-left primeiro, bottom-right por ultimo), cada um com scale 0.9 -> 1.0 e opacity, stagger 100ms.
- ANIMACAO DE SCROLL: Cards que ja passaram pela viewport ficam com sutil saturacao reduzida, focando atencao no visivel.
- TECNICA VISUAL: Cada card tem borda de 1px que transiciona para 2px + sombra suave no hover. Icone de cada servico e um SVG de linha fina (estilo planta baixa). Background dos cards alterna entre --linho e --marfim.
- REFERENCIA: Apple product grid — densidade cria valor percebido

### Portfolio (Projetos)
- LAYOUT: Masonry grid responsivo — 3 colunas desktop, 2 tablet, 1 mobile. Cada item mostra imagem com overlay no hover revelando nome do projeto + tipo.
- ANIMACAO DE ENTRADA: SHOWSTOPPER — Efeito cortina: imagens revelam-se com clip-path vertical (inset(0 0 0 100%) -> inset(0 0 0 0)) em sequencia cascata, como cortinas sendo abertas uma a uma. Timing: 0.8s cada com stagger de 150ms.
- ANIMACAO DE SCROLL: Leve parallax nas imagens internas (velocidades diferentes criando profundidade).
- TECNICA VISUAL: Hover com zoom sutil (scale 1.03) + overlay gradiente do fundo para topo com nome do projeto em font display. Cursor muda para lupa customizada via CSS.
- REFERENCIA: Curtain reveal (Speckyboy) — revelar como metafora do olhar arquitetonico

### Processo
- LAYOUT: Timeline horizontal com scroll lateral controlado por vertical scroll (ScrollTrigger pin). 4 etapas: Conversa -> Projeto -> Acompanhamento -> Entrega. Cada etapa e um card com icone SVG + titulo + texto breve.
- ANIMACAO DE ENTRADA: Linha da timeline desenha-se progressivamente (SVG stroke-dashoffset animado). Cards aparecem quando a linha chega a cada ponto.
- ANIMACAO DE SCROLL: Scroll horizontal pinned — vertical scroll controla o progresso horizontal.
- TECNICA VISUAL: Linha da timeline usa gradiente da cor --terracota para --verde-folha. Numeros das etapas em display font oversized (120px) com opacity 10% atras de cada card.
- REFERENCIA: Horizontal scroll timelines — jornada linear do cliente

### Social Proof (Metricas + Instagram)
- LAYOUT: Secao dividida — metade superior com numeros grandes (seguidores, projetos, post viral) em grid de 3 colunas. Metade inferior com ticker/marquee mostrando frases da serie "coisas obvias".
- ANIMACAO DE ENTRADA: Numeros fazem countup animado com easing elastico (spring physics). Cada numero aparece com leve bounce.
- ANIMACAO DE SCROLL: Ticker/marquee roda continuamente, velocidade sutil.
- TECNICA VISUAL: Numeros em display font oversized. Fundo com pattern sutil de aspas (SVG) em 3% opacity. Link direto para Instagram com icone animado (hover: pulse).
- REFERENCIA: Metricas como prova social visual

### Contato
- LAYOUT: Split 50/50 — lado esquerdo com headline convidativa + formulario simples (nome, email, mensagem) ou CTA de WhatsApp. Lado direito com imagem de ambiente + dados de contato sobrepostos em card translucido.
- ANIMACAO DE ENTRADA: Lados deslizam um em direcao ao outro (esquerdo de -60px, direito de +60px) com spring easing.
- ANIMACAO DE SCROLL: Nenhuma — foco em acao.
- TECNICA VISUAL: Card de contato com backdrop-blur + borda de 1px branca a 20% opacity (glassmorphism sutil). Hover no botao WhatsApp com ripple effect.
- REFERENCIA: Pratico — entrega clara de informacao

## Animation Budget
- SHOWSTOPPER (1 momento WOW): Portfolio curtain reveal — imagens revelando-se com clip-path vertical em cascata, como cortinas sendo abertas
- SUPPORTING (2-3 animacoes notaveis): Hero split-screen clip-path wipe + image organic mask, Manifesto blur-to-sharp word reveal, Processo timeline SVG drawing com scroll horizontal
- BASELINE (todo o resto): CSS transitions para hovers, opacity fades, card lifts, color transitions

## Design System

### Colors (semantic tokens derivados do conceito)
- `--linho`: #F5F0EA (background principal — tecido neutro, calidez de ambiente)
- `--marfim`: #FFFDF8 (surface/cards — branco quente, nao clinical)
- `--carvao`: #2B2622 (texto principal — grafite suave, nao preto puro)
- `--terracota`: #C4654A (destaque/CTA — argila, materia-prima da construcao)
- `--terracota-hover`: #A84F38 (hover state do CTA)
- `--verde-folha`: #5B7B5E (acento secundario — natureza no projeto, paisagismo)
- `--pergaminho`: #E8DFD3 (bordas, separadores, backgrounds alternados)
- `--grafite`: #6B6058 (texto secundario — neutro quente)
- `--neblina`: rgba(43, 38, 34, 0.06) (overlays, sombras sutis)
- `--janela`: rgba(196, 101, 74, 0.08) (glow sutil para elementos em destaque)

### Typography — @fontsource packages
- Display: `@fontsource/dm-serif-display` — serif elegante com personalidade, estrutural como pilares (weight 400)
- Body: `@fontsource/plus-jakarta-sans` — sans-serif geometrica moderna, legibilidade excelente (weights 300, 400, 500, 600)
- Accent: numeros oversized em DM Serif Display para metricas e etapas

### Spacing
- Grid: 8px base
- Section padding: 80px (mobile) / 120px (desktop)
- Max-width: 1200px (conteudo), 1440px (secoes full-bleed)
- Gap padrao entre elementos: 24px (mobile) / 32px (desktop)

## Elemento Assinatura
**"Grid de Planta Baixa"** — Um pattern SVG de linhas finas ortogonais (como uma planta baixa simplificada) que aparece como background sutil no hero e nas transicoes entre secoes. As linhas sao animadas: desenham-se sutilmente quando a secao entra na viewport (stroke-dashoffset animation), e desvanecem quando sai. Implementado como componente `BlueprintGrid.jsx` em SVG com animacao via GSAP ScrollTrigger. Aparece em: Hero (background), transicao Hero->Manifesto, transicao Portfolio->Processo. A cor das linhas e `--pergaminho` a 40% de opacidade. Este elemento reforca que o proprio site foi "projetado" como um de seus projetos arquitetonicos — impossivel de confundir com qualquer outro site.

## Floating CTA
- **Decisao:** SIM — floating WhatsApp button
- **Justificativa:** Canal principal de contato e Instagram DM/WhatsApp. Visitantes podem querer contato rapido em qualquer ponto do site. Botao circular com icone WhatsApp, posicao bottom-right, aparece apos scroll de 30vh, com animacao de entrada suave.
- **Formato:** Circular, 56px, --terracota background, icone branco, sombra suave.

## Secoes (ordem emocional)
1. **Hero** — Impacto visual + identidade (split assimetrico)
2. **Manifesto** — Quem e a Talita / filosofia (editorial full-width)
3. **Servicos** — O que ela faz (bento grid escalonado)
4. **Portfolio** — Prova visual do trabalho (masonry com cortina)
5. **Processo** — Como funciona trabalhar com ela (timeline horizontal)
6. **Social Proof** — Numeros + engajamento (metricas + ticker)
7. **Contato** — Conversao (split com glassmorphism)
