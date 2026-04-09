import { Helmet } from 'react-helmet-async'
import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteData.name,
    alternateName: siteData.alternateName,
    description: siteData.description,
    url: siteData.url,
    telephone: siteData.phone,
    image: siteData.image,
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
    openingHoursSpecification: siteData.hours.map(h => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: siteData.socialLinks,
    knowsAbout: siteData.knowsAbout,
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: siteData.alumniOf,
    },
    memberOf: siteData.memberOf.map(org => ({
      '@type': 'Organization',
      name: org,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Odontologia Integrativa',
      itemListElement: siteData.services.map((service, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service.name,
          description: service.description,
        },
        position: i + 1,
      })),
    },
    areaServed: {
      '@type': 'City',
      name: 'Blumenau',
      containedInPlace: {
        '@type': 'State',
        name: 'Santa Catarina',
      },
    },
    priceRange: '$$',
    medicalSpecialty: 'Odontologia Integrativa',
  }

  const clean = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <title>{siteData.name} — Odontologia Integrativa em Blumenau</title>
      <meta name="description" content={siteData.description} />
      <meta property="og:title" content={`${siteData.name} — Odontologia Integrativa`} />
      <meta property="og:description" content={siteData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteData.url} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:locale:alternate" content="en_US" />
      <link rel="canonical" href={siteData.url} />
      <script type="application/ld+json">{JSON.stringify(clean)}</script>
    </Helmet>
  )
}
