// Datos reales de Juan Camilo "Papo" León Mora — fuente única. Antes vivían
// duplicados dentro de components/Founder.tsx (sección del home) sin que
// /papo los reutilizara. Mismo patrón que lib/planes.ts y lib/faq.ts: un
// solo lugar, todos los consumidores importan de acá.
//
// Todo dato acá es real, tomado de la hoja de vida y de lo ya escrito en el
// repo — nada inventado. Lo que no aparecía en ningún archivo (LinkedIn,
// un PDF descargable, métricas por rol) se dejó fuera a propósito; ver
// ESTADO.md para el detalle de qué falta de verdad.

export interface Study {
  title: string
  detail: string
}

export const STUDIES: Study[] = [
  { title: 'Técnico en Diseño e Integración de Multimedia', detail: 'Culminado en 2016' },
  { title: 'Diseño Visual', detail: 'Cursando actualmente — 5to semestre' },
]

export interface Aptitude {
  name: string
  level: number // de 5 — coincide con las estrellas de la hoja de vida
}

export const APTITUDES: Aptitude[] = [
  { name: 'Diseñador Gráfico', level: 5 },
  { name: 'Creatividad', level: 4 },
  { name: 'Innovador', level: 4 },
  { name: 'Comediante', level: 3 },
  { name: 'Cantante', level: 1 },
]

export interface TimelineItem {
  year: string
  role: string
  place: string
  desc: string
  current?: boolean
}

export const TIMELINE: TimelineItem[] = [
  {
    year: '2016', role: 'Asistente Audiovisual', place: 'RCN Televisión',
    desc: 'Acompañamiento y realización de fotografías, videos y piezas gráficas.',
  },
  {
    year: '2020', role: 'Diseñador Gráfico', place: 'Quality and Price',
    desc: 'Generación de contenido, fotografía de producto, e-commerce y manejo de redes sociales.',
  },
  {
    year: '2021', role: 'Diseñador Gráfico', place: 'Think Click · Neofy',
    desc: 'Branding y creación de marca, diseño y prototipado web, creación de conceptos visuales.',
  },
  {
    year: '2021', role: 'Diseñador E-Learning', place: 'ADN Training',
    desc: 'Creación de key-visual, diseño y prototipado UI, diseño instruccional y piezas publicitarias.',
  },
  {
    year: '2023', role: 'Diseñador Gráfico Junior', place: 'Hoytrabajas',
    desc: 'Campañas de fortalecimiento de marca basadas en growth, P.O.P y estrategia visual en redes sociales de alto impacto.',
  },
  {
    year: '2024', role: 'Designer Lead', place: 'ecomms — México & USA',
    desc: 'Creación de marca, branding y retoque fotográfico para e-commerce en Estados Unidos y México.',
  },
  {
    year: '2025', role: 'Creative Designer', place: 'Ariadna (Grupo Barnier) — cuenta LG Colombia',
    desc: 'Apoyo creativo en piezas digitales, P.O.P y retail — optimización de piezas masivas y propuestas de campaña.',
  },
  {
    year: 'Hoy', role: 'Fundador & Director Creativo', place: 'Relevvo Studio',
    desc: 'Todo ese camino hoy vive dentro de Relevvo — una agencia hecha con la misma mezcla de criterio, curiosidad y ganas de anticiparse a lo que viene.',
    current: true,
  },
]

// Logros agregados — los únicos números reales encontrados (ya estaban
// publicados en app/papo/page.tsx). No hay cifras por rol/empleador en
// ningún archivo del repo, así que no se inventaron.
export interface Metric {
  num: string
  label: string
}

// "Años de experiencia" se deriva de TIMELINE (2016 → hoy = 9). Si se
// agrega un año más viejo a TIMELINE, actualizar este número a mano —
// no hay cálculo automático, y ya hubo una vez una versión vieja ("5+")
// que se contradecía con su propia línea de tiempo en la misma página.
//
// "Marcas": hay TRES cifras reales, cada una cuenta algo distinto — no son
// versiones contradictorias entre sí, y no hay que fusionarlas:
//   · 8+  → marcas construidas CON RELEVVO (este METRICS). [COMPLETAR]:
//     este número venía así en el repo antes de esta sesión; se asume que
//     cuenta solo Relevvo porque es la lectura que cuadra con las otras
//     dos cifras, pero el usuario no lo confirmó explícitamente como tal
//     — a diferencia de las otras dos, que sí están confirmadas.
//   · 20+ → carrera completa de Juan Camilo, incluye trabajo en agencias
//     previas (RCN, Hoytrabajas, ecomms, Ariadna). Confirmado por el
//     usuario. Vive en AIStory.tsx y en el subtítulo del bento de /papo —
//     NO en este archivo.
//   · 11  → marcas en portafolio (`brands.length` en /papo), cuántas se
//     muestran con enlace, no cuántas se han construido.
// La etiqueta de cada una es lo que evita la contradicción — no cambies
// el número de una sección sin revisar qué alcance afirma su etiqueta.
export const METRICS: Metric[] = [
  { num: '8+',   label: 'Marcas con Relevvo' },
  { num: '9+',   label: 'Años de experiencia' },
  { num: '100%', label: 'Compromiso' },
  { num: '2',    label: 'Países activos' },
]
