import { Helmet } from 'react-helmet-async'
import { siteData, team, faqs } from '../../data/content'

export default function JsonLd() {
  const clinic = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: siteData.name,
    description: 'Clinica dermatologica premium em Florianopolis com diagnostico por imagem. Dermatologia clinica, cirurgica, estetica e ultrassom dermatologico.',
    url: siteData.url,
    telephone: '+554830850247',
    image: `${siteData.url}/images/portrait-dra-ariel.jpg`,
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      ratingCount: '27',
    },
    medicalSpecialty: 'Dermatology',
    priceRange: '$$$$',
    sameAs: siteData.socialLinks,
    areaServed: {
      '@type': 'City',
      name: 'Florianopolis',
    },
  }

  const physician = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dra. Ariel Cordova Rosa',
    description: 'Dermatologista, Preceptora da Residencia em Dermatologia da UFSC, Diretora SBD/SC',
    url: siteData.url,
    telephone: '+554830850247',
    image: `${siteData.url}/images/portrait-dra-ariel.jpg`,
    medicalSpecialty: 'Dermatology',
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidade Federal de Santa Catarina (UFSC)',
    },
    memberOf: [
      { '@type': 'MedicalOrganization', name: 'Sociedade Brasileira de Dermatologia (SBD)' },
      { '@type': 'MedicalOrganization', name: 'Sociedade Brasileira de Cirurgia Dermatologica (SBCD)' },
      { '@type': 'MedicalOrganization', name: 'European Academy of Dermatology and Venereology (EADV)' },
      { '@type': 'MedicalOrganization', name: 'American Academy of Dermatology (AAD)' },
    ],
    knowsAbout: ['Dermatologia clinica', 'Dermatologia cirurgica', 'Dermatologia estetica', 'Dermatoscopia', 'Ultrassom dermatologico', 'Melanoma'],
    worksFor: {
      '@type': 'MedicalClinic',
      name: 'UNA Dermatologia',
    },
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
      <script type="application/ld+json">{JSON.stringify(clinic)}</script>
      <script type="application/ld+json">{JSON.stringify(physician)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </Helmet>
  )
}
