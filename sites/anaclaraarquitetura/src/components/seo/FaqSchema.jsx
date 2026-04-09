import { useEffect } from 'react'
import { siteData } from '../../data/content'

export default function FaqSchema() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: siteData.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    }

    const existing = document.querySelector('script[data-schema="faq"]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'faq')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const el = document.querySelector('script[data-schema="faq"]')
      if (el) el.remove()
    }
  }, [])

  return null
}
