# Guidelines Criativas — Leia na Fase 2

## Conceito: cada site e uma obra unica

NAO classifique o cliente num "tipo" ou "arquetipo". Nao use padroes por nicho (ex: "medico = azul", "restaurante = tons quentes"). Derive TUDO do cliente individual: suas cores, sua historia, seu tom, suas imagens.

## O que torna um site premium (nivel dos melhores do mundo)

- **Transicoes de contexto:** o scroll transforma o ambiente — cores mudam entre secoes, elementos se reposicionam, a atmosfera evolui
- **Micro-interacoes com significado:** hover revela informacao util, nao apenas cresce
- **Timing e ritmo:** momentos rapidos intercalados com pausas. Nem tudo anima ao mesmo tempo
- **Elementos inesperados:** texto que se revela letra por letra, parallax invertido, contador ao vivo
- **Scroll como experiencia cinematografica:** prazeroso e revelador

## Material rico de conversao

Cada secao DEVE contribuir para uma jornada que leva ao CTA:
- **Prova social animada:** contadores, badges, estrelas, depoimentos
- **Demonstracao de valor:** mostrar, nao apenas listar servicos
- **Microconteudo persuasivo:** frases de impacto entre secoes
- **Indicadores de confianca:** CRM/OAB em destaque, logos de plataformas, selos
- **CTAs progressivos:** cada CTA diferente e adequado ao momento emocional

## Secoes — nao use lista fixa

O layout NAO precisa ser Hero → Sobre → Servicos → Depoimentos → Contato.
Cada secao existe porque tem conteudo real. A ordem segue a jornada emocional.
Pense em micro-secoes criativas: contadores, frases de efeito, parallax, transicoes de cor.

## Imagens — curadoria rigorosa

### Imagens do briefing — coerencia imagem ↔ contexto (REGRA CRITICA)
Antes de usar qualquer imagem do briefing, abra com Read (multimodal) e responda:
1. **O que tem nessa imagem?** (descreva: "pizza", "fachada", "retrato", etc)
2. **Em qual secao o conteudo da imagem faz sentido?**

A imagem DEVE corresponder ao assunto da secao. Exemplos de erro grave:
- Secao de pizza mostrando prato de arroz
- Secao de imoveis mostrando pessoa
- Secao de farmacia mostrando restaurante
- Hero de barbearia mostrando padaria

Se nao tem imagem que combine → sem imagem. Compensar com tipografia/CSS.
NUNCA forcar imagem numa secao so porque "precisa de visual ali".

### Imagens stock — regras de honestidade
- NUNCA para: rosto do profissional, fachada, produtos/cardapio, equipe, logo
- SOMENTE para: backgrounds, texturas, atmosfera, elementos abstratos
- Buscar por conceito criativo, nao por nicho

## Encantamento maximo

O site deve ser aquele que voce quer ficar navegando para ver tudo acontecendo.
Pergunte: "alguem mandaria esse link dizendo 'olha que incrivel'?"
Se a resposta nao for sim, adicione mais detalhes, mais surpresas, mais cuidado.

## Servico e CTA sempre visiveis

O visitante deve entender O QUE o cliente faz e COMO contratar a qualquer momento.
CTA no navbar fixo, entre secoes, no footer. Cada CTA com abordagem diferente.

## Concorrentes NAO sao referencia

Concorrentes locais servem APENAS para evitar repeticao acidental de cores.
NUNCA como benchmark de qualidade, layout ou design.

### Benchmark = catalogo curado de referencias

O benchmark principal e o catalogo curado em `sites/_templates/design-references.md` — 30+ sites premium reais selecionados por layout, animacao, tipografia e tecnicas.
Na Fase 3, filtre os mais relevantes por tags e tipo de cliente.
Complemente com WebSearches por tecnicas especificas (ex: "best scroll animation techniques 2025", "react parallax examples").

IMPORTANTE: Awwwards, CSS Design Awards etc sao AGREGADORES — o valor esta nos SITES listados neles, nao nas plataformas em si. Nunca referencie "nivel Awwwards" como se fosse um padrao. Referencie sites concretos do catalogo curado.

Pergunte: "qual site do catalogo resolveu algo parecido e como?" — NAO "como o concorrente faz?"

## NAO e uma landing page

O site deve ser ROBUSTO. Se o conteudo justifica, criar paginas dedicadas com React Router:
- Servicos com paginas individuais
- Cardapio extenso com pagina propria e filtros
- Portfolio/galeria em pagina dedicada
- Multiplas unidades com pagina por local
Mesmo sendo SPA, cada secao deve ter profundidade e interatividade — nao um bloco de texto com foto.

## Componentes acessiveis

Usar Radix UI para componentes interativos: modais (Dialog), acordeoes (Accordion), tabs (Tabs).
Radix garante acessibilidade nativa: ARIA roles, keyboard navigation, focus trap.
Nao reinventar o que Radix ja resolve.
