// Dados estruturados — A Fada do Dente (Dra. Bianca R. Samartin)
// Fonte: briefing #29, enrichment, Instagram @_afadadodente

export const business = {
  name: 'A Fada do Dente',
  legalName: 'Dra. Bianca Ribas Samartin',
  tagline: 'Odontopediatria com encantamento',
  schemaType: 'Dentist',
  cro: 'MG 63888',
  niche: 'Odontopediatria',
  url: 'https://afadadodente.pages.dev',
  phone: '', // WhatsApp only
  email: '',
  whatsapp: '5534999999999', // placeholder — sera atualizado com numero real
  whatsappMessage: 'Olá! Gostaria de agendar uma consulta com a Fada do Dente.',
}

export const address = {
  region: 'Triângulo Mineiro',
  city: '', // nao especificada no briefing
  state: 'MG',
  country: 'BR',
}

export const professional = {
  fullName: 'Bianca Ribas Samartin',
  displayName: 'Dra. Bianca R. Samartin',
  cro: 'MG 63888',
  council: 'CRO-MG',
  specialty: 'Odontopediatria',
  university: 'Universidade de Uberaba (UNIUBE)',
  course: 'Odontologia',
  tccTitle: 'Cárie Precoce de Infância - Revisão de Literatura',
  tccYear: 2022,
}

export const social = {
  instagram: 'https://www.instagram.com/_afadadodente/',
  instagramHandle: '@_afadadodente',
}

export const images = {
  hero: '/images/dra-bianca-profissional-2.jpg',
  about: '/images/dra-bianca-consultorio.jpg',
  aboutAlt: '/images/dra-bianca-profissional-1.jpg',
  services: '/images/dra-bianca-uniforme-consultorio.jpg',
  differentials: '/images/dra-bianca-profissional-1.jpg',
  contact: '/images/clinica-recepcao.jpg',
  og: '/images/og-afadadodente.jpg',
}

export const services = [
  {
    key: 'firstVisit',
    icon: 'wand',
  },
  {
    key: 'prevention',
    icon: 'sparkles',
  },
  {
    key: 'treatment',
    icon: 'crown',
  },
  {
    key: 'emergency',
    icon: 'moonstar',
  },
]

export const counters = [
  { key: 'smiles', prefix: '+' },
  { key: 'experience', suffix: '' },
  { key: 'families', prefix: '+' },
  { key: 'rating', suffix: '/5' },
]

export const differentials = [
  { key: 'playful', icon: 'sparkles' },
  { key: 'fearless', icon: 'wand' },
  { key: 'specialized', icon: 'crown' },
  { key: 'location', icon: 'moonstar' },
  { key: 'cro', icon: 'badge' },
  { key: 'humanized', icon: 'star' },
]

export const testimonials = ['t1', 't2', 't3', 't4', 't5', 't6']

export const navLinks = [
  { key: 'about', href: '#sobre' },
  { key: 'services', href: '#servicos' },
  { key: 'differentials', href: '#diferenciais' },
  { key: 'testimonials', href: '#depoimentos' },
  { key: 'contact', href: '#contato' },
]

export const faqs = [
  {
    question: 'A partir de que idade posso levar meu filho ao odontopediatra?',
    answer: 'A primeira visita ao odontopediatra é recomendada a partir do nascimento do primeiro dente, geralmente por volta dos 6 meses de idade. Na Fada do Dente, a Dra. Bianca acolhe bebês desde os primeiros meses para orientação preventiva.',
  },
  {
    question: 'Como funciona a primeira consulta na Fada do Dente?',
    answer: 'A primeira visita mágica é focada em adaptação: a criança conhece o consultório encantado, os instrumentos de forma lúdica, e cria vínculo com a Dra. Bianca. Não há procedimento invasivo — é um momento de confiança e acolhimento.',
  },
  {
    question: 'Meu filho tem medo de dentista. A Dra. Bianca consegue atender?',
    answer: 'Sim! A Dra. Bianca é especialista em técnicas de manejo comportamental infantil. O ambiente lúdico da Fada do Dente e a abordagem acolhedora transformam o medo em curiosidade e confiança. Muitas crianças que tinham pavor passam a pedir para voltar.',
  },
  {
    question: 'A Fada do Dente atende urgências odontológicas infantis?',
    answer: 'Sim. A Dra. Bianca atende urgências como traumas dentários, dores e infecções em crianças. Entre em contato pelo WhatsApp para atendimento prioritário.',
  },
  {
    question: 'Onde fica o consultório da Fada do Dente?',
    answer: 'A Fada do Dente atende na região do Triângulo Mineiro, em Minas Gerais. Entre em contato pelo WhatsApp para saber o endereço completo e agendar sua visita mágica.',
  },
  {
    question: 'Qual a formação da Dra. Bianca?',
    answer: 'A Dra. Bianca Ribas Samartin é formada em Odontologia pela Universidade de Uberaba (UNIUBE), com especialização em Odontopediatria. CRO MG 63888.',
  },
]

// Schema.org data for JsonLd component
export const schemaData = {
  schemaType: 'Dentist',
  name: business.name,
  legalName: professional.fullName,
  description: 'Odontopediatria com encantamento no Triângulo Mineiro. A Dra. Bianca transforma o medo do dentista em uma aventura mágica para o seu filho.',
  image: images.og,
  url: business.url,
  phone: business.phone,
  address: {
    region: address.region,
    state: address.state,
    country: address.country,
  },
  socialLinks: [social.instagram],
  knowsAbout: [
    'Odontopediatria',
    'Cárie precoce de infância',
    'Prevenção dental infantil',
    'Manejo comportamental infantil',
    'Trauma dentário em crianças',
  ],
  alumniOf: {
    name: professional.university,
    course: professional.course,
  },
  hasCredential: {
    council: professional.council,
    number: professional.cro,
    specialty: professional.specialty,
  },
}
