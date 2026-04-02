# Guidelines Criativas — Leia na Fase 2

## Conceito: cada site e uma obra unica

NAO classifique o cliente num "tipo" ou "arquetipo". Nao use padroes por nicho (ex: "medico = azul", "restaurante = tons quentes"). Derive TUDO do cliente individual: suas cores, sua historia, seu tom, suas imagens.

## O que torna um site premiado (Awwwards-level)

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

## Imagens stock — regras de honestidade

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
O unico benchmark e sites premiados (Awwwards SOTD).
Pergunte: "como um site premiado faria isso?" — NAO "como o concorrente faz?"

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
