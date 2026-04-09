import { Helmet } from 'react-helmet-async'
import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteData.name,
    description: siteData.description,
    image: siteData.image,
    url: siteData.url,
    telephone: siteData.phone || undefined,
    email: siteData.email || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteData.address.street || undefined,
      addressLocality: siteData.address.city,
      addressRegion: siteData.address.state,
      postalCode: siteData.address.zip || undefined,
      addressCountry: siteData.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteData.coordinates.lat,
      longitude: siteData.coordinates.lng,
    },
    sameAs: siteData.socialLinks,
    knowsAbout: [
      'Harmonização Facial',
      'Toxina Botulínica',
      'Preenchimento Labial',
      'Bioestimuladores de Colágeno',
      'Lipo de Papada',
      'Rinomodelação',
      'Otomodelação',
      'Estética Facial',
      'Odontologia Estética',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional License',
      recognizedBy: {
        '@type': 'Organization',
        name: 'CRO-MG - Conselho Regional de Odontologia de Minas Gerais',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Raul Soares',
      containedInPlace: {
        '@type': 'State',
        name: 'Minas Gerais',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Procedimentos de Harmonização Facial',
      itemListElement: siteData.services.map((service, i) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'MedicalProcedure',
          name: service.id
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase()),
          procedureType: 'https://schema.org/CosmeticProcedure',
        },
        position: i + 1,
      })),
    },
  }

  // Remove undefined values
  const clean = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <title>
        Dra. Iara Tavares - Harmonização Facial em Raul Soares, MG | CRO-MG
        55.104
      </title>
      <meta
        name="description"
        content="Harmonização facial com arte e delicadeza em Raul Soares, MG. Dra. Iara Tavares - CRO-MG 55.104. Botox, preenchimento labial, bioestimuladores, rinomodelação e otomodelação."
      />
      <meta
        name="keywords"
        content="harmonização facial Raul Soares, dentista estética MG, botox Raul Soares, preenchimento labial MG, Dra Iara Tavares, CRO 55104, otomodelação, rinomodelação, bioestimuladores colágeno"
      />
      <meta name="author" content="Dra. Iara Tavares" />
      <link rel="canonical" href={siteData.url} />

      {/* Open Graph */}
      <meta
        property="og:title"
        content="Dra. Iara Tavares - Harmonização Facial em Raul Soares"
      />
      <meta property="og:description" content={siteData.description} />
      <meta property="og:image" content={siteData.images.og} />
      <meta property="og:url" content={siteData.url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:locale:alternate" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Dra. Iara Tavares - Harmonização Facial"
      />
      <meta name="twitter:description" content={siteData.description} />
      <meta name="twitter:image" content={siteData.images.og} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(clean)}</script>
    </Helmet>
  )
}
