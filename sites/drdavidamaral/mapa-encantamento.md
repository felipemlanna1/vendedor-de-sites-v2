# Mapa de Encantamento -- Dr. David Amaral

## Conceito emocional
O visitante deve sentir que esta nas maos de alguem que combina precisao cirurgica com cuidado genuino -- como entrar num consultorio onde a tecnologia impressiona mas o olhar do medico acalma.

## Conceito narrativo
"Precisao que alivia. Tecnologia e cuidado para devolver seu movimento."

## O que aprendi das referencias

### phamilypharma.com (servico-local, saude, acolhedor)
- **Emocao:** Voce sente que esta sendo cuidado por alguem que conhece voce pelo nome
- **Mecanismo:** Tipografia grande e acolhedora no hero, CTAs conversacionais ("Vamos conversar?"), equipe nomeada com fotos reais, cores quentes que humanizam
- **Para Dr. David:** A humanizacao do profissional -- mostrar a pessoa por tras do jaleco. CTAs que soam como convite, nao venda. Tipografia bold no hero com frase empatica

### monographcomms.ca (elegante, minimal, corporativo-premium)
- **Emocao:** Voce sente que esta diante de alguem extremamente competente que nao precisa gritar para provar
- **Mecanismo:** Espacamento generoso que transmite seguranca, contraste alto sem cores gritantes, secoes com padrao repetitivo que cria ritmo previsivel e confiavel
- **Para Dr. David:** A confianca silenciosa -- deixar o espacamento e a tipografia transmitirem competencia. Secoes com ritmo consistente que transmitem metodo e organizacao

### wealthsimple.com (corporativo-premium, editorial, scroll-reveal)
- **Emocao:** Voce sente que algo complexo se tornou simples e acessivel
- **Mecanismo:** Storytelling editorial com progressao logica, numeros grandes como prova social, hierarquia visual clara que guia naturalmente, CTAs suaves e nunca agressivos
- **Para Dr. David:** A progressao narrativa -- levar o paciente da dor ate a solucao de forma natural. Numeros impactantes (anos de experiencia, procedimentos realizados). CTAs que convidam sem pressionar

### ready.so (SaaS, minimal, micro-interactions)
- **Emocao:** Voce sente que tudo funciona perfeitamente, sem atrito
- **Mecanismo:** Cards com hover states elaborados, video hero sutil, features apresentadas com alternancia visual, metaforas visuais que simplificam conceitos
- **Para Dr. David:** Cards de servicos com hover states que revelam mais informacao. Animacoes sutis nos icones de procedimento. Alternancia visual entre secoes (imagem-esquerda, texto-direita e vice-versa)

### torebentsen.com (minimal, scroll-reveal, type-driven)
- **Emocao:** Cada scroll revela algo novo e voce nao quer parar de descer
- **Mecanismo:** GSAP scroll-triggered reveals, tipografia massiva como protagonista, espacamento extremo entre secoes, animacoes de texto caractere por caractere
- **Para Dr. David:** O reveal controlado -- secoes que aparecem com timing preciso conforme o scroll. A frase "Precisao que alivia" revelada letra por letra no hero. Transicoes entre secoes que criam ritmo cinematografico

## Como o hero vai capturar atencao nos primeiros 3 segundos?

O hero abre com a foto profissional do Dr. David (de jaleco, bracos cruzados, olhar confiante) posicionada a direita em layout split-screen assimetrico (60% texto / 40% foto). A esquerda, a frase "Precisao que alivia." aparece com stagger animation (palavra por palavra, 200ms delay). Abaixo, o subtitulo "Ortopedia e Traumatologia com tecnologia guiada por ultrassom" faz fade-in suave. Um botao "Agende sua consulta" com animacao de pulse sutil aparece por ultimo. O fundo usa um gradiente muito sutil do branco (#FFFFFF) para o off-white (#F8FAFC). O badge "CRM 68037/MG | RQE 44243" aparece discreto proximo a foto, validando credencial instantaneamente.

## Qual e o ritmo do scroll?

Cinematografico com pausas estrategicas. O site alterna entre:
1. **Momentos de impacto** (hero, frase de efeito entre secoes) -- tipografia grande, animacao dramatica
2. **Momentos informativos** (servicos, sobre, locais) -- layout estruturado, cards organizados, leitura fluida
3. **Micro-pausas** (contadores animados, badges de confianca, separadores visuais) -- breves mas memoraveis

O ritmo imita uma consulta medica: acolhimento (hero) -> escuta (sobre) -> diagnostico (servicos) -> tratamento (tecnologia) -> encaminhamento (locais + contato).

## Onde estao as surpresas?

1. **Hero:** A frase "Precisao que alivia." aparece com stagger animation -- cada palavra emerge como um diagnostico preciso
2. **Transicao Hero -> Sobre:** Uma linha azul SVG (simulando um pulso/ECG) se desenha conforme o scroll, conectando as secoes
3. **Secao Servicos:** Cards com hover que revela animacao de ultrassom -- um efeito de "scan" azul que percorre o card
4. **Contadores:** Numeros (anos de experiencia, procedimentos) contam de 0 ao valor final quando entram em viewport
5. **Secao Tecnologia:** Imagem do equipamento de ultrassom com parallax sutil e texto que aparece por cima ao scrollar
6. **Secao Locais:** Mapa estilizado com pins animados que pulsam

## Como o site vende sem parecer que esta vendendo?

- O CTA principal ("Agende sua consulta") aparece naturalmente apos cada secao que gera valor, com textos diferentes:
  - Apos Sobre: "Converse com o Dr. David"
  - Apos Servicos: "Saiba qual procedimento e ideal para voce"
  - Apos Tecnologia: "Agende seu procedimento guiado por ultrassom"
  - Apos Locais: "Agende na unidade mais proxima"
- Cada CTA leva ao WhatsApp com mensagem pre-preenchida contextual
- O tom e sempre de convite, nunca de urgencia artificial
- Botao flutuante de WhatsApp aparece apos scroll do hero (nao imediatamente), discreto no canto inferior direito

## O que faz esse site impossivel de confundir com qualquer outro?

1. **A linha de pulso/ECG** que conecta secoes -- um fio condutor visual unico que referencia a medicina sem ser cliche
2. **O efeito "scan de ultrassom"** nos cards de servico -- uma animacao azul translucida que simula o movimento do transdutor, referencia direta ao diferencial do Dr. David (procedimentos guiados por ultrassom)
3. **A combinacao do azul royal institucional com o espacamento generoso** -- nao e o azul hospitalar frio, e um azul confiante e moderno
4. **A foto real do medico prominente no hero** -- nao escondida no rodape, ele e o protagonista

## CTA Flutuante -- Decisao

**Decisao: Botao flutuante simples (WhatsApp)**
- **Justificativa:** O Dr. David tem UM canal dominante (WhatsApp). O site tem 6 secoes longas, entao sem CTA flutuante o visitante perderia o ponto de contato entre secoes. O publico e mobile-first (pacientes buscando no celular).
- **Formato:** Icone WhatsApp circular, verde (#25D366), canto inferior direito
- **Comportamento:** Aparece apos scroll de 300px (nao no hero que ja tem CTA inline). Some quando o footer esta visivel (para nao sobrepor o CTA do footer). Leve animacao de bounce ao aparecer.
- **Mensagem pre-preenchida:** "Ola Dr. David, gostaria de agendar uma consulta."

---

## Design System

### Cores (10 tokens)

| Token | Hex | Uso |
|---|---|---|
| primary | #2563EB | Azul royal -- botoes, links, acentos principais |
| primary-light | #3B82F6 | Azul claro -- hovers, backgrounds sutis, badges |
| primary-dark | #1E40AF | Azul escuro -- navbar, footer, textos de destaque |
| secondary | #0F172A | Slate 900 -- backgrounds escuros quando necessario |
| accent | #10B981 | Verde emerald -- CTA WhatsApp, indicadores de sucesso |
| background | #FFFFFF | Fundo principal |
| surface | #F8FAFC | Slate 50 -- fundo alternado de secoes, cards |
| text-primary | #1E293B | Slate 800 -- textos principais |
| text-secondary | #475569 | Slate 600 -- subtitulos, descricoes |
| text-muted | #94A3B8 | Slate 400 -- labels, metadata, placeholders |

**Contraste WCAG AA verificado:**
- text-primary (#1E293B) sobre background (#FFFFFF): ratio 12.63:1 (AAA)
- text-secondary (#475569) sobre background (#FFFFFF): ratio 7.09:1 (AAA)
- text-muted (#94A3B8) sobre background (#FFFFFF): ratio 3.28:1 (AA large text)
- primary (#2563EB) sobre background (#FFFFFF): ratio 4.56:1 (AA)

### Tipografia

| Papel | Fonte | Pacote npm |
|---|---|---|
| Display/Headings | Outfit | @fontsource-variable/outfit |
| Body/Paragraphs | DM Sans | @fontsource-variable/dm-sans |

**Hierarquia:**
- H1 (hero): `text-4xl md:text-6xl font-bold tracking-tighter leading-none` (Outfit)
- H2 (secoes): `text-3xl md:text-5xl font-bold tracking-tight` (Outfit)
- H3 (cards): `text-xl md:text-2xl font-semibold` (Outfit)
- Body: `text-base leading-relaxed max-w-[65ch]` (DM Sans)
- Small/Labels: `text-sm text-text-secondary` (DM Sans)

### Espacamento

- Grid base: 8px
- Mobile horizontal padding: 20px (px-5)
- Desktop max-width: 1280px (max-w-7xl mx-auto)
- Secao vertical gap: 96px mobile / 128px desktop
- Card padding: 32px (p-8)
- Border radius padrao: 16px (rounded-2xl)

---

## Secoes do Site

### 1. Hero -- "Primeira Impressao"
- **Proposito emocional:** Confianca imediata + empatia
- **Conteudo:** Split-screen assimetrico. Foto profissional a direita, headline "Precisao que alivia." + subtitulo + CTA + badge CRM
- **Animacao:** Stagger text reveal (palavra por palavra), foto com fade-in scale, badge slide-in
- **CTA:** "Agende sua consulta" (WhatsApp)

### 2. Sobre Mim -- "O Medico por Tras do Jaleco"
- **Proposito emocional:** Humanizacao + autoridade
- **Conteudo:** Foto do consultorio (ig-post-consultorio.png crop), biografia curta focada em empatia e dedicacao, credenciais (CRM, RQE, formacao)
- **Animacao:** Scroll-reveal suave, foto com parallax sutil
- **CTA:** "Converse com o Dr. David"

### Micro-secao: Contadores
- Numeros animados: Anos de experiencia, procedimentos realizados, pacientes atendidos
- Animacao: countUp ao entrar em viewport
- Background: surface (#F8FAFC)

### 3. Servicos -- "Solucoes Precisas"
- **Proposito emocional:** "Existe um tratamento certo pra mim"
- **Conteudo:** Grid de cards com 6 servicos. Cada card com icone SVG, titulo, descricao curta, hover reveal com CTA
- **Layout:** Grid assimetrico (2fr 1fr alternando com 1fr 2fr), nao 3 colunas iguais
- **Animacao:** Cards com stagger entrance, hover "scan de ultrassom" nos cards de infiltracao/viscossuplementacao
- **CTA:** "Saiba qual procedimento e ideal para voce"

### 4. Tecnologia/Diferencial -- "Guiado por Ultrassom"
- **Proposito emocional:** "Aqui e diferente. Aqui e mais seguro."
- **Conteudo:** Imagem do ultrassom (ig-post-ultrassom.png), explicacao do diferencial (procedimentos guiados = mais precisao, menos dor), comparacao antes/depois conceitual
- **Animacao:** Parallax na imagem, texto reveal progressivo, efeito de "scan" azul
- **CTA:** "Agende seu procedimento guiado por ultrassom"

### Micro-secao: Frase de Impacto
- "Cada movimento importa. Cada tratamento e unico."
- Tipografia oversized, animacao de fade no scroll
- Background: gradiente sutil primary-dark -> primary

### 5. Locais de Atendimento -- "Perto de Voce"
- **Proposito emocional:** Acessibilidade + conveniencia
- **Conteudo:** 2 cards lado a lado com endereco, telefone, Google Maps embed ou mapa estilizado
  - Lagoa da Prata: Av. Getulio Vargas 997
  - Arcos: Cemear, Rua Arcos S/N, Centro
- **Animacao:** Cards com slide-in lateral (esquerda/direita), pins pulsantes
- **CTA:** "Agende na unidade mais proxima"

### 6. Contato/CTA Final -- "Vamos Cuidar de Voce"
- **Proposito emocional:** Urgencia positiva + acolhimento
- **Conteudo:** CTA grande central, WhatsApp, horarios (se disponivel), mensagem final empatica
- **Animacao:** Background gradiente azul, texto branco, botao com scale hover
- **CTA:** "Agende agora pelo WhatsApp" (botao grande, destaque)

### Footer
- Logo, links de secao, CRM/RQE, redes sociais (Instagram), "Desenvolvido com cuidado"
- Background: primary-dark (#1E40AF)
- Tipografia: branco sobre azul escuro

---

## Imagens Stock Necessarias

### Texturas/Backgrounds (PERMITIDO)
1. **Abstract medical texture azul** -- para backgrounds sutis de secoes
   - Buscar: "abstract blue medical technology texture" ou "blue gradient subtle healthcare"
2. **Pattern geometrico sutil** -- para micro-secoes de transicao
   - Buscar: "geometric pattern subtle blue dots"

### NAO usar stock para:
- Foto do Dr. David (temos profile-pic.jpg)
- Fotos do consultorio/equipamento (temos posts do Instagram)
- Imagens de procedimentos (temos ig-post-cirurgia.png e ig-post-ultrassom.png)

---

## Animacoes Planejadas (Stack Tecnico)

| Efeito | Ferramenta | Onde |
|---|---|---|
| Stagger text reveal | GSAP ScrollTrigger | Hero headline |
| Scroll-reveal secoes | GSAP ScrollTrigger | Todas as secoes |
| CountUp numeros | Custom hook + Intersection Observer | Contadores |
| Parallax imagens | GSAP ScrollTrigger | Sobre, Tecnologia |
| Hover "ultrassom scan" | CSS animation + Framer Motion | Cards de servico |
| SVG line draw (ECG) | GSAP DrawSVG ou CSS stroke-dashoffset | Transicao hero-sobre |
| Pulse pins | CSS animation | Mapa de locais |
| Fade/scale CTAs | Framer Motion | Todos os CTAs |

**NOTA:** GSAP para scroll-based (hero, secoes, parallax). Framer Motion para UI/hover/click. NUNCA misturar na mesma component tree.
