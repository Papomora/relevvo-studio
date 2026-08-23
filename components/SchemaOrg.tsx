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
        description: 'Estudio de diseño gráfico y marketing digital en Colombia. Creamos marcas que crecen con criterio, estrategia y resultados reales.',
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
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Relevvo Studio usa inteligencia artificial para diseñar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Usamos IA como apoyo en investigación, moodboards e iteración rápida, para ganar tiempo en tareas operativas. Pero cada decisión estratégica de marca — colores, tipografía, mensaje, tono — es tomada por nuestro equipo humano. La IA acelera el proceso; el criterio del estudio decide el resultado.',
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
            name: '¿Cuánto cuesta un estudio de diseño en Colombia?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'En Relevvo Studio manejamos planes mensuales según el volumen de trabajo y servicios requeridos, sin sobrecostos ocultos ni tarifas por revisión. Escríbenos y te armamos una cotización a la medida.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué servicios ofrece Relevvo Studio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ofrecemos: logos y branding, landing pages, páginas web, gestión de redes sociales, pauta digital, fotografía comercial, presentaciones corporativas y estrategia de marketing digital en Colombia.',
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
