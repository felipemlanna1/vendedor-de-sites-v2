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

COMO FUNCIONA (7 fases):
  1. Parse & detect niche
  2. Pesquisas universais (texto)
  3. CNPJ + registro profissional
  4. Website profundo (multiplos WebFetch)
  5. Canais de venda (iFood, Doctoralia, etc)
  6. Captura de imagens (WebSearch + Playwright)
  7. Marca, concorrentes, salvar DB

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

Agora execute:

Lance o agent orchestrator `enrichment-builder` passando:
- Argumentos: $ARGUMENTS
- Base path: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2

O orchestrator executara as 7 fases sequencialmente, gerenciando state em `data/_state/enrichment-progress.json`.

## REGRAS CRITICAS
- Este modulo e 100% INDEPENDENTE — NAO importa ou depende de nenhum outro arquivo do projeto
- Usa APENAS os dados recebidos como parametros + WebSearch + WebFetch + Playwright MCP
- NUNCA use claude-in-chrome para browser automation. APENAS Playwright MCP.
- SEMPRE salve no banco ao final (fase 7)
- Cada data_point DEVE ter source_type ("briefing") e source_name
