SEMPRE comece mostrando este guia de uso ao usuario:

```
========================================
  GOOGLE MAPS LEAD FINDER
  Custo: $0 | ~30 leads/hora
========================================

O QUE FAZ:
  Scrape Google Maps → Verifica websites → Filtra → CNPJ (opcional)
  Encontra negocios locais e exporta CSV com todos os dados.

COMO FUNCIONA:
  1. Gera queries por nicho + local
  2. Scrape Google Maps (Playwright headless)
  3. Verifica se cada negocio tem website funcional
  4. Aplica seus filtros
  5. (Opcional) Enriquece com CNPJ via Receita Federal
  6. Exporta CSV em leads/

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
  --max-idade-empresa N  Max meses desde abertura (requer --enrich-cnpj)
  --limite N             Max resultados por query (default: 60)
  --force                Ignorar cache, re-scrape tudo

EXEMPLOS:
  /gmaps-leads --nicho "dentista" --local "Savassi, BH"
  /gmaps-leads --nicho "restaurante" --local "Curitiba" --sem-site --com-telefone
  /gmaps-leads --nicho "salao" --local "BH" --subdividir --limite 200
  /gmaps-leads --nicho "academia" --local "Centro, SP" --enrich-cnpj

NICHOS DISPONIVEIS (32):
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

Agora execute a busca seguindo estas instrucoes:

## Instrucoes de execucao

### Passo 1: Verificar dependencias
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/pip install playwright playwright-stealth 2>/dev/null
.venv/bin/python -m playwright install chromium 2>/dev/null
```

### Passo 2: Parsear parametros e EXPANDIR TERMOS
O usuario passou estes argumentos: $ARGUMENTS

**CRITICO — Expansao de termos:**
Antes de rodar o script, PENSE em todos os termos de busca relevantes para o nicho solicitado.
O script usa keywords pre-definidas em niches.py, mas elas podem ser insuficientes.

Se o nicho do usuario for amplo ou generico, voce DEVE:
1. Pensar em TODOS os subtipos, sinonimos e variacoes do nicho
2. Adicionar termos extras via --keywords-extra no comando

Exemplos de expansao:
- "escola esportiva" → escola de futebol, escola de natação, escola de surf,
  escola de tênis, escola de judô, escolinha de vôlei, escola de ginástica,
  escola de artes marciais, escola de dança, academia infantil
- "restaurante" → pizzaria, hamburgueria, churrascaria, sushi, comida japonesa,
  comida italiana, restaurante vegano, marmitaria, self-service
- "clínica" → clínica médica, clínica popular, consultório, centro médico,
  clínica de fisioterapia, clínica dermatológica

Construa o comando com --keywords-extra para incluir os termos expandidos:
```bash
.venv/bin/python gmaps_leads.py --nicho "X" --local "Y" --keywords-extra "termo1,termo2,termo3"
```

### Passo 3: Executar
```bash
cd /Users/felipemoreiralanna/Documents/GitHub/vendedor-de-sites-v2
.venv/bin/python gmaps_leads.py [argumentos parseados]
```

Se o volume de queries for muito grande (>50), considere rodar em partes
ou sugerir ao usuario focar em um subtipo especifico.

### Passo 4: Apresentar resultados
- Leia o CSV gerado em leads/
- Mostre o resumo: total encontrados, sem site, com telefone
- Liste os top 10 leads com nome, telefone, categoria, status do site
- Informe o caminho do CSV
- Mostre quantas queries foram do cache vs novas

### Regras importantes
- SEMPRE expanda os termos de busca antes de rodar — nao se limite as keywords do niches.py
- Se o Playwright nao estiver instalado, instale automaticamente
- Reporte progresso ao usuario durante o scraping
- Se der erro de timeout, sugira reduzir --limite ou tentar outro bairro
- O cache evita re-scraping — informe o usuario quando dados vem do cache
