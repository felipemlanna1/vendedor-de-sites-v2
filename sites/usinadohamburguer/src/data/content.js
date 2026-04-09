export const business = {
  name: 'Usina do Hamburguer',
  tagline: 'Cada mordida tem proposito.',
  description: 'Hamburgueria artesanal em Florianopolis desde 2015. A cada hamburguer vendido, R$1 e doado para causas socioambientais.',
  url: 'https://usinadohamburguer.pages.dev',
  phone: '(48) 3371-8633',
  whatsapp: '5548963000080',
  email: 'contato@usinadohamburguer.com.br',
  cnpj: '23.003.410/0001-91',
  founded: 2015,
  employees: 24,
}

export const social = {
  instagram: 'https://www.instagram.com/usinadohamburguer/',
  facebook: 'https://www.facebook.com/usinadohamburguerdelivery/',
  tiktok: 'https://www.tiktok.com/@usinadohamburguer_',
  linkedin: 'https://br.linkedin.com/company/usina-do-hamburguer',
  tripadvisor: 'https://www.tripadvisor.com/Restaurant_Review-g303576-d10232658-Reviews-Usina_do_Hamburguer-Florianopolis_State_of_Santa_Catarina.html',
}

export const delivery = {
  ifood: {
    label: 'iFood',
    url: 'https://www.ifood.com.br/delivery/florianopolis-sc/usina-do-hamburguer---trindade-trindade/c32722d8-6ab1-4400-85af-31e5edeb4c9b',
    color: '#B4171F',
  },
  rappi: {
    label: 'Rappi',
    url: 'https://www.rappi.com.br/restaurantes/900645689-usina-do-hamburguer-trindade',
    color: '#A12D15',
  },
  anotaai: {
    label: 'Anota Ai',
    url: 'https://pedido.anota.ai/loja/usina-do-hamburguer-centro-1?referer=gbp_anota',
    color: '#006025',
  },
  whatsapp: {
    label: 'WhatsApp',
    url: 'https://wa.me/5548963000080?text=Oi!%20Quero%20pedir%20um%20hamburguer!',
    color: '#0A6B3A',
  },
}

export const ratings = {
  ifood: { score: 4.9, reviews: 597, platform: 'iFood' },
  tripadvisor: { score: 4.6, reviews: 291, platform: 'TripAdvisor', ranking: '#22 de 2.490' },
  menuweb: { score: 4.3, reviews: 5628, platform: 'MenuWeb' },
  restaurantGuru: { score: 4.5, reviews: 2481, platform: 'Restaurant Guru' },
  foursquare: { score: 8.5, platform: 'Foursquare' },
}

export const impactNumbers = {
  donated: 200000,
  years: 11,
  units: 4,
  followers: 39000,
}

export const locations = [
  {
    id: 'trindade',
    name: 'Trindade',
    address: 'R. Prof. Bento Aguido Vieira, 20 - Trindade',
    city: 'Florianopolis/SC',
    cep: '88036-410',
    phone: '(48) 3371-8633',
    hours: 'Diariamente 17:30 - 00:00',
    since: 2015,
    coords: { lat: -27.589725, lng: -48.521947 },
    mapsUrl: 'https://maps.google.com/?q=-27.589725,-48.521947',
  },
  {
    id: 'centro',
    name: 'Centro',
    address: 'Av. Hercilio Luz, 633, Loja 05 - Centro',
    city: 'Florianopolis/SC',
    phone: '(48) 3371-8633',
    hours: 'Diariamente 17:30 - 00:00',
    since: 2022,
    coords: { lat: -27.5954, lng: -48.5480 },
    mapsUrl: 'https://maps.google.com/?q=-27.5954,-48.5480',
  },
  {
    id: 'rio-tavares',
    name: 'Rio Tavares',
    address: 'Rio Tavares',
    city: 'Florianopolis/SC',
    phone: '(48) 3371-8633',
    hours: 'Diariamente 17:30 - 00:00',
    since: 2024,
    coords: { lat: -27.6344, lng: -48.4832 },
    mapsUrl: 'https://maps.google.com/?q=-27.6344,-48.4832',
  },
  {
    id: 'itapema',
    name: 'Itapema (Pier o Porto)',
    address: 'Itapema',
    city: 'Itapema/SC',
    phone: '(48) 3371-8633',
    hours: 'Diariamente 17:30 - 00:00',
    since: 2024,
    coords: { lat: -27.0905, lng: -48.6115 },
    mapsUrl: 'https://maps.google.com/?q=-27.0905,-48.6115',
  },
]

export const menuItems = [
  // Hamburgueres
  { id: 'ultra-smash', name: 'Ultra Smash', price: 23.90, category: 'burgers', description: '2 discos de carne fininhos de 50g cada, american cheese', image: '/images/ultra-smash.png', badges: ['smash'] },
  { id: 'smash', name: 'Smash', price: 23.90, category: 'burgers', description: 'Pao brioche, black angus 100g, queijo cheddar', image: '/images/smash.png', badges: ['smash'] },
  { id: 'classico', name: 'Classico', price: 26.90, category: 'burgers', description: 'Pao brioche, black angus 100g, alface, tomate, mussarela', image: '/images/classico.png', badges: [] },
  { id: 'vegano', name: 'Vegano', price: 30.90, category: 'burgers', description: 'Pao de banana, hamburguer de feijao, requeijao de castanha', image: '/images/vegano-rappi.png', badges: ['vegan'] },
  { id: 'vegetariano', name: 'Vegetariano', price: 33.90, category: 'burgers', description: 'Pao australiano, tofu defumado, provolone, tomate cereja', image: '/images/vegetariano.png', badges: ['vegetarian'] },
  { id: 'australiano', name: 'Australiano', price: 34.90, category: 'burgers', description: 'Pao australiano, black angus 100g, cheddar, bacon crocante', image: '/images/australiano.png', badges: [] },
  { id: '4queijos', name: '4 Queijos', price: 34.90, category: 'burgers', description: 'Pao brioche, black angus 100g, tomate, queijos variados', image: '/images/4queijos.png', badges: [] },
  { id: 'smash-duplo-bacon', name: 'Smash Duplo com Bacon', price: 37.90, category: 'burgers', description: '2 black angus 100g, queijo cheddar, bacon', image: '/images/smash-duplo-bacon.png', badges: ['smash'] },
  // Combos
  { id: 'combo-individual', name: 'Combo Individual', price: 35.90, category: 'combos', description: 'Hamburguer + fritas individual + refri lata', image: '/images/combo-individual.png', badges: [] },
  { id: 'combo-duplo', name: 'Combo Duplo', price: 71.80, category: 'combos', description: '2 Hamburgueres + fritas grande + 2 refris lata', image: '/images/combo-duplo.png', badges: [] },
  // Porcoes
  { id: 'batata-frita', name: 'Batata Frita Individual', price: 8.90, category: 'sides', description: 'Batata frita crocante', image: null, badges: [] },
  { id: 'batata-rustica', name: 'Batata Rustica Individual', price: 9.90, category: 'sides', description: 'Batata rustica temperada', image: null, badges: [] },
  { id: 'pet-burguer', name: 'Pet Burguer', price: 9.90, category: 'sides', description: 'Hamburguer especial para seu melhor amigo', image: '/images/pet-burguer.png', badges: ['petFriendly'] },
  { id: 'onion-rings', name: 'Onion Rings (8un)', price: 13.90, category: 'sides', description: 'Aneis de cebola empanados', image: null, badges: [] },
  { id: 'bolinha-crispy', name: 'Bolinha Crispy', price: 19.90, category: 'sides', description: 'Bolinhas de queijo crocantes', image: null, badges: [] },
  { id: 'dadinhos-tapioca', name: 'Dadinhos de Tapioca', price: 24.90, category: 'sides', description: 'Dadinhos de tapioca com queijo coalho', image: null, badges: [] },
  { id: 'coxinha', name: 'Coxinha', price: 24.90, category: 'sides', description: 'Coxinha artesanal', image: null, badges: [] },
  { id: 'pasteis-camarao', name: 'Mini Pasteis de Camarao', price: 24.90, category: 'sides', description: 'Mini pasteis recheados com camarao', image: null, badges: [] },
  { id: 'pasteis-brie', name: 'Mini Pasteis de Queijo Brie', price: 24.90, category: 'sides', description: 'Mini pasteis com queijo brie', image: null, badges: [] },
  { id: 'bolinhos-carne-seca', name: 'Bolinhos de Carne Seca', price: 24.90, category: 'sides', description: 'Bolinhos de carne seca', image: null, badges: [] },
  { id: 'mini-churros', name: 'Mini Churros', price: 27.40, category: 'sides', description: 'Mini churros com doce de leite', image: null, badges: [] },
  // Bebidas
  { id: 'agua', name: 'Agua Mineral 500ml', price: 5.50, category: 'drinks', description: '', image: null, badges: [] },
  { id: 'coca-cola', name: 'Coca Cola Lata', price: 7.70, category: 'drinks', description: '', image: null, badges: [] },
  { id: 'sprite', name: 'Sprite Lata', price: 7.70, category: 'drinks', description: '', image: null, badges: [] },
  { id: 'heineken', name: 'Heineken Long Neck', price: 13.00, category: 'drinks', description: '', image: null, badges: [] },
  { id: 'corona', name: 'Corona Long Neck', price: 16.50, category: 'drinks', description: '', image: null, badges: [] },
]

export const images = {
  logo: '/images/logo-usina.png',
  heroBackground: '/images/hero-australiano.jpg',
  bannerFachada: '/images/banner-fachada.jpg',
  fachadaNdmais: '/images/fachada-ndmais.jpg',
  estabelecimentoNdmais: '/images/estabelecimento-ndmais.jpg',
  vegano: '/images/vegano.jpg',
  crispy: '/images/crispy.jpg',
  interior1: '/images/interior-1.jpg',
  costela: '/images/costela.jpg',
}
