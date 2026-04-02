---
name: site-phase-5
description: Fase 5 do build-site — Componentes base, i18n, SEO
user-invocable: false
---

# Fase 5 — Componentes Base + i18n + SEO

Leia os templates de referencia:
```
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/component-templates.jsx
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/i18n-setup.js
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/seo-templates.jsx
Read: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/_templates/animation-advanced-templates.jsx
```

## 5.1 Componentes utilitarios
Copie e adapte para `src/components/ui/`:
- ScrollReveal.jsx (GSAP ScrollTrigger — com cleanup `ctx.revert()`)
- AnimatedText.jsx (Motion — com `viewport={{ once: true }}`)
- ParallaxImage.jsx (GSAP — com cleanup)
- CountUp.jsx (GSAP — com cleanup)
- Button.jsx (Motion whileHover/whileTap)
- LanguageToggle.jsx (react-i18next changeLanguage)

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
- 6 componentes utilitarios criados
- pt-BR.json e en.json com mesmas chaves e acentos corretos
- JsonLd.jsx e FaqSchema.jsx com dados reais
- content.js com dados estruturados
