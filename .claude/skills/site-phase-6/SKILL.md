---
name: site-phase-6
description: Fase 6 do build-site — Navbar, secoes, footer, App, main
user-invocable: false
---

# Fase 6 — Navbar + Secoes + Footer

Ordem de build: layout → secoes → App → main.

## PRINCIPIOS DE CODIGO (respeitar em TODOS os componentes)

**SOLID no React:**
- **S (Single Responsibility):** Cada componente faz UMA coisa. Navbar nao faz fetch. Section nao gerencia state global. Se um componente cresceu demais, quebre em subcomponentes.
- **O (Open/Closed):** Componentes aceitam props para customizacao sem precisar editar o source. Button aceita variant, size, href. Section aceita background, className.
- **L (Liskov):** Componentes wrapper (ScrollReveal, Section) devem se comportar como o elemento que substituem — aceitar children, className, passar props restantes.
- **I (Interface Segregation):** Nao passe props que o componente nao usa. Se Hero precisa de titulo e imagem, nao passe o briefing inteiro.
- **D (Dependency Inversion):** Componentes dependem de abstraçoes (content.js, i18n keys), nao de dados raw do briefing.

**Separacao de logica:**
- `src/data/content.js` — TODA a logica de dados. Componentes NUNCA leem briefing direto.
- `src/hooks/` — Logica reutilizavel (useScrollTrigger, useMediaQuery). Se 2+ componentes fazem a mesma coisa, extrair hook.
- `src/components/ui/` — Componentes atomicos sem logica de negocio. Apenas visual + interacao.
- `src/components/sections/` — Composicao de ui/ + dados de content.js + i18n.
- `src/components/layout/` — Estruturais: Navbar, Footer, Section wrapper.
- `src/components/seo/` — Schema.org, meta tags. Zero visual.

**Boas praticas React:**
- Componentes funcionais SOMENTE (zero classes)
- Props destructuradas: `function Hero({ title, image })` nao `function Hero(props)`
- `key` unica em listas (NUNCA usar index como key se a lista pode mudar)
- `useCallback` e `useMemo` apenas quando performance exigir — nao prematuramente
- Eventos: `onClick`, `onChange` — nao inline functions complexas no JSX
- Imagens: sempre `width` e `height` explicitos ou `fill` + `aspect-ratio` para evitar CLS
- CSS: Tailwind classes no JSX. Zero CSS-in-JS. Zero styled-components.
- Imports: agrupar por tipo (react, libs, components, hooks, data, assets)

**Tailwind CSS v4 — regras especificas:**
- NAO existe `tailwind.config.js` no v4. Tudo via CSS e `@tailwindcss/vite` plugin.
- Preflight (reset) JA ESTA INCLUSO. NUNCA adicione `* { margin: 0; padding: 0 }` — isso DESTROI todos os paddings do Tailwind. Unico reset aceito: `*, *::before, *::after { box-sizing: border-box; }`
- Cores customizadas: usar `@theme` no CSS ou CSS custom properties (`var(--color-primary)`) referenciadas como `text-[var(--color-primary)]` ou definidas via `@theme { --color-primary: #hex; }`
- Responsivo mobile-first: classes sem prefixo = mobile. `md:` = 768px+. `lg:` = 1024px+. `xl:` = 1280px+.
- Dark mode: `dark:` prefix (se necessario)
- Espacamento: usar classes do Tailwind (`p-4`, `py-8`, `gap-6`) em vez de inline styles
- Container: `mx-auto max-w-7xl px-5 md:px-8 lg:px-16` (nao `container` — ele e inflexivel)
- Fontes: registrar via `@theme` ou usar `font-[var(--font-display)]`
- NAO usar `@apply` extensivamente — preferir classes utilitarias direto no JSX
- Breakpoints: testar em 375px, 768px, 1024px, 1440px

## 6.1 Navbar
Crie `src/components/layout/Navbar.jsx`:
- Fixa, transparente sobre hero, fundo solido ao scrollar (GSAP ScrollTrigger + cleanup)
- Links anchor para cada secao (ou React Router links se multi-pagina)
- LanguageToggle
- CTA principal (WhatsApp ou acao do cliente)
- Menu hamburger mobile com overlay animado (Motion AnimatePresence)
- TODOS os textos via `const { t } = useTranslation()` e `t('nav.chave')`

## 6.2 Secoes

**ANTES de criar cada secao, consulte os MCPs de componentes e animacoes:**

**Componentes UI (MCPs):**
- `mcp__magic-ui` — componentes animados: blur-fade, scroll-progress, marquee, aurora-text, animated-grid, number-ticker, shimmer-button, orbit, dock
- `mcp__aceternity-ui` — efeitos premium: parallax-scroll, spotlight, text-generate-effect, 3D-card, background-beams, tracing-beam, infinite-moving-cards, wavy-background, hero-highlight
- `mcp__shadcn-ui` — base acessivel: button, card, tabs, accordion, dialog, navigation-menu, sheet, tooltip

**Animacoes (MCP + libs):**
- `mcp__gsap` — consulte para patterns corretos de GSAP + ScrollTrigger em React. Pergunte: "como fazer [efeito X] com GSAP ScrollTrigger em React?" O MCP tem docs e exemplos.
- `motion` (Framer Motion) — para micro-interacoes: whileHover, whileTap, whileInView, AnimatePresence, layout animations, drag
- CSS keyframes — para loops ambientes: gradiente shifts, floating, pulse, glow

**NAO invente componentes do zero quando ja existem prontos.** Busque nos MCPs primeiro. Adapte cores e conteudo para o cliente.

**Animacoes avancadas (3 libs extras):**
Leia o template de referencia:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/animation-advanced-templates.jsx
```

Decida QUAIS usar baseado no conceito criativo:
- **React Three Fiber** (`@react-three/fiber` + `@react-three/drei`) — Hero 3D com geometria animada, ondas, esferas distorcidas. Use para o "signature moment" do site — o elemento que ninguem esquece. MAX 1-2 cenas 3D por site. No mobile: simplificar ou substituir por gradiente.
- **Lottie** (`@lottiefiles/dotlottie-react`) — Micro-animacoes de alta qualidade: icones animados, loading states elaborados, badges animados, separadores entre secoes. Buscar animacoes gratuitas em lottiefiles.com por conceito (nao nicho).
- **tsParticles** (`@tsparticles/react` + `@tsparticles/slim`) — Background de particulas: network (tech/ciencia), floating (elegante), stars (dramatico). Use loadSlim() nao loadFull(). Limitar a 40 particulas no desktop, 15 no mobile.

**Fluxo de decisao por secao:**
1. "Hero precisa de impacto WOW" → R3F (Hero3DBackground) OU tsParticles OU video background. Escolher UM.
2. "Servicos com icones" → LottieOnHover (icone anima ao hover) + Radix Tabs
3. "Numeros de impacto" → CountUp (GSAP) + Lottie de estrelas/celebracao
4. "Depoimentos" → aceternity infinite-moving-cards OU magic-ui marquee
5. "Texto do hero" → magic-ui blur-fade OU aceternity hero-highlight OU AnimatedText (Motion)
6. "Cards de servico" → aceternity 3D-card OU magic-ui magic-card
7. "Parallax em imagem" → GSAP ScrollTrigger (perguntar ao mcp__gsap)
8. "Background atmosferico" → tsParticles("floating") OU R3F(WavePlane) OU CSS gradient
9. "Preloader" → Lottie com animacao abstrata (buscar em lottiefiles.com "loading minimal")
10. "CTA animado" → Motion whileHover + Lottie arrow animado

Crie CADA secao em `src/components/sections/` (ou `src/pages/` se multi-pagina):

Para CADA secao definida na Fase 3:
- Import e use: useTranslation, ScrollReveal, AnimatedText, CountUp, Button, ParallaxImage
- TODOS os textos via `t('secao.chave')` — ZERO string hardcoded
- Imagens do `/images/` com alt descritivo e loading="lazy" (hero: fetchpriority="high")
- **MOBILE-FIRST REAL:** Escreva PRIMEIRO para 375px. So depois `md:` e `lg:`. Ao escrever cada componente, PENSE: como empilha? Legivel? CTA cabe?
- Touch targets >= 44x44px
- Textos body >= 16px no mobile
- Animacoes que surpreendem (scroll reveal, parallax, counter, text stagger)
- Animacoes GPU-only: transform e opacity. will-change so em ativos
- Respeitar prefers-reduced-motion
- GSAP sempre com cleanup: `return () => ctx.revert()`
- Usar Radix UI para componentes interativos: Dialog (modais), Accordion (FAQ), Tabs (cardapio/servicos)
- Cada secao encanta E vende — material rico + CTA progressivo

## 6.3 Footer
Crie `src/components/layout/Footer.jsx`:
- Redes sociais reais, contato completo, CTA final, copyright
- Textos via `t()`

## 6.4 App.jsx
Leia o template de referencia:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/component-templates.jsx
```
Use modelo SPA ou multi-pagina conforme Fase 2.6.
Monte: Lenis + HelmetProvider + Navbar + secoes/rotas + Footer + JsonLd + FaqSchema

## 6.5 main.jsx
- Import i18n ANTES de App
- Import fontes @fontsource
- Import index.css
- Render App com StrictMode

## 6.6 Sitemap e robots
Gere `public/sitemap.xml` e `public/robots.txt`.

## VERIFICACAO CRITICA
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm run build 2>&1
```
Se QUALQUER erro, corrija. Repita ate build passar com 0 erros.

## CRITERIO DE CONCLUSAO
- `npm run build` passa sem erros
- Navbar, footer, todas as secoes criadas
- Todos textos via t() — zero hardcoded
- App.jsx e main.jsx montados
