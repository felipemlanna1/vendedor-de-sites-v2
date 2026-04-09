import { useEffect, useRef } from 'react'
import { siteData } from '../../data/content'

export default function JsonLd() {
  const ref = useRef(null)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
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
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteData.coordinates.lat,
      longitude: siteData.coordinates.lng,
    },
    sameAs: siteData.socialLinks,
    knowsAbout: [
      'Harmonização Orofacial',
      'Ortodontia',
      'Invisalign',
      'Toxina Botulínica',
      'Preenchimento Facial',
      'Skinbooster',
      'Bioestimuladores de Colágeno',
      'Odontopediatria',
      'Clareamento Dental',
      'Ortopedia Funcional dos Maxilares',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Curso de Odontologia',
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Conselho Regional de Odontologia de Minas Gerais',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'CRO',
      recognizedBy: {
        '@type': 'Organization',
        name: 'CRO-MG',
      },
      identifier: 'MG 26.171',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Ouro Fino',
        containedInPlace: { '@type': 'State', name: 'Minas Gerais' },
      },
      {
        '@type': 'City',
        name: 'São Paulo',
        containedInPlace: { '@type': 'State', name: 'São Paulo' },
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tratamentos',
      itemListElement: siteData.services.map((service, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service,
        },
        position: i + 1,
      })),
    },
  }

  // Inject into head directly for Playwright/crawler compatibility
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }, [])

  // Also render in body for crawlers that check body
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
