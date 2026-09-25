import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Pricing from '@/components/Pricing'
import PlanBuilder from '@/components/PlanBuilder'
import { PLANS, MARKET_COMPARISON } from '@/lib/planes'

// El layout raíz ya añade " | Relevvo Studio" vía title.template — no
// repetir la marca acá (ver bug ya corregido en /contacto y /referidos).
export const metadata: Metadata = {
  title: 'Planes',
  description:
    `Planes fijos de diseño y marketing digital en Colombia: ${PLANS.map(p => `${p.name.replace('Relevvo ', '')} ${p.price}`).join(', ')}. Sin letra pequeña.`,
  alternates: { canonical: 'https://relevvostudio.com/planes' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://relevvostudio.com/planes',
    title: 'Planes — Relevvo Studio',
    description: 'Planes fijos de diseño y marketing digital en Colombia. Sin letra pequeña.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Planes Relevvo Studio',
  url: 'https://relevvostudio.com/planes',
  itemListElement: PLANS.map(p => ({
    '@type': 'Offer',
    name: p.name,
    description: p.tag,
    price: p.price.replace(/[^\d]/g, ''),
    priceCurrency: 'COP',
  })),
}

// Tabla fila por fila. Cada celda repite textualmente lo que ya dice la
// tarjeta de cada plan (components/Pricing.tsx vía lib/planes.ts) — no se
// afirma que un plan "no tiene" algo que no diga explícitamente; una celda
// vacía solo significa que ese plan no lista esa línea.
const COMPARISON_ROWS: { label: string; values: [string, string, string] }[] = [
  { label: 'Precio', values: [PLANS[0].price + '/mes', PLANS[1].price + '/mes', PLANS[2].price + '/mes'] },
  { label: 'Piezas mensuales', values: ['Hasta 12', '12', '16'] },
  { label: 'Revisiones por pieza', values: ['2', '3', '4'] },
  { label: 'Logo / branding', values: ['Logo básico o ajuste de logo', 'Branding continuo y coherencia visual', '—'] },
  { label: 'Fotografía', values: ['—', 'Sesión de fotografía profesional', 'Fotografía profesional'] },
  { label: 'Video', values: ['—', 'Edición y generación de videos', '—'] },
  { label: 'Community Manager', values: ['—', 'Community Manager', 'Community Manager dedicado'] },
  { label: 'Pauta publicitaria', values: ['—', '—', 'Gestión de pauta publicitaria'] },
  { label: 'Estrategia / campañas', values: ['—', 'Planeación mensual de contenido', 'Estrategia de contenido y campañas'] },
  { label: 'Soporte', values: ['Asincrónico', '—', '—'] },
]

const FAQ_PLANES = [
  {
    q: '¿Puedo cambiar de plan más adelante?',
    a: 'Sí. Puedes subir o bajar de plan de un mes a otro — solo avísanos con unos días de anticipación para ajustar la producción del mes.',
  },
  {
    q: '¿Los precios incluyen IVA?',
    a: 'Los precios mostrados son antes de impuestos. Si tu empresa requiere facturación con IVA, lo indicamos en la cotización formal.',
  },
  {
    q: '¿Hay permanencia mínima?',
    a: 'No. Trabajamos mes a mes. Puedes pausar o terminar cuando quieras, con un mes de aviso.',
  },
  {
    q: '¿Qué pasa si mi proyecto no encaja en ninguno de los tres planes?',
    a: 'Hablamos por WhatsApp y lo ajustamos — los tres planes son el punto de partida, no el límite.',
  },
]

export default function PlanesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(140px, 16vw, 180px) clamp(20px, 5vw, 80px) 0',
        }}
      >
        <span className="section-label">Planes</span>
        <h1 className="type-hero heading-display" style={{ marginBottom: 20, maxWidth: 780 }}>
          Elige tu plan.
        </h1>
        <p className="type-body" style={{ color: 'var(--text-muted)', maxWidth: 620, fontSize: '1.0625rem' }}>
          Tres opciones, cada una con lo que incluye escrito de una vez, más el detalle fila
          por fila para comparar rápido.
        </p>
      </section>

      {/* Reutiliza el mismo componente del home: comparación con el mercado
          + las 3 tarjetas de plan. Fuente única, ver lib/planes.ts. */}
      <PlanBuilder />
      <Pricing />

      {/* ── Tabla comparativa ── */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-label" style={{ justifyContent: 'center' }}>Comparación</span>
          <h2>
            <span className="heading-display" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>
              Plan por{' '}
            </span>
            <span className="heading-serif text-lilac" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}>
              plan.
            </span>
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 620, borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 500, borderBottom: '1px solid var(--border)' }} />
                {PLANS.map(p => (
                  <th
                    key={p.id}
                    style={{
                      textAlign: 'left', padding: '14px 16px',
                      color: p.featured ? 'var(--lilac)' : 'var(--butter)',
                      fontSize: '0.9375rem', fontWeight: 700,
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.875rem', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>
                    {row.label}
                  </td>
                  {row.values.map((v, j) => (
                    <td key={j} style={{ padding: '14px 16px', color: v === '—' ? 'rgba(245,242,201,0.28)' : 'var(--text)', fontSize: '0.875rem', borderBottom: '1px solid var(--border)' }}>
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ de precios ──
          Local a esta página, no reutiliza lib/faq.ts a propósito: esa
          fuente alimenta el FAQPage schema del home y se mantiene libre de
          cifras (ver ESTADO.md). Acá sí hablamos de precios directamente. */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label" style={{ justifyContent: 'center' }}>Preguntas sobre precios</span>
          <h2>
            <span className="heading-display" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
              Antes de{' '}
            </span>
            <span className="heading-serif text-lilac" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
              escribirnos.
            </span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQ_PLANES.map((item, i) => (
            <details key={i} className="card" style={{ padding: '18px 22px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9375rem', listStyle: 'none', color: 'var(--butter)' }}>
                {item.q}
              </summary>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 12, lineHeight: 1.65 }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-24 px-4 text-center max-w-2xl mx-auto">
        <h2 className="mb-6">
          <span className="heading-display block" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            ¿Cuál plan es
          </span>
          <span className="heading-serif text-lilac block" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            para tu marca?
          </span>
        </h2>
        <p className="text-muted mb-10 max-w-md mx-auto">
          Cuéntanos qué necesitas y te decimos, sin rodeos, cuál plan encaja.
        </p>
        <Link href="/contacto" className="btn-primary btn-glow inline-flex items-center px-8 py-3.5">
          Hablemos de tu proyecto
        </Link>
      </section>

      <Footer />
    </main>
  )
}
