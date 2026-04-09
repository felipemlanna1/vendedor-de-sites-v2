import { business, social, locations, ratings } from '../../data/content'

export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    description: business.description,
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/5f/90/f5/australiano.jpg',
    url: business.url,
    telephone: business.phone,
    email: business.email,
    servesCuisine: ['Hamburgueres', 'Hamburguer Artesanal', 'Smash Burger', 'Comida Vegana'],
    priceRange: '$$',
    currenciesAccepted: 'BRL',
    paymentAccepted: 'Dinheiro, Cartao de Credito, Cartao de Debito, PIX',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'R. Prof. Bento Aguido Vieira, 20',
      addressLocality: 'Florianopolis',
      addressRegion: 'SC',
      postalCode: '88036-410',
      addressCountry: 'BR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -27.589725,
      longitude: -48.521947,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '17:30',
      closes: '00:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratings.ifood.score,
      reviewCount: ratings.ifood.reviews + ratings.tripadvisor.reviews,
      bestRating: 5,
    },
    sameAs: [
      social.instagram,
      social.facebook,
      social.tiktok,
      social.linkedin,
      social.tripadvisor,
    ],
    foundingDate: '2015-08-05',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: business.employees,
    },
    knowsAbout: [
      'Hamburgueres artesanais',
      'Black Angus',
      'Smash Burger',
      'Hamburgueres veganos',
      'Pet Burguer',
      'Empreendedorismo social',
    ],
    hasMenu: {
      '@type': 'Menu',
      url: business.url + '/cardapio',
    },
    department: locations.map(loc => ({
      '@type': 'Restaurant',
      name: `Usina do Hamburguer - ${loc.name}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: loc.address,
        addressLocality: loc.city,
        addressCountry: 'BR',
      },
      telephone: loc.phone,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
