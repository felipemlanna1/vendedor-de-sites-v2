import { Helmet } from 'react-helmet-async'
import { doctorData, locations, services } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctorData.name,
    description: doctorData.description,
    image: doctorData.image,
    url: doctorData.url,
    sameAs: doctorData.socialLinks,
    medicalSpecialty: 'Orthopedic',
    additionalType: 'http://www.wikidata.org/entity/Q1751879',
    knowsAbout: [
      'Ortopedia',
      'Traumatologia',
      'Infiltração guiada por ultrassom',
      'Viscossuplementação',
      'Artrocentese',
      'Densitometria óssea',
      'Cirurgia de fraturas de tornozelo',
      'Procedimentos guiados por ultrassonografia',
    ],
    qualifications: `CRM ${doctorData.crm}/${doctorData.crmState} | RQE ${doctorData.rqe}`,
    availableService: services.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.id,
      procedureType: s.ultrasoundScan
        ? 'http://schema.org/NoninvasiveProcedure'
        : undefined,
    })),
    address: locations.map((loc) => ({
      '@type': 'PostalAddress',
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.zip,
      addressCountry: loc.address.country,
    })),
    geo: locations.map((loc) => ({
      '@type': 'GeoCoordinates',
      latitude: loc.coordinates.lat,
      longitude: loc.coordinates.lng,
    })),
    areaServed: [
      {
        '@type': 'City',
        name: 'Lagoa da Prata',
        containedInPlace: {
          '@type': 'State',
          name: 'Minas Gerais',
        },
      },
      {
        '@type': 'City',
        name: 'Arcos',
        containedInPlace: {
          '@type': 'State',
          name: 'Minas Gerais',
        },
      },
    ],
  }

  // Remove undefined values
  const clean = JSON.parse(JSON.stringify(schema))

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(clean)}</script>
    </Helmet>
  )
}
