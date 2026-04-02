SEMPRE comece mostrando este guia ao usuario:

```
========================================
  LEAD FINDER v3 — Playwright
  Custo: $0 | ~15 leads/sessao
========================================

COMO FUNCIONA (6 fases):
  1. IA gera queries inteligentes para o nicho
  2. Google descobre perfis (GRATIS, sem risco)
  3. Login no Instagram via Playwright (navegador real)
  4. Validacao navegando em cada perfil (fotos + dados + scoring)
  5. Auto-referencia: lead encontrado → busca similares
  6. Resumo + CSV salvo

DIFERENCIAL vs v2:
  - Navegacao real (Playwright) em vez de API privada
  - Captura fotos HD dos posts (og:image)
  - Sem limite fixo de 30 calls
  - Comportamento de usuario real = menos risco de ban

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

Agora execute:

Lance o agent orchestrator `lead-finder-builder` passando:
- Argumentos: $ARGUMENTS
- Base path: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2

O orchestrator executara as 6 fases sequencialmente, gerenciando state em `data/_state/lead-finder-progress.json`.

## REGRAS CRITICAS
- Google WebSearch continua como motor de descoberta (fase 2) — NAO MUDAR
- Validacao via Playwright MCP (navegador real, nao API)
- NUNCA use instagrapi/API privada para validar perfis
- NUNCA use claude-in-chrome — APENAS Playwright MCP
- O MCP instagram-lead-mcp so e usado para tools de CACHE (check_visited, mark_visited, append_lead)
- Delays naturais entre perfis (5-10s) para parecer humano
