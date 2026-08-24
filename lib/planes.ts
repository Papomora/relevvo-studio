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
    price: '$700.000',
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
    price: '$1.990.000',
    tag: 'El plan más balanceado y vendible',
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
    price: '$3.990.000',
    tag: 'Para marcas que quieren resultados, no solo contenido',
    featured: false,
    badge: 'Premium',
    features: [
      'Solicitudes de diseño ilimitadas',
      'Flujo de producción a máxima velocidad',
      'Fotografía profesional',
      'Community Manager dedicado',
      'Gestión de pauta publicitaria',
      'Estrategia de contenido y campañas',
      '4 revisiones por pieza',
    ],
  },
]

// Cifras verificadas en SEO_SEM_RESEARCH.md — no extrapolar ninguna otra
// a partir de estas tres.
export interface MarketFigure {
  figure: string
  desc: string
}

export const MARKET_COMPARISON: MarketFigure[] = [
  { figure: 'Desde $2.300.000', desc: 'Piso de un plan mensual de agencia en Colombia' },
  { figure: '$2.300.000 – $3.500.000', desc: 'Rango típico de un plan pyme mensual' },
  { figure: '$5.000.000 – $20.000.000', desc: 'Branding completo cobrado por proyecto' },
]
