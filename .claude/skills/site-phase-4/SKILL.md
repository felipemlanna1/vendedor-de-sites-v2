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
  - Se Lenis for incluido, parametros DEVEM vir do blueprint ou do conceito:
  - NAO usar lerp:0.1 duration:1.2 (padrao banido — identico em todos os sites anteriores)
  - Conceito energetico: lerp:0.15 duration:0.8
  - Conceito cinematografico: lerp:0.06 duration:1.6
  - Conceito minimalista: lerp:0.08 duration:1.0
  - OU valores customizados derivados do conceito
- react-i18next: importar `./i18n` ANTES do App no main.jsx

## 4.1 Criar diretorios
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
LEAD_ID="SLUG_DO_LEAD"
mkdir -p sites/$LEAD_ID/public/images/stock
mkdir -p sites/$LEAD_ID/src/{components/{layout,seo,ui,sections},pages,hooks,i18n,data,design-system}
mkdir -p sites/$LEAD_ID/screenshots
```

## 4.2 Gerar package.json — STACK VARIAVEL POR CONCEITO

**NAO copie o JSON abaixo cegamente.** Monte o package.json baseado no conceito criativo da Fase 3.

Se multi-pagina (Fase 2.6): incluir `react-router-dom`.
Sempre incluir Radix UI para componentes acessiveis.
Adicionar fontes @fontsource da Fase 3.

**Dependencias OBRIGATORIAS (todo site):**
```json
{
  "react": "^19.0.0", "react-dom": "^19.0.0", "react-helmet-async": "^2.0.0",
  "react-i18next": "^15.0.0", "i18next": "^24.0.0", "i18next-browser-languagedetector": "^8.0.0",
  "lucide-react": "^0.469.0",
  "@radix-ui/react-dialog": "^1.1.0",
  "@radix-ui/react-accordion": "^1.2.0",
  "@radix-ui/react-tabs": "^1.1.0"
}
```

## Libs de animacao — DERIVAR DO BLUEPRINT

Leia o blueprint em sites/$LEAD_ID/mapa-encantamento.md.
Para cada animacao/tecnica especificada, inclua SOMENTE a lib necessaria:
- Blueprint menciona "clip-path" ou "CSS animation" → nenhuma lib extra
- Blueprint menciona "spring physics" ou "whileInView" → motion
- Blueprint menciona "ScrollTrigger" ou "scrub" ou "pin" → gsap
- Blueprint menciona "smooth scroll cinematografico" → lenis
- Blueprint menciona "3D" ou "WebGL" → @react-three/fiber + drei + three
- Blueprint menciona "particulas" → @tsparticles/react + @tsparticles/slim

NAO inclua libs "por precaucao". Se o blueprint nao menciona, NAO inclua.

Exemplo para conceito minimalista:
```json
{
  "dependencies": {
    "react": "^19.0.0", "react-dom": "^19.0.0", "react-helmet-async": "^2.0.0",
    "motion": "^12.0.0",
    "react-i18next": "^15.0.0", "i18next": "^24.0.0", "i18next-browser-languagedetector": "^8.0.0",
    "lucide-react": "^0.469.0",
    "@radix-ui/react-dialog": "^1.1.0", "@radix-ui/react-accordion": "^1.2.0", "@radix-ui/react-tabs": "^1.1.0"
  }
}
```

**DevDependencies (sempre as mesmas):**
```json
{
  "@vitejs/plugin-react": "^4.3.4", "@tailwindcss/vite": "^4.1.0",
  "tailwindcss": "^4.1.0", "vite": "^6.0.0"
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
export default defineConfig({ plugins: [react(), tailwindcss()], server: { port: 5173 } })
```

## 4.5 Gerar index.html com SEO completo
Incluir diretamente: `<title>` otimizado, `<meta description>` 150-160 chars, Open Graph completo (og:title, og:description, og:image REAL, og:url, og:type, og:locale pt_BR), Twitter Card, canonical, hreflang pt-BR e en, favicon.

## 4.6 Baixar TODAS as imagens

### A0) IMAGENS PRIORITARIAS DO USUARIO (se fornecidas pelo orchestrator)

Se o orchestrator incluiu URLs especificas com label "IMAGENS PRIORITARIAS" ou "imagens profissionais", estas sao as MAIS IMPORTANTES e devem ser processadas PRIMEIRO:

1. Navegue com Playwright (`browser_navigate`) para cada URL
2. Se for post Instagram (`/p/`): extraia og:image com `browser_evaluate`
3. Se for Reel Instagram (`/reel/`): NAO use og:image (tera play button) — tente extrair do carousel ou descarte
4. Baixe com curl e valide
5. Estas imagens vao para as posicoes MAIS NOBRES: Hero e About

### A) Imagens REAIS do briefing (data_points category "images"):

Para cada URL de imagem no briefing, tente na ordem:

1. **curl direto** (funciona para URLs de imagem direta):
```bash
curl -sfL -o sites/$LEAD_ID/public/images/NOME-DESCRITIVO.jpg "URL" && echo "OK: NOME" || echo "FALHOU curl: NOME"
```

2. **Se curl falhou ou arquivo < 5KB** (URLs de CDN/Instagram expiram ou redirecionam):
   - Navegue na URL original com Playwright (`browser_navigate`)
   - Extraia og:image do HTML (`browser_evaluate`)
   - Baixe a og:image com curl

3. **Validar cada download:**
```bash
IMG="sites/$LEAD_ID/public/images/NOME-DESCRITIVO.jpg"
SIZE=$(stat -f%z "$IMG" 2>/dev/null || echo 0)
[ "$SIZE" -gt 5000 ] && echo "OK: ${SIZE} bytes" || echo "FALHOU: ${SIZE} bytes — imagem corrompida ou thumbnail"
```
Arquivo < 5KB = thumbnail ou erro. Descartar e tentar metodo alternativo.

Nomeie descritivamente: `portrait-dra-ariel.jpg`, `logo-usina.png`, `hamburguer-classico.jpg`.

### FILTRO DE VIDEO OBRIGATORIO — Descartar thumbnails de Reels/Videos

**APOS baixar cada imagem, abra com Read (multimodal) e verifique:**

1. Tem botao de PLAY (triangulo branco semi-transparente) no centro? → **DESCARTAR**
2. Tem texto de legenda/subtitle na parte inferior? → **DESCARTAR**
3. Tem UI do Instagram Stories (barra de progresso, icones)? → **DESCARTAR**
4. Tem texto overlay tipo "POV:", "TUTORIAL:", hashtags? → **DESCARTAR**
5. A imagem e vertical 9:16 com qualidade de screenshot? → SUSPEITA, verificar com cuidado

**Se a URL original contem `/reel/`:** Alta chance de thumbnail de video. Extraia og:image MAS faca a verificacao visual obrigatoriamente.

**Para cada imagem descartada:** Anote o motivo e NAO use no site. Melhor ter menos imagens do que imagens com play button.

**ANALISE VISUAL OBRIGATORIA — CADA imagem do briefing deve ser analisada antes de usar:**
Apos baixar, abra CADA imagem com Read (ferramenta multimodal) e classifique:

1. **O que tem nessa imagem?** Descreva objetivamente: "pizza margherita", "fachada de loja", "retrato de mulher", "logo verde", "prato de arroz com feijao".
2. **Onde faz sentido usar?** Mapeie para secao ESPECIFICA do site baseado no CONTEUDO REAL da imagem:
   - Foto de pizza → secao de cardapio/pizza. NUNCA na secao de sobremesas ou bebidas
   - Foto de pessoa → secao "sobre" ou hero. NUNCA na secao de servicos de encanamento
   - Foto de fachada → secao de localizacao/contato. NUNCA como background do hero de servicos
   - Logo → navbar e footer. NUNCA como imagem de secao
3. **Qualidade tecnica:** resolucao, foco, iluminacao. Precisa de tratamento CSS?

**REGRA CRITICA — COERENCIA IMAGEM ↔ CONTEXTO:**
A imagem DEVE corresponder ao conteudo da secao onde sera usada. Exemplos de ERRO GRAVE:
- ❌ Secao fala de pizza, mostra prato de arroz
- ❌ Secao fala de casa/imovel, mostra retrato de pessoa
- ❌ Secao fala de farmacia, mostra interior de restaurante
- ❌ Secao de servicos de beleza, mostra foto de comida
- ❌ Hero de barbearia, mostra fachada de padaria

Se NAO tem imagem que combine com a secao → deixar sem imagem e compensar com design tipografico/CSS.
NUNCA forcar uma imagem numa secao so porque "precisa de imagem ali".

**Decisao por imagem:**
- ✅ USAR em [secao X] — conteudo da imagem bate com conteudo da secao
- ⚠️ USAR COM TRATAMENTO em [secao X] — bate mas precisa de overlay/crop/filter
- ❌ DESCARTAR — qualidade ruim, ou nao bate com nenhuma secao do site

Listar ao usuario: cada imagem, o que contem, onde vai usar, e quais descartou (com motivo).

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

## GATE OBRIGATORIO — Imagens baixadas (exit 1 se falhar)

**Este gate BLOQUEIA a fase. NAO prossiga se falhar.**

```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2/sites/$LEAD_ID
IMG_COUNT=$(find public/images -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) ! -path "*/stock/*" | wc -l | tr -d ' ')
echo "Imagens do briefing baixadas: $IMG_COUNT"
if [ "$IMG_COUNT" -lt 1 ]; then
  echo "❌ BLOQUEADO: ZERO imagens do briefing foram baixadas para public/images/"
  echo "ACAO: Execute a secao 4.6 AGORA. Baixe TODAS as imagens do briefing."
  echo "O site NAO pode ser construido sem imagens reais do cliente."
  exit 1
fi
echo "✅ $IMG_COUNT imagens encontradas"
```

**Se o gate falhou:** Volte para a secao 4.6 e execute-a. NAO pule.
Imagens de CDN (Instagram/scontent) podem expirar — se curl falhar, use Playwright para re-capturar.

## CRITERIO DE CONCLUSAO
- `ls sites/$LEAD_ID/node_modules/.package-lock.json` existe
- Imagens baixadas em `sites/$LEAD_ID/public/images/` (gate passou)
- tokens.css, index.css, vite.config.js, index.html gerados
- Cada imagem analisada visualmente e mapeada para secao especifica
