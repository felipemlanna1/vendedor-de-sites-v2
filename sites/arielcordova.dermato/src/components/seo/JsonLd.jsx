import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: siteData.name,
    description: siteData.description,
    image: siteData.image,
    url: siteData.url,
    telephone: siteData.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.address.street,
      addressLocality: siteData.address.city,
      addressRegion: siteData.address.state,
      postalCode: siteData.address.zip,
      addressCountry: siteData.address.country,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: siteData.rating.value,
      reviewCount: siteData.rating.count,
      bestRating: 5,
    },
    sameAs: siteData.socialLinks,
    medicalSpecialty: 'Dermatology',
    knowsAbout: siteData.knowsAbout,
    alumniOf: siteData.alumniOf.map(a => ({
      '@type': 'EducationalOrganization',
      name: a.name,
    })),
    memberOf: siteData.memberOf.map(m => ({
      '@type': 'Organization',
      name: m.name,
    })),
    availableService: siteData.specialties.map(s => ({
      '@type': 'MedicalProcedure',
      name: s,
    })),
    priceRange: '$$$$',
    areaServed: {
      '@type': 'City',
      name: 'Florian\u00f3polis',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
