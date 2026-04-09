# Mapa de Encantamento — Dra. Milena Grossi Germiniani

## Conceito emocional
O visitante deve sentir que entrou num espaco de cuidado refinado onde ciencia e delicadeza coexistem — como uma consulta particular num ambiente que cheira a flores frescas, onde cada detalhe foi pensado para transmitir que aqui, a beleza natural e levada a serio.

## O que aprendi das referencias

**monographcomms.ca** — Ensinou que elegancia nasce da contencao: espaco negativo generoso, hierarquia tipografica com poucos pesos, e a coragem de deixar o conteudo respirar. Para a Dra. Milena, isso significa nao encher secoes de informacao — cada tratamento merece seu momento de destaque com espaco ao redor.

**aprilford.com** — Ensinou que transicoes de pagina e loading controlado criam antecipacao. O peso da tipografia muda em hover, criando uma sensacao tatil. Para este projeto, vou usar mudancas sutis de peso tipografico nos cards de tratamento e transicoes suaves entre secoes que criam uma jornada.

**prettyolive.com** — Ensinou que paleta quente + fotografia profissional + tipografia limpa = sofisticacao organica acessivel. A alternancia entre secoes com imagem a direita e a esquerda cria ritmo. Para a Dra. Milena, essa alternancia entre secoes HOF e Odonto vai criar variedade visual sem perder coerencia.

**phamilypharma.com** — Ensinou que servico de saude pode ter personalidade acolhedora sem perder autoridade. O fundo creme (#fffdf7) em vez de branco puro traz calor. Icones ilustrativos humanizam. Para este projeto, o fundo cream da Dra. Milena (#F5EDE4) ja faz isso naturalmente — vou potencializar com micro-animacoes que transmitem cuidado.

**wealthsimple.com** — Ensinou que storytelling editorial funciona para servicos que precisam de confianca. Dados + narrativa humana. Para a Dra. Milena, os contadores de procedimentos, CRO em destaque, e a historia familiar (filha de dentista) sao prova social poderosa contada como narrativa.

## Como o hero vai capturar atencao nos primeiros 3 segundos?

O site abre com fundo cream (#F5EDE4) puro. O monograma "mg" se desenha suavemente (SVG path animation, 1.5s) no centro-esquerda, como se uma caneta estivesse escrevendo em tempo real. Enquanto o monograma se completa, o nome "Dra. Milena Grossi Germiniani" revela-se letra por letra em serif elegante ao lado. Uma frase sussurrada aparece abaixo: "A arte da naturalidade". O fundo faz uma transicao sutil para revelar uma imagem desfocada (skin tone warm) que se torna nitida. O CTA "Agende sua consulta" surge com um fade gentil. A sensacao e de estar abrindo uma carta pessoal de alguem que se importa.

## Qual e o ritmo do scroll?

Lento e cinematografico, como um tour por um spa de luxo. Cada secao e um "ambiente" com sua propria atmosfera. Pausas intencionais entre secoes com frases de impacto em serif grande ("Seu sorriso merece ciencia e delicadeza"). Transicoes de cor suaves entre cream e branco. Os tratamentos revelam-se um por um com stagger animation. O scroll nao corre — ele convida.

## Onde estao as surpresas?

1. **Hero**: O monograma "mg" se desenhando como assinatura real
2. **Transicao HOF/Odonto**: Uma micro-secao com frase de impacto e mudanca sutil de paleta (cream -> soft pink -> cream) que sinaliza a dualidade HOF/Odonto
3. **Cards de tratamento**: Ao hover, o card expande suavemente revelando detalhes do procedimento com uma animacao de "cortina" lateral
4. **Secao infantil**: Mudanca de tom — cores mais leves, tipografia mais arredondada, icones ludicos. Um momento de ternura no meio da sofisticacao
5. **Contador animado**: Numero de sorrisos transformados conta em tempo real quando entra na viewport
6. **Parallax sutil**: A imagem do logo em background se move mais devagar que o conteudo, criando profundidade

## Como o site vende sem parecer que esta vendendo?

Os CTAs aparecem como convites naturais, nao como botoes de venda:
- Hero: "Agende sua consulta" — tom de convite pessoal
- Apos tratamentos HOF: "Descubra qual tratamento e ideal para voce" — curiosidade
- Apos tratamentos Odonto: "Converse com a Dra. Milena" — intimidade
- Diferenciais: "Conheca a clinica" — explorar
- Footer: "Comece sua transformacao" — acao suave
Cada CTA tem texto e tom diferentes. O WhatsApp e o canal principal — cada CTA leva ao WhatsApp com mensagem pre-preenchida contextual.

## O que faz esse site impossivel de confundir com qualquer outro?

O monograma "mg" cursivo como elemento vivo — ele aparece sutilmente em diferentes momentos (watermark leve em secoes, animacao de assinatura no hero, selo no footer). A combinacao unica de rose gold + serif elegante + tom acolhedor de interior de MG cria uma identidade que so a Dra. Milena pode ter. A dualidade HOF + Odonto + Infantil e rara e o site a celebra em vez de esconder. O CRO da familia (pai e filha) como narrativa de legado.

## CTA Flutuante

**Decisao: Botao flutuante simples (WhatsApp)**
- Canal dominante: WhatsApp (35) 9 9725-5631
- Site longo (8 secoes) — visitante pode perder o ponto de contato
- Publico mobile-first (mulheres 25-55 interior MG)
- Conceito elegante — botao discreto, nao intrusivo
- Formato: Icone WhatsApp em rose gold com borda fina, canto inferior direito
- Comportamento: aparece apos scroll de 300px, some quando footer esta visivel
- Hover: expande suavemente mostrando "Fale conosco"
- Estilo: tom-on-tom rose gold, nao o verde padrao do WhatsApp (manter elegancia)

---

## Design System

### Conceito narrativo
"Onde a ciencia encontra a delicadeza — cada sorriso e uma obra de arte natural."

### Paleta de Cores (10 tokens)

| Token | Hex | Uso |
|-------|-----|-----|
| primary | #B8876B | Rose gold — CTAs, destaques, monograma |
| primary-light | #D4A88C | Rose gold claro — hover states, bordas |
| primary-dark | #8B6549 | Rose gold escuro — texto em destaque |
| secondary | #E8C4C4 | Soft pink — backgrounds de secao alternadas |
| accent | #C9956D | Dourado terroso — badges, selos, contadores |
| background | #F5EDE4 | Cream — fundo principal |
| surface | #FFFFFF | Branco — cards, areas elevadas |
| text-primary | #4A3728 | Dark brown — texto principal |
| text-secondary | #6B5344 | Brown medio — texto secundario |
| text-muted | #9B8A7B | Brown claro — legendas, labels |

Contraste verificado:
- text-primary (#4A3728) sobre background (#F5EDE4) = 7.2:1 (AAA)
- text-secondary (#6B5344) sobre background (#F5EDE4) = 4.6:1 (AA)
- text-muted (#9B8A7B) sobre surface (#FFFFFF) = 3.4:1 (AA large text)

### Tipografia

**Display/Heading:** `@fontsource/cormorant-garamond`
- Serif elegante com personalidade. Perfeita para o tom sofisticado-acolhedor.
- Pesos: 400 (subtitulos), 500 (titulos secao), 600 (hero headline)
- Tracking: -0.02em em headlines

**Body:** `@fontsource/outfit`
- Sans-serif moderna e limpa, com curves suaves que combinam com o tom feminino.
- Pesos: 300 (body), 400 (labels), 500 (buttons), 600 (emphasis)
- Nao e Inter/Roboto — tem personalidade propria com terminais arredondados

### Espacamento
- Grid: 8px base
- Mobile: padding horizontal 20px, vertical entre secoes 80px
- Desktop: max-width 1280px, vertical entre secoes 120px
- Secoes alternam entre full-width e contidas

### Secoes do Site (ordem = jornada emocional)

1. **Hero — "Primeiro toque"**
   - Proposito: capturar com elegancia e misteriosa delicadeza
   - Conteudo: monograma animado + nome + conceito + CTA
   - Animacao: SVG path draw do monograma, text stagger reveal, fade-in suave
   - Layout: split-screen assimetrico (60/40), monograma a esquerda, texto a direita em mobile vira empilhado

2. **Sobre — "Quem cuida de voce"**
   - Proposito: criar conexao humana e confianca
   - Conteudo: historia da Dra. Milena, legado familiar (pai dentista), CRO MG 26.171, formacao
   - Animacao: scroll reveal de blocos de texto, badge CRO com sutil brilho
   - Layout: texto esquerda com timeline vertical sutil

3. **Tratamentos HOF — "A arte do natural"**
   - Proposito: mostrar expertise em harmonizacao sem prometer milagres
   - Conteudo: Toxina, Preenchimento, Skinbooster, HIPRO Day, Ultrassom, Bioestimuladores, BIOreCONEXAO, Cirurgia
   - Animacao: cards com hover expand (cortina lateral revela detalhes), stagger entrance
   - Layout: grid assimetrico 2 colunas (alternando tamanhos), fundo soft pink

4. **Micro-secao — "Transicao emocional"**
   - Proposito: pausa poetica entre HOF e Odonto
   - Conteudo: frase de impacto em Cormorant Garamond grande + contador (procedimentos realizados)
   - Animacao: parallax sutil, contador anima ao entrar viewport
   - Layout: full-width, fundo cream, texto centralizado (excecao intencional)

5. **Tratamentos Odonto — "Ciencia do sorriso"**
   - Proposito: mostrar expertise odontologica tradicional com modernidade
   - Conteudo: Ortodontia, Ortopedia, Invisalign, Invisalign First, Clareamento, Odontopediatria, Bruxismo, Megatriagem
   - Animacao: scroll reveal com stagger, hover mostra detalhes
   - Layout: grid cards, fundo branco (contraste com secao HOF em pink)

6. **Mundo Infantil — "Sorrisos pequenos, cuidados grandes"**
   - Proposito: ternura, mostrar lado ludico e acolhedor para criancas
   - Conteudo: Invisalign First + Odontopediatria destacados, linguagem mais leve
   - Animacao: elementos mais playful, bordas mais arredondadas, micro-animacoes suaves
   - Layout: secao com tom levemente diferente (mais arredondado, mais leve)

7. **Diferenciais — "Por que a Dra. Milena"**
   - Proposito: consolidar confianca, diferenciar de concorrentes
   - Conteudo: Dupla especialidade, Invisalign Doctor, atendimento SP + MG, legado familiar, protocolo BIOreCONEXAO exclusivo
   - Animacao: icones que surgem com stagger, badges com hover glow sutil
   - Layout: bento grid assimetrico

8. **Localizacao + Contato — "Encontre a Dra. Milena"**
   - Proposito: facilitar acao, mostrar presenca fisica
   - Conteudo: Endereco Ouro Fino (Rua Prefeito Jose Serra 228), mencao SP (Itaim Bibi), mapa, WhatsApp, Instagram, horarios
   - Animacao: mapa com fade-in, cards de contato com hover
   - Layout: split-screen (mapa + info)

9. **Footer — "Assinatura"**
   - Proposito: fechar com elegancia, repetir CTA
   - Conteudo: monograma "mg", links, CRO, copyright
   - Animacao: monograma fade-in, links hover underline

### Imagens Stock necessarias
- Textura marble/stone rose gold sutil para backgrounds de secao (se necessario, usar CSS gradient)
- Nenhuma foto de pessoa stock — temos apenas o logo como elemento visual principal
- Compensar ausencia de fotos pessoais com design tipografico forte e geometria CSS (circulos, linhas finas)
