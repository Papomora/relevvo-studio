// Única fuente de verdad para las preguntas frecuentes del home.
// Se usa en dos lugares: el bloque FAQPage de SchemaOrg.tsx (lo que
// Google lee) y el componente FAQ.tsx (lo que el visitante ve). Si se
// duplican en vez de importarse de aquí, se desincronizan con el tiempo
// y el schema termina prometiéndole a Google algo que la página no dice
// — el bug que originó esta limpieza. Cualquier pregunta nueva o editada
// va acá, en un solo sitio.
export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: '¿Relevvo Studio usa inteligencia artificial para diseñar?',
    answer:
      'Usamos IA como apoyo en investigación, moodboards e iteración rápida, para ganar tiempo en tareas operativas. Pero cada decisión estratégica de marca — colores, tipografía, mensaje, tono — es tomada por nuestro equipo humano. La IA acelera el proceso; el criterio del estudio decide el resultado.',
  },
  {
    question: '¿En qué ciudades de Colombia operan?',
    answer:
      'Trabajamos con clientes en todo Colombia — Bogotá, Medellín, Cali, Barranquilla, Cartagena y cualquier otra ciudad — y también con marcas en México. La estrategia, el diseño y las revisiones son 100% digitales, sin necesidad de reuniones presenciales; las sesiones de fotografía de los planes que las incluyen se coordinan contigo.',
  },
  {
    question: '¿Cuánto cuesta un estudio de diseño en Colombia?',
    answer:
      'En Relevvo Studio trabajamos con tres planes mensuales de precio fijo (BASIC, MID y FULL), publicados en relevvostudio.com/planes. Cada plan incluye un número fijo de revisiones por pieza, sin sobrecostos ocultos ni cotizaciones sorpresa. Si necesitas un proyecto puntual, como una página web, lo cotizamos según su alcance.',
  },
  {
    question: '¿Qué servicios ofrece Relevvo Studio?',
    answer:
      'Ofrecemos: logos y branding, landing pages, páginas web, gestión de redes sociales, pauta digital, fotografía comercial, presentaciones corporativas y estrategia de marketing digital en Colombia.',
  },
  {
    question: '¿Cómo puedo contratar a Relevvo Studio?',
    answer:
      'Puedes contactarnos directamente por WhatsApp al +57 322 309 4005 o a través de nuestra página web en relevvostudio.com. Agendamos una cita sin costo para entender tu marca y recomendarte el plan ideal.',
  },
]
