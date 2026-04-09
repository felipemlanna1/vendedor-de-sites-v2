import { useEffect } from 'react'
import { siteData } from '../../data/content'

export default function FaqSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteData.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    script.id = 'jsonld-faq'
    document.head.appendChild(script)
    return () => {
      const existing = document.getElementById('jsonld-faq')
      if (existing) existing.remove()
    }
  }, [])

  return null
}
