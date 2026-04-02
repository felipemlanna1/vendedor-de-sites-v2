---
name: site-phase-4
description: Fase 4 do build-site — Estudar docs oficiais e scaffold do projeto React
user-invocable: false
---

# Fase 4 — Estudar Docs + Scaffold

## 4.0 Usar resultados do agent de pesquisa de docs

O orchestrator lancou 1 agent para pesquisar docs das 5 libs. Use as armadilhas encontradas.

Armadilhas CONHECIDAS (verificar se ainda sao validas):
- Tailwind v4: ja inclui Preflight. NAO adicione `* { padding: 0 }` — destroi todos os paddings
- GSAP: precisa de `gsap.context()` com cleanup no useEffect, senao vaza memoria
- Motion: `whileInView` precisa de `viewport={{ once: true }}` senao re-anima toda vez
- Lenis: inicializar com `requestAnimationFrame` loop, destruir no cleanup
- react-i18next: importar `./i18n` ANTES do App no main.jsx

## 4.1 Criar diretorios
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
LEAD_ID="SLUG_DO_LEAD"
mkdir -p sites/$LEAD_ID/public/images/stock
mkdir -p sites/$LEAD_ID/src/{components/{layout,seo,ui,sections},pages,hooks,i18n,data,design-system}
mkdir -p sites/$LEAD_ID/screenshots
```

## 4.2 Gerar package.json
Se multi-pagina (Fase 2.6): incluir `react-router-dom`.
Sempre incluir Radix UI para componentes acessiveis.
Adicionar fontes @fontsource da Fase 3.

```json
{
  "name": "SLUG",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": { "dev": "vite", "build": "vite build", "preview": "vite preview" },
  "dependencies": {
    "react": "^19.0.0", "react-dom": "^19.0.0", "react-helmet-async": "^2.0.0",
    "react-router-dom": "^7.1.0",
    "motion": "^12.0.0", "gsap": "^3.12.0", "lenis": "^1.1.0",
    "react-i18next": "^15.0.0", "i18next": "^24.0.0", "i18next-browser-languagedetector": "^8.0.0",
    "lucide-react": "^0.469.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0",
    "three": "^0.170.0",
    "@lottiefiles/dotlottie-react": "^0.12.0",
    "@tsparticles/react": "^3.0.0",
    "@tsparticles/slim": "^3.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4", "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0", "vite": "^6.0.0"
  }
}
```

## 4.3 Instalar
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID && npm install
```

## 4.4 Gerar vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({ plugins: [react(), tailwindcss()], server: { port: 5180 } })
```

## 4.5 Gerar index.html com SEO completo
Incluir diretamente: `<title>` otimizado, `<meta description>` 150-160 chars, Open Graph completo (og:title, og:description, og:image REAL, og:url, og:type, og:locale pt_BR), Twitter Card, canonical, hreflang pt-BR e en, favicon.

## 4.6 Baixar TODAS as imagens

**A) Imagens REAIS do briefing** (data_points category "images"):
```bash
curl -sL -o sites/$LEAD_ID/public/images/NOME-DESCRITIVO.jpg "URL" && echo "OK: NOME" || echo "FALHOU: NOME"
```
Nomeie descritivamente: `portrait-dra-ariel.jpg`, `logo-usina.png`, `hamburguer-classico.jpg`.
Verifique tamanho > 0. Estas sao PRIORITARIAS — usar sempre que possivel.

**B) Imagens STOCK selecionadas na Fase 3.4:**
```bash
curl -sL -o sites/$LEAD_ID/public/images/stock/NOME.jpg "URL" && echo "OK" || echo "FALHOU"
```
So para backgrounds/texturas/atmosfera. NUNCA para profissional, local, produtos ou equipe.

**C) Se precisar de mais imagens durante o build (Fase 6):**
Use os MCPs de imagem para buscar: `mcp__stock-images`, `mcp__mcp-pexels`, `mcp__pixabay`, `mcp__freepik`.
Regra: "essa imagem pode ENGANAR o visitante?" Se sim, NAO usar.

## 4.7 Gerar tokens.css com cores hex e fontes da Fase 3

## 4.8 Gerar index.css
```css
@import "tailwindcss";
@import "./design-system/tokens.css";
/* Tailwind v4 ja inclui Preflight. NAO use * { margin:0; padding:0 } */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; }
body { font-family: var(--font-body); color: var(--color-text-primary); background: var(--color-background); -webkit-font-smoothing: antialiased; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
```

## CRITERIO DE CONCLUSAO
- `ls sites/$LEAD_ID/node_modules/.package-lock.json` existe
- Imagens baixadas em `sites/$LEAD_ID/public/images/`
- tokens.css, index.css, vite.config.js, index.html gerados
