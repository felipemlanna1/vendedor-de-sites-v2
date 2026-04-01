"""
CSS Selectors centralizados para Google Maps.

Estrategia de resiliencia:
  1. Primario: aria-label, data-item-id, role (semanticos, estaveis)
  2. Fallback: CSS classes (frageis, mudam com updates do Google)

Atualizar aqui quando o Google mudar o DOM.
"""

# ============================================================
# FEED DE RESULTADOS (pagina de busca)
# ============================================================

FEED = '[role="feed"]'
PLACE_LINKS = '[role="feed"] a[href*="/maps/place/"]'
END_OF_LIST = '//span[contains(text(), "You\'ve reached the end of the list.")]'
END_OF_LIST_PT = '//span[contains(text(), "Você chegou ao final da lista")]'

# ============================================================
# DETAIL PAGE (pagina individual do negocio)
# ============================================================

# Nome — mais estavel via <title>, fallback h1
NAME_TITLE_REGEX = r'^(.+?)\s*[-–]\s*Google\s*Maps'
NAME_H1 = 'h1'
NAME_H1_CLASS = 'h1.DUwDvf'  # fragil

# Endereco
ADDRESS = 'button[data-item-id="address"]'
ADDRESS_ARIA = '[aria-label*="Endereço:"], [aria-label*="Address:"]'

# Telefone
PHONE = 'button[data-item-id^="phone:"]'
PHONE_LINK = 'a[href^="tel:"]'

# Website
WEBSITE = 'a[data-item-id="authority"]'

# Categoria
CATEGORY = 'button[jsaction*="category"]'
CATEGORY_FALLBACK = 'button[jsaction*="pane.rating.category"]'

# Rating
RATING_IMG = 'span[role="img"]'  # aria-label contem "X.X stars" ou "X,X estrelas"
RATING_REGEX = r'([0-9]+[.,][0-9]+)\s*(?:star|estrela)'
RATING_CLASS = 'div.F7nice'  # fragil

# Reviews count
REVIEWS_REGEX = r'[(]?([0-9][0-9,.]+)[)]?'

# Preco
PRICE_RANGE = 'span[aria-label*="Price"], span[aria-label*="Preço"]'

# Horarios
HOURS = '[aria-label*="Monday"], [aria-label*="Segunda"]'
HOURS_TABLE = 'table.eK4R0e'  # fragil

# Status
CLOSED_TEMPORARILY = 'span:has-text("Temporarily closed"), span:has-text("Temporariamente fechado")'
CLOSED_PERMANENTLY = 'span:has-text("Permanently closed"), span:has-text("Permanentemente fechado")'

# Plus Code
PLUS_CODE = 'button[data-item-id="oloc"]'

# Descricao / About
ABOUT = '[aria-label*="About"], [aria-label*="Sobre"]'

# Imagens
IMAGE_COUNT_REGEX = r'(\d+)\s*(?:photos?|fotos?)'

# Popular Times (se visivel)
POPULAR_TIMES = 'div[aria-label*="Popular times"]'

# ============================================================
# SEARCH BOX
# ============================================================

SEARCH_INPUT = 'input#searchboxinput'
SEARCH_INPUT_ARIA = 'input[aria-label*="Search"], input[aria-label*="Pesquisar"]'

# ============================================================
# SOCIAL MEDIA (detectar se URL e rede social)
# ============================================================

SOCIAL_DOMAINS = [
    'facebook.com', 'fb.com',
    'instagram.com',
    'twitter.com', 'x.com',
    'linkedin.com',
    'tiktok.com',
    'youtube.com',
]
