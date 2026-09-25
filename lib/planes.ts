// Fuente única de los 3 planes y la comparación de mercado. Se usa desde
// Pricing.tsx (home) y desde /planes (extendida) y desde LandingReferidos.tsx
// (que solo toma el precio, no vuelve a escribirlo). Si un precio cambia,
// cambia acá y en ningún otro lado — así se evitó el problema que ya pasó
// una vez con /referidos (ver ESTADO.md, trampa de datos duplicados).

export interface Plan {
  id: 'basic' | 'mid' | 'full'
  name: string
  price: string
  tag: string
  featured: boolean
  badge: string | null
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Relevvo BASIC',
    price: '$850.000',
    tag: 'Para marcas que ya venden y quieren crecer',
    featured: false,
    badge: null,
    features: [
      'Hasta 12 piezas estáticas mensuales',
      'Logo básico o ajuste de logo',
      'Mini brand kit',
      'Gestión de redes',
      'Producción ágil de piezas',
      '2 revisiones por pieza',
      'Soporte asincrónico',
    ],
  },
  {
    id: 'mid',
    name: 'Relevvo MID',
    price: '$2.990.000',
    tag: 'Diseño, video, fotografía y comunidad en un solo plan',
    featured: true,
    badge: 'Más popular',
    features: [
      '12 piezas estáticas mensuales',
      'Edición y generación de videos',
      'Branding continuo y coherencia visual',
      'Sesión de fotografía profesional',
      'Producción visual acelerada',
      'Community Manager',
      'Planeación mensual de contenido',
      '3 revisiones por pieza',
    ],
  },
  {
    id: 'full',
    name: 'Relevvo FULL',
    price: '$6.490.000',
    tag: 'Contenido, pauta y campañas con el mismo equipo',
    featured: false,
    badge: 'Premium',
    features: [
      '24 piezas mensuales',
      'Flujo de producción a máxima velocidad',
      'Fotografía profesional',
      'Community Manager dedicado',
      'Gestión de pauta publicitaria',
      'Estrategia de contenido y campañas',
      '4 revisiones por pieza',
    ],
  },
]

// "Arma tu plan" (components/PlanBuilder.tsx): cada opción marcable dice
// cuál es el plan MÁS BAJO que la incluye. La recomendación es el plan más
// alto entre lo marcado. Los planes se tratan como acumulativos (cada uno
// trae lo del anterior); si eso deja de ser cierto comercialmente, este es
// el único lugar a cambiar. Cada `label` tiene respaldo en PLANS arriba.
export interface BuilderOption {
  id: string
  label: string
  minPlan: Plan['id']
}

export interface BuilderGroup {
  title: string
  options: BuilderOption[]
}

export const BUILDER_GROUPS: BuilderGroup[] = [
  {
    title: 'Identidad',
    options: [
      { id: 'logo', label: 'Logo o ajuste de logo', minPlan: 'basic' },
      { id: 'brandkit', label: 'Mini brand kit', minPlan: 'basic' },
      { id: 'branding', label: 'Branding continuo', minPlan: 'mid' },
    ],
  },
  {
    title: 'Contenido',
    options: [
      { id: 'piezas12', label: 'Hasta 12 piezas al mes', minPlan: 'basic' },
      { id: 'piezas24', label: '24 piezas al mes', minPlan: 'full' },
      { id: 'redes', label: 'Gestión de redes', minPlan: 'basic' },
      { id: 'planeacion', label: 'Planeación mensual de contenido', minPlan: 'mid' },
      { id: 'cm', label: 'Community Manager', minPlan: 'mid' },
      { id: 'cm-dedicado', label: 'Community Manager dedicado', minPlan: 'full' },
    ],
  },
  {
    title: 'Foto y video',
    options: [
      { id: 'foto', label: 'Sesión de fotografía', minPlan: 'mid' },
      { id: 'video', label: 'Videos', minPlan: 'mid' },
    ],
  },
  {
    title: 'Pauta y estrategia',
    options: [
      { id: 'pauta', label: 'Pauta publicitaria', minPlan: 'full' },
      { id: 'estrategia', label: 'Estrategia de contenido y campañas', minPlan: 'full' },
    ],
  },
]

// Cifras verificadas en SEO_SEM_RESEARCH.md — no extrapolar ninguna otra
// a partir de estas tres. `short` es la misma cifra abreviada a millones,
// solo para el home (celda angosta, tipografía grande) — /planes tiene
// espacio de sobra y usa `figure` completo. Mismo dato, dos formatos; no
// dos fuentes.
export interface MarketFigure {
  figure: string
  short: string
  desc: string
}

export const MARKET_COMPARISON: MarketFigure[] = [
  { figure: 'Desde $2.300.000', short: 'Desde $2,3M', desc: 'Piso de un plan mensual de agencia en Colombia' },
  { figure: '$2.300.000 – $3.500.000', short: '$2,3M – $3,5M', desc: 'Rango típico de un plan pyme mensual' },
  { figure: '$5.000.000 – $20.000.000', short: '$5M – $20M', desc: 'Branding completo cobrado por proyecto' },
]
