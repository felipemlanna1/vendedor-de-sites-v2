import { Helmet } from 'react-helmet-async'
import { siteData, faqs } from '../../data/content'

export default function JsonLd() {
  const restaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: siteData.name,
    description: siteData.description,
    image: siteData.image,
    url: siteData.url,
    telephone: siteData.phone,
    email: siteData.email,
    priceRange: siteData.priceRange,
    servesCuisine: siteData.servesCuisine,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.address.street,
      addressLocality: siteData.address.city,
      addressRegion: siteData.address.state,
      postalCode: siteData.address.zip,
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteData.coordinates.lat,
      longitude: siteData.coordinates.lng,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: siteData.hours.days,
      opens: siteData.hours.opens,
      closes: siteData.hours.closes,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteData.rating.value,
      reviewCount: siteData.rating.count,
      bestRating: 5,
    },
    sameAs: siteData.socialLinks,
    foundingDate: '2015-08-05',
    numberOfEmployees: { '@type': 'QuantitativeValue', value: 24 },
    areaServed: [
      { '@type': 'City', name: 'Florianopolis' },
      { '@type': 'City', name: 'Itapema' },
    ],
    hasMenu: {
      '@type': 'Menu',
      url: 'https://usinadohamburguer.com.br/cardapio',
    },
    acceptsReservations: false,
    paymentAccepted: 'Cash, Credit Card, Debit Card, PIX',
    currenciesAccepted: 'BRL',
  }

  const faqSchema = {
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
      <script type="application/ld+json">{JSON.stringify(restaurant)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  )
}
