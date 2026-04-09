// Dados estruturados — Dra. Patrícia Ribeiro
// Todos os dados reais do briefing, organizados para componentes e SEO

export const siteData = {
  // Identidade
  name: 'Dra. Patrícia Ribeiro',
  fullName: 'Dra. Patrícia Ribeiro — Endodontista',
  slogan: 'Trato sua dor e devolvo saúde',
  description: 'Endodontista especialista em tratamento de canal sem dor em Santa Rita do Sapucaí, MG. Mais de 1000 pacientes atendidos.',
  url: 'https://drapatriciaribeiro.com.br',

  // Schema.org
  schemaType: 'Dentist',
  additionalTypes: ['MedicalBusiness', 'LocalBusiness'],

  // Contato
  whatsappNumber: '5535999999999', // placeholder — será atualizado com número real
  whatsappUrl: 'https://wa.me/5535999999999?text=Ol%C3%A1%20Dra.%20Patr%C3%ADcia%2C%20gostaria%20de%20agendar%20uma%20consulta.',
  instagram: 'https://www.instagram.com/dra.patricia.ribeiro/',
  instagramHandle: '@dra.patricia.ribeiro',

  // Localização
  address: {
    city: 'Santa Rita do Sapucaí',
    state: 'MG',
    country: 'BR',
    region: 'Sul de Minas Gerais',
  },
  coordinates: {
    lat: -22.2539,
    lng: -45.7033,
  },

  // Credenciais
  cro: 'CRO 56979/MG',
  specialty: 'Endodontia',

  // Números de impacto
  stats: {
    patients: 1000,
    yearsExperience: 10,
    croNumber: 56979,
  },

  // Imagens
  images: {
    hero: '/images/endodontia-explicacao.jpg',
    about: '/images/endodontia-explicacao.jpg',
    specialty: '/images/restauracao-canal.jpg',
    contact: '/images/consultorio.jpg',
  },

  // Social links (para schema.org sameAs)
  socialLinks: [
    'https://www.instagram.com/dra.patricia.ribeiro/',
  ],

  // Serviços oferecidos
  services: [
    {
      id: 'canal',
      name: 'Tratamento de canal',
      nameEn: 'Root canal treatment',
    },
    {
      id: 'retratamento',
      name: 'Retratamento endodôntico',
      nameEn: 'Endodontic retreatment',
    },
    {
      id: 'cirurgia',
      name: 'Cirurgia endodôntica',
      nameEn: 'Endodontic surgery',
    },
    {
      id: 'urgencia',
      name: 'Urgências dentárias',
      nameEn: 'Dental emergencies',
    },
    {
      id: 'restauracao',
      name: 'Restauração pós-canal',
      nameEn: 'Post-canal restoration',
    },
  ],

  // FAQ (para schema.org)
  faqs: [
    {
      question: 'Tratamento de canal dói?',
      answer: 'Não. Com as técnicas modernas e anestesia adequada, o tratamento de canal é indolor. A maioria dos pacientes relata que é mais confortável do que imaginavam.',
    },
    {
      question: 'Quanto tempo dura o tratamento?',
      answer: 'A maioria dos tratamentos de canal é concluída em uma única sessão de 40 a 90 minutos. Casos mais complexos podem precisar de duas sessões.',
    },
    {
      question: 'Quando sei que preciso de um canal?',
      answer: 'Os sinais mais comuns são: dor pulsante ou constante, sensibilidade prolongada ao quente ou frio, dor ao mastigar, inchaço na gengiva e escurecimento do dente.',
    },
    {
      question: 'É melhor fazer canal ou arrancar o dente?',
      answer: 'Sempre que possível, salvar o dente natural é a melhor opção. Um dente tratado com canal pode durar a vida toda com os cuidados adequados.',
    },
    {
      question: 'A Dra. Patrícia atende urgências?',
      answer: 'Sim. Entre em contato pelo WhatsApp e faremos o possível para atender você o mais rápido possível, priorizando casos de dor aguda e infecções.',
    },
    {
      question: 'Onde fica o consultório?',
      answer: 'Atendo em Santa Rita do Sapucaí, MG. Para o endereço exato e agendamento, entre em contato pelo WhatsApp.',
    },
  ],

  // Navegação
  navLinks: [
    { id: 'hero', label: 'home' },
    { id: 'about', label: 'about' },
    { id: 'specialty', label: 'specialty' },
    { id: 'treatments', label: 'treatments' },
    { id: 'numbers', label: 'numbers' },
    { id: 'faq', label: 'faq' },
    { id: 'contact', label: 'contact' },
  ],
}
