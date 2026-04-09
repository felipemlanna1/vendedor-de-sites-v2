export const siteData = {
  name: 'UNA Dermatologia',
  slogan: 'Onde a ciencia ve alem da pele',
  url: 'https://una-dermatologia.pages.dev',
  phone: '(48) 3085-0247',
  phoneLink: 'tel:+554830850247',
  whatsapp: '(48) 98809-2205',
  whatsappLink: 'https://wa.me/message/KJSBZBTXFCVWJ1',
  address: {
    full: 'Ed. Estacao Milano, R. Angelo La Porta, 53 - sala 904, Centro, Florianopolis - SC, 88020-600',
    street: 'R. Angelo La Porta, 53 - sala 904',
    building: 'Ed. Estacao Milano',
    neighborhood: 'Centro',
    city: 'Florianopolis',
    state: 'SC',
    zip: '88020-600',
    reference: 'Ao lado do Patio Milano',
  },
  coordinates: { lat: -27.5954, lng: -48.5480 },
  cnpj: '51.054.141/0001-28',
  socialLinks: [
    'https://www.instagram.com/una.dermatologia/',
    'https://www.instagram.com/arielcordova.dermato/',
    'https://www.facebook.com/people/Cl%C3%ADnica-Una-Dermatologia/61553054652757/',
    'https://www.doctoralia.com.br/ariel-cordova/dermatologista/florianopolis',
  ],
}

export const team = [
  {
    id: 'ariel',
    name: 'Dra. Ariel Cordova Rosa',
    role: 'Responsavel Tecnica',
    specialty: 'Dermatologista',
    crm: 'CRM/SC 23372',
    rqe: 'RQE 18753',
    image: '/images/dra-ariel-cordova.png',
    credentials: [
      'Preceptora Residencia Dermatologia UFSC',
      'Diretora SBD/SC',
      'Doutoranda Ciencias Medicas UFSC',
      'Membro SBD, SBCD, EADV, AAD',
    ],
    formation: 'Medicina UFSC (2016) | Residencia HU-UFSC',
    areas: ['Dermatologia clinica', 'Dermatologia cirurgica', 'Dermatologia estetica', 'Dermatoscopia', 'Ultrassom dermatologico'],
  },
  {
    id: 'anapaula',
    name: 'Dra. Ana Paula Faccin',
    role: 'Dermatologista',
    specialty: 'Dermatologista',
    crm: 'CRM/SC 23371',
    rqe: 'RQE 19229',
    image: '/images/dra-ana-paula-faccin.png',
    credentials: [
      'Titulo de Especialista SBD',
    ],
    formation: 'Medicina UFSC (2016) | Residencia Complexo Hospitalar Padre Bento',
    areas: ['Dermatologia clinica', 'Dermatologia cirurgica', 'Dermatologia estetica'],
  },
  {
    id: 'guilherme',
    name: 'Dr. Guilherme Thome Garcia',
    role: 'Radiologista',
    specialty: 'Radiologista',
    crm: 'CRM/SC 23386',
    rqe: 'RQE 18982',
    image: '/images/dr-guilherme-thome.png',
    credentials: [
      'Subespecializacao em Musculoesqueletico',
    ],
    formation: null,
    areas: ['Ultrassom dermatologico', 'Diagnostico por imagem'],
  },
  {
    id: 'daniela',
    name: 'Daniela Debiasi',
    role: 'Enfermeira',
    specialty: 'Enfermagem',
    crm: null,
    rqe: null,
    image: '/images/daniela-debiasi.jpg',
    credentials: [],
    coren: 'COREN/SC 856.109',
    formation: null,
    areas: ['Procedimentos esteticos', 'Cuidados pos-operatorios'],
  },
]

export const services = [
  {
    id: 'clinica',
    icon: 'Stethoscope',
    items: ['Consultas dermatologicas', 'Diagnostico de doencas de pele', 'Acompanhamento de lesoes', 'Dermatoscopia'],
  },
  {
    id: 'cirurgica',
    icon: 'Scissors',
    items: ['Remocao de tumores cutaneos', 'Cirurgias esteticas menores', 'Biopsia de pele', 'Reconstrucao de lobulo'],
  },
  {
    id: 'estetica',
    icon: 'Sparkles',
    items: ['Acido hialuronico', 'Preenchimentos faciais', 'Lasers', 'Peelings quimicos'],
  },
  {
    id: 'diagnostico',
    icon: 'ScanSearch',
    items: ['Ultrassom dermatologico', 'Dermatoscopia digital', 'Mapeamento de lesoes', 'FotoFinder'],
  },
]

export const ratings = [
  { platform: 'Google', score: 5.0, reviews: null, icon: 'google' },
  { platform: 'Doctoralia', score: 5.0, reviews: 27, icon: 'doctoralia' },
]

export const faqs = [
  {
    question: 'A UNA Dermatologia aceita convenios?',
    answer: 'A clinica atende exclusivamente pacientes particulares, o que permite consultas mais longas e atencao individualizada. O pagamento pode ser feito por transferencia bancaria.',
  },
  {
    question: 'O que e o ultrassom dermatologico?',
    answer: 'E um exame de imagem nao invasivo que permite visualizar as camadas da pele em alta resolucao. Na UNA, contamos com um radiologista especializado (Dr. Guilherme Thome Garcia) para realizar esse exame, algo raro em clinicas dermatologicas.',
  },
  {
    question: 'Quais sao as especialidades da Dra. Ariel Cordova Rosa?',
    answer: 'A Dra. Ariel e especialista em dermatologia clinica, cirurgica e estetica, com foco especial em dermatoscopia e ultrassom dermatologico. Ela e preceptora da residencia em dermatologia da UFSC e Diretora da SBD/SC.',
  },
  {
    question: 'Como agendar uma consulta na UNA Dermatologia?',
    answer: 'Voce pode agendar pelo WhatsApp (48) 98809-2205, pelo telefone (48) 3085-0247 ou pela plataforma Doctoralia. O atendimento e com hora marcada.',
  },
  {
    question: 'Onde fica a UNA Dermatologia?',
    answer: 'A clinica fica no Ed. Estacao Milano, R. Angelo La Porta, 53 - sala 904, Centro de Florianopolis, ao lado do Patio Milano.',
  },
]
