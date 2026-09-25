import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICIOS } from '@/lib/servicios'
import { PLANS } from '@/lib/planes'

// El layout raíz ya añade " | Relevvo Studio" vía title.template — no
// repetir la marca acá (mismo bug ya corregido en /contacto, /planes).
export const metadata: Metadata = {
  title: 'Servicios',
  description: 'Branding, diseño web, redes sociales y contenido con IA en Colombia. Planes mensuales fijos, sin cotización por proyecto.',
  alternates: { canonical: 'https://relevvostudio.com/servicios' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://relevvostudio.com/servicios',
    title: 'Servicios — Relevvo Studio',
    description: 'Branding, diseño web, redes sociales y contenido con IA en Colombia.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Servicios de Relevvo Studio',
  itemListElement: SERVICIOS.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.h1,
    url: `https://relevvostudio.com/servicios/${s.slug}`,
  })),
}

export default function ServiciosHubPage() {
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
          padding: 'clamp(140px, 16vw, 180px) clamp(20px, 5vw, 80px) clamp(80px, 10vw, 104px)',
        }}
      >
        <span className="section-label">Servicios</span>
        <h1 className="type-hero heading-display" style={{ marginBottom: 20, maxWidth: 780 }}>
          Cuatro formas de construir tu marca.
        </h1>
        <p className="type-body" style={{ color: 'var(--text-muted)', maxWidth: 620, marginBottom: 64, fontSize: '1.0625rem' }}>
          Todo bajo el mismo equipo, la misma identidad y un plan mensual fijo desde{' '}
          {PLANS[0].price} COP/mes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
          {SERVICIOS.map(s => (
            <Link
              key={s.slug}
              href={`/servicios/${s.slug}`}
              className="card"
              style={{ padding: 'clamp(28px, 3vw, 36px)', textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <p className="type-heading text-butter" style={{ marginBottom: 10, fontSize: '1.25rem' }}>{s.h1}</p>
              <p className="type-body" style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: 16 }}>{s.problemaHeading}</p>
              <span style={{ color: 'var(--lilac)', fontSize: '0.875rem', fontWeight: 600 }}>Ver servicio →</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
