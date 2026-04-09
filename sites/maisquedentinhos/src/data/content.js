export const siteData = {
  // Business info
  name: 'Profa. Dra. Marcia Goedert de Oliveira',
  businessName: 'Clinica Goedert e Oliveira Odontologia Integrativa',
  slug: 'maisquedentinhos',
  url: 'https://maisquedentinhos.pages.dev',

  // Contact
  phone: '(47) 98866-1652',
  phoneClean: '5547988661652',
  whatsappLink: 'https://wa.me/5547988661652?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20com%20a%20Profa.%20Dra.%20M%C3%A1rcia.',
  instagram: '@maisquedentinhos',
  instagramUrl: 'https://instagram.com/maisquedentinhos',
  website: 'https://www.odontopedblumenau.com.br',

  // Address
  address: {
    street: 'Rua Hermann Huscher, 113, sala 405',
    neighborhood: 'Vila Formosa',
    city: 'Blumenau',
    state: 'SC',
    zip: '89023-010',
    full: 'Rua Hermann Huscher, 113, sala 405, Vila Formosa, Blumenau, SC 89023-010',
  },

  // Coordinates (Blumenau, Vila Formosa approximate)
  coordinates: {
    lat: -26.9194,
    lng: -49.0661,
  },

  // Google Maps embed
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua+Hermann+Huscher+113+sala+405+Vila+Formosa+Blumenau+SC',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.5!2d-49.0661!3d-26.9194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRua+Hermann+Huscher+113+Blumenau!5e0!3m2!1spt-BR!2sbr',

  // Images
  logo: '/images/logo-maisquedentinhos.png',

  // Services
  services: [
    { key: 'odontopediatria', icon: 'Baby' },
    { key: 'ortodontia', icon: 'Ruler' },
    { key: 'invisalign', icon: 'Sparkles' },
    { key: 'integrativa', icon: 'Heart' },
    { key: 'pcd', icon: 'Accessibility' },
  ],

  // Timeline
  timeline: [
    { key: 'unesp_grad' },
    { key: 'mestrado' },
    { key: 'doutorado' },
    { key: 'furb' },
    { key: 'furbmovel' },
    { key: 'today' },
  ],

  // Counters
  counters: [
    { end: 25, suffix: '+', labelKey: 'counters.years' },
    { end: 500, suffix: '+', labelKey: 'counters.students' },
    { end: 1, suffix: '', labelKey: 'counters.project' },
  ],

  // Nav sections (for smooth scroll)
  navSections: [
    { id: 'about', labelKey: 'nav.about' },
    { id: 'services', labelKey: 'nav.services' },
    { id: 'credentials', labelKey: 'nav.credentials' },
    { id: 'contact', labelKey: 'nav.contact' },
  ],

  // Schema.org
  schema: {
    type: 'Dentist',
    specialties: [
      'Odontopediatria',
      'Ortodontia Preventiva e Interceptiva',
      'Invisalign',
      'Odontologia Integrativa',
      'Atendimento PcD',
    ],
    alumniOf: [
      {
        type: 'CollegeOrUniversity',
        name: 'UNESP - Universidade Estadual Paulista',
        department: 'Faculdade de Odontologia de Araraquara',
      },
    ],
    worksFor: {
      type: 'EducationalOrganization',
      name: 'FURB - Universidade Regional de Blumenau',
      department: 'Departamento de Odontologia',
    },
    knowsAbout: [
      'Odontopediatria',
      'Ortodontia Infantil',
      'Invisalign',
      'Saude Bucal Infantil',
      'Odontologia Integrativa',
      'Atendimento a Pacientes com Deficiencia',
    ],
    qualifications: [
      'Doutorado em Odontopediatria - UNESP Araraquara (2004)',
      'Mestrado em Odontopediatria - UNESP Araraquara (2000)',
      'Graduacao em Odontologia - UNESP Araraquara (1995)',
      'Invisalign Doctor Certificada',
    ],
  },

  // FAQs for schema
  faqs: [
    {
      question: 'A partir de que idade devo levar meu filho ao odontopediatra?',
      answer: 'O ideal e que a primeira consulta aconteca com o nascimento do primeiro dente, por volta dos 6 meses de idade. A Profa. Dra. Marcia faz uma avaliacao completa e orienta os pais sobre higiene, alimentacao e habitos desde cedo.',
    },
    {
      question: 'Qual a diferenca entre um dentista geral e um odontopediatra?',
      answer: 'O odontopediatra tem especializacao no atendimento de criancas e adolescentes, com formacao em psicologia infantil, tecnicas de manejo de comportamento e conhecimento sobre o desenvolvimento da dentadura. A Dra. Marcia possui Doutorado nessa area pela UNESP.',
    },
    {
      question: 'A clinica atende pacientes com necessidades especiais?',
      answer: 'Sim. A Clinica Goedert e Oliveira oferece atendimento humanizado e adaptado para pacientes com deficiencia (PcD), com equipe preparada, ambiente acolhedor e protocolos especificos para cada necessidade.',
    },
    {
      question: 'O que e ortodontia preventiva para criancas?',
      answer: 'A ortodontia preventiva intervem no crescimento dos ossos e dentes da crianca para evitar problemas futuros mais complexos. E mais simples, rapida e confortavel do que o tratamento corretivo na fase adulta. A Dra. Marcia avalia o momento ideal para cada crianca.',
    },
    {
      question: 'A Dra. Marcia trabalha com Invisalign?',
      answer: 'Sim. A Dra. Marcia e Invisalign Doctor certificada e oferece tratamento com alinhadores transparentes para adolescentes e adultos, proporcionando um tratamento discreto e confortavel.',
    },
  ],
}
