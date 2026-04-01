export default function JsonLd({ content }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BarberShop",
    "name": content.business.name,
    "alternateName": "Ancorador Barbearia",
    "description": "Barbearia clássica na Lagoa da Conceição, Florianópolis. Cortes clássicos, barba com navalha quente, e a experiência de uma barbearia de verdade na Ilha da Magia.",
    "image": "https://barbearia-ancorador.pages.dev/images/logo-profile-hd.jpg",
    "logo": "https://barbearia-ancorador.pages.dev/images/logo-profile-hd.jpg",
    "telephone": content.business.phone,
    "email": content.business.email,
    "url": "https://barbearia-ancorador.pages.dev",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": content.business.address,
      "addressLocality": "Florianópolis",
      "addressRegion": "SC",
      "postalCode": content.business.cep || "88062-000",
      "addressCountry": "BR",
      "areaServed": [
        { "@type": "City", "name": "Florianópolis" },
        { "@type": "Place", "name": "Lagoa da Conceição, Florianópolis" },
        { "@type": "Place", "name": "Barra da Lagoa, Florianópolis" },
        { "@type": "Place", "name": "Rio Tavares, Florianópolis" },
        { "@type": "Place", "name": "Campeche, Florianópolis" },
        { "@type": "Place", "name": "Córrego Grande, Florianópolis" },
        { "@type": "Place", "name": "Carianos, Florianópolis" }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.5969,
      "longitude": -48.4536
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "paymentAccepted": "Dinheiro, Cartão de Crédito, Cartão de Débito, PIX",
    "currenciesAccepted": "BRL",
    "sameAs": [
      "https://www.instagram.com/barbeariaancorador/",
      "https://www.instagram.com/sucatabarber/"
    ],
    "founder": {
      "@type": "Person",
      "name": "Bruno 'Sucata'",
      "jobTitle": "Barbeiro & Fundador",
      "sameAs": "https://www.instagram.com/sucatabarber/"
    },
    "foundingDate": "2024",
    "priceRange": "R$20-R$115",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Barbearia",
      "itemListElement": (content.services?.items || []).map(s => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": s.name,
          "description": s.description
        },
        "price": s.price,
        "priceCurrency": "BRL"
      }))
    },
    "knowsAbout": [
      "Corte clássico masculino",
      "Barba com navalha quente",
      "Barbearia clássica",
      "Produtos Caballeros",
      "Produtos GOAT"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
