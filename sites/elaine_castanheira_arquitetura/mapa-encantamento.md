# Mapa de Encantamento -- Elaine Castanheira Arquitetura

## Conceito emocional
O visitante deve sentir que esta entrando num espaco projetado por Elaine -- calmo, sofisticado, com cada detalhe no lugar certo. Nao e um site, e um ambiente.

## O que aprendi das referencias

### hm.la (Hsu McCullough Architecture)
Emocao: Voce sente que esta num museu de arquitetura -- cada projeto respira, o branco ao redor faz as fotos parecerem obras emolduradas.
Mecanismo: Espacamento absurdamente generoso, animacoes letra por letra, slider de 4s no hero, fotografia como protagonista absoluta.
Para Elaine: O principio de "projeto como obra de arte" e perfeito. As fotos do Costa Azul merecem moldura digital -- muito espaco branco ao redor, revelacao lenta.

### aprilford.com
Emocao: Voce sente confianca imediata -- e sofisticado sem ser frio, profissional sem ser corporativo.
Mecanismo: Hierarquia tipografica precisa (pesos variados criam movimento visual), hover states com stagger reveals em botoes, transicoes de 1200ms que dao peso a cada acao.
Para Elaine: A ideia de "confianca elegante" combina com 20 anos de experiencia. A tipografia pode carregar a marca mesmo sem logo elaborado.

### monographcomms.ca
Emocao: "Simple can be extraordinary" -- voce sente que cada pixel foi pensado. A ausencia de decoracao AMPLIFICA o que esta presente.
Mecanismo: Preto e branco sem concessoes, hierarquia APENAS por peso tipografico (sem cor para diferenciar), ilustracoes SVG pontuais.
Para Elaine: A coragem de ser simples. Elaine nao precisa gritar -- 20 anos de trabalho falam por si. Menos e mais.

### torebentsen.com
Emocao: Voce sente que esta folheando um livro de fotografia de alta qualidade -- cada scroll revela uma obra.
Mecanismo: Custom cursor, animacoes de texto com rotacao 3D, Lenis smooth scroll, clip-paths organicos que criam bordas "rasgadas", shaders no hero.
Para Elaine: O smooth scroll e o scroll-reveal por secao criam um ritmo cinematografico perfeito para apresentar projetos de interiores.

### prettyolive.com (Pretty Olive Interiors)
Emocao: Voce sente acolhimento sofisticado -- e quente sem ser casual, luxuoso sem ser inacessivel.
Mecanismo: Paleta warm com neutrals, Montserrat limpa, muito espaco branco, fotografias de interiores como protagonistas, modular e respirado.
Para Elaine: A paleta quente e o feeling "luxo acessivel" sao exatamente o posicionamento de Elaine -- interiores residenciais para familias, nao mansoes de bilionarios.

## Como o hero vai capturar atencao nos primeiros 3 segundos?
O site abre com uma foto do projeto Costa Azul em tela cheia, com um overlay sutil em tom terroso. O nome "Elaine Castanheira" aparece letra por letra numa serif elegante, seguido pela frase "Ambientes que envelhecem com voce". Nao ha menu visivel nos primeiros 2 segundos -- so a imagem e o nome. O menu aparece com fade apos o titulo terminar de se revelar. A sensacao e de entrar num apartamento projetado por ela.

## Qual e o ritmo do scroll?
Lento e cinematografico, com pausas deliberadas. Cada secao e uma "sala" diferente -- a cor de fundo muda sutilmente entre tons de bege, branco e cinza quente. Ha micro-secoes entre as secoes principais: uma frase de impacto, um numero (20 anos), uma textura. O scroll nao e rapido -- cada secao merece atencao.

## Onde estao as surpresas?
1. **Hero:** Texto que se revela letra por letra enquanto a foto faz um parallax sutil
2. **Transicao Hero -> Sobre:** A cor de fundo transiciona de escuro para claro conforme o scroll
3. **Secao de numeros:** Contadores que se animam ao entrar na viewport (20 anos, 12K seguidores, projetos)
4. **Portfolio:** Fotos que crescem de 80% para 100% conforme o scroll (zoom parallax)
5. **Frase de impacto entre secoes:** Uma frase grande em serif que aparece com stagger -- "Criar ambientes atemporais que evoluam com a familia"
6. **Credenciais:** Badges do CAU, Healthy Building que aparecem com spring physics

## Como o site vende sem parecer que esta vendendo?
O CTA principal e "Orcamento gratuito sem compromisso" -- remove barreira. Ele aparece:
- No hero (discreto, abaixo do titulo)
- Entre Portfolio e Credenciais (apos ver o trabalho, antes de ver as credenciais)
- No contato final (com formulario + WhatsApp)
Cada aparicao tem texto diferente: "Vamos conversar sobre seu espaco", "Agende uma visita", "Fale comigo no WhatsApp". A venda acontece pela progressao emocional: primeiro voce admira o trabalho, depois confia na profissional, depois pede orcamento.

## O que faz esse site impossivel de confundir com qualquer outro?
1. A paleta terrosa inspirada nas cores reais dos interiores que ela projeta (bege, cacao, calacata)
2. A tipografia serif elegante que ecoa a atemporalidade da filosofia dela
3. As fotos profissionais do Ivan Araujo -- ninguem mais tem essas fotos
4. A frase "Ambientes que envelhecem com voce" -- so faz sentido para quem projeta para familias de verdade
5. A certificacao Healthy Building -- quase nenhuma arquiteta em Florianopolis tem isso

## Decisao sobre CTA flutuante
**Decisao: Botao flutuante simples de WhatsApp**
Justificativa: O canal dominante de contato e WhatsApp (+55 48 99923-5973). O conceito e elegante e editorial, entao um menu expansivel poluiria. Um botao sutil no canto inferior direito, em tom terroso (nao verde padrao do WhatsApp), que aparece apos o scroll passar do hero. Some quando o footer de contato esta visivel (para nao duplicar). Em mobile, e especialmente importante porque o footer fica longe.
