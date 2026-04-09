# Mapa de Encantamento — Ana Clara Arquitetura

## Conceito emocional
O visitante deve sentir que esta folheando um livro de arquitetura — cada scroll revela uma camada nova de profundidade intelectual e sensibilidade estetica, como entrar num escritorio onde cada detalhe foi pensado com rigor academico e carinho humano.

## O que aprendi das referencias

### aprilford.com
Ensinou que espaco negativo generoso comunica autoridade sem precisar gritar. O site respira, e essa respiracao faz voce confiar no profissional. Para Ana Clara: usar espacamento amplo entre secoes, deixar o conteudo falar por si — a formacao academica dela ja impressiona, nao precisa de enfeite.

### monographcomms.ca
Ensinou que sofisticacao sem frieza vem da clareza — cada palavra no lugar certo, cada pixel com proposito. A sensacao e de alguem que domina tanto o assunto que simplifica. Para Ana Clara: traduzir a complexidade da pesquisa academica em linguagem visual limpa e acessivel.

### wealthsimple.com
Ensinou que storytelling editorial transforma servicos em narrativa. Em vez de listar produtos, conta uma historia progressiva que te leva a confiar. Para Ana Clara: a timeline academica dela (UFOP > Mestrado > Doutorado) e uma historia natural — usar scroll storytelling para revelar essa jornada.

### hm.la
Ensinou que tipografia SOZINHA pode ser o design inteiro. Quando as letras animam uma a uma, cada palavra ganha peso e presenca. Para Ana Clara: sem fotos profissionais acessiveis, a tipografia sera a protagonista — oversized, animada, com personalidade.

### torebentsen.com
Ensinou que clip-paths organicos e scroll-triggered reveals criam uma experiencia quase tatil — voce sente as camadas se revelando. Para Ana Clara: usar reveal progressivo nas secoes, como se estivesse desdobrando uma planta arquitetonica.

## Como o hero vai capturar atencao nos primeiros 3 segundos?
O site abre com fundo terroso escuro (warm charcoal). O nome "Ana Clara" aparece em serif elegante oversized, revelando-se letra por letra como uma assinatura sendo escrita. Abaixo, uma frase curta emerge suavemente: "Arquitetura que nasce da pesquisa." O efeito e de abrir um portfolio fisico — intimo, sofisticado, pessoal. Sem imagem no hero — pura tipografia com presenca. Um sutil pattern geometrico (linhas finas como uma planta baixa) pulsa no background com opacidade minima.

## Qual e o ritmo do scroll?
Cinematografico e deliberado. Cada secao e uma "pagina" do portfolio com transicao de cor entre elas (terroso escuro > creme quente > terroso medio > branco quente). O scroll revela conteudo em cascata — textos surgem em stagger, numeros contam, a timeline se desenha. Ha pausas visuais entre secoes: micro-secoes com frases de impacto (uma citacao da dissertacao, um dado sobre a cidade) que funcionam como respiros entre blocos densos.

## Onde estao as surpresas?
1. **Timeline academica animada** — na secao Sobre, a jornada UFOP > Mestrado > Doutorado se desenha como uma linha arquitetonica sendo tracada, com marcos que se expandem ao scroll
2. **Contador de pesquisa** — "Estudou 48 anos de transformacao urbana de Conselheiro Lafaiete" aparece com contador animado (1970...2018), revelando a profundidade da dissertacao
3. **Citacao da cidade** — uma micro-secao entre Servicos e Portfolio com uma frase sobre Conselheiro Lafaiete em tipografia display oversized, parallax sutil
4. **Cards de servico com reveal** — cada servico se revela como um "desenho tecnico" sendo aberto, com linhas finas que se conectam

## Como o site vende sem parecer que esta vendendo?
O site conta a historia de alguem que estudou a cidade por anos antes de projetar nela. Cada secao demonstra competencia (formacao, pesquisa, publicacoes) antes de oferecer servicos. O CTA aparece naturalmente no final de cada "capitulo": depois de mostrar a formacao, "Quer transformar seu espaco?". Depois do portfolio, "Vamos conversar sobre seu projeto?". O WhatsApp e integrado como botao contextual, nunca como popup intrusivo. A venda acontece porque a confianca ja foi construida pela narrativa.

## Como o CTA flutuante funciona?
**Decisao: Botao flutuante simples (WhatsApp).** Justificativa: Ana Clara tem apenas UM canal dominante (WhatsApp 31988194100). O site e longo (8 secoes), entao o visitante precisa de acesso ao contato entre secoes. O conceito editorial nao sera poluido por um botao discreto no canto inferior direito. Comportamento: aparece apos scroll de 30vh, desaparece na secao de Contato (que ja tem CTA inline). Estilo: circular, cor accent (#C67D4A), icone WhatsApp em branco, hover com leve escala. Sem animacao chamativa — o botao respeita o tom editorial do site.

## O que faz esse site impossivel de confundir com qualquer outro?
A fusao entre rigor academico e sensibilidade humana. Nenhum outro arquiteto na regiao tem doutorado em urbanismo COM pesquisa especifica sobre Conselheiro Lafaiete. O site traduz isso visualmente: a timeline de formacao, o contador de pesquisa, as referencias a cidade. O tom e de quem conhece a cidade por dentro — nao apenas projeta para ela, mas ESTUDOU ela. A tipografia serif editorial reforca o lado intelectual, enquanto a paleta terrosa quente traz o lado humano e acessivel. E um site que um professor de arquitetura admiraria E um cliente leigo confiaria.

---

## Design System

### Paleta de cores (10 tokens)
| Token | Hex | Uso |
|-------|-----|-----|
| primary | #8B6F5C | Marrom terroso medio — tom principal, headers, elementos de destaque |
| primary-light | #A8907A | Marrom claro — hover states, backgrounds secundarios |
| primary-dark | #5C4A3D | Marrom escuro — contraste forte, texto sobre fundos claros |
| secondary | #2C2825 | Charcoal quente — navbar, footer, secoes escuras |
| accent | #C67D4A | Terracota dourado — CTAs, links, elementos interativos |
| background | #F7F3EF | Off-white quente — fundo principal das secoes claras |
| surface | #EDE7E0 | Creme — cards, areas elevadas, surface alternativo |
| text-primary | #2C2825 | Charcoal quente — texto principal (contraste 12.5:1 sobre background) |
| text-secondary | #6B5E54 | Marrom medio — subtitulos, texto secundario (contraste 5.2:1) |
| text-muted | #9A8D82 | Marrom claro — labels, metadados (contraste 3.4:1 sobre background, ok para texto grande) |

### Tipografia
**Display/Headings:** `@fontsource/cormorant-garamond` — Serif elegante com personalidade editorial. Pesos 400, 500, 600, 700. Usada em tamanhos display (text-4xl a text-7xl) com tracking-tight. Evoca o rigor academico e a sofisticacao do mundo da arquitetura. Cormorant Garamond e distintiva sem ser cliche — nao e a Playfair Display que todo mundo usa.

**Body:** `@fontsource/outfit` — Sans-serif geometrica moderna, limpa e legivel. Pesos 300, 400, 500, 600. Complementa a serif com neutralidade sofisticada. Nao e Inter/Roboto (genericas). Outfit tem personalidade sutil — levemente arredondada, amigavel sem ser infantil.

### Espacamento
- Grid base: 8px
- Mobile horizontal padding: 24px
- Mobile vertical section gap: 80px
- Desktop max-width: 1280px (max-w-7xl)
- Desktop section gap: 120px
- Espacamento entre elementos internos: 16px, 24px, 32px, 48px

### Bordas e sombras
- Border radius: 0px (elementos retos — referencia arquitetonica) para cards e secoes
- Border radius: 9999px para botoes/CTAs (contraste organico)
- Sombras: minimas, tinted com primary-light (shadow-[0_20px_40px_-15px_rgba(139,111,92,0.08)])

### Imagens stock selecionadas (para backgrounds/texturas)
- Textura de concreto aparente sutil — para background de secoes escuras (Pexels: abstract concrete texture warm)
- Pattern geometrico de linhas finas — para hero background (CSS puro, nao imagem)
- Grain/noise overlay — para todas as secoes (CSS puro via pseudo-element)

**NOTA:** Nenhuma foto stock de pessoa, fachada, ou projeto. Todo o visual depende de tipografia + cor + geometria. Imagens reais do portfolio serao extraidas na Fase 4 via Instagram.

---

## Secoes do site (jornada emocional)

### 1. Hero — "A primeira impressao"
**Proposito emocional:** Impactar com sofisticacao e identidade unica
**Conteudo:** Nome "Ana Clara" em serif oversized + "Arquitetura que nasce da pesquisa" + CTA sutil "Conheca meu trabalho"
**Animacao:** Text reveal letra por letra (stagger), pattern geometrico pulsante no bg, fade-up do subtitulo
**Fundo:** secondary (#2C2825) com grain overlay

### 2. Sobre + Timeline — "A historia que gera confianca"
**Proposito emocional:** Revelar profundidade — esta nao e uma arquiteta qualquer
**Conteudo:** Breve bio + timeline visual (UFOP 2015 > Mestrado UFV 2019 > Docencia 2020 > MEI 2024 > Doutorado em andamento)
**Animacao:** Timeline se desenha com scroll (SVG line draw), marcos expandem ao entrar no viewport
**Fundo:** background (#F7F3EF)
**Micro-secao apos:** Contador "Estudou 48 anos de transformacao urbana de Conselheiro Lafaiete (1970-2018)" com counter animado

### 3. Servicos — "O que ela pode fazer por voce"
**Proposito emocional:** Traduzir competencia em valor pratico
**Conteudo:** 4 servicos (Projetos arquitetonicos, Design de interiores, Reformas, Consultorias) com descricao e icone
**Animacao:** Cards com hover reveal (borda accent aparece, conteudo expande), stagger entrance
**Fundo:** surface (#EDE7E0)
**CTA:** "Qual projeto voce tem em mente?" > WhatsApp

### 4. Micro-secao — Citacao/Impacto
**Proposito emocional:** Pausa reflexiva, reforcar conexao com a cidade
**Conteudo:** Frase sobre Conselheiro Lafaiete derivada da pesquisa + dado populacional/economico
**Animacao:** Parallax sutil no texto oversized, fade-in lento
**Fundo:** primary-dark (#5C4A3D), texto em background (#F7F3EF)

### 5. Portfolio — "A prova visual"
**Proposito emocional:** Demonstrar qualidade real dos projetos
**Conteudo:** Grid de projetos (imagens do Instagram quando disponiveis). Fallback: design tipografico com nomes de projetos em serif display
**Animacao:** Scroll reveal com stagger, hover zoom sutil nas imagens, clip-path organico
**Fundo:** background (#F7F3EF)
**CTA:** "Gostou? Vamos criar o seu" > WhatsApp

### 6. Diferenciais — "Por que ela e diferente"
**Proposito emocional:** Consolidar a diferenciacao competitiva
**Conteudo:** 3-4 diferenciais unicos (Pesquisa urbana de Lafaiete, Formacao academica, Docencia UFV, Atencao personalizada)
**Animacao:** Bento grid assimetrico com reveal progressivo, numeros/stats animados
**Fundo:** secondary (#2C2825), texto claro
**Design:** Nao e a grid de 3 cards igual — layout assimetrico com enfase visual diferente em cada item

### 7. Credenciais — "Selos de confianca"
**Proposito emocional:** Fechar o ciclo de confianca antes do CTA final
**Conteudo:** UFOP, UFV, CAU (registro profissional), publicacoes academicas, docencia
**Animacao:** Marquee horizontal com logos/badges, fade-in suave
**Fundo:** surface (#EDE7E0)

### 8. Contato — "O convite final"
**Proposito emocional:** Converter com calor humano
**Conteudo:** "Vamos transformar seu espaco?" + WhatsApp como canal principal + endereco/regiao de atuacao + mapa simplificado da regiao
**Animacao:** Fade-up dos elementos, botao WhatsApp com hover scale
**Fundo:** background (#F7F3EF)
**CTA:** Botao WhatsApp destaque (accent #C67D4A)

### 9. Footer — "O encerramento elegante"
**Proposito emocional:** Profissionalismo e presenca completa
**Conteudo:** Links de secao, Instagram, WhatsApp, creditos profissionais, copyright
**Fundo:** secondary (#2C2825)
