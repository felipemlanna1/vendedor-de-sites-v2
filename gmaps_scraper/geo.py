"""
Subdivisao geografica por bairros das maiores cidades brasileiras.
Supera o limite de ~120 resultados do Google Maps dividindo por bairros.
"""

from urllib.parse import quote_plus

# 15 maiores cidades BR com seus principais bairros
BAIRROS = {
    "são paulo": [
        "Centro", "Pinheiros", "Vila Mariana", "Moema", "Itaim Bibi",
        "Jardins", "Consolação", "Liberdade", "Bela Vista", "República",
        "Vila Madalena", "Perdizes", "Lapa", "Santana", "Tucuruvi",
        "Tatuapé", "Mooca", "Ipiranga", "Saúde", "Butantã",
        "Campo Belo", "Brooklin", "Santo Amaro", "Vila Olímpia", "Morumbi",
    ],
    "rio de janeiro": [
        "Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo",
        "Flamengo", "Tijuca", "Barra da Tijuca", "Recreio", "Lapa",
        "Santa Teresa", "Laranjeiras", "Catete", "Glória", "Méier",
        "Madureira", "Campo Grande", "Jacarepaguá", "Niterói", "São Gonçalo",
    ],
    "belo horizonte": [
        "Centro", "Savassi", "Funcionários", "Lourdes", "Serra",
        "Buritis", "Pampulha", "Santo Agostinho", "Gutierrez", "Sion",
        "Floresta", "Santa Efigênia", "Barro Preto", "Mangabeiras", "Belvedere",
        "Padre Eustáquio", "Carlos Prates", "Barreiro", "Venda Nova", "Sagrada Família",
    ],
    "curitiba": [
        "Centro", "Batel", "Água Verde", "Bigorrilho", "Juvevê",
        "Alto da XV", "Rebouças", "Cristo Rei", "Champagnat", "Mercês",
        "Portão", "Santa Felicidade", "Boa Vista", "Cabral", "Bacacheri",
        "Hauer", "Prado Velho", "Jardim Social", "Ecoville", "Campo Comprido",
    ],
    "porto alegre": [
        "Centro", "Moinhos de Vento", "Bom Fim", "Cidade Baixa", "Menino Deus",
        "Petrópolis", "Rio Branco", "Mont Serrat", "Floresta", "Independência",
        "Bela Vista", "Auxiliadora", "Santana", "Partenon", "Cristal",
    ],
    "salvador": [
        "Centro", "Barra", "Pituba", "Itaigara", "Rio Vermelho",
        "Ondina", "Graça", "Vitória", "Campo Grande", "Pelourinho",
        "Paralela", "Caminho das Árvores", "Stella Maris", "Itapuã", "Brotas",
    ],
    "brasília": [
        "Asa Sul", "Asa Norte", "Lago Sul", "Lago Norte", "Sudoeste",
        "Águas Claras", "Taguatinga", "Ceilândia", "Guará", "Cruzeiro",
        "Noroeste", "Park Sul", "Samambaia", "Sobradinho", "Planaltina",
    ],
    "fortaleza": [
        "Centro", "Aldeota", "Meireles", "Cocó", "Varjota",
        "Mucuripe", "Fátima", "Benfica", "Papicu", "Parquelândia",
        "Montese", "Messejana", "Maraponga", "Edson Queiroz", "Dionísio Torres",
    ],
    "recife": [
        "Centro", "Boa Viagem", "Espinheiro", "Graças", "Derby",
        "Aflitos", "Casa Forte", "Parnamirim", "Torre", "Madalena",
        "Imbiribeira", "Pina", "Rosarinho", "Tamarineira", "Santo Amaro",
    ],
    "goiânia": [
        "Centro", "Setor Bueno", "Setor Marista", "Setor Oeste", "Jardim Goiás",
        "Setor Nova Suíça", "Setor Pedro Ludovico", "Setor Aeroporto", "Setor Central",
        "Campinas", "Alto da Glória", "Setor Universitário", "Vila Nova",
    ],
    "campinas": [
        "Centro", "Cambuí", "Barão Geraldo", "Taquaral", "Nova Campinas",
        "Sousas", "Guanabara", "Jardim Chapadão", "Bosque", "Vila Industrial",
    ],
    "florianópolis": [
        "Centro", "Trindade", "Ingleses", "Jurerê", "Canasvieiras",
        "Lagoa da Conceição", "Campeche", "Coqueiros", "Itacorubi", "Agronômica",
        "Estreito", "Kobrasol", "Barreiros", "Pantanal", "Córrego Grande",
    ],
    "manaus": [
        "Centro", "Adrianópolis", "Vieiralves", "Flores", "Chapada",
        "Parque 10", "Dom Pedro", "Aleixo", "Praça 14", "São Jorge",
    ],
    "vitória": [
        "Centro", "Praia do Canto", "Jardim da Penha", "Jardim Camburi",
        "Mata da Praia", "Bento Ferreira", "Enseada do Suá", "Santa Lúcia",
    ],
    "belém": [
        "Centro", "Nazaré", "Batista Campos", "Umarizal", "Marco",
        "Reduto", "Campina", "São Brás", "Pedreira", "Telégrafo",
    ],
}

# Aliases para nomes de cidades comuns
CITY_ALIASES = {
    "sp": "são paulo",
    "sao paulo": "são paulo",
    "rj": "rio de janeiro",
    "bh": "belo horizonte",
    "cwb": "curitiba",
    "poa": "porto alegre",
    "ssa": "salvador",
    "bsb": "brasília",
    "brasilia": "brasília",
    "floripa": "florianópolis",
    "florianopolis": "florianópolis",
}


def _normalize_city(city: str) -> str:
    """Normaliza nome da cidade para lookup."""
    city_lower = city.lower().strip()
    return CITY_ALIASES.get(city_lower, city_lower)


def get_bairros(city: str) -> list[str]:
    """Retorna lista de bairros para uma cidade. Vazio se cidade desconhecida."""
    normalized = _normalize_city(city)
    return BAIRROS.get(normalized, [])


def generate_queries(nicho: str, local: str, keywords: list[str] | None = None, subdividir: bool = False) -> list[str]:
    """
    Gera lista de queries para Google Maps.

    Args:
        nicho: Nome do nicho (ex: "dentista")
        local: Local (ex: "Savassi, Belo Horizonte" ou "Curitiba")
        keywords: Lista de keywords alternativas. Se None, usa [nicho]
        subdividir: Se True, gera queries por bairro da cidade

    Returns:
        Lista de queries formatadas para Google Maps search URL
    """
    if keywords is None:
        keywords = [nicho]

    queries = []

    if subdividir:
        # Extrair cidade do local
        parts = [p.strip() for p in local.split(",")]
        city = parts[-1] if len(parts) > 1 else parts[0]
        bairros = get_bairros(city)

        if bairros:
            # TODAS as keywords × TODOS os bairros
            for kw in keywords:
                for bairro in bairros:
                    queries.append(f"{kw} {bairro} {city}")
        else:
            # Cidade desconhecida — todas as keywords × local
            for kw in keywords:
                queries.append(f"{kw} {local}")
    else:
        # Sem subdivisao — TODAS as keywords × local
        for kw in keywords:
            queries.append(f"{kw} {local}")

    return queries


def make_maps_url(query: str, lang: str = "pt") -> str:
    """Gera URL de busca do Google Maps."""
    encoded = quote_plus(query)
    return f"https://www.google.com/maps/search/{encoded}/?hl={lang}"
