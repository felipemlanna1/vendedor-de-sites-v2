SEMPRE comece mostrando este guia ao usuario:

```
========================================
  LEAD FINDER v2 — Google-first
  Custo: $0 | ~15 leads/30min
========================================

COMO FUNCIONA:
  1. IA gera queries inteligentes para o nicho
  2. Google descobre perfis (GRATIS, sem risco)
  3. Instagram API valida apenas os candidatos (economico)
  4. Auto-referencia: lead encontrado → busca similares
  5. CSV salvo em tempo real

PARAMETROS:
  --nicho "X"            Profissao/nicho (obrigatorio sem --perfil-exemplo)
  --cidade "X"           Cidade
  --perfil-exemplo @X    Perfil modelo (pula direto pra validacao)

  FILTROS (todos opcionais — se nao passar, nao filtra):
  --max-idade-conta N    So contas com 1o post nos ultimos N dias
  --max-idade-post N     So contas que postaram nos ultimos N dias
  --so-comercial         So contas Business/Creator
  --sem-site             So contas sem site na bio
  --limite N             Max leads desejados (default: 10)

EXEMPLOS:
  /lead-finder --nicho "psicologo" --cidade "Florianopolis"
  /lead-finder --nicho "dentista" --cidade "BH" --max-idade-conta 90 --sem-site
  /lead-finder --perfil-exemplo @psicologa.karen --sem-site
========================================
```

Agora execute seguindo estas instrucoes:

## FASE 0 — Pesquisa de queries inteligentes (SEM usar Instagram API)

Antes de buscar, PENSE como um profissional desse nicho se apresenta no Instagram.
Gere variações de queries para o Google baseadas em:

1. **Como o profissional escreve na bio:**
   - Psicólogo: "psicóloga", "terapia", "saúde mental", "atendimento", "CRP"
   - Médico: "dra.", "dr.", "clínica", "CRM", "consultório"
   - Dentista: "odontologia", "sorriso", "CRO", "implante"

2. **Como o username é formatado:**
   - `psicologa.nome`, `dra.nome`, `nome.nutri`, `odonto.nome`

3. **Variações de nome da cidade:**
   - Florianópolis → "floripa", "florianópolis", "florianopolis"

4. **Gere 5-8 queries no formato `site:instagram.com "termo" "cidade"`:**
   ```
   Exemplo para psicologo em Florianopolis:
   - site:instagram.com "psicóloga" "florianópolis"
   - site:instagram.com "psicólogo" "floripa"
   - site:instagram.com "psicologia" "florianópolis"
   - site:instagram.com "terapia" "floripa"
   - site:instagram.com "saúde mental" "florianópolis"
   - site:instagram.com "psicologa" "florianopolis"
   - site:instagram.com "CRP" "florianópolis"
   ```

## FASE 0.5 — Busca no CSV local ANTES de tudo (ZERO custo)

Antes de buscar no Google ou Instagram, leia TODOS os CSVs em leads/*.csv.
Filtre pelos parametros da busca atual:

- Se `--nicho`: filtre pela coluna "bio" ou "category" contendo o nicho
- Se `--cidade`: filtre pela coluna "bio" contendo a cidade
- Se `--sem-site`: filtre has_real_site = false (ou external_url vazio/linktree)
- Se `--max-idade-conta`: filtre oldest_post_date dentro do range
- Se `--so-comercial`: filtre account_type != Personal

Se encontrar perfis que batem:
- Mostre ao usuario: "Encontrei X perfis no banco local que ja batem com sua busca:"
- Liste os perfis encontrados com score e dados
- Calcule quantos faltam: meta - encontrados_local = faltam
- Se faltam > 0: "Preciso buscar mais Y perfis. Iniciando Google + Instagram..."
- Se faltam = 0: "Todos os leads ja estao no banco! Nenhuma API call necessaria."

Isso garante que NUNCA gastamos API calls em dados que ja temos.

## FASE 1 — Descoberta via Google (GRATIS, SEM RISCO)

Para CADA query gerada na Fase 0, use a ferramenta WebSearch.
De cada resultado, extraia o username do Instagram da URL.

Formato de URL do Instagram: `https://www.instagram.com/USERNAME/`
Regex: extraia o path apos instagram.com/ (ignorar /p/, /reel/, /explore/, etc.)

Colete TODOS os usernames unicos encontrados em TODAS as queries.
Deduplique a lista.

**IMPORTANTE**: Ordene a lista do MENOS provavel de ser popular ao MAIS provavel.
Perfis que aparecem em menos resultados de busca tendem a ser menores/mais novos.

## FASE 2 — Pre-filtragem (SEM usar Instagram API)

Monte a chave de parametros para o cache:
- Combine nicho + cidade + filtros em string: "psicologo|florianopolis|sem_site"

Para cada username na lista:
1. Chame `instagram_check_visited(username, param_key)`
   - Se "VISITADO" → pule (0 API calls)
   - Se "NOVO" → mantenha na lista

## FASE 3 — Verificar cooldown + login

1. Chame `instagram_check_cooldown()`
   - Se "BLOQUEADO" → PARE, mostre mensagem, NAO faca login
   - Se "LIBERADO" → continue

2. Chame `instagram_check_session()`
   - Se nao logado → peca credenciais (lembre: conta SECUNDARIA)

3. Mostre: "X candidatos encontrados via Google, Y novos para validar, Z do cache"

## FASE 4 — Validacao via Instagram API (ECONOMICA)

Para cada candidato novo (ate atingir --limite de leads):

1. Chame `instagram_analyze_profile(username)`
   - Retorna perfil completo + score + classificacao
   - INTELIGENTE: se media_count > 100, pula busca de posts automaticamente

2. Marque no cache: `instagram_mark_visited(username, param_key, resultado, score)`

3. Aplique filtros (se ativos):
   - `--so-comercial`: descarte se Personal
   - `--sem-site`: descarte se tem site REAL (Linktree, Taplink, Beacons etc NAO contam como site — use o campo has_real_site do MCP)
   - `--max-idade-conta`: descarte se primeiro post > N dias
   - `--max-idade-post`: descarte se ultimo post > N dias

4. **SEMPRE salve no CSV** independente de passar ou nao nos filtros:
   - Salve CSV: `instagram_append_lead(lead_json)` — salva TODOS os perfis validados
   - Isso garante que nenhuma API call e desperdicada e temos banco de dados completo
   - O campo "classificacao" (QUENTE/MORNO/FRIO) permite filtrar depois no Excel

5. Se PASSOU nos filtros:
   - Reporte: "LEAD: @username (QUENTE/MORNO) — motivos"
   - **AUTO-REFERENCIA**: `instagram_get_similar_accounts(user_id)`
     - Adicione similares ao INICIO da fila (prioridade)
     - Esses similares passam pelo mesmo fluxo (cache check → validacao)
   - Contabilize como lead encontrado para o --limite

6. Se NAO passou nos filtros: reporte brevemente "SALVO: @username (FRIO) — motivo" e continue
   - O perfil ja esta no CSV para consulta futura

6. A cada 5 perfis, mostre progresso:
   "Progresso: X validados, Y leads, Z API calls restantes"

## FASE 5 — Resumo

```
========================================
  RESULTADO
========================================
  Candidatos Google:     XX
  Do cache (pulados):    XX
  Validados (API):       XX
  Leads encontrados:     XX
    QUENTES: XX
    MORNOS:  XX
  CSV: leads/leads_XXXXXXXX.csv
  API calls usadas: XX/30
========================================
```

Chame `instagram_logout()` para salvar cooldown.

## REGRAS CRITICAS

1. NUNCA use Instagram API para DESCOBERTA — use Google (WebSearch)
2. Instagram API SOMENTE para validacao de perfis ja encontrados
3. SEMPRE verifique cache antes de gastar API call
4. SEMPRE verifique cooldown antes de login
5. SEMPRE salve lead no CSV imediatamente (crash-safe)
6. Se receber RATE_LIMIT/CHALLENGE → logout imediato + aviso
7. Se media_count > 100 → descarte rapido (conta antiga, nao gaste posts API)
8. Delay de 8-15s entre chamadas API (o MCP faz automaticamente)
9. Max 30 API calls por sessao
