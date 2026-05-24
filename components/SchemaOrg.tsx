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
          'Agencia de diseño gráfico con IA y marketing digital en Colombia. Planes mensuales sin sobrecostos.',
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
          'https://www.instagram.com/relevvostudio',
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
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Diseño con Inteligencia Artificial' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Logos y Branding' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Marketing Digital Colombia' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Landing Pages' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Gestión de Redes Sociales' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Estrategia de Contenido con IA' } },
          ],
        },
        knowsAbout: [
          'Diseño gráfico con IA',
          'Branding',
          'Marketing digital',
          'Identidad de marca',
          'Landing pages',
          'Gestión de redes sociales',
          'Fotografía comercial',
          'Estrategia de contenido',
          'Inteligencia artificial aplicada al diseño',
          'Pauta digital',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://relevvostudio.com/#professionalservice',
        name: 'Relevvo Studio — Agencia de Diseño con IA',
        description: 'Diseño gráfico profesional con inteligencia artificial y marketing digital en Colombia. Creamos marcas que crecen con estrategia, velocidad y resultados reales.',
        url: 'https://relevvostudio.com',
        areaServed: 'Colombia',
        serviceType: [
          'Diseño gráfico con IA',
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
        name: 'Agencia de Diseño con IA y Marketing Digital en Colombia | Relevvo Studio',
        isPartOf: { '@id': 'https://relevvostudio.com/#website' },
        about: { '@id': 'https://relevvostudio.com/#organization' },
        description:
          'Agencia de diseño gráfico con inteligencia artificial y marketing digital en Colombia. Logos, branding, landing pages y estrategia digital. Planes mensuales sin sobrecostos.',
        inLanguage: 'es-CO',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué es una agencia de diseño con IA?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Una agencia de diseño con IA combina creatividad humana con herramientas de inteligencia artificial para producir diseños más rápido, con mayor calidad y a menor costo. En Relevvo Studio usamos IA para acelerar la producción sin perder la estrategia y la visión de marca.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Relevvo Studio usa inteligencia artificial para diseñar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. En Relevvo Studio usamos inteligencia artificial como herramienta de producción, pero cada decisión estratégica — colores, tipografía, mensaje, tono — es tomada por nuestro equipo humano. La IA nos da velocidad; la estrategia le da dirección.',
            },
          },
          {
            '@type': 'Question',
            name: '¿En qué ciudades de Colombia operan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Trabajamos con clientes en todo Colombia de forma 100% digital: Bogotá, Medellín, Cali, Barranquilla, Cartagena y cualquier otra ciudad. Todo el proceso es remoto y sin necesidad de reuniones presenciales.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuánto cuesta una agencia de diseño en Colombia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En Relevvo Studio manejamos planes mensuales desde $700.000 COP hasta $3.990.000 COP, según el volumen de trabajo y servicios requeridos. Sin sobrecostos ocultos ni tarifas por revisión.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué servicios ofrece Relevvo Studio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ofrecemos: logos y branding, landing pages, páginas web, gestión de redes sociales, pauta digital, fotografía comercial, presentaciones corporativas, diseño con IA y estrategia de marketing digital en Colombia.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cómo puedo contratar a Relevvo Studio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Puedes contactarnos directamente por WhatsApp al +57 322 309 4005 o a través de nuestra página web en relevvostudio.com. Agendamos una cita sin costo para entender tu marca y recomendarte el plan ideal.',
            },
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Servicios de Relevvo Studio',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Diseño Gráfico con Inteligencia Artificial', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 2, name: 'Logos y Branding Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 3, name: 'Marketing Digital Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 4, name: 'Landing Pages Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 5, name: 'Gestión de Redes Sociales Colombia', url: 'https://relevvostudio.com/#solucion' },
          { '@type': 'ListItem', position: 6, name: 'Estrategia de Contenido con IA', url: 'https://relevvostudio.com/#solucion' },
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
