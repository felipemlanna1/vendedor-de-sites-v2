// Dados estruturados — Dra. Milena Grossi Germiniani
// Fonte: briefing vendedor.db ID 36

export const siteData = {
  name: 'Dra. Milena Grossi Germiniani',
  description:
    'Especialista em Harmonização Orofacial, Ortodontia e Invisalign em Ouro Fino, MG. A arte da naturalidade.',
  url: 'https://dramilenagrossigerminiani.pages.dev',
  image: '/images/campanha-selfcare-rosto.jpg',
  phone: '+5535997255631',
  phoneDisplay: '(35) 9 9725-5631',
  whatsappUrl: 'https://wa.me/5535997255631',
  instagram: '@dramilenagrossigerminiani',
  instagramUrl: 'https://www.instagram.com/dramilenagrossigerminiani/',
  cro: 'CRO MG 26.171',

  address: {
    street: 'Rua Prefeito José Serra, 228',
    city: 'Ouro Fino',
    state: 'MG',
    zip: '37570-000',
    full: 'Rua Prefeito José Serra, 228 — Ouro Fino, MG',
    clinic: 'OUROClin',
  },

  coordinates: {
    lat: -22.2831,
    lng: -46.3722,
  },

  socialLinks: [
    'https://www.instagram.com/dramilenagrossigerminiani/',
  ],

  services: [
    'Toxina Botulínica',
    'Preenchimento Facial e Labial',
    'Skinbooster',
    'HIPRO Day',
    'Ultrassom Microfocado',
    'Bioestimuladores de Colágeno',
    'Protocolo BIOreCONEXÃO',
    'Cirurgia HOF',
    'Ortodontia',
    'Ortopedia Funcional dos Maxilares',
    'Invisalign',
    'Invisalign First',
    'Clareamento Dental',
    'Odontopediatria',
    'Bruxismo e DTM',
    'Megatriagem',
  ],

  // Imagens mapeadas por uso
  images: {
    hero: '/images/campanha-selfcare-rosto.jpg',
    heroAlt: '/images/rosto-olhos-verdes-marca.jpg',
    treatmentInvisalign: '/images/invisalign-alinhador-closeup.jpg',
    treatmentAnteDepois: '/images/logo-marble-antes-depois.jpg',
    treatmentToxina: '/images/logo-toxina-botulinica.jpg',
    treatmentHipro: '/images/hipro-day-rosto.jpg',
    about: '/images/atendimento-clinico.jpg',
    legacy: '/images/dr-ademir-grossi-pai.jpg',
  },

  // Tratamentos HOF com detalhes para cards
  treatmentsHof: [
    { key: 'toxina', icon: 'Sparkles', image: '/images/logo-toxina-botulinica.jpg' },
    { key: 'preenchimento', icon: 'Heart' },
    { key: 'skinbooster', icon: 'Droplets' },
    { key: 'hipro', icon: 'Zap', image: '/images/hipro-day-rosto.jpg' },
    { key: 'ultrassom', icon: 'Radio' },
    { key: 'bioestimuladores', icon: 'Leaf' },
    { key: 'bioreconexao', icon: 'Dna' },
    { key: 'cirurgia', icon: 'Scissors' },
  ],

  // Tratamentos Odonto com detalhes para cards
  treatmentsOdonto: [
    { key: 'ortodontia', icon: 'Smile' },
    { key: 'ortopedia', icon: 'Baby' },
    { key: 'invisalign', icon: 'Layers', image: '/images/invisalign-alinhador-closeup.jpg' },
    { key: 'invisalignFirst', icon: 'Star' },
    { key: 'clareamento', icon: 'Sun' },
    { key: 'odontopediatria', icon: 'Heart' },
    { key: 'bruxismo', icon: 'Shield' },
    { key: 'megatriagem', icon: 'Search' },
  ],

  // Diferenciais para bento grid
  differentials: [
    { key: 'dualSpecialty', icon: 'Award', size: 'large' },
    { key: 'invisalignDoctor', icon: 'BadgeCheck', size: 'small' },
    { key: 'twoLocations', icon: 'MapPin', size: 'small' },
    { key: 'familyLegacy', icon: 'Users', size: 'large' },
    { key: 'exclusiveProtocol', icon: 'Dna', size: 'small' },
    { key: 'naturalApproach', icon: 'Flower2', size: 'small' },
  ],

  // Estatisticas para contadores
  stats: {
    procedures: 2500,
    yearsFamily: 30,
    services: 16,
  },

  // Legado familiar
  legacy: {
    father: 'Dr. Ademir Grossi',
    fatherCro: 'CRO MG 19.760',
    fatherImage: '/images/dr-ademir-grossi-pai.jpg',
  },
}

// WhatsApp URLs com mensagens contextuais por CTA
export const whatsappLinks = {
  hero: 'https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Dra.%20Milena.',
  hof: 'https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20harmoniza%C3%A7%C3%A3o%20orofacial.',
  odonto: 'https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20tratamento%20odontol%C3%B3gico.',
  kids: 'https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20infantil.',
  contact: 'https://wa.me/5535997255631?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.',
  float: 'https://wa.me/5535997255631?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20agendar%20uma%20consulta.',
}

// Mapa embed URL (Google Maps)
export const mapEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3706.5!2d-46.3722!3d-22.2831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sOUROClin!5e0!3m2!1spt-BR!2sbr'

// Google Maps directions link
export const directionsUrl =
  'https://www.google.com/maps/dir/?api=1&destination=Rua+Prefeito+Jose+Serra+228+Ouro+Fino+MG'
