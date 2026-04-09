import { Helmet } from 'react-helmet-async'

const faqs = [
  {
    question: 'Qual a diferença entre Harmonização Orofacial e procedimentos estéticos convencionais?',
    answer: 'A Harmonização Orofacial (HOF) é uma especialidade odontológica reconhecida pelo CFO que trata a harmonia e o equilíbrio da face. A Dra. Milena Grossi, com dupla especialização em HOF e Ortodontia, integra o conhecimento da estrutura facial e dental para resultados naturais e seguros, diferente de procedimentos puramente estéticos.',
  },
  {
    question: 'A Dra. Milena atende crianças? A partir de que idade?',
    answer: 'Sim! A Dra. Milena é especialista em odontopediatria e oferece o Invisalign First, versão dos alinhadores transparentes desenvolvida especialmente para crianças a partir de 6 anos. O atendimento infantil é acolhedor e lúdico, construindo uma relação positiva com o dentista desde cedo.',
  },
  {
    question: 'O que é o Protocolo BIOreCONEXÃO?',
    answer: 'O BIOreCONEXÃO é um protocolo exclusivo desenvolvido pela Dra. Milena Grossi que integra diferentes técnicas de harmonização orofacial para alcançar resultados sinérgicos e personalizados. Cada protocolo é montado individualmente de acordo com as necessidades e objetivos de cada paciente.',
  },
  {
    question: 'A Dra. Milena atende em São Paulo também?',
    answer: 'Sim, a Dra. Milena atende tanto em Ouro Fino (MG), na OUROClin (Rua Prefeito José Serra, 228), quanto em São Paulo, no bairro Itaim Bibi. Agende sua consulta pelo WhatsApp (35) 9 9725-5631 para verificar disponibilidade em cada localidade.',
  },
  {
    question: 'Qual a vantagem do Invisalign em relação ao aparelho convencional?',
    answer: 'O Invisalign utiliza alinhadores transparentes removíveis, oferecendo maior conforto, discrição e praticidade. A Dra. Milena, como Invisalign Doctor certificada, realiza planejamento 3D digital que permite visualizar o resultado final antes mesmo de iniciar o tratamento.',
  },
  {
    question: 'A Dra. Milena é filha de dentista?',
    answer: 'Sim, a Dra. Milena Grossi Germiniani é herdeira de uma tradição familiar em odontologia. Seu pai, Dr. Ademir Grossi (CRO MG 19.760), dedicou décadas ao cuidado de sorrisos em Ouro Fino. A Dra. Milena dá continuidade a esse legado com especializações modernas em HOF e Ortodontia.',
  },
]

export default function FaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
