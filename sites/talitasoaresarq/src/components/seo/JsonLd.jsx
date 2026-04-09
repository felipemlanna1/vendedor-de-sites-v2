import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteData.brandName,
    description: siteData.description,
    url: siteData.url,
    image: `${siteData.url}/images/stock/interior-hero.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteData.address.city,
      addressRegion: siteData.address.state,
      addressCountry: siteData.address.country,
    },
    telephone: `+${siteData.contact.whatsapp}`,
    areaServed: [
      { '@type': 'City', name: 'Florianopolis' },
      { '@type': 'State', name: 'Santa Catarina' },
      { '@type': 'Country', name: 'Brasil' },
    ],
    sameAs: siteData.socialLinks,
    knowsAbout: [
      'Arquitetura de Interiores',
      'Design de Interiores',
      'Projeto Residencial',
      'Projeto Comercial',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
