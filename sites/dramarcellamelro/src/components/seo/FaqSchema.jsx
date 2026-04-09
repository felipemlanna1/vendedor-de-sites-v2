import { Helmet } from 'react-helmet-async'

const faqs = [
  {
    question: 'O que é odontologia integrativa?',
    answer: 'A odontologia integrativa é uma abordagem que enxerga a saúde bucal como parte de um sistema maior. Em vez de tratar apenas os dentes isoladamente, avaliamos como a boca se conecta com o corpo todo — incluindo aspectos metabólicos, nutricionais e emocionais. No consultório da Dra. Marcella Melro, em Blumenau, cada tratamento considera o paciente como um todo.',
  },
  {
    question: 'Qual a diferença entre um dentista convencional e um dentista integrativo?',
    answer: 'O dentista convencional foca no tratamento pontual do problema dental. Já o dentista integrativo, como a Dra. Marcella Melro, investiga as causas sistêmicas por trás dos sintomas bucais. Uma inflamação na gengiva, por exemplo, pode estar relacionada a questões metabólicas ou nutricionais. Essa abordagem conecta odontologia com medicina, nutrição e psicologia.',
  },
  {
    question: 'A Dra. Marcella Melro atende em Blumenau?',
    answer: 'Sim, a Dra. Marcella Melro atende em Blumenau, Santa Catarina. O agendamento pode ser feito diretamente pelo WhatsApp. O consultório é preparado para oferecer um atendimento acolhedor e individualizado.',
  },
  {
    question: 'Quais serviços são oferecidos na odontologia integrativa?',
    answer: 'A Dra. Marcella Melro oferece avaliação integrativa completa, radiografia panorâmica diagnóstica, tratamento periodontal com abordagem sistêmica, harmonização orofacial, odontopediatria integrativa e acompanhamento preventivo personalizado. Cada serviço é adaptado às necessidades individuais do paciente.',
  },
  {
    question: 'Como agendar uma consulta com a Dra. Marcella Melro?',
    answer: 'O agendamento é simples e rápido: basta enviar uma mensagem pelo WhatsApp. A Dra. Marcella ou sua equipe irão confirmar o melhor horário para você. A primeira consulta é uma avaliação completa onde a doutora escuta suas queixas e analisa sua saúde de forma integrativa.',
  },
]

export default function FaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
