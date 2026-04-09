import { useEffect } from 'react'
import { siteData } from '../../data/content'

export default function JsonLd() {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Architect',
      name: siteData.name,
      description: siteData.seo.description,
      image: siteData.seo.url + siteData.seo.ogImage,
      url: siteData.seo.url,
      telephone: '+55' + siteData.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteData.city,
        addressRegion: siteData.state,
        addressCountry: 'BR',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Conselheiro Lafaiete',
          containedInPlace: { '@type': 'State', name: 'Minas Gerais' },
        },
        {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: -20.6596,
            longitude: -43.7867,
          },
          geoRadius: '50000',
          description: 'Regiao do Alto Paraopeba',
        },
      ],
      sameAs: [siteData.instagram, siteData.linkedin],
      knowsAbout: [
        'Projetos Arquitetonicos',
        'Design de Interiores',
        'Reformas',
        'Urbanismo',
        'Planejamento Urbano',
        'Arquitetura Sustentavel',
      ],
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Universidade Federal de Ouro Preto (UFOP)',
          sameAs: 'https://ufop.br',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Universidade Federal de Vicosa (UFV)',
          sameAs: 'https://www.ufv.br',
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Bacharel em Arquitetura e Urbanismo',
          recognizedBy: { '@type': 'Organization', name: 'UFOP' },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          credentialCategory: 'degree',
          name: 'Mestre em Arquitetura e Urbanismo',
          recognizedBy: { '@type': 'Organization', name: 'UFV' },
        },
      ],
      memberOf: {
        '@type': 'ProfessionalService',
        name: 'Conselho de Arquitetura e Urbanismo (CAU)',
      },
      jobTitle: 'Arquiteta e Urbanista',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicos de Arquitetura',
        itemListElement: siteData.services.map((service, i) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
          },
          position: i + 1,
        })),
      },
    }

    // Inject directly into DOM for SSR-less apps
    const existing = document.querySelector('script[data-schema="architect"]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-schema', 'architect')
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const el = document.querySelector('script[data-schema="architect"]')
      if (el) el.remove()
    }
  }, [])

  return null
}
