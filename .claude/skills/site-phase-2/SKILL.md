---
name: site-phase-2
description: Fase 2 do build-site — Imersao profunda no cliente
user-invocable: false
---

# Fase 2 — Imersao no Cliente

Leia o briefing carregado na Fase 1 (todos os data_points) e responda POR ESCRITO ao usuario:

**2.1 Quem e este cliente de verdade?**
Nao "e um dentista". O que torna ESTE cliente unico — historia, diferencial, trajetoria. Use: identity, history, professional_registry, brand.

**2.2 Qual narrativa so ESTE cliente pode contar?**
O fio condutor do site em 1 frase.

**2.3 Inventario de conteudo:**
- Textos: nome, historia, servicos/especialidades, slogan, diferencial
- Imagens: TODAS as URLs (classifique: portrait/logo/banner/produto/venue)
- Contato: telefones, email, endereco, horarios, WhatsApp, coordenadas
- Numeros: seguidores, avaliacoes, anos, premios, certificacoes
- Redes: Instagram, Facebook, LinkedIn, TikTok (URLs + metricas)
- Cardapio/Servicos: itens com nome, descricao, preco
- Avaliacoes: nota agregada, total reviews, depoimentos por plataforma
- Concorrentes: SOMENTE cores (para evitar repeticao). Benchmark = catalogo curado (`sites/_templates/design-references.md`), NAO concorrentes

**2.4 Lacunas e fallbacks:**
- Sem cores → derivar de imagens reais + evitar cores concorrentes
- Sem imagens → design tipografico ousado (gradientes, shapes, texturas CSS)
- Sem historia → sintetizar de CNPJ, formacao, premios
- Sem depoimentos → badges visuais das notas de plataformas
- Sem slogan → criar do diferencial
- 40+ itens → pagina dedicada com filtros

**2.5 Publico-alvo:**
Quem visita? Jornada emocional? O que busca? Qual acao queremos?

**2.6 Escopo — NAO e landing page:**
- Servicos distintos que merecem paginas proprias?
- Multiplas unidades?
- Blog/artigos?
- Cardapio extenso (40+)?
- Portfolio/galeria?

Se SIM: React Router com rotas dedicadas.
Se simples: SPA robusta com profundidade em cada secao.

Mostre estrutura decidida ao usuario.

## CRITERIO DE CONCLUSAO
- 6 itens escritos e mostrados ao usuario
- Estrutura do site definida (SPA ou multi-pagina)
- Inventario completo de conteudo disponivel
