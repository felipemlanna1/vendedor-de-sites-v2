const faqs = [
  {
    question: 'Qual o horario de funcionamento da Usina do Hamburguer?',
    answer: 'Todas as unidades funcionam diariamente das 17:30 a 00:00.',
  },
  {
    question: 'A Usina do Hamburguer tem opcoes veganas?',
    answer: 'Sim! Temos o Hamburguer Vegano (pao de banana, hamburguer de feijao, requeijao de castanha) por R$30,90 e o Vegetariano (pao australiano, tofu defumado, provolone) por R$33,90.',
  },
  {
    question: 'O que e o R$1 por hamburguer doado?',
    answer: 'A cada hamburguer vendido, R$1 e doado para causas socioambientais na Grande Florianopolis. Desde 2015 ja doamos mais de R$200 mil.',
  },
  {
    question: 'Quantas unidades a Usina do Hamburguer tem?',
    answer: 'Temos 4 unidades: Trindade, Centro e Rio Tavares em Florianopolis, e Itapema (Pier o Porto).',
  },
  {
    question: 'A Usina do Hamburguer aceita pets?',
    answer: 'Sim, somos pet-friendly! Inclusive temos o Pet Burguer, um hamburguer especial feito para caes, por R$9,90.',
  },
  {
    question: 'Como pedir delivery da Usina do Hamburguer?',
    answer: 'Voce pode pedir pelo iFood, Rappi, Anota Ai ou WhatsApp. Estamos disponiveis nas principais plataformas de delivery.',
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
