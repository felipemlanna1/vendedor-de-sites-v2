---
name: enrich-phase-6
description: Fase 6 do enrich-lead — Captura de imagens (WebSearch + Playwright MCP)
user-invocable: false
---

# Fase 6 — Captura de Imagens (Abordagem Dupla)

Esta e a fase MAIS IMPORTANTE para material visual. Usa DOIS metodos complementares.

Leia o state file:
```bash
cat data/_state/enrichment-progress.json
```

Extraia: nome, cidade, nicho, strategy, discovered_urls (instagram_username, site_url, platform_urls).

Verifique tambem quantas imagens ja foram coletadas nas fases anteriores (data_points com category "images").

---

## ETAPA A — WebSearch + WebFetch (texto, og:image)

Metodo rapido baseado em texto. Executa TODAS estas buscas:

### A.1 Buscas Google por texto

```
WebSearch: "{nome}" "{cidade}" foto
WebSearch: "{nome}" "{cidade}" foto fachada OR interior OR equipe
WebSearch: "{nome}" logo
```

Se tem Instagram username:
```
WebSearch: "{username}" site:instagram.com
WebSearch: "{nome}" "{cidade}" foto instagram
```

Buscas niche-specific:
- **food:** `"{nome}" site:ifood.com.br` e `"{nome}" site:rappi.com.br`
- **medical/dental:** `"{nome}" site:doctoralia.com.br`
- **hospitality:** `"{nome}" site:tripadvisor.com.br` e `"{nome}" site:booking.com`
- **beauty:** `"{nome}" site:booksy.com`
- **generic:** `"{nome}" "{cidade}" foto fachada OR interior OR equipe`

### A.2 WebFetch para og:image

Para cada resultado relevante encontrado:
```
WebFetch: {url_do_resultado}
```
Extraia `<meta property="og:image" content="...">` de cada pagina.

### A.3 Instagram direto (WebFetch)

Se tem username:
```
WebFetch: https://www.instagram.com/{username}/
```
Procure og:image no HTML — foto de perfil em alta resolucao.
NOTA: Instagram frequentemente retorna apenas CSS/config via WebFetch. Se nao encontrar, a Etapa B resolve.

### A.4 Coletar LINKS de posts do Instagram

Da busca `"{username}" site:instagram.com`, colete TODAS as URLs de posts:
- `instagram.com/p/{shortcode}/`
- `instagram.com/reel/{shortcode}/`

Salve esses links — a Etapa B vai navegar neles para extrair as imagens reais.

### A.5 Fotos profissionais

```
WebSearch: "{nome}" "{cidade}" foto profissional OR retrato OR ensaio
```
Se encontrar portfolio de fotografo, WebFetch para og:image.

---

## ETAPA B — Playwright MCP (navegador real, JS renderizado)

Este metodo captura imagens que WebSearch/WebFetch NAO conseguem porque dependem de JavaScript.

**FERRAMENTAS — Estrategia dual:**

**Para Instagram (precisa stealth):** APENAS Playwright MCP:
- `browser_navigate`, `browser_take_screenshot`, `browser_evaluate`, `browser_click`, `browser_snapshot`

**Para plataformas normais (iFood, Doctoralia, Rappi, TripAdvisor, Booking):** Chrome DevTools MCP (se disponivel):
- Vantagem: Network tab revela TODAS as URLs de imagem CDN carregadas, incluindo lazy-loaded e redirects
- Se Chrome DevTools nao disponivel, usar Playwright normalmente

**NUNCA use claude-in-chrome. NUNCA.**

---

### ARMADILHA CRITICA: Google Images NAO funciona para extrair URLs

**NAO TENTE extrair URLs de imagem diretamente do Google Images.**

O Google Images renderiza thumbnails como **base64 inline** e guarda as URLs reais em scripts codificados que NAO sao acessiveis via DOM. Tentar:
- `document.querySelectorAll('img')` → retorna base64, nao URLs reais
- Clicar na imagem para abrir painel → unreliable, URL nem sempre aparece
- Procurar em scripts com regex → URLs estao codificadas/escapadas
- `data-ou`, `data-src` → nao existem mais na versao atual

**O QUE FUNCIONA:** Usar Google Images apenas para encontrar LINKS de paginas (posts do Instagram, perfis do iFood, etc) e depois navegar diretamente nessas paginas para extrair og:image via Playwright.

---

### B.1 Google Images → Extrair LINKS de paginas (NAO imagens)

Navegue no Google Images para encontrar links de POSTS e PERFIS:

```
browser_navigate: https://www.google.com/search?tbm=isch&q={username}+site:instagram.com
```

Depois extraia os LINKS das paginas originais (NAO as imagens):
```javascript
browser_evaluate: (() => {
  const links = document.querySelectorAll('a[href*="instagram.com"]');
  const results = [];
  links.forEach(a => {
    const href = a.href || '';
    if (href.includes('instagram.com/p/') || href.includes('instagram.com/reel/')) {
      results.push(href);
    }
  });
  return JSON.stringify([...new Set(results)].slice(0, 20));
})()
```

Combine com os links ja coletados na Etapa A.4. Voce agora tem uma lista de URLs de posts do Instagram.

Repita para outras plataformas se relevante:
```
browser_navigate: https://www.google.com/search?tbm=isch&q="{nome}"+site:ifood.com.br
```
→ Extraia links de paginas do iFood.

```
browser_navigate: https://www.google.com/search?tbm=isch&q="{nome}"+site:doctoralia.com.br
```
→ Extraia links de paginas da Doctoralia.

### B.2 Navegar em cada post do Instagram e extrair og:image

**ESTE E O PASSO MAIS VALIOSO.** O Playwright renderiza o JavaScript do Instagram e consegue extrair og:image que WebFetch nao consegue.

Para cada URL de post coletada (ate 10 posts), navegue e extraia:

```javascript
// Navegar no post
browser_navigate: https://www.instagram.com/p/{shortcode}/

// Extrair og:image e imagens CDN
browser_evaluate: (() => {
  const ogImg = document.querySelector('meta[property="og:image"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');

  const imgs = document.querySelectorAll('img[src*="cdninstagram"], img[src*="scontent"]');
  const cdnUrls = [];
  imgs.forEach(i => cdnUrls.push(i.src));

  return JSON.stringify({
    og_image: ogImg ? ogImg.content : null,
    og_desc: ogDesc ? (ogDesc.content || '').substring(0, 150) : null,
    og_title: ogTitle ? (ogTitle.content || '').substring(0, 100) : null,
    cdn_images: [...new Set(cdnUrls)]
  });
})()
```

**DICA DE PERFORMANCE:** Se a ferramenta `browser_run_playwright` (Run Playwright code) estiver disponivel, use para processar TODOS os posts em batch de uma vez:

```javascript
browser_run_playwright: async (page) => {
  const posts = [
    'https://www.instagram.com/p/SHORTCODE1/',
    'https://www.instagram.com/p/SHORTCODE2/',
    'https://www.instagram.com/p/SHORTCODE3/',
    // ... ate 10 posts
    'https://www.instagram.com/{username}/'  // perfil tambem
  ];

  const results = [];

  for (const url of posts) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(2000);

      const data = await page.evaluate(() => {
        const ogImg = document.querySelector('meta[property="og:image"]');
        const ogDesc = document.querySelector('meta[property="og:description"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        return {
          og_image: ogImg ? ogImg.content : null,
          og_desc: ogDesc ? (ogDesc.content || '').substring(0, 150) : null,
          og_title: ogTitle ? (ogTitle.content || '').substring(0, 100) : null
        };
      });

      results.push({ url, ...data });
    } catch (e) {
      results.push({ url, error: e.message.substring(0, 80) });
    }
  }

  return JSON.stringify(results);
}
```

### B.3 Perfil do Instagram (se tem username)

Navegue no perfil para pegar a foto de perfil (og:image) e os LINKS dos posts:

```
browser_navigate: https://www.instagram.com/{username}/
```

**IMPORTANTE: NAO extraia imagens da grid diretamente.** As imagens renderizadas na grid sao thumbnails 150x150 (parametro `s150x150` na URL) — inutilizaveis para um site.

Em vez disso:
1. Scroll a grid para carregar TODOS os posts (nao apenas os primeiros visiveis)
2. Extraia os LINKS dos posts
3. Navegue em cada post (B.2) para pegar og:image em alta resolucao

```javascript
// PASSO 1: Scroll para carregar mais posts
browser_evaluate: (async () => {
  let prevCount = 0;
  for (let i = 0; i < 8; i++) {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 2000));
    const links = document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]');
    if (links.length === prevCount) break;
    prevCount = links.length;
  }
  window.scrollTo(0, 0);
  return `Loaded ${prevCount} posts`;
})()
```

```javascript
// PASSO 2: Extrair todos os links de posts
browser_evaluate: (() => {
  const ogImg = document.querySelector('meta[property="og:image"]');
  const postLinks = [];
  document.querySelectorAll('a[href*="/p/"], a[href*="/reel/"]').forEach(a => {
    postLinks.push(a.href);
  });
  return JSON.stringify({
    og_image: ogImg ? ogImg.content : null,
    post_links: [...new Set(postLinks)]
  });
})()
```

Depois navegue em CADA post_link usando o metodo B.2 para extrair og:image em alta resolucao.

**IMPORTANTE — Imagens com texto sao valiosas:**
Posts com texto (cardapios, listas de servicos, horarios, promocoes, depoimentos) servem como FONTE DE INFORMACAO para enriquecer o briefing. Ao navegar em cada post:
- Extraia og:description (contem o caption do post)
- Se a imagem contem texto visivel, registre no data_point: `"has_text": true`
- Esses dados serao usados na imersao (site-phase-2) para extrair conteudo real do cliente

### B.4 Plataformas com JS-rendered content

Para URLs de plataformas encontradas nas fases anteriores ou na Etapa B.1:

**Se Chrome DevTools MCP disponivel (preferido para plataformas normais):**
1. Navegar para a URL da plataforma via Chrome DevTools
2. Usar Network tab para capturar TODAS as requests de imagem automaticamente
3. Filtrar por tipo `image` — captura lazy-loaded, CDN redirects, e imagens que o DOM nao expoe
4. Vantagem: nao precisa adivinhar seletores CSS — o Network mostra tudo que carregou

**Se usando Playwright (fallback ou se Chrome DevTools indisponivel):**

**iFood:** Navegar na pagina do restaurante e extrair og:image + fotos de pratos
```
browser_navigate: {url_ifood}
browser_evaluate: (() => {
  const ogImg = document.querySelector('meta[property="og:image"]');
  const imgs = document.querySelectorAll('img[src*="static-images.ifood"]');
  const urls = [];
  imgs.forEach(i => { if (i.naturalWidth > 50) urls.push(i.src); });
  return JSON.stringify({
    og_image: ogImg ? ogImg.content : null,
    food_photos: [...new Set(urls)]
  });
})()
```

**Rappi:** Mesmo padrao — navegar e extrair imagens de pratos.

**Doctoralia:** Navegar e extrair foto do profissional.

**TripAdvisor:** Navegar e extrair fotos do estabelecimento.

### B.5 Se Playwright nao estiver disponivel

Se as ferramentas browser_* nao estiverem disponiveis (MCP desconectado):
- Registre no state: `"playwright_unavailable": true`
- A Etapa A sozinha ja coletou imagens via WebSearch+WebFetch
- Continue normalmente — Playwright e bonus, nao requisito bloqueante
- Avise ao usuario: "Playwright MCP nao disponivel. Imagens limitadas ao WebSearch+WebFetch."

---

## ETAPA C — Imagens Genericas (Stock MCPs)

Se apos as Etapas A e B o lead tem POUCAS imagens para backgrounds e texturas, complemente com imagens genericas via MCPs de stock:

**MCPs disponiveis:**
- `mcp__stock-images` — Unsplash + Pexels + Pixabay simultaneamente
- `mcp__mcp-pexels` — Pexels (alta qualidade)
- `mcp__pixabay` — Pixabay (fotos + videos)
- `mcp__freepik` — Freepik (vetores, fotos, PSD)

**Busque pelo conceito, NAO pelo nicho:**
- Ex: restaurante sofisticado → "dark wood texture elegant", "warm ambient restaurant bokeh"
- Ex: clinica medica → "clean abstract medical blue", "minimalist wellness texture"

**Valido APENAS para:**
- ✅ Backgrounds atmosfericos e texturas (wood, marble, abstract, smoke)
- ✅ Elementos decorativos (patterns, grain, bokeh, light leaks)
- ✅ Icones e ilustracoes vetoriais (via freepik)

**NUNCA para (REGRA INVIOLAVEL):**
- ❌ Foto do profissional/dono
- ❌ Fachada/interior do local
- ❌ Produtos/pratos do cardapio
- ❌ Equipe/funcionarios
- ❌ Logo

Salve como data_points com `source_name: "Stock (Pexels)"` etc., tipo `"background"` ou `"texture"`.

---

## ETAPA D — Validacao & Deduplicacao

### D.1 Validar pertencimento
Cada imagem DEVE pertencer ao lead correto:
- Se buscou `"barbeariaancorador" site:instagram.com`, so use se URL contem `/barbeariaancorador/`
- Se buscou `"Barbearia Ancorador" site:ifood.com.br`, verifique se nome no resultado bate
- Se Google retornou perfis parecidos mas diferentes, DESCARTE

### D.2 Deduplicar
Compare URLs encontradas na Etapa B contra imagens ja coletadas nas fases 2-5 e Etapa A.
Remova duplicatas (mesma URL ou mesmo dominio+path).

### D.3 Classificar
Para cada imagem, classifique o tipo:
- `profile_pic` — foto de perfil (Instagram, Facebook)
- `logo` — logotipo (site, Google, iFood)
- `fachada` — foto do local/fachada
- `produto` — foto de produto/prato
- `equipe` — foto da equipe/profissional
- `banner` — banner/capa (Facebook, site)
- `post` — post de rede social
- `outro` — nao classificavel

### D.4 Salvar como data_points

Cada imagem = 1 data_point:
```json
{
  "category": "images",
  "label": "Foto de perfil Instagram",
  "value": "https://scontent-xxx.cdninstagram.com/v/...",
  "detail": {
    "urls": ["url1", "url2"],
    "tipo": "profile_pic",
    "fonte": "Playwright (Instagram post)",
    "width": 320,
    "height": 320
  },
  "source_type": "briefing",
  "source_name": "Playwright MCP",
  "fetched_at": "..."
}
```

Agrupe URLs similares (mesma fonte/tipo) em `detail.urls` para galeria.

## Salvar no state

Append todos data_points de imagem ao state. Mostre ao usuario:
```
IMAGENS CAPTURADAS NESTA FASE:
  Instagram (Playwright): X imagens
  iFood (CDN): X imagens
  Rappi (CDN): X imagens
  WebSearch/WebFetch: X imagens
  Total novos: X | Total acumulado: Y
```

## CRITERIO DE CONCLUSAO
- Etapa A executada: WebSearch + WebFetch + coleta de links de posts
- Etapa B executada: Playwright navegou nos posts e extraiu og:image (se disponivel)
- NAO tentou extrair URLs de imagem do Google Images DOM (armadilha!)
- URLs validadas (pertencem ao lead correto)
- Deduplicadas contra fases anteriores
- Classificadas por tipo
- Pelo menos 1 imagem capturada (ou "nenhuma encontrada" registrado explicitamente)
