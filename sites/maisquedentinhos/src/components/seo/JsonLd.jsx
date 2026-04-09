import { useEffect } from 'react'
import { siteData } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: siteData.name,
    alternateName: siteData.businessName,
    description: 'Odontopediatra com Doutorado pela UNESP e professora na FURB. Especializada em odontopediatria, ortodontia preventiva, Invisalign e atendimento PcD. 25+ anos de experiencia em Blumenau, SC.',
    image: `${siteData.url}${siteData.logo}`,
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
    sameAs: [
      siteData.instagramUrl,
      siteData.website,
    ],
    knowsAbout: siteData.schema.knowsAbout,
    alumniOf: siteData.schema.alumniOf.map(a => ({
      '@type': a.type,
      name: a.name,
      department: { '@type': 'Organization', name: a.department },
    })),
    worksFor: {
      '@type': siteData.schema.worksFor.type,
      name: siteData.schema.worksFor.name,
      department: { '@type': 'Organization', name: siteData.schema.worksFor.department },
    },
    hasCredential: siteData.schema.qualifications.map(q => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: q,
    })),
    medicalSpecialty: 'Pediatric Dentistry',
    availableService: siteData.schema.specialties.map(s => ({
      '@type': 'MedicalProcedure',
      name: s,
    })),
    areaServed: {
      '@type': 'City',
      name: 'Blumenau',
      containedInPlace: {
        '@type': 'State',
        name: 'Santa Catarina',
      },
    },
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(schema)
    script.id = 'jsonld-dentist'
    document.head.appendChild(script)
    return () => {
      const existing = document.getElementById('jsonld-dentist')
      if (existing) existing.remove()
    }
  }, [])

  return null
}
