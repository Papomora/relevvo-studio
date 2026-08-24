import { FAQ_ITEMS } from '@/lib/faq'

export default function SchemaOrg() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://relevvostudio.com/#organization',
        name: 'Relevvo Studio',
        url: 'https://relevvostudio.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://relevvostudio.com/images/Relevvostd@3x.png',
        },
        description:
          'Estudio de diseño gráfico, branding y marketing digital en Colombia. Planes mensuales sin sobrecostos.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CO',
          addressLocality: 'Colombia',
        },
        telephone: '+573223094005',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+573223094005',
          contactType: 'customer service',
          availableLanguage: 'Spanish',
          areaServed: 'CO',
        },
        sameAs: [
          'https://www.instagram.com/relevvo_studio/',
          'https://wa.me/573223094005',
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://relevvostudio.com/#localbusiness',
        name: 'Relevvo Studio',
        image: 'https://relevvostudio.com/images/Relevvostd@3x.png',
        url: 'https://relevvostudio.com',
        telephone: '+573223094005',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CO',
          addressLocality: 'Colombia',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Colombia',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de diseño y marketing digital',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño Gráfico y Branding' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logos y Branding' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marketing Digital Colombia' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landing Pages' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de Redes Sociales' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estrategia de Contenido' } },
          ],
        },
        knowsAbout: [
          'Diseño gráfico',
          'Branding',
          'Marketing digital',
          'Identidad de marca',
          'Landing pages',
          'Gestión de redes sociales',
          'Fotografía comercial',
          'Estrategia de contenido',
          'Producción creativa asistida por IA',
          'Pauta digital',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://relevvostudio.com/#professionalservice',
        name: 'Relevvo Studio — Estudio de Diseño y Branding',
        description: 'Estudio de diseño gráfico y marketing digital en Colombia. Branding, contenido y fotografía propia bajo un mismo plan mensual.',
        url: 'https://relevvostudio.com',
        areaServed: 'Colombia',
        serviceType: [
          'Diseño gráfico y branding',
          'Branding y identidad de marca',
          'Marketing digital',
          'Gestión de redes sociales',
          'Diseño publicitario',
          'Estrategia de contenido digital',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://relevvostudio.com/#website',
        url: 'https://relevvostudio.com',
        name: 'Relevvo Studio',
        publisher: { '@id': 'https://relevvostudio.com/#organization' },
        inLanguage: 'es-CO',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://relevvostudio.com/?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://relevvostudio.com/#webpage',
        url: 'https://relevvostudio.com',
        name: 'Estudio de Diseño y Branding en Colombia | Relevvo Studio',
        isPartOf: { '@id': 'https://relevvostudio.com/#website' },
        about: { '@id': 'https://relevvostudio.com/#organization' },
        description:
          'Estudio de diseño gráfico, branding y marketing digital en Colombia. Logos, identidad de marca, landing pages y estrategia digital. Planes mensuales sin sobrecostos.',
        inLanguage: 'es-CO',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'ItemList',
        name: 'Servicios de Relevvo Studio',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Diseño Gráfico y Branding Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 2, name: 'Logos y Branding Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 3, name: 'Marketing Digital Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 4, name: 'Landing Pages Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 5, name: 'Gestión de Redes Sociales Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 6, name: 'Estrategia de Contenido Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 7, name: 'Fotografía Comercial Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 8, name: 'Pauta Digital Colombia', url: 'https://relevvostudio.com/#solucion' },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
