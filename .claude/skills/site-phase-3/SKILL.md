---
name: site-phase-3
description: Fase 3 do build-site — Conceito criativo, design system, referencias premiadas
user-invocable: false
---

# Fase 3 — Conceito Criativo + Design System

Leia as guidelines criativas:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/creative-guidelines.md
```

Leia tambem a taste-skill (anti-AI-slop):
```
Read: /Users/felipemoreiralanna/.claude/skills/taste-skill/SKILL.md
```

**MCPs de componentes disponiveis para usar no build:**
- `magic-ui` — componentes React animados (blur-fade, aurora-text, marquee, grid backgrounds)
- `aceternity-ui` — 100+ componentes premium (parallax, cards 3D, spotlights, text effects)
- `shadcn-ui` — base solida de componentes acessiveis
Use estes MCPs nas fases 5 e 6 para buscar componentes prontos em vez de inventar do zero.

## 3.1 Usar resultados dos agents de pesquisa

O orchestrator lancou 2 agents em paralelo. Use os resultados:
- **Screenshots de referencia 10/10:** Analise e anote CONCRETAMENTE: espacamento entre secoes (px), hierarquia tipografica, nivel de polish, o que faz parecer 10/10.
- **Tecnicas visuais:** 3+ tecnicas concretas de cada WebSearch que voce VAI USAR neste site.

Salve os screenshots de referencia em `sites/$LEAD_ID/screenshots/referencia-10-10.png`.

## 3.2 Conceito narrativo
Escreva UMA FRASE que define o espirito do site (derivada da narrativa da Fase 2.2). Mostre ao usuario.

## 3.3 Design system (derivado do CLIENTE, nao do nicho)

**Cores** — defina 10 tokens hex:
primary, primary-light, primary-dark, secondary, accent, background, surface, text-primary, text-secondary, text-muted.
- Se briefing tem cores → usar como base
- Se nao → derivar das imagens reais. Evitar repeticao com concorrentes (NAO usar concorrentes como benchmark — benchmark = Awwwards)
- Contraste WCAG AA: 4.5:1 texto normal, 3:1 texto grande

**Tipografia** — 2 fontes @fontsource (nomes exatos dos pacotes npm):
- Display/heading + body
- Baseado no TOM deste cliente. NAO seguir regras de nicho ("serif para medico")
- NUNCA usar Inter, Roboto, Arial (genericas)

**Espacamento:** grid 8px, mobile 20-24px horizontal / 80-100px vertical, desktop max-width 1280px

## 3.4 Buscar imagens stock (MCPs disponiveis)

Se o conceito criativo precisa de imagens que o briefing NAO tem, use ESTES MCPs:

**MCPs de imagem disponíveis (use por nome exato):**
- `mcp__stock-images` — busca em Unsplash + Pexels + Pixabay simultaneamente
- `mcp__mcp-pexels` — busca especifica no Pexels (alta qualidade)
- `mcp__pixabay` — busca especifica no Pixabay (videos tambem)
- `mcp__freepik` — busca no Freepik (vetores, fotos, PSD)

**COMO usar:** Busque pelo conceito criativo, nao pelo nicho.
Ex: se conceito = "ciencia + elegancia" → buscar "abstract elegant science texture"
Ex: se conceito = "artesanal + proposito" → buscar "warm handcraft wood texture dark"

**QUANDO usar:**
- ✅ Backgrounds atmosfericos e texturas (wood, marble, abstract, gradient, smoke)
- ✅ Elementos decorativos (patterns, grain, bokeh, light leaks)
- ✅ Videos curtos para background de hero (se conceito pedir)
- ✅ Icones e ilustracoes vetoriais (via freepik)

**QUANDO NAO usar (REGRA INVIOLAVEL):**
- ❌ NUNCA para foto do profissional/dono — isso ENGANA o visitante
- ❌ NUNCA para fachada/interior do local — mostra um lugar que nao existe
- ❌ NUNCA para produtos/pratos do cardapio — mostra comida que nao e a deles
- ❌ NUNCA para equipe/funcionarios — mostra pessoas que nao trabalham la
- ❌ NUNCA para logo — o logo e do briefing ou nao existe

**Se nao tem foto real E nao pode usar stock:** Design tipografico ousado.
Texto grande + cores vibrantes + geometria CSS. Sites como Stripe provam que funciona.

Anote URLs de todas as imagens stock selecionadas. Baixe na Fase 4 para `public/images/stock/`.

## 3.5 Definir secoes do site
- Cada secao: nome, proposito emocional, conteudo, animacao planejada
- NAO lista fixa. Ordem segue jornada emocional
- Cada secao com CTA ou elemento de conversao
- Micro-secoes criativas: contadores, frases de impacto, parallax, transicoes
- Material rico: prova social, demonstracao de valor, indicadores confianca, CTAs progressivos

Mostre ao usuario: conceito, cores hex, fontes, lista de secoes.

## CRITERIO DE CONCLUSAO
- 3+ WebSearches feitas e tecnicas anotadas
- Screenshots de referencia 10/10 salvos
- Conceito narrativo em 1 frase
- 10 cores hex definidas
- 2 fontes @fontsource com nomes npm exatos
- Lista de secoes com conteudo mapeado
