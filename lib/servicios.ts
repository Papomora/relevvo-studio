// Datos de las 4 landings de /servicios — fuente única, mismo patrón que
// lib/planes.ts, lib/faq.ts y lib/founder.ts. El "incluye" de cada servicio
// usa textualmente features que ya existen en lib/planes.ts (PLANS) — no se
// inventa qué trae cada plan, se reordena lo que ya está publicado.

export interface ServicioFaq {
  question: string
  answer: string
}

export interface Servicio {
  slug: string
  keyword: string        // keyword literal de investigación (SEO_SEM_RESEARCH.md) o su patrón natural
  h1: string
  label: string          // etiqueta corta para UI on-page (tarjetas del hub, enlaces de Features.tsx) — no es el <title>
  metaTitle: string       // el <title> real, le habla a quien todavía está en Google decidiendo — debe llevar la keyword
  metaDescription: string
  problemaHeading: string
  problemaBody: string
  incluye: string[]
  faq: ServicioFaq[]
}

// El proceso es el mismo en las 4 landings porque es el mismo método de
// trabajo, no una feature por servicio — ya estaba escrito en /papo
// (sección "Cómo trabajo"). Se centraliza acá para que /papo y /servicios/*
// lean del mismo lugar en vez de mantener dos copias del mismo texto.
export interface ProcesoPaso {
  n: string
  title: string
  desc: string
}

export const PROCESO_GENERICO: ProcesoPaso[] = [
  { n: '01', title: 'Escucho tu historia',  desc: 'Antes de diseñar una sola línea entiendo tu negocio, tus clientes y qué te hace diferente.' },
  { n: '02', title: 'Defino la estrategia', desc: 'Posicionamiento, arquetipo de marca y oportunidades. La estrategia siempre va antes que la estética.' },
  { n: '03', title: 'Diseño con propósito', desc: 'Cada elemento visual tiene un argumento. No decoro — comunico.' },
  { n: '04', title: 'Entrego listo',        desc: 'Archivos completos, guía de aplicación y acompañamiento post-entrega.' },
]

export const SERVICIOS: Servicio[] = [
  {
    slug: 'branding',
    keyword: 'agencia de branding en Bogotá',
    h1: 'Agencia de branding en Bogotá',
    label: 'Branding',
    metaTitle: 'Agencia de Branding en Bogotá',
    metaDescription: 'Identidad de marca completa en Colombia: logo, paleta, tipografía y brandbook. Plan mensual fijo, sin cotización por proyecto.',
    problemaHeading: 'Un logo bonito no es una marca.',
    problemaBody: 'La mayoría de agencias de branding en Colombia cobran por proyecto, entregan un logo y una paleta, y ahí termina el acompañamiento. Seis meses después la marca sigue sin una guía clara de cómo usarse en redes, en papelería o en pauta.',
    incluye: [
      'Identidad visual: logo, paleta, tipografía',
      'Mini brand kit o brandbook completo con guías de aplicación',
      'Branding continuo — la marca se ajusta con el negocio, no se entrega una sola vez',
      'Tono de voz y coherencia visual en cada pieza',
    ],
    faq: [
      { question: '¿El branding incluye el brandbook completo?', answer: 'Depende del plan: BASIC entrega un mini brand kit; MID y FULL incluyen branding continuo con guías de aplicación completas. El detalle está en /planes.' },
      { question: '¿Puedo pedir solo un rediseño de logo, sin marca completa?', answer: 'Sí. El plan BASIC cubre logo básico o ajuste de logo existente sin necesidad de rehacer toda la identidad.' },
      { question: '¿Cuánto se demora un branding completo?', answer: 'Al ser un plan mensual con producción continua, las primeras piezas de identidad salen en las primeras semanas, no al final de un proyecto de meses.' },
    ],
  },
  {
    slug: 'diseno-web',
    keyword: 'diseño web profesional en Colombia',
    h1: 'Diseño web profesional en Colombia',
    label: 'Diseño Web',
    metaTitle: 'Diseño de Páginas Web en Colombia',
    metaDescription: 'Diseño y prototipado de páginas web y landing pages en Colombia, con la misma identidad de marca que ya trabajamos. Cotización según alcance.',
    problemaHeading: 'Una web que no habla el idioma de tu marca no vende.',
    problemaBody: 'Es común contratar el branding con un estudio y la web con otro — el resultado es una identidad que no se ve igual en el sitio que en las redes. Al diseñar ambos con el mismo equipo, la marca se ve como una sola cosa en todos los canales.',
    incluye: [
      'Diseño y prototipado de landing pages y sitios corporativos',
      'Coherencia visual directa con la identidad de marca ya construida',
      'Estructura pensada para conversión, no solo estética',
      'Entrega de archivos de diseño listos para desarrollo',
    ],
    faq: [
      { question: '¿El diseño web está incluido en los planes mensuales?', answer: 'No — ningún plan mensual lo trae incluido. Se cotiza aparte, como proyecto puntual: en /planes, en el bloque "Proyecto a la medida", con un solo pago según el alcance del sitio.' },
      { question: '¿También desarrollan el sitio, o solo lo diseñan?', answer: 'El foco es el diseño y prototipado. Para el desarrollo trabajamos con el equipo técnico que el cliente ya tenga o coordinamos uno de confianza.' },
      { question: '¿Puedo pedir solo una landing page, no el sitio completo?', answer: 'Sí, es de hecho lo más común — una landing page para una campaña o un lanzamiento específico.' },
    ],
  },
  {
    slug: 'redes-sociales',
    keyword: 'manejo de redes sociales para empresas en Bogotá',
    h1: 'Manejo de redes sociales para empresas en Bogotá',
    label: 'Redes Sociales',
    metaTitle: 'Manejo de Redes Sociales para Empresas',
    metaDescription: 'Gestión de redes sociales y Community Manager en Colombia: planeación mensual de contenido y producción visual continua. Plan fijo mensual.',
    problemaHeading: 'Publicar sin plan no es estrategia, es ruido.',
    problemaBody: 'Muchas marcas publican piezas sueltas sin una planeación mensual detrás — el resultado es una cuenta que se ve inconsistente y que no construye nada a largo plazo, aunque las piezas individuales estén bien hechas.',
    incluye: [
      'Gestión de redes con producción ágil de piezas',
      'Community Manager (dedicado en el plan FULL)',
      'Planeación mensual de contenido, no piezas sueltas',
      'Producción visual acelerada para mantener el ritmo de publicación',
    ],
    faq: [
      { question: '¿Cuántas piezas incluye la gestión de redes al mes?', answer: 'Depende del plan: BASIC incluye hasta 12 piezas estáticas mensuales, MID y FULL amplían con video y producción acelerada. El detalle exacto está en /planes.' },
      { question: '¿Manejan la pauta publicitaria además del contenido orgánico?', answer: 'La gestión de pauta publicitaria está dentro del plan FULL. Los planes BASIC y MID cubren contenido orgánico y gestión de la cuenta.' },
      { question: '¿Necesito tener ya una identidad de marca definida?', answer: 'No es obligatorio — si no la tienes, la construimos primero para que el contenido de redes tenga una base visual consistente.' },
    ],
  },
  {
    slug: 'contenido-ia',
    keyword: 'producción de contenido con inteligencia artificial en Colombia',
    h1: 'Producción de contenido con inteligencia artificial en Colombia',
    label: 'Contenido con IA',
    metaTitle: 'Contenido con Inteligencia Artificial',
    metaDescription: 'Producción de contenido visual asistida por IA en Colombia, con dirección creativa humana. Edición y generación de video, piezas aceleradas. Plan mensual fijo.',
    problemaHeading: 'La IA sin dirección creativa se nota — y no en el buen sentido.',
    problemaBody: 'Generar imágenes o video con IA es fácil; que se vean como parte coherente de una marca no lo es. Usamos IA para acelerar producción, pero cada pieza pasa por dirección de arte humana antes de salir — la estrategia y el criterio no se automatizan.',
    incluye: [
      'Edición y generación de video asistida por IA (plan MID en adelante)',
      'Producción visual acelerada sin perder coherencia de marca',
      'Herramientas: Midjourney, ChatGPT, Firefly, Gemini, Freepik, Claude',
      'Dirección de arte humana en cada pieza antes de entregar',
    ],
    faq: [
      { question: '¿La IA reemplaza el criterio del diseñador?', answer: 'No. La IA se usa en la producción para acelerar piezas; la estrategia, dirección de arte y control de calidad los hace un director creativo humano en cada entrega.' },
      { question: '¿Qué herramientas de IA usan?', answer: 'Midjourney, ChatGPT, Firefly, Gemini y Freepik para producción visual, y Claude para estrategia y contenido escrito.' },
      { question: '¿Desde qué plan incluye generación de video?', answer: 'Desde el plan MID. El plan BASIC cubre piezas estáticas; MID y FULL suman edición y generación de video.' },
    ],
  },
]
