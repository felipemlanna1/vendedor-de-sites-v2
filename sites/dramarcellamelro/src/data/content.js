export const siteData = {
  // Identidade
  name: 'Dra. Marcella Melro',
  alternateName: 'Dra Marcella Melro — Odontologia Integrativa',
  description:
    'Cirurgiã-dentista integrativa em Blumenau. Saúde bucal conectada ao corpo todo — abordagem que une odontologia, medicina, nutrição e psicologia.',
  url: 'https://dramarcellamelro.com.br',
  image: '/images/profile-marcella.jpg',

  // Contato
  phone: '+5548999235973',
  whatsappNumber: '5548999235973',
  whatsappMessage: 'Olá, Dra. Marcella! Gostaria de agendar uma consulta.',
  email: '',
  instagram: '@dramarcellamelro',
  instagramUrl: 'https://www.instagram.com/dramarcellamelro/',

  // Endereço
  address: {
    street: 'Blumenau',
    city: 'Blumenau',
    state: 'SC',
    zip: '89010-000',
  },
  coordinates: {
    lat: -26.9194,
    lng: -49.0661,
  },

  // Horários
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
  ],

  // Redes sociais
  socialLinks: [
    'https://www.instagram.com/dramarcellamelro/',
  ],

  // Especialidades
  knowsAbout: [
    'Odontologia Integrativa',
    'Odontologia Holística',
    'Saúde Bucal Sistêmica',
    'Diagnóstico por Radiografia Panorâmica',
    'Periodontia',
    'Harmonização Orofacial',
    'Odontopediatria Integrativa',
    'Saúde Metabólica e Bucal',
  ],

  // Formação
  alumniOf: 'UNESP — Universidade Estadual Paulista',

  // Associações
  memberOf: [
    'ABM Funcional Integrativa',
    'CRO-SC',
  ],

  // Serviços
  services: [
    {
      id: 'avaliacao',
      name: 'Avaliação Integrativa',
      description: 'Consulta completa onde escutamos o que sua boca está revelando sobre seu corpo. Anamnese detalhada conectando saúde bucal, metabolismo e hábitos de vida.',
      icon: 'Stethoscope',
    },
    {
      id: 'radiografia',
      name: 'Radiografia Panorâmica Diagnóstica',
      description: 'A radiografia panorâmica vai muito além dos dentes. Permite enxergar o organismo como um todo, identificando sinais que outros exames não revelam.',
      icon: 'ScanLine',
    },
    {
      id: 'periodontal',
      name: 'Tratamento Periodontal Sistêmico',
      description: 'Gengiva saudável não sangra. Tratamos a doença periodontal investigando causas sistêmicas — inflamação, nutrição, metabolismo — não apenas os sintomas locais.',
      icon: 'HeartPulse',
    },
    {
      id: 'harmonizacao',
      name: 'Harmonização Orofacial',
      description: 'Equilíbrio e naturalidade. Procedimentos que respeitam a harmonia do rosto, sem exageros, com olhar integrativo sobre a saúde como um todo.',
      icon: 'Sparkles',
    },
    {
      id: 'odontopediatria',
      name: 'Odontopediatria Integrativa',
      description: 'Cuidado acolhedor para os pequenos, desde o nascimento. Orientação para pais sobre alimentação, respiração e hábitos que constroem saúde bucal para a vida toda.',
      icon: 'Baby',
    },
    {
      id: 'preventivo',
      name: 'Acompanhamento Preventivo',
      description: 'Prevenção individualizada com foco em manter o equilíbrio do organismo. Limpezas periódicas, orientação nutricional e monitoramento contínuo.',
      icon: 'ShieldCheck',
    },
  ],

  // Diferenciais
  differentials: [
    { number: 10, suffix: '+', label: 'Anos de odontologia integrativa' },
    { number: 1691, suffix: '', label: 'Seguidores no Instagram' },
    { number: 6, suffix: '', label: 'Especialidades integradas' },
  ],

  // Imagens do Instagram para o feed
  instagramPosts: [
    { src: '/images/post-radiografia-panoramica.jpg', alt: 'Radiografia panorâmica — diagnóstico integrativo' },
    { src: '/images/post-congresso-posicionamento.jpg', alt: 'Dra. Marcella no stand Philozon Ozoncare' },
    { src: '/images/post-sorriso-saude-todo.jpg', alt: 'Por que pedir exames laboratoriais na odontologia' },
    { src: '/images/post-gengiva-saudavel.jpg', alt: 'O ciclo da gengivite — conteúdo educativo' },
  ],

  // Navegação
  navItems: [
    { id: 'hero', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'differentials', labelKey: 'nav.differentials' },
    { id: 'instagram', labelKey: 'nav.instagram' },
    { id: 'contact', labelKey: 'nav.contact' },
  ],
}
