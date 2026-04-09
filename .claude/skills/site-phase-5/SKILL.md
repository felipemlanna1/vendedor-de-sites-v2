---
name: site-phase-5
description: Fase 5 do build-site — Componentes base, i18n, SEO
user-invocable: false
---

# Fase 5 — Componentes Base + i18n + SEO

Leia os templates de referencia:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/i18n-setup.js
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/seo-templates.jsx
```

## 5.1 Componentes derivados do Blueprint

**NAO copie templates prontos.** Cada site cria seus proprios componentes.

Leia o blueprint tecnico do mapa de encantamento:
```
Read: sites/$LEAD_ID/mapa-encantamento.md
```

Para CADA animacao especificada no blueprint, crie o componente correspondente.

**Exemplos (NAO copie — derive do SEU blueprint):**
- Blueprint diz "clip-path reveal" → crie ClipReveal.jsx com CSS clip-path animation
- Blueprint diz "blur-scale entrance" → crie BlurScale.jsx com motion blur+scale
- Blueprint diz "stagger vertical" → crie StaggerList.jsx com delay calculado
- Blueprint diz "parallax invertido" → crie InvertedParallax.jsx com GSAP scrub
- Blueprint diz "sticky scroll" → crie StickySection.jsx com ScrollTrigger pin

**ANTES de implementar do zero, consulte os MCPs:**
- `magic-ui` → blur-fade, aurora-text, number-ticker, shimmer-button
- `aceternity-ui` → parallax-scroll, text-generate-effect, hero-highlight, 3D-card
- Se o MCP tem o componente, USE-O. Customize cores/timings para este site.

**Componentes OBRIGATORIOS (apenas 2):**
- LanguageToggle.jsx — funcional (react-i18next changeLanguage). Visual pode ser unico.
- Button.jsx — com variants baseadas nos tokens de cor DESTE site.

**Parametros PROIBIDOS de copiar do template antigo:**
- ScrollReveal com y:60, duration:0.8, ease:'power3.out'
- AnimatedText com duration:0.5, delay:i*0.08, ease:[0.25, 0.46, 0.45, 0.94]
- ParallaxImage com speed:0.2, h-[120%]
- CountUp com duration:2, ease:'power2.out'
Se precisar de funcionalidade similar, use PARAMETROS DIFERENTES derivados do blueprint.

**Checklist de cleanup patterns (referencie, nao copie):**
- GSAP: sempre use gsap.context() e retorne ctx.revert() no useEffect cleanup
- Motion: use viewport={{ once: true }} para animacoes de entrada
- ScrollTrigger: kill no cleanup
- Lenis: destroy no cleanup
- prefers-reduced-motion: respeitar via CSS @media ou JS matchMedia

Referencia de patterns (NAO copie os componentes, apenas os patterns):
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/component-templates.jsx
```

## 5.2 Layout base
- `src/components/layout/Section.jsx` — baseado no template

## 5.3 i18n — config
Crie `src/i18n/index.js` EXATAMENTE como no template i18n-setup.js.
Importar ANTES do App no main.jsx.

## 5.4 i18n — pt-BR.json
TODAS as strings do site com acentos corretos (a, e, c, o, i, u).
Estrutura: nav, hero, cada secao definida na Fase 3, contact, footer, lang.
Preencher com dados REAIS do briefing — ZERO placeholder.

## 5.5 i18n — en.json
MESMA estrutura do pt-BR.json. Traduzido naturalmente (nao robotico).
Nomes proprios ficam em portugues.

## 5.6 Dados estruturados
Crie `src/data/content.js` com todos os dados do briefing organizados para os componentes.

## 5.7 SEO
Baseado nos templates seo-templates.jsx:
- `src/components/seo/JsonLd.jsx` — schema.org com tipo MAIS ESPECIFICO. TODOS os dados: endereco, coordenadas, horarios, avaliacoes, redes (sameAs), servicos, registro profissional, knowsAbout, alumniOf, award, memberOf.
- `src/components/seo/FaqSchema.jsx` — perguntas ESPECIFICAS sobre este cliente (nao genericas).

## VERIFICACAO CRITICA
Apos criar os arquivos, execute:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID
cat src/i18n/pt-BR.json | python3 -c "import json,sys; pt=json.load(sys.stdin); print(f'PT-BR keys: {len(json.dumps(pt).split(chr(34)))//2}')"
cat src/i18n/en.json | python3 -c "import json,sys; en=json.load(sys.stdin); print(f'EN keys: {len(json.dumps(en).split(chr(34)))//2}')"
```
Ambos devem ter a MESMA quantidade de chaves.
Abra pt-BR.json e verifique acentos. Se faltou, corrija AGORA.

## CRITERIO DE CONCLUSAO
- Componentes de animacao criados conforme blueprint (NAO template generico)
- NENHUM componente com parametros identicos ao template antigo
- LanguageToggle e Button criados
- pt-BR.json e en.json com mesmas chaves e acentos corretos
- JsonLd.jsx e FaqSchema.jsx com dados reais
- content.js com dados estruturados
