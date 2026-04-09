/**
 * Dados estruturados — Dra. Iara Tavares
 * Fonte: briefing ID 27 + mapa de encantamento
 */

export const siteData = {
  // Schema.org
  schemaType: 'Dentist',
  name: 'Dra. Iara Tavares - Harmonização Facial',
  legalName: 'Iara Almeida Tavares',
  description:
    'Cirurgiã-Dentista especialista em Harmonização Facial em Raul Soares, MG. Procedimentos: harmonização facial, botox, preenchimento labial, bioestimuladores, lipo de papada, rinomodelação e otomodelação. CRO-MG 55.104.',
  url: 'https://draiaratavares.com',
  image: '/images/portrait-dra-iara.jpg',

  // Contato
  phone: '',
  whatsapp: '',
  whatsappMessage:
    'Olá Dra. Iara! Gostaria de agendar uma avaliação para harmonização facial.',
  email: '',
  instagram: 'https://www.instagram.com/draiaratavares/',
  instagramHandle: '@draiaratavares',

  // Endereço
  address: {
    street: '',
    city: 'Raul Soares',
    state: 'MG',
    zip: '',
    country: 'BR',
  },

  // Coordenadas (Raul Soares, MG — centro)
  coordinates: {
    lat: -20.1044,
    lng: -42.4522,
  },

  // Horários (estimado — sem dados no briefing)
  hours: null,

  // Redes sociais
  socialLinks: ['https://www.instagram.com/draiaratavares/'],

  // Registro profissional
  professionalRegistration: {
    council: 'CRO-MG',
    number: '55.104',
    name: 'Iara Almeida Tavares',
    specialty: 'Cirurgiã-Dentista / Harmonização Facial',
  },

  // Números para CountUp
  stats: {
    followers: 7517,
    procedures: 500,
    experience: 5,
    satisfaction: 98,
  },

  // Serviços
  services: [
    {
      id: 'harmonizacao',
      icon: 'Sparkles',
      image: '/images/resultado-harmonizacao-1.jpg',
    },
    {
      id: 'botox',
      icon: 'Zap',
      image: null,
    },
    {
      id: 'preenchimento',
      icon: 'Heart',
      image: null,
    },
    {
      id: 'bioestimuladores',
      icon: 'Leaf',
      image: null,
    },
    {
      id: 'lipo_papada',
      icon: 'Scissors',
      image: null,
    },
    {
      id: 'rinomodelacao',
      icon: 'Diamond',
      image: null,
    },
    {
      id: 'otomodelacao',
      icon: 'Star',
      image: '/images/resultado-otomodelacao.jpg',
    },
  ],

  // Resultados / galeria
  gallery: [
    {
      src: '/images/resultado-harmonizacao-1.jpg',
      alt: 'Resultado de harmonização facial - perfil definido',
      procedure: 'Harmonização Facial',
    },
    {
      src: '/images/resultado-harmonizacao-2.jpg',
      alt: 'Resultado de harmonização facial - contornos suaves',
      procedure: 'Harmonização Facial',
    },
    {
      src: '/images/resultado-otomodelacao.jpg',
      alt: 'Resultado de otomodelação - correção de orelhas',
      procedure: 'Otomodelação',
    },
    {
      src: '/images/harmonizacao-noiva.jpg',
      alt: 'Harmonização facial para noiva - dia especial',
      procedure: 'Harmonização para Noivas',
    },
    {
      src: '/images/harmonizacao-perfil.jpg',
      alt: 'Harmonização facial - perfil harmonioso',
      procedure: 'Harmonização Facial',
    },
  ],

  // Imagens hero / about
  images: {
    hero: '/images/iara-elegante.jpg',
    about: '/images/harmonizacao-perfil.jpg',
    og: '/images/iara-elegante.jpg',
  },

  // Concorrentes (para referência SEO)
  competitors: [
    'OdontoCompany Raul Soares',
    'OralDents Raul Soares',
    'COC Clínica Médica e Odontológica',
  ],

  // FAQ específicas
  faqs: [
    {
      question:
        'Quais procedimentos de harmonização facial a Dra. Iara realiza em Raul Soares?',
      answer:
        'A Dra. Iara Tavares realiza harmonização facial completa, toxina botulínica (botox), preenchimento labial, bioestimuladores de colágeno, lipo de papada, rinomodelação e otomodelação. Todos os procedimentos são realizados em Raul Soares, MG.',
    },
    {
      question: 'A Dra. Iara Tavares é registrada no CRO?',
      answer:
        'Sim, a Dra. Iara Almeida Tavares é Cirurgiã-Dentista registrada no CRO-MG sob o número 55.104, habilitada para realizar procedimentos de harmonização facial.',
    },
    {
      question:
        'Como agendar uma avaliação de harmonização facial em Raul Soares?',
      answer:
        'Você pode agendar sua avaliação diretamente pelo WhatsApp ou pelo Instagram @draiaratavares. A Dra. Iara realiza uma avaliação personalizada para indicar os melhores procedimentos para cada caso.',
    },
    {
      question: 'A harmonização facial dói? Como é a recuperação?',
      answer:
        'Os procedimentos são realizados com anestesia local, minimizando o desconforto. A recuperação varia conforme o procedimento: preenchimentos e botox permitem retorno imediato às atividades, enquanto procedimentos como lipo de papada podem requerer alguns dias de repouso.',
    },
    {
      question: 'Qual a diferença entre harmonização facial e preenchimento?',
      answer:
        'O preenchimento labial é um dos procedimentos que compõem a harmonização facial. A harmonização é um conjunto de técnicas que equilibram os traços do rosto como um todo, podendo incluir preenchimento, botox, bioestimuladores e outros procedimentos combinados.',
    },
  ],
}
