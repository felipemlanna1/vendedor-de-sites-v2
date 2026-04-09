export const siteData = {
  schemaType: 'Physician',
  name: 'Dra. Ariel C\u00f3rdova Rosa',
  description: 'Dermatologista em Florian\u00f3polis. Especialista em dermatologia cl\u00ednica, cir\u00fargica e est\u00e9tica. CRM 23372 SC. Pesquisadora e preceptora UFSC.',
  url: 'https://arielcordova-dermato.pages.dev',
  image: '/images/portrait-dra-ariel-instagram.jpg',
  phone: '+5548991232270',
  phoneClinic: '+554830281560',
  whatsapp: '5548991232270',
  email: null,
  address: {
    street: 'Rua Angelo La Porta, 53 - Sala 904',
    city: 'Florian\u00f3polis',
    state: 'SC',
    zip: '88020-600',
    country: 'BR',
  },
  coordinates: {
    lat: -27.588806,
    lng: -48.5467455,
  },
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '13:00' },
  ],
  rating: {
    value: 5.0,
    count: 27,
    platform: 'Doctoralia',
  },
  socialLinks: [
    'https://www.instagram.com/arielcordova.dermato/',
    'https://www.instagram.com/una.dermatologia/',
    'https://www.facebook.com/draarielcordova/',
    'https://www.doctoralia.com.br/ariel-cordova/dermatologista/florianopolis',
  ],
  crm: 'CRM 23372 SC',
  rqe: 'RQE 18753',
  specialties: [
    'Dermatologia Cl\u00ednica',
    'Dermatologia Cir\u00fargica',
    'Dermatologia Est\u00e9tica',
  ],
  knowsAbout: [
    'Melanoma', 'Cirurgia dermatol\u00f3gica', 'Ultrassonografia dermatol\u00f3gica',
    'Microscopia confocal', 'Psor\u00edase', 'C\u00e2ncer de pele', 'Acne',
    'Melasma', 'Toxina botul\u00ednica', 'Preenchedores',
  ],
  alumniOf: [
    { name: 'Universidade Federal de Santa Catarina', degree: 'Medicina', year: 2016 },
    { name: 'Hospital Universit\u00e1rio UFSC', degree: 'Resid\u00eancia em Dermatologia', year: 2019 },
  ],
  memberOf: [
    { name: 'Sociedade Catarinense de Dermatologia (SBD-SC)', role: 'Diretoria' },
  ],
  clinic: {
    name: 'UNA Dermatologia',
    cnpj: '51.054.141/0001-28',
    instagram: '@una.dermatologia',
    instagramUrl: 'https://www.instagram.com/una.dermatologia/',
    followers: 831,
    founded: 2023,
  },
  images: {
    portraitInstagram: '/images/portrait-dra-ariel-instagram.jpg',
    logoUna: '/images/logo-una-dermatologia.jpg',
  },
  faqs: [
    {
      question: 'Quais especialidades a Dra. Ariel C\u00f3rdova atende?',
      answer: 'A Dra. Ariel atua nas tr\u00eas \u00e1reas da dermatologia: cl\u00ednica (acne, psor\u00edase, melanoma, melasma), cir\u00fargica (retirada de tumores, cirurgias de unha) e est\u00e9tica (\u00e1cido hialur\u00f4nico, toxina botul\u00ednica, lasers, peelings).',
    },
    {
      question: 'A Dra. Ariel aceita conv\u00eanio m\u00e9dico?',
      answer: 'N\u00e3o. O atendimento \u00e9 exclusivamente particular, com pagamento via transfer\u00eancia banc\u00e1ria. Consultas por telemedicina tamb\u00e9m est\u00e3o dispon\u00edveis.',
    },
    {
      question: 'Onde fica a cl\u00ednica UNA Dermatologia?',
      answer: 'A UNA Dermatologia fica na Rua Angelo La Porta, 53 - Sala 904, Centro de Florian\u00f3polis/SC. Funcionamento de segunda a sexta das 9h \u00e0s 18h e s\u00e1bados das 9h \u00e0s 13h.',
    },
    {
      question: 'O que \u00e9 o Mapeamento Corporal Total?',
      answer: 'O Mapeamento Corporal Total utiliza o sistema FotoFinder para registrar e acompanhar todas as pintas e les\u00f5es do corpo, fundamental para pacientes com risco de melanoma.',
    },
    {
      question: 'Qual a forma\u00e7\u00e3o da Dra. Ariel?',
      answer: 'Medicina pela UFSC (2016), Resid\u00eancia em Dermatologia no HU-UFSC (2019), mestranda em Ci\u00eancias M\u00e9dicas pela UFSC. CRM 23372 SC, RQE 18753.',
    },
  ],
}

export const navLinks = [
  { key: 'about', href: '#about' },
  { key: 'services', href: '#services' },
  { key: 'technology', href: '#technology' },
  { key: 'clinic', href: '#clinic' },
  { key: 'credentials', href: '#credentials' },
  { key: 'contact', href: '#contact' },
]
