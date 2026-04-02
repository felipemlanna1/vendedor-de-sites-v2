SEMPRE comece mostrando este guia de uso ao usuario:

```
========================================
  GOOGLE MAPS LEAD FINDER
  Custo: $0 | ~30 leads/hora
========================================

O QUE FAZ:
  Scrape Google Maps → Verifica websites → Filtra → CNPJ (opcional)
  Encontra negocios locais e exporta CSV com todos os dados.

COMO FUNCIONA (4 fases):
  1. Parsear + expandir termos de busca
  2. Executar scraper (Playwright headless)
  3. Apresentar resultados + salvar no DB
  4. Enriquecer top leads com CNPJ (opcional)

PARAMETROS:
  --nicho "X"            Nicho (ex: dentista, restaurante, salao)
  --local "X"            Local (obrigatorio: bairro, cidade)

  FILTROS (todos opcionais — se nao passar, retorna TUDO):
  --sem-site             Apenas negocios sem website
  --nota-min N           Nota minima (ex: 3.5)
  --min-reviews N        Minimo de avaliacoes
  --max-reviews N        Maximo de avaliacoes
  --com-telefone         Apenas com telefone
  --subdividir           Buscar em todos os bairros da cidade
  --enrich-cnpj          Enriquecer com CNPJ (data abertura, porte)
  --limite N             Max resultados por query (default: 60)
  --target N             Parar apos N leads validos
  --force                Ignorar cache, re-scrape tudo

EXEMPLOS:
  /gmaps-leads --nicho "dentista" --local "Savassi, BH"
  /gmaps-leads --nicho "restaurante" --local "Curitiba" --sem-site --com-telefone
  /gmaps-leads --nicho "salao" --local "BH" --subdividir --limite 200

NICHOS (32):
  restaurante, clinica_medica, dentista, advogado, contador,
  academia, salao_beleza, psicologo, pet_shop, imobiliaria,
  escola_idiomas, autoescola, oficina_mecanica, arquiteto,
  nutricionista, fotografo, estetica, escola_infantil, otica,
  floricultura, escola_esportiva, beach_tennis_padel,
  massagem_terapia, buffet_festas, pet_hotel, tatuagem,
  coworking, personal_chef, clinica_fertilidade,
  medicina_estetica, assessoria_investimentos, escola_premium
========================================
```

Agora execute:

Lance o agent orchestrator `gmaps-builder` passando:
- Argumentos: $ARGUMENTS
- Base path: /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2

O orchestrator executara as 4 fases sequencialmente, gerenciando state em `data/_state/gmaps-progress.json`.

## REGRAS
- SEMPRE expanda os termos de busca — nao se limite as keywords do niches.py
- O script Python gmaps_leads.py ja usa Playwright headless — funciona sem interacao
- Cache evita re-scraping — informe o usuario quando dados vem do cache
