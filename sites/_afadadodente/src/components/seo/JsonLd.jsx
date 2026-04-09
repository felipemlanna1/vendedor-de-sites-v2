import { useEffect } from 'react'
import { schemaData, professional, faqs } from '../../data/content'

export default function JsonLd() {
  const dentist = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: schemaData.name,
    alternateName: 'A Fada do Dente',
    description: schemaData.description,
    image: schemaData.image,
    url: schemaData.url,
    telephone: schemaData.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      addressRegion: schemaData.address.state,
      addressCountry: schemaData.address.country,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        name: 'Triangulo Mineiro, MG',
      },
    },
    sameAs: schemaData.socialLinks,
    knowsAbout: schemaData.knowsAbout,
    alumni: {
      '@type': 'EducationalOrganization',
      name: schemaData.alumniOf.name,
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Professional License',
      recognizedBy: {
        '@type': 'Organization',
        name: professional.council,
      },
      identifier: professional.cro,
    },
    medicalSpecialty: 'Pediatric Dentistry',
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Primeira Visita Odontopediatrica',
        procedureType: 'Diagnostic',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Prevencao Dental Infantil',
        procedureType: 'Preventive',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Tratamento de Carie Infantil',
        procedureType: 'Therapeutic',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Urgencia Odontologica Infantil',
        procedureType: 'Therapeutic',
      },
    ],
    founder: {
      '@type': 'Person',
      name: professional.fullName,
      jobTitle: 'Odontopediatra',
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: professional.university,
      },
    },
  }

  // Remove undefined values
  const clean = JSON.parse(JSON.stringify(dentist))

  useEffect(() => {
    // Inject JSON-LD directly into head for reliability
    const existingScript = document.querySelector('script[data-jsonld="dentist"]')
    if (existingScript) existingScript.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-jsonld', 'dentist')
    script.textContent = JSON.stringify(clean)
    document.head.appendChild(script)

    return () => script.remove()
  }, [])

  return null
}
