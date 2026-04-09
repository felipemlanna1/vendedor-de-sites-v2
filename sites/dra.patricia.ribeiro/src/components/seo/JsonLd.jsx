import { Helmet } from 'react-helmet-async'
import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': siteData.url,
    name: siteData.name,
    description: siteData.description,
    image: `${siteData.url}${siteData.images.hero}`,
    url: siteData.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteData.address.city,
      addressRegion: siteData.address.state,
      addressCountry: siteData.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteData.coordinates.lat,
      longitude: siteData.coordinates.lng,
    },
    sameAs: siteData.socialLinks,
    areaServed: {
      '@type': 'City',
      name: siteData.address.city,
      containedInPlace: {
        '@type': 'State',
        name: 'Minas Gerais',
      },
    },
    knowsAbout: [
      'Endodontia',
      'Tratamento de canal',
      'Retratamento endodôntico',
      'Cirurgia endodôntica',
      'Urgências dentárias',
      'Restauração pós-canal',
    ],
    medicalSpecialty: {
      '@type': 'MedicalSpecialty',
      name: 'Endodontics',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'Conselho Regional de Odontologia de Minas Gerais',
        alternateName: 'CRO-MG',
      },
      identifier: '56979',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Endodontia',
      itemListElement: siteData.services.map((service, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service.name,
          alternateName: service.nameEn,
        },
        position: i + 1,
      })),
    },
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    availableLanguage: [
      { '@type': 'Language', name: 'Portuguese', alternateName: 'pt-BR' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
