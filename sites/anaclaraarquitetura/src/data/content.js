// Dados estruturados — Ana Clara Arquitetura
// Gerado a partir do briefing (id=21) + imersao + conceito criativo

export const siteData = {
  // Identidade
  name: 'Ana Clara Arquitetura',
  fullName: 'Ana Clara de Souza Pereira',
  profession: 'Arquiteta e Urbanista',
  tagline: 'Arquitetura que nasce da pesquisa',
  city: 'Conselheiro Lafaiete',
  state: 'MG',
  region: 'Alto Paraopeba',

  // Contato
  phone: '31988194100',
  whatsappLink: 'https://wa.me/5531988194100?text=Ol%C3%A1%2C%20Ana%20Clara!%20Gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os%20de%20arquitetura.',
  instagram: 'https://www.instagram.com/anaclaraarquitetura/',
  instagramHandle: '@anaclaraarquitetura',
  linkedin: 'https://www.linkedin.com/in/ana-clara-souza-2a741bb8/',

  // CNPJ
  cnpj: '57.243.413/0001-14',
  razaoSocial: 'ANA CLARA DE SOUZA PEREIRA - ME',
  dataAbertura: '2024-09-11',

  // Formacao academica
  timeline: [
    {
      year: '2015',
      title: 'Arquitetura e Urbanismo',
      institution: 'UFOP',
      description: 'Graduacao em Arquitetura e Urbanismo pela Universidade Federal de Ouro Preto',
    },
    {
      year: '2019',
      title: 'Mestrado em Arquitetura e Urbanismo',
      institution: 'UFV',
      description: 'Dissertacao sobre o espaco intraurbano de Conselheiro Lafaiete (1970-2018)',
    },
    {
      year: '2020',
      title: 'Docencia na UFV',
      institution: 'UFV',
      description: 'Professora substituta no Departamento de Arquitetura e Urbanismo',
    },
    {
      year: '2024',
      title: 'Escritorio proprio',
      institution: 'MEI',
      description: 'Abertura do escritorio como Microempreendedora Individual em Conselheiro Lafaiete',
    },
    {
      year: 'Atual',
      title: 'Doutorado em andamento',
      institution: 'UFV',
      description: 'Doutoranda em Arquitetura e Urbanismo, area de Planejamento Urbano e Regional',
    },
  ],

  // Servicos
  services: [
    {
      id: 'projetos',
      icon: 'Ruler',
      name: 'Projetos Arquitetonicos',
      description:
        'Projetos residenciais e comerciais pensados a partir de pesquisa e analise do contexto urbano, com atencao a funcionalidade, estetica e sustentabilidade.',
    },
    {
      id: 'interiores',
      icon: 'Palette',
      name: 'Design de Interiores',
      description:
        'Ambientes planejados com sensibilidade e rigor tecnico, traduzindo a personalidade de cada cliente em espacos que acolhem e inspiram.',
    },
    {
      id: 'reformas',
      icon: 'Hammer',
      name: 'Reformas',
      description:
        'Acompanhamento tecnico completo de reformas, desde a concepcao ate a execucao, garantindo qualidade e conformidade com as normas.',
    },
    {
      id: 'consultorias',
      icon: 'MessageSquare',
      name: 'Consultorias',
      description:
        'Orientacao tecnica para quem precisa de direcionamento profissional em questoes de arquitetura, urbanismo e legislacao edilicia.',
    },
  ],

  // Diferenciais
  differentials: [
    {
      title: 'Pesquisa urbana de Conselheiro Lafaiete',
      description:
        'Estudou 48 anos de transformacao urbana da cidade (1970-2018). Conhece cada bairro, cada rua, cada contexto.',
      stat: '48',
      statLabel: 'anos de historia urbana estudados',
    },
    {
      title: 'Formacao academica de excelencia',
      description:
        'UFOP, mestrado e doutorado na UFV. Uma das poucas arquitetas da regiao com pesquisa academica ativa.',
      stat: '3',
      statLabel: 'titulacoes em universidades federais',
    },
    {
      title: 'Experiencia em docencia',
      description:
        'Professora substituta na UFV desde 2020. Quem ensina arquitetura, domina cada detalhe do projeto.',
      stat: '4',
      statLabel: 'anos formando novos arquitetos',
    },
    {
      title: 'Atendimento personalizado',
      description:
        'Escritorio proprio com dedicacao exclusiva a cada projeto. Sem producao em serie, cada cliente recebe atencao total.',
      stat: '100',
      statLabel: '% de dedicacao a cada projeto',
    },
  ],

  // Credenciais
  credentials: [
    { label: 'UFOP', type: 'university', description: 'Graduacao em Arquitetura e Urbanismo' },
    { label: 'UFV', type: 'university', description: 'Mestrado + Doutorado em andamento' },
    { label: 'CAU', type: 'registry', description: 'Conselho de Arquitetura e Urbanismo' },
    { label: 'Docente UFV', type: 'teaching', description: 'Professora substituta DAU/UFV' },
    { label: 'MEI Ativa', type: 'business', description: 'CNPJ 57.243.413/0001-14' },
  ],

  // Citacao para micro-secao
  quote: {
    text: 'Projetar para uma cidade que voce estudou por anos e diferente. Cada traco carrega o entendimento de quem essa cidade foi, e e a visao de quem ela pode se tornar.',
    author: 'Ana Clara de Souza Pereira',
    context: 'Sobre projetar em Conselheiro Lafaiete',
  },

  // Dados da cidade (para micro-secao e SEO)
  cityData: {
    name: 'Conselheiro Lafaiete',
    population: '139.000',
    pib: 'R$ 3,1 bilhoes',
    researchPeriod: { start: 1970, end: 2018 },
  },

  // Imagens de portfolio
  portfolioImages: [
    {
      src: '/images/projeto-fachada-moderna.jpg',
      alt: 'Projeto de fachada moderna residencial',
      category: 'Residencial',
      ratio: '3/2',
    },
    {
      src: '/images/projeto-interior-sala.jpg',
      alt: 'Projeto de design de interiores - sala de estar',
      category: 'Interiores',
      ratio: '4/3',
    },
    {
      src: '/images/projeto-cozinha-moderna.jpg',
      alt: 'Projeto de cozinha moderna integrada',
      category: 'Interiores',
      ratio: '3/2',
    },
    {
      src: '/images/projeto-escritorio.jpg',
      alt: 'Projeto de escritorio corporativo',
      category: 'Comercial',
      ratio: '19/10',
    },
    {
      src: '/images/projeto-quarto-minimalista.jpg',
      alt: 'Projeto de quarto minimalista',
      category: 'Interiores',
      ratio: '1/1',
    },
    {
      src: '/images/mesa-trabalho-arquiteta.jpg',
      alt: 'Mesa de trabalho com projetos arquitetonicos',
      category: 'Processo',
      ratio: '3/2',
    },
  ],

  // SEO
  seo: {
    schemaType: 'Architect',
    title: 'Ana Clara Arquitetura | Projetos, Interiores e Reformas em Conselheiro Lafaiete',
    description:
      'Arquiteta e urbanista em Conselheiro Lafaiete/MG. Projetos arquitetonicos, design de interiores, reformas e consultorias. Mestre e doutoranda pela UFV.',
    keywords: [
      'arquiteta conselheiro lafaiete',
      'arquitetura conselheiro lafaiete',
      'projeto arquitetonico lafaiete',
      'design de interiores conselheiro lafaiete',
      'reforma conselheiro lafaiete',
      'arquiteta urbanista mg',
      'ana clara arquitetura',
    ],
    url: 'https://anaclaraarquitetura.pages.dev',
    ogImage: '/images/projeto-fachada-moderna.jpg',
  },

  // FAQs para schema
  faqs: [
    {
      question: 'Quais servicos a Ana Clara Arquitetura oferece em Conselheiro Lafaiete?',
      answer:
        'Oferecemos projetos arquitetonicos residenciais e comerciais, design de interiores, acompanhamento tecnico de reformas e consultorias em arquitetura e urbanismo. Atendemos Conselheiro Lafaiete e toda a regiao do Alto Paraopeba.',
    },
    {
      question: 'Qual a formacao da arquiteta Ana Clara?',
      answer:
        'Ana Clara e graduada em Arquitetura e Urbanismo pela UFOP (2015), mestre em Arquitetura e Urbanismo pela UFV (2019) com dissertacao sobre o espaco urbano de Conselheiro Lafaiete, e atualmente doutoranda pela UFV na area de Planejamento Urbano e Regional.',
    },
    {
      question: 'Como agendar uma consultoria de arquitetura em Conselheiro Lafaiete?',
      answer:
        'Voce pode entrar em contato diretamente pelo WhatsApp (31) 98819-4100 ou pelo Instagram @anaclaraarquitetura. A Ana Clara oferece uma conversa inicial para entender as necessidades do seu projeto.',
    },
    {
      question: 'A Ana Clara Arquitetura atende apenas em Conselheiro Lafaiete?',
      answer:
        'O escritorio e baseado em Conselheiro Lafaiete/MG, mas atende toda a regiao do Alto Paraopeba, incluindo cidades como Ouro Branco, Congonhas, Itabirito e Ouro Preto.',
    },
    {
      question: 'Qual o diferencial da Ana Clara Arquitetura?',
      answer:
        'O principal diferencial e a combinacao de pratica profissional com pesquisa academica. Ana Clara estudou 48 anos de transformacao urbana de Conselheiro Lafaiete em sua dissertacao de mestrado, o que traz uma compreensao unica do contexto da cidade para cada projeto.',
    },
  ],
}
