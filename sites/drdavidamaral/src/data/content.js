// Dados estruturados do Dr. David Amaral — derivados do briefing
// Usados por JsonLd.jsx, FaqSchema.jsx e componentes de seção

export const doctorData = {
  name: 'Dr. David Amaral',
  fullName: 'David Antonio Ferreira Amaral',
  schemaType: 'Physician',
  specialty: 'Ortopedia e Traumatologia',
  description:
    'Ortopedista e traumatologista em Lagoa da Prata e Arcos/MG. Procedimentos guiados por ultrassom, infiltrações, viscossuplementação e cirurgia de fraturas.',
  url: 'https://drdavidamaral.com.br',
  image: '/images/profile-pic.jpg',
  crm: '68037',
  rqe: '44243',
  crmState: 'MG',
  whatsappUrl: 'https://wa.me/message/JRYVYA4DDXJPF1',
  instagram: 'https://www.instagram.com/drdavidamaral/',
  socialLinks: ['https://www.instagram.com/drdavidamaral/'],
  platforms: [
    {
      id: 'doctoralia',
      name: 'Doctoralia',
      url: 'https://www.doctoralia.com.br/david-antonio-ferreira-amaral/ortopedista-traumatologista/lagoa-da-prata',
      icon: 'ExternalLink',
    },
    {
      id: 'boaconsulta',
      name: 'BoaConsulta',
      url: 'https://www.boaconsulta.com/especialista/david-antonio-ferreira-amaral-6105a7a8ba32c31b820014b5',
      icon: 'ExternalLink',
    },
    {
      id: 'catalogomed',
      name: 'CatálogoMed',
      url: 'https://www.catalogo.med.br/doutor/david-antonio-ferreira-amaral-2533665.htm',
      icon: 'ExternalLink',
    },
  ],
}

export const locations = [
  {
    id: 'lagoa',
    name: 'Lagoa da Prata',
    type: 'Centro Médico',
    address: {
      street: 'Av. Getúlio Vargas, 997',
      city: 'Lagoa da Prata',
      state: 'MG',
      zip: '35590-000',
      country: 'BR',
    },
    coordinates: {
      lat: -20.0241,
      lng: -45.5436,
    },
  },
  {
    id: 'arcos',
    name: 'Arcos',
    type: 'Clínica — Cemear',
    address: {
      street: 'Rua Arcos S/N, Centro',
      city: 'Arcos',
      state: 'MG',
      zip: '35588-000',
      country: 'BR',
    },
    coordinates: {
      lat: -20.2861,
      lng: -45.5388,
    },
  },
]

export const services = [
  {
    id: 'consulta',
    icon: 'Stethoscope',
    ultrasoundScan: false,
  },
  {
    id: 'infiltracao',
    icon: 'Syringe',
    ultrasoundScan: true,
  },
  {
    id: 'viscossuplementacao',
    icon: 'Droplets',
    ultrasoundScan: true,
  },
  {
    id: 'artrocentese',
    icon: 'Target',
    ultrasoundScan: true,
  },
  {
    id: 'densitometria',
    icon: 'Bone',
    ultrasoundScan: false,
  },
  {
    id: 'cirurgia',
    icon: 'Scissors',
    ultrasoundScan: false,
  },
]

export const counters = [
  { key: 'experiencia', end: 10, suffix: '+' },
  { key: 'procedimentos', end: 5000, suffix: '+' },
  { key: 'pacientes', end: 8000, suffix: '+' },
]

export const images = {
  hero: '/images/profile-pic.jpg',
  sobre: '/images/ig-post-consultorio.png',
  servicos: '/images/ig-post-cirurgia.png',
  tecnologia: '/images/ig-post-ultrassom.png',
}

export const faqs = [
  {
    question: 'Quais tipos de infiltração o Dr. David Amaral realiza?',
    answer:
      'O Dr. David Amaral realiza infiltrações articulares e periarticulares guiadas por ultrassom, incluindo corticosteroides, ácido hialurônico (viscossuplementação) e anestésicos. O procedimento guiado por ultrassom garante precisão milimétrica e maior segurança.',
  },
  {
    question: 'O que é viscossuplementação e para que serve?',
    answer:
      'A viscossuplementação é um tratamento para artrose que consiste na aplicação de ácido hialurônico diretamente na articulação. Isso restaura a lubrificação natural, reduz a dor e melhora a mobilidade. É especialmente indicada para joelhos, quadris e ombros.',
  },
  {
    question: 'Qual a vantagem de procedimentos guiados por ultrassom?',
    answer:
      'Procedimentos guiados por ultrassom permitem que o médico visualize em tempo real a estrutura a ser tratada, garantindo que a medicação chegue exatamente ao local correto. Isso aumenta a eficácia do tratamento, reduz riscos e diminui o desconforto do paciente.',
  },
  {
    question: 'O Dr. David Amaral atende por convênio?',
    answer:
      'Atualmente, o Dr. David Amaral atende exclusivamente pacientes particulares, oferecendo atenção personalizada e tempo adequado para cada consulta e procedimento.',
  },
  {
    question: 'Em quais cidades o Dr. David Amaral atende?',
    answer:
      'O Dr. David Amaral atende em duas unidades: em Lagoa da Prata/MG, na Av. Getúlio Vargas 997, e em Arcos/MG, no Cemear. Agende sua consulta pelo WhatsApp para escolher a unidade mais conveniente.',
  },
  {
    question: 'Como agendar uma consulta com o Dr. David Amaral?',
    answer:
      'O agendamento pode ser feito diretamente pelo WhatsApp. Basta clicar no botão de agendamento no site e enviar uma mensagem. A equipe retornará com os horários disponíveis na unidade de sua preferência.',
  },
]
