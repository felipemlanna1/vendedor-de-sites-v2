// === src/components/seo/JsonLd.jsx ===
// Adapte os campos para os dados reais do briefing
import { Helmet } from 'react-helmet-async'

export default function JsonLd({ data }) {
  // data vem de content.js com todos os dados do briefing
  const schema = {
    '@context': 'https://schema.org',
    '@type': data.schemaType, // ex: 'Physician', 'Restaurant', 'LegalService', 'LocalBusiness'
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    telephone: data.phone,
    email: data.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.address?.street,
      addressLocality: data.address?.city,
      addressRegion: data.address?.state,
      postalCode: data.address?.zip,
      addressCountry: 'BR',
    },
    geo: data.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: data.coordinates.lat,
      longitude: data.coordinates.lng,
    } : undefined,
    openingHoursSpecification: data.hours ? {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: data.hours.days,
      opens: data.hours.opens,
      closes: data.hours.closes,
    } : undefined,
    aggregateRating: data.rating ? {
      '@type': 'AggregateRating',
      ratingValue: data.rating.value,
      reviewCount: data.rating.count,
      bestRating: 5,
    } : undefined,
    sameAs: data.socialLinks, // array of URLs
    // Add more fields based on briefing data:
    // knowsAbout, alumniOf, award, memberOf, hasOfferCatalog, priceRange, areaServed
  }

  // Remove undefined values
  const clean = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(clean)}</script>
    </Helmet>
  )
}

// === src/components/seo/FaqSchema.jsx ===
import { Helmet } from 'react-helmet-async'

export default function FaqSchema({ faqs }) {
  // faqs = [{ question: "...", answer: "..." }, ...]
  // Perguntas DEVEM ser especificas deste cliente, nao genericas
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
