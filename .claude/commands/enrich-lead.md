SEMPRE comece mostrando este guia ao usuario:

```
========================================
  LEAD ENRICHMENT (Briefing)
  Custo: $0 | Modulo 100% independente
========================================

O QUE FAZ:
  Recebe dados basicos de um lead e pesquisa
  TUDO sobre ele na internet: site, redes,
  imagens, logo, canais de venda, registro
  governamental, historia, concorrentes.

COMO FUNCIONA:
  1. Detecta nicho → seleciona estrategia
  2. Pesquisa via WebSearch (nome + cidade)
  3. Consulta APIs publicas (CNPJ, CRM, OAB)
  4. Scrape site e redes sociais
  5. Captura imagens e logo
  6. Analisa marca e concorrentes
  7. Gera resumo de vendas + score

PARAMETROS:
  --nome "X"        Nome do negocio (obrigatorio)
  --cidade "X"      Cidade (obrigatorio)
  --nicho "X"       Nicho/categoria
  --source "X"      Fonte: instagram ou gmaps
  --id "X"          ID do lead (username ou name|phone)

  OPCIONAIS:
  --telefone "X"    Telefone do lead
  --website "X"     URL do site atual
  --instagram "X"   Username do Instagram

EXEMPLOS:
  /enrich-lead --nome "Clinica Silva" --cidade "Florianopolis" --nicho "clinica_medica" --source "gmaps" --id "Clinica Silva|4899991234"
  /enrich-lead --nome "Dra. Ana" --cidade "BH" --nicho "psicologo" --source "instagram" --id "dra.ana.psi"
========================================
```

Agora execute seguindo estas instrucoes:

## MODULO INDEPENDENTE

Este enriquecimento NAO depende de nenhum outro modulo do projeto.
Ele recebe APENAS os dados passados como parametros e faz toda a pesquisa por conta propria.
Use WebSearch e WebFetch como ferramentas principais.

## REGRA DE OURO: WEBFETCH EM TUDO

**CRITICO:** WebSearch so encontra LINKS. Para obter dados REAIS voce DEVE fazer WebFetch em cada pagina relevante encontrada.
- Encontrou site? → WebFetch no site + pagina sobre + pagina contato
- Encontrou Instagram? → WebFetch em https://www.instagram.com/{username}/ para extrair og:image (foto perfil)
- Encontrou Doctoralia? → WebFetch na pagina para extrair foto, avaliacoes, especialidades
- Encontrou Facebook? → WebFetch na pagina para extrair og:image (foto capa/perfil)
- Encontrou diretorio medico? → WebFetch para extrair foto e dados detalhados
- Encontrou perfil em canal de venda? → WebFetch para extrair imagens, precos, cardapio

A regra e simples: se voce encontrou um link relevante e NAO fez WebFetch nele, o briefing esta incompleto. Seja exaustivo — acesse toda pagina que possa conter dados uteis.

## PASSO 1 — Parsear parametros e detectar nicho

Leia os argumentos: $ARGUMENTS

Mapeie o `--nicho` para uma estrategia de pesquisa:

```
ESTRATEGIAS:
  medical    → clinica_medica, medicina_estetica, clinica_fertilidade, nutricionista
  dental     → dentista
  legal      → advogado
  psychology → psicologo
  food       → restaurante, personal_chef, buffet_festas
  hospitality → pet_hotel, coworking
  beauty     → salao_beleza, estetica, tatuagem, massagem_terapia
  fitness    → academia, escola_esportiva, beach_tennis_padel
  realty     → imobiliaria
  finance    → contador, assessoria_investimentos
  education  → escola_idiomas, autoescola, escola_infantil, escola_premium
  generic    → qualquer outro nicho
```

Se o nicho nao bater com nenhum, use `generic`.

Mostre ao usuario:
```
Nicho: [nicho] → Estrategia: [estrategia]
Pesquisas planejadas: X universais + Y especificas
```

## PASSO 2 — Pesquisas universais (TODOS os nichos)

Execute TODAS estas pesquisas via WebSearch. Colete e organize os resultados.

**2.1 Presenca geral:**
```
WebSearch: "{nome}" "{cidade}"
```
Analise os resultados: procure site oficial, perfis de redes sociais, Google Business, noticias, avaliacoes.

**2.2 Buscar site:**
```
WebSearch: "{nome}" "{cidade}" site OR website
```
Se encontrar um site, anote a URL para o passo 5.

**2.3 Redes sociais:**
```
WebSearch: "{nome}" "{cidade}" instagram.com OR facebook.com OR linkedin.com OR youtube.com OR tiktok.com
```
Para cada rede encontrada, anote username e URL.

**2.4 Avaliacoes e reputacao:**
```
WebSearch: "{nome}" "{cidade}" avaliacao OR review OR opiniao
```
Capture: nota media, numero de avaliacoes, principais reclamacoes.

**2.5 Historia da empresa:**
```
WebSearch: "{nome}" "{cidade}" sobre OR historia OR "quem somos" OR about
```
Busque informacoes como: quando foi fundada, por quem, qual a missao, como comecou.

**2.6 Imagens e logo (PASSO CRITICO — nao pule):**

Este e um dos passos mais importantes. O usuario PRECISA de imagens reais para montar propostas.

**A) Foto de perfil e posts do Instagram (OBRIGATORIO se tem Instagram):**

**Metodo 1 — Instagram MCP (PREFERIDO, dados completos):**
Se o MCP `instagram-lead-mcp` estiver disponivel:
1. `instagram_check_session` — verifica se esta logado
2. Se nao, `instagram_login` com credenciais da conta secundaria
3. `instagram_get_profile(username)` — retorna: foto de perfil URL, bio, seguidores, email, telefone, tipo de conta
4. Para pegar IMAGENS DOS POSTS, use Python direto com instagrapi:
```python
from instagrapi import Client
cl = Client()
cl.load_settings("ig_session.json")
cl.login(username, password)
user_id = cl.user_id_from_username("{username}")
user_info = cl.user_info(user_id)  # profile_pic_url_hd
medias = cl.user_medias(user_id, amount=10)  # thumbnail_url de cada post
```
Isso retorna URLs REAIS de imagens do CDN do Instagram (scontent*.cdninstagram.com).

**Metodo 2 — Google Images (SEMPRE FAZER, mesmo com MCP):**
```
WebSearch: "{username}" site:instagram.com
```
O Google indexa posts do Instagram e mostra as imagens nos resultados. Mesmo que o WebFetch no Instagram falhe (so retorna CSS/config), o Google ja tem as imagens indexadas. Procure URLs de imagem nos resultados.

Tambem busque:
```
WebSearch: "{nome}" "{cidade}" foto instagram
```

**Metodo 3 — WebFetch direto (FALLBACK, menos confiavel):**
```
WebFetch: https://www.instagram.com/{username}/
```
No HTML retornado, procure por:
- `<meta property="og:image" content="URL_DA_FOTO" />` — esta e a foto de perfil em alta resolucao
- NOTA: O Instagram frequentemente retorna apenas CSS/config via WebFetch. Se nao encontrar og:image, use Metodo 1 ou 2.

**B) Foto do Facebook (se encontrou pagina):**
```
WebFetch: https://www.facebook.com/{pagina}/
```
Procure por `og:image` no HTML — e a foto de capa ou perfil

**C) Foto do Google Maps (busca de imagens):**
```
WebSearch: "{nome}" "{cidade}" foto local estabelecimento
```

**D) Logo do site (se tem site):**
Ja sera feito no passo 5, mas aqui faca uma busca adicional:
```
WebSearch: "{nome}" logo
```
Se encontrar imagem direta (URL terminando em .png, .jpg, .svg, .webp), salve.

**E) Fotos profissionais:**
```
WebSearch: "{nome}" "{cidade}" foto profissional OR retrato OR ensaio
```
Se encontrar pagina de fotografo ou portfolio, faca WebFetch para extrair a og:image.

**F) Google Images — varredura geral (OBRIGATORIO EM TODA ENRICHMENT):**

Esta e uma das tecnicas mais eficazes para encontrar imagens. O Google indexa imagens de QUALQUER plataforma (Instagram, iFood, Doctoralia, Facebook, Google Maps, TripAdvisor, sites, diretorios). Mesmo quando WebFetch falha ou retorna HTML vazio, o Google ja tem as imagens indexadas.

SEMPRE execute TODAS estas buscas:
```
WebSearch: "{username}" site:instagram.com
WebSearch: "{nome}" site:ifood.com.br
WebSearch: "{nome}" "{cidade}" site:facebook.com
WebSearch: "{nome}" "{cidade}" foto
WebSearch: "{nome}" foto local estabelecimento
```

Adapte por nicho — adicione buscas especificas:
- food: `"{nome}" site:ifood.com.br` e `"{nome}" site:rappi.com.br`
- medical/dental: `"{nome}" site:doctoralia.com.br`
- hospitality: `"{nome}" site:tripadvisor.com.br` e `"{nome}" site:booking.com`
- beauty: `"{nome}" site:booksy.com`
- generic: `"{nome}" "{cidade}" foto fachada OR interior OR equipe`

A REGRA E SIMPLES: para CADA plataforma onde o lead pode estar (Instagram, iFood, Doctoralia, Facebook, Google Maps, TripAdvisor, Booking, etc), faca `"{nome_ou_username}" site:{plataforma}` no Google. O Google indexa fotos de cardapios, fachadas, equipes, produtos, perfis — tudo que WebFetch muitas vezes nao consegue extrair.

**VALIDACAO OBRIGATORIA:** Antes de usar qualquer imagem encontrada via Google, CONFIRME que a URL do resultado pertence ao lead correto. Exemplos:
- Se buscou `"barbeariaancorador" site:instagram.com`, so use se a URL contem `/barbeariaancorador/`
- Se buscou `"Barbearia Ancorador" site:ifood.com.br`, verifique se o nome no resultado bate
- Se o Google retornou perfis de negocios com nomes parecidos mas diferentes, DESCARTE

Capture TODAS as URLs de imagem dos resultados VALIDADOS.

**REGRA:** Cada imagem encontrada deve ser um data_point SEPARADO com category "images":
```json
{
  "category": "images",
  "label": "Foto de perfil Instagram",
  "value": "https://scontent-xxx.cdninstagram.com/v/...",
  "detail": {
    "urls": ["https://url1.jpg", "https://url2.jpg"],
    "tipo": "profile_pic",
    "fonte": "Instagram og:image"
  },
  "source_type": "briefing",
  "source_name": "WebFetch (Instagram)",
  "fetched_at": "..."
}
```
Agrupe as URLs no campo `detail.urls` para que o frontend possa exibir galeria.

Para cada resultado encontrado, crie um data_point com:
```json
{
  "category": "...",
  "label": "...",
  "value": "...",
  "detail": { ... },
  "source_type": "briefing",
  "source_name": "WebSearch",
  "fetched_at": "[timestamp ISO]"
}
```

## PASSO 3 — CNPJ (se possivel)

Tente encontrar o CNPJ do negocio:

**3.1 Buscar CNPJ:**
```
WebSearch: CNPJ "{nome}" "{cidade}"
```

Procure o padrao de CNPJ nos resultados: `\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}`

Se o lead ja veio com CNPJ nos dados, use esse diretamente.

**3.2 Consultar dados do CNPJ:**
Se encontrou CNPJ, use WebFetch:
```
WebFetch: https://brasilapi.com.br/api/cnpj/v1/{cnpj_sem_pontuacao}
```

Dados retornados: razao_social, nome_fantasia, data_inicio_atividade, porte, cnae_fiscal_descricao, logradouro, municipio, uf, telefone, email, qsa (socios).

Crie data_point:
```json
{
  "category": "identity",
  "label": "CNPJ",
  "value": "XX.XXX.XXX/XXXX-XX",
  "detail": {
    "razao_social": "...",
    "nome_fantasia": "...",
    "data_abertura": "...",
    "porte": "...",
    "cnae": "...",
    "socios": [...],
    "endereco": "...",
    "telefone": "...",
    "email": "..."
  },
  "source_type": "briefing",
  "source_name": "BrasilAPI",
  "fetched_at": "..."
}
```

## PASSO 4 — Registro profissional (por nicho)

Execute SOMENTE a pesquisa relevante para o nicho detectado:

**medical (medico):**
```
WebSearch: consultacrm.com.br "{nome}" "{estado_do_cidade}"
WebSearch: CRM "{nome}" "{cidade}" medico
```
Se encontrar, capture: numero CRM, especialidade, situacao.

**dental (dentista):**
```
WebSearch: CRO "{estado}" "{nome}" dentista
WebSearch: "{nome}" "{cidade}" dentista CRO
```

**legal (advogado):**
```
WebSearch: cna.oab.org.br "{nome}"
WebSearch: OAB "{estado}" "{nome}" advogado
WebSearch: jusbrasil.com.br "{nome}" advogado
```

**psychology (psicologo):**
```
WebSearch: CRP "{estado}" "{nome}" psicologo
```

**finance (contador):**
```
WebSearch: CRC "{estado}" "{nome}" contador
```

**realty (corretor):**
```
WebSearch: CRECI "{estado}" "{nome}" corretor
```

Para outros nichos, PULE este passo.

Crie data_point com category "professional_registry".

## PASSO 5 — Website profundo (MULTIPLOS WebFetch obrigatorios)

Se encontrou um site nos passos anteriores, faca VARIOS WebFetch:

**5.1 Fetch da pagina principal:**
```
WebFetch: {url_do_site}
```

Extraia do HTML:
- **Emails**: procure por `mailto:` e regex `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`
- **Telefones**: procure por `tel:` e regex `\(?\d{2}\)?\s*\d{4,5}-?\d{4}`
- **Meta tags**: extraia EXATAMENTE o conteudo de:
  - `<meta property="og:image" content="...">`  ← LOGO/BANNER (SALVAR COMO IMAGEM!)
  - `<meta property="og:title" content="...">`
  - `<meta property="og:description" content="...">`
  - `<meta name="description" content="...">`
  - `<link rel="icon" href="...">` ← FAVICON
- **Links de redes sociais**: busque TODAS as URLs contendo instagram.com, facebook.com, linkedin.com, youtube.com, twitter.com, tiktok.com
- **Imagens no HTML**: busque TODAS as tags `<img>` e capture src de:
  - Imagens com "logo" no src, alt, class ou id
  - Imagens no header (dentro de `<header>` ou classe header/nav)
  - Imagens grandes (hero/banner) — geralmente as primeiras imagens fora do header
- **Tech stack**: procure por:
  - `wp-content` ou `wordpress` → WordPress
  - `wix.com` ou `_wix` → Wix
  - `squarespace` → Squarespace
  - `shopify` → Shopify
  - Se nenhum → HTML/CSS puro ou outro
- **SSL**: a URL comeca com https?

**5.2 Fetch da pagina "Sobre" (OBRIGATORIO se existir):**
Procure no HTML por links contendo: /sobre, /about, /quem-somos, /a-clinica, /a-empresa, /historia, /equipe, /nosso-time

Se encontrar, faca:
```
WebFetch: {url_do_site}/sobre  (ou a URL encontrada)
```
Extraia: texto da historia, fundadores, missao/visao, fotos da equipe (img src), data de fundacao.

**5.3 Fetch da pagina "Contato" (se existir):**
Procure por links contendo: /contato, /contact, /fale-conosco

Se encontrar:
```
WebFetch: {url_do_site}/contato
```
Extraia: emails, telefones, endereco, mapa, formulario.

**5.4 Fetch de paginas de servicos/produtos (se relevante):**
Se o site tem pagina de servicos ou cardapio:
```
WebFetch: {url_do_site}/servicos (ou equivalente)
```
Extraia: lista de servicos, precos (se disponiveis), imagens de servicos.

**REGRA DE IMAGENS:** Toda URL de imagem encontrada (og:image, favicon, img src com logo, fotos da equipe, banner) deve ser salva como data_point separado com category "images". URLs relativas devem ser convertidas para absolutas (ex: /img/logo.png → https://site.com/img/logo.png).

## PASSO 6 — Canais de venda (por nicho)

Pesquise se o negocio esta presente em plataformas/marketplaces:

**food (restaurante, chef, buffet):**
```
WebSearch: "{nome}" "{cidade}" site:ifood.com.br
WebSearch: "{nome}" "{cidade}" anotaai
WebSearch: "{nome}" "{cidade}" site:rappi.com.br
WebSearch: "{nome}" "{cidade}" site:ubereats.com
```

**medical, dental, psychology (saude):**
```
WebSearch: "{nome}" "{cidade}" site:doctoralia.com.br
WebSearch: "{nome}" "{cidade}" site:boaconsulta.com
```

**hospitality (hospedagem):**
```
WebSearch: "{nome}" "{cidade}" site:booking.com
WebSearch: "{nome}" "{cidade}" site:tripadvisor.com.br
WebSearch: "{nome}" "{cidade}" site:airbnb.com.br
```

**realty (imobiliaria):**
```
WebSearch: "{nome}" "{cidade}" site:zapimoveis.com.br
WebSearch: "{nome}" "{cidade}" site:vivareal.com.br
```

**education (escola):**
```
WebSearch: "{nome}" "{cidade}" site:reclameaqui.com.br
WebSearch: "{nome}" "{cidade}" matricula
```

**beauty (beleza):**
```
WebSearch: "{nome}" "{cidade}" agendamento OR reserva
```

**generic (qualquer):**
```
WebSearch: "{nome}" "{cidade}" site:reclameaqui.com.br
```

Para CADA canal encontrado via WebSearch, faca WebFetch na URL do perfil e extraia dados usando o guia por plataforma abaixo.

## PASSO 6.5 — Extracao profunda por plataforma

Cada plataforma tem estrutura diferente. Use este guia para extrair o maximo de cada uma.

### INSTAGRAM (se --instagram foi passado ou encontrou perfil)

O Instagram retorna dados ricos no og: meta tags via WebFetch.

```
WebFetch: https://www.instagram.com/{username}/
```

Extraia do HTML:
- `og:image` → foto de perfil em alta resolucao (URL do CDN scontent*.cdninstagram.com)
- `og:description` → bio completa + contagem de seguidores/seguindo/posts
- `og:title` → nome do perfil

Se o lead veio com campo `posts_links` (lista de URLs de posts), acesse os primeiros 3-5 posts:
```
WebFetch: https://www.instagram.com/p/{shortcode}/
```
De cada post extraia:
- `og:image` → foto do post em alta resolucao
- `og:description` → legenda do post

Isso da as imagens REAIS que o negocio publica — fotos de produtos, do local, da equipe.

### IFOOD

O iFood tem paginas publicas com dados estruturados. A URL tipica e:
`https://www.ifood.com.br/delivery/{cidade}/{slug-restaurante}/{uuid}`

```
WebFetch: {url_encontrada_no_websearch}
```

Extraia do HTML:
- `og:image` → logo/foto do restaurante no iFood
- Procure por JSON-LD (`<script type="application/ld+json">`) que contem:
  - Nome, endereco, telefone, tipo de cozinha
  - Menu items com nome + preco + descricao + imagem
  - Avaliacao (rating, review count)
- Procure por `<img>` tags com URLs de imagens de pratos (geralmente em CDN static-images.ifood.com.br)
- Capture o CARDAPIO COMPLETO: nome do item, descricao, preco, e URL da imagem de cada prato

Salve como data_points separados:
- category "sales_channels" → dados do perfil (avaliacao, status)
- category "menu" → cardapio com itens, precos e imagens
- category "images" → todas as fotos de pratos encontradas (detail.urls)

### RAPPI

URL tipica: `https://www.rappi.com.br/restaurantes/{id}-{slug}`

```
WebFetch: {url_encontrada}
```

Extraia:
- `og:image` → foto/logo
- Itens do cardapio com preco (procure em JSON embutido ou elementos repetidos com preco)
- Fotos dos pratos (URLs de imagens)

### DOCTORALIA

URL tipica: `https://www.doctoralia.com.br/{nome}/{especialidade}/{cidade}`

```
WebFetch: {url_encontrada}
```

Extraia:
- `og:image` → foto do profissional
- JSON-LD com dados estruturados (nome, especialidade, endereco, avaliacao)
- Nota e numero de avaliacoes
- Depoimentos de pacientes (os 3 mais recentes)
- Lista de servicos/tratamentos
- Precos (se disponiveis)
- Convenios aceitos

### TRIPADVISOR

URL tipica: `https://www.tripadvisor.com.br/Restaurant_Review-{id}`

```
WebFetch: {url_encontrada}
```

Extraia:
- `og:image` → foto principal
- Posicao no ranking (ex: "#22 de 2.490 restaurantes")
- Nota e numero de avaliacoes
- Tipo de cozinha, faixa de preco
- Fotos: procure URLs de imagens em `<img>` com src contendo "photo-s" ou "photo-l" (thumbnails e alta res)
- Top 3 avaliacoes recentes (texto + nota)

### BOOKING / AIRBNB

```
WebFetch: {url_encontrada}
```

Extraia:
- `og:image` → foto principal
- Nota e numero de avaliacoes
- Precos (se visiveis)
- Fotos do estabelecimento (URLs de imagens)
- Comodidades/servicos listados

### RECLAME AQUI

```
WebFetch: {url_encontrada}
```

Extraia:
- Nota de reputacao (otima/boa/regular/ruim)
- Taxa de resposta e taxa de solucao
- Numero de reclamacoes
- Principais reclamacoes (ultimas 3)
- Se a empresa responde ou nao

### FACEBOOK

```
WebFetch: https://www.facebook.com/{pagina}/
```

Extraia:
- `og:image` → foto de capa ou perfil
- `og:description` → sobre a pagina
- Numero de curtidas/seguidores (se visivel no HTML)

### GOOGLE MAPS / GOOGLE BUSINESS

Se encontrou URL do Google Maps:
```
WebFetch: {google_maps_url}
```

O HTML pode conter:
- Fotos do estabelecimento (procure URLs de imagens com "googleusercontent.com")
- Avaliacoes e nota
- Horario de funcionamento
- Endereco e telefone

### PARA QUALQUER OUTRA PLATAFORMA

Regra geral ao fazer WebFetch em qualquer pagina:
1. Extraia `og:image` (sempre existe)
2. Procure por `<script type="application/ld+json">` (dados estruturados, muito ricos)
3. Procure por `<img>` com src relevante (ignore icones pequenos, tracking pixels)
4. Extraia textos descritivos (og:description, meta description)

### ORGANIZACAO DOS DATA_POINTS

Para cada plataforma acessada, crie data_points separados por tipo:
- `category: "sales_channels"` → presenca na plataforma, avaliacao, status
- `category: "menu"` → cardapio/servicos com itens, precos, descricoes (se aplicavel ao nicho)
- `category: "images"` → TODAS as URLs de imagens encontradas, com `detail.urls` como array e `detail.fonte` indicando a plataforma
- `category: "reviews"` → avaliacoes e depoimentos

## PASSO 7 — Padroes da marca

Com base em TUDO que coletou ate aqui, analise:

1. **Cores predominantes**: quais cores aparecem no site, logo, Instagram?
2. **Tom de comunicacao**: formal, informal, tecnico, descontraido?
3. **Publico-alvo aparente**: jovens, familias, empresarios, mulheres?
4. **Estilo visual**: minimalista, colorido, profissional, caseiro?
5. **Slogan/tagline**: o negocio tem um?

Crie data_point com category "brand":
```json
{
  "category": "brand",
  "label": "Padroes da marca",
  "value": "Resumo em 1 linha",
  "detail": {
    "cores": ["azul", "branco"],
    "tom": "formal",
    "publico_alvo": "...",
    "estilo_visual": "...",
    "slogan": "..."
  },
  "source_type": "briefing",
  "source_name": "analise"
}
```

## PASSO 8 — Concorrentes (rapido, sem profundidade)

Uma unica pesquisa basta. O objetivo e so saber QUEM tem site, nao analisar cada um.

```
WebSearch: "{palavras-chave do nicho}" "{cidade}" site
```

Liste apenas nome + URL. NAO faca WebFetch nos sites dos concorrentes. Apenas:
```json
{
  "category": "competitors",
  "label": "Concorrentes com site",
  "value": "3 encontrados",
  "detail": ["nome1 - url1", "nome2 - url2", "nome3 - url3"]
}
```

Argumento de venda: "Seus concorrentes X, Y e Z ja tem site." Pronto, passe para o proximo passo.

## PASSO 9 — Montar JSON, salvar e exibir

### 9.1 Monte o JSON completo

Junte TODOS os data_points coletados nos passos 2-8 no formato:

```json
{
  "input": {
    "name": "[nome]",
    "city": "[cidade]",
    "source": "[source]",
    "niche": "[nicho]",
    "original_data": { "...parametros recebidos..." }
  },
  "data_points": [ ...todos os data_points... ],
  "summary": "[resumo de vendas em 2-3 frases em portugues, pronto para pitch]",
  "sales_score": [1-10],
  "generated_at": "[ISO timestamp]"
}
```

**Sales Score (1-10):**
- Sem site = +3
- Sem redes sociais ativas = +2
- Negocio novo (<12 meses) = +2
- Concorrentes com site = +1
- Tem telefone = +1
- Tem CNPJ ativo = +1
- Ja tem site bom = -3
- Muitos canais de venda = -1

**Summary:** Escreva em portugues, em 2-3 frases diretas e objetivas. Exemplo:
"Clinica medica aberta ha 2 anos em Florianopolis, CRM ativo. Sem site e sem presenca digital alem do Instagram (450 seguidores). 3 concorrentes diretos ja tem site profissional. Otimo candidato para proposta de site."

### 9.2 Salvar no banco

Use Bash para salvar via curl POST:
```bash
curl -s -X POST http://localhost:3002/api/briefings \
  -H "Content-Type: application/json" \
  -d '{
    "lead_source": "[source]",
    "lead_id": "[id]",
    "lead_name": "[nome]",
    "lead_city": "[cidade]",
    "detected_niche": "[nicho]",
    "niche_label": "[label da estrategia]",
    "briefing_json": { ...JSON completo... },
    "status": "done"
  }'
```

Se o servidor nao estiver rodando, salve direto no SQLite:
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/python -c "
import sqlite3, json
db = sqlite3.connect('data/vendedor.db')
db.execute('''CREATE TABLE IF NOT EXISTS briefings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_source TEXT NOT NULL,
    lead_id TEXT NOT NULL,
    lead_name TEXT NOT NULL,
    lead_city TEXT DEFAULT '',
    detected_niche TEXT DEFAULT '',
    niche_label TEXT DEFAULT '',
    briefing_json TEXT NOT NULL DEFAULT '{}',
    status TEXT DEFAULT 'pending',
    error_message TEXT DEFAULT '',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    UNIQUE(lead_source, lead_id)
);''')
data = json.dumps(BRIEFING_JSON_AQUI)
db.execute('''INSERT OR REPLACE INTO briefings
    (lead_source, lead_id, lead_name, lead_city, detected_niche, niche_label, briefing_json, status, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'done', datetime('now'))''',
    ('SOURCE', 'ID', 'NOME', 'CIDADE', 'NICHO', 'LABEL', data))
db.commit()
db.close()
"
```

### 9.3 Exibir resultado

Mostre ao usuario um resumo formatado:

```
========================================
  BRIEFING COMPLETO
========================================
  Lead: [nome] ([cidade])
  Nicho: [nicho] → [estrategia]
  Score de Venda: [X]/10
========================================

  RESUMO:
  [summary]

  IDENTIDADE:
  - CNPJ: [valor] (BrasilAPI)
  - Razao Social: [valor]
  - Abertura: [data] ([X meses])
  - Porte: [valor]

  REGISTRO PROFISSIONAL:
  - [CRM/CRO/OAB]: [valor] ([fonte])

  PRESENCA WEB:
  - Site: [URL] | Tech: [stack] | SSL: [sim/nao]
  - Instagram: [@user] ([seguidores] seg.)
  - Facebook: [URL]
  - LinkedIn: [URL]

  IMAGENS CAPTURADAS:
  - Logo: [URL]
  - Fotos estabelecimento: [N fotos]
  - Fotos produtos: [N fotos]
  - Fotos equipe: [N fotos]

  CANAIS DE VENDA:
  - iFood: [encontrado/nao]
  - Doctoralia: [encontrado/nao]
  - [outros]

  MARCA:
  - Cores: [cores]
  - Tom: [formal/informal]
  - Publico: [descricao]

  HISTORIA:
  [texto da historia se encontrado]

  CONCORRENTES COM SITE:
  1. [nome] - [url]
  2. [nome] - [url]
  3. [nome] - [url]

  Salvo em: data/vendedor.db
========================================
```

## REGRAS CRITICAS

1. Este modulo e 100% INDEPENDENTE — NAO importa, lê ou depende de nenhum outro arquivo do projeto
2. Usa APENAS os dados recebidos como parametros + WebSearch + WebFetch
3. SEMPRE salve no banco ao final (curl ou SQLite direto)
4. Cada data_point DEVE ter source_type ("briefing") e source_name (de onde veio)
5. Respeite delays entre WebSearch (2-3 segundos) para nao ser bloqueado
6. Se uma pesquisa nao retornar resultado, registre como "Nao encontrado" e siga em frente
7. O summary deve ser um pitch pronto — algo que o vendedor pode ler e ja entender a oportunidade
8. CNPJ e registros profissionais sao PRIORIDADE para leads brasileiros

## PRINCIPIOS DE QUALIDADE

9. **Cada link relevante encontrado DEVE ser acessado via WebFetch.** WebSearch so traz links — os dados reais (imagens, textos, contatos) estao dentro das paginas. Seja exaustivo: site, Instagram, Facebook, Doctoralia, diretorios, canais de venda — acesse tudo.

10. **Imagens sao prioridade.** O vendedor precisa de material visual para montar propostas. Em cada WebFetch, procure `og:image`, `<img>` com logo/banner/equipe, favicon. Salve cada URL de imagem como data_point separado com category "images" e as URLs em `detail.urls`.

11. **Historia e contexto enriquecem o briefing.** Sempre que um site tiver pagina "Sobre/About/Quem Somos", acesse via WebFetch e extraia a historia da empresa, fundadores, missao.

12. **og:image e a mina de ouro.** Praticamente toda pagina web tem `<meta property="og:image">`. E a forma mais rapida de capturar a imagem principal de qualquer perfil, site ou listagem. Extraia em CADA WebFetch.

13. **Profundidade > quantidade.** Melhor acessar 5 paginas e extrair tudo do que listar 20 links sem acessar nenhum.
