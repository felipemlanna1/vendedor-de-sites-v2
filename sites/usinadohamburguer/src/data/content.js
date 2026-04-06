export const siteData = {
  name: 'Usina do Hamburguer',
  schemaType: 'Restaurant',
  description: 'Hamburgueria artesanal em Florianopolis. A cada hamburguer vendido, R$1 e doado para causas socioambientais. 4 unidades, mais de R$200 mil doados desde 2015.',
  url: 'https://usinadohamburguer.com.br',
  image: '/images/hero-australiano-tripadvisor.jpg',
  phone: '(48) 3371-8633',
  email: 'contato@usinadohamburguer.com.br',
  address: {
    street: 'R. Prof. Bento Aguido Vieira, 20',
    neighborhood: 'Trindade',
    city: 'Florianopolis',
    state: 'SC',
    zip: '88036-410',
  },
  coordinates: { lat: -27.589725, lng: -48.521947 },
  hours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '17:30',
    closes: '00:00',
  },
  rating: { value: 4.9, count: 597, platform: 'iFood' },
  socialLinks: [
    'https://www.instagram.com/usinadohamburguer/',
    'https://www.facebook.com/usinadohamburguerdelivery/',
    'https://www.tiktok.com/@usinadohamburguer_',
    'https://br.linkedin.com/company/usina-do-hamburguer',
  ],
  priceRange: '$$',
  servesCuisine: ['Hamburguer artesanal', 'Fast food gourmet', 'Vegano', 'Vegetariano'],
  cnpj: '23.003.410/0001-91',
  foundedYear: 2015,
}

export const deliveryLinks = {
  ifood: 'https://www.ifood.com.br/delivery/florianopolis-sc/usina-do-hamburguer---trindade-trindade/c32722d8-6ab1-4400-85af-31e5edeb4c9b',
  ifood_centro: 'https://www.ifood.com.br/delivery/florianopolis-sc/usina-do-hamburguer---centro-centro/adf29753-2238-46f2-aabb-4a1ff2ccf0e0',
  rappi: 'https://www.rappi.com.br/restaurantes/900645689-usina-do-hamburguer-trindade',
  anotaai: 'https://pedido.anota.ai/loja/usina-do-hamburguer-centro-1',
  goomer: 'https://www.goomer.app/usina',
  whatsapp: 'https://wa.me/554896300080',
}

export const impactNumbers = {
  donated: 200000,
  years: 11,
  locations: 4,
  reviews: 8500,
}

export const menuHighlights = [
  { name: 'Classico', price: 'R$ 28,90', desc: 'Pao brioche, 100g Black Angus, queijo cheddar, bacon crocante, maionese da casa', image: '/images/classico-rappi.png' },
  { name: 'Australiano', price: 'R$ 32,90', desc: 'Pao brioche, 100g Black Angus, queijo provolone, cebola caramelizada, molho gorgonzola', image: '/images/australiano-rappi.png' },
  { name: 'Ultra Smash', price: 'R$ 23,90', desc: '2 discos fininhos de 50g, american cheese, ketchup, mostarda, cebola, picles', image: '/images/ultra-smash-rappi.png' },
  { name: 'Vegano', price: 'R$ 28,90', desc: 'Pao de batata-doce, hamburguer de feijao, queijo de castanha, couve crispy, alface, tomate', image: '/images/vegano-rappi.png' },
  { name: '4 Queijos', price: 'R$ 32,90', desc: 'Pao brioche, 100g Black Angus, cheddar, provolone, mussarela, molho gorgonzola', image: '/images/quatro-queijos-rappi.png' },
  { name: 'Smash Duplo', price: 'R$ 29,90', desc: '4 discos fininhos de 50g, cheddar, bacon crocante, maionese da casa', image: '/images/smash-duplo-bacon-rappi.png' },
]

export const fullMenu = {
  combos: [
    { name: 'Combo Individual', price: 'R$ 35,90', desc: 'Hamburguer + fritas individual + refri lata', image: '/images/combo-individual-rappi.png' },
    { name: 'Combo Duplo', price: 'R$ 71,80', desc: '2 hamburgueres + 2 fritas + 2 refris', image: '/images/combo-duplo-rappi.png' },
  ],
  hamburgueres: [
    { name: 'Classico', price: 'R$ 28,90', desc: 'Pao brioche, 100g Black Angus, queijo cheddar, bacon, maionese da casa' },
    { name: 'Australiano', price: 'R$ 32,90', desc: 'Pao brioche, 100g Black Angus, provolone, cebola caramelizada, molho gorgonzola' },
    { name: '4 Queijos', price: 'R$ 32,90', desc: 'Pao brioche, 100g Black Angus, cheddar, provolone, mussarela, molho gorgonzola' },
    { name: 'Costela', price: 'R$ 34,90', desc: 'Pao brioche, 100g Black Angus, costela desfiada, barbecue, onion rings' },
    { name: 'Bacon & Egg', price: 'R$ 30,90', desc: 'Pao brioche, 100g Black Angus, cheddar, bacon, ovo, maionese da casa' },
  ],
  smash: [
    { name: 'Ultra Smash', price: 'R$ 23,90', desc: '2 discos de 50g, american cheese, ketchup, mostarda, cebola, picles' },
    { name: 'Smash', price: 'R$ 23,90', desc: '2 discos de 50g, cheddar, maionese da casa, alface' },
    { name: 'Smash Duplo c/ Bacon', price: 'R$ 29,90', desc: '4 discos de 50g, cheddar, bacon, maionese da casa' },
  ],
  veggie: [
    { name: 'Vegetariano', price: 'R$ 26,90', desc: 'Pao de batata-doce, hamburguer de feijao, queijo coalho, alface, tomate' },
    { name: 'Vegano', price: 'R$ 28,90', desc: 'Pao de batata-doce, hamburguer de feijao, queijo de castanha, couve crispy' },
  ],
  porcoes: [
    { name: 'Batata Frita Individual', price: 'R$ 8,90', desc: '' },
    { name: 'Batata Rustica Individual', price: 'R$ 9,90', desc: '' },
    { name: 'Bolinha Crispy (6un)', price: 'R$ 14,90', desc: 'Bolinhas crocantes de queijo' },
    { name: 'Onion Rings (8un)', price: 'R$ 12,90', desc: 'Aneis de cebola empanados' },
  ],
  bebidas: [
    { name: 'Agua Mineral 500ml', price: 'R$ 5,50', desc: '' },
    { name: 'Coca Cola Lata', price: 'R$ 7,70', desc: '' },
    { name: 'Sprite Lata', price: 'R$ 7,70', desc: '' },
    { name: 'Heineken Zero Alcool', price: 'R$ 12,90', desc: '' },
  ],
  pet: [
    { name: 'Pet Burguer', price: 'R$ 9,90', desc: 'Hamburguer especial para caes' },
  ],
}

export const locations = [
  {
    id: 'trindade',
    name: 'Trindade',
    address: 'R. Prof. Bento Aguido Vieira, 20 - Trindade',
    city: 'Florianopolis/SC',
    since: 2015,
    coordinates: { lat: -27.589725, lng: -48.521947 },
    ifood: deliveryLinks.ifood,
    rappi: deliveryLinks.rappi,
    maps: 'https://maps.google.com/?q=-27.589725,-48.521947',
  },
  {
    id: 'centro',
    name: 'Centro',
    address: 'Av. Hercilio Luz, 633, Loja 05 - Centro',
    city: 'Florianopolis/SC',
    since: 2022,
    coordinates: { lat: -27.5945, lng: -48.5482 },
    ifood: deliveryLinks.ifood_centro,
    anotaai: deliveryLinks.anotaai,
    maps: 'https://maps.google.com/?q=-27.5945,-48.5482',
  },
  {
    id: 'rio_tavares',
    name: 'Rio Tavares',
    address: 'Rio Tavares',
    city: 'Florianopolis/SC',
    since: null,
    coordinates: null,
    maps: 'https://maps.google.com/?q=Usina+do+Hamburguer+Rio+Tavares+Florianopolis',
  },
  {
    id: 'itapema',
    name: 'Itapema',
    address: 'Pier o Porto',
    city: 'Itapema/SC',
    since: null,
    coordinates: null,
    maps: 'https://maps.google.com/?q=Usina+do+Hamburguer+Itapema',
  },
]

export const faqs = [
  {
    question: 'A Usina do Hamburguer faz delivery?',
    answer: 'Sim! Estamos no iFood, Rappi, Anota Ai e Goomer. Voce tambem pode pedir pelo WhatsApp.',
  },
  {
    question: 'Qual o horario de funcionamento?',
    answer: 'Todas as unidades funcionam diariamente das 17h30 a meia-noite.',
  },
  {
    question: 'Tem opcao vegana ou vegetariana?',
    answer: 'Sim! Temos o hamburguer Vegetariano (R$26,90) e o Vegano (R$28,90), ambos com pao de batata-doce e hamburguer de feijao.',
  },
  {
    question: 'O que e a causa social da Usina?',
    answer: 'A cada hamburguer vendido, R$1 e doado para causas socioambientais. Ja doamos mais de R$200 mil em parceria com o ICOM Floripa.',
  },
  {
    question: 'Posso levar meu pet?',
    answer: 'Claro! Somos pet-friendly e temos ate o Pet Burguer (R$9,90), um hamburguer especial para o seu cachorro.',
  },
  {
    question: 'Quantas unidades a Usina tem?',
    answer: 'Temos 4 unidades: Trindade e Centro em Florianopolis, Rio Tavares em Florianopolis e Itapema (Pier o Porto).',
  },
]
