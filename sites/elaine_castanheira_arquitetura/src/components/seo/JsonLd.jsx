import { Helmet } from 'react-helmet-async'
import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Architect',
    name: siteData.name,
    description: siteData.description,
    image: siteData.images.hero,
    url: siteData.url,
    telephone: siteData.phone,
    email: siteData.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteData.address.city,
      addressRegion: siteData.address.state,
      addressCountry: siteData.address.country,
    },
    sameAs: siteData.socialLinks,
    knowsAbout: siteData.specializations,
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: siteData.education.university,
    },
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'professional-registration',
        recognizedBy: {
          '@type': 'Organization',
          name: siteData.professionalRegistration.council,
        },
        identifier: siteData.professionalRegistration.number,
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        name: 'Healthy Building Certificate',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Florianopolis',
    },
    foundingDate: '2006',
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Projeto de Interiores Residencial',
          description: 'Projeto completo de arquitetura de interiores para residencias',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Consultoria Personalizada',
          description: 'Orientacao profissional sobre layout, materiais e iluminacao',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Acompanhamento de Obra',
          description: 'Supervisao tecnica durante a execucao do projeto',
        },
      },
    ],
  }

  const clean = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(clean)}</script>
    </Helmet>
  )
}
