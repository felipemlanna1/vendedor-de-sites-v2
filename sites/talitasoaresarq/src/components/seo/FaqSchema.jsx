const faqs = [
  {
    question: 'Quanto custa um projeto de arquitetura de interiores em Florianopolis?',
    answer: 'O valor varia conforme a complexidade e metragem do projeto. Agende uma conversa para receber um orcamento personalizado, sem compromisso.',
  },
  {
    question: 'Qual a area de atendimento da Talita Soares Arquitetura?',
    answer: 'Atendemos Florianopolis presencialmente e todo o Brasil de forma remota.',
  },
  {
    question: 'Preciso contratar um arquiteto para reformar meu apartamento?',
    answer: 'Um arquiteto garante que cada detalhe seja pensado com funcionalidade e estetica, evitando erros que custam caro. O investimento em projeto se paga na economia de obra.',
  },
  {
    question: 'Quanto tempo leva um projeto de interiores?',
    answer: 'Projetos residenciais completos levam em media de 30 a 90 dias, dependendo da complexidade.',
  },
  {
    question: 'A Talita Soares faz consultoria de interiores online?',
    answer: 'Sim, oferecemos sessoes de consultoria para quem precisa de orientacao profissional sobre layout, cores, iluminacao e materiais.',
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
