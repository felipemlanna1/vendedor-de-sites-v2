import { useEffect } from 'react'
import { faqs } from '../../data/content'

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

  useEffect(() => {
    const existingScript = document.querySelector('script[data-jsonld="faq"]')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', 'faq')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => script.remove()
  }, [])

  return null
}
