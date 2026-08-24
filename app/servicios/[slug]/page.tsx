import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICIOS, PROCESO_GENERICO } from '@/lib/servicios'
import { PLANS } from '@/lib/planes'

export async function generateStaticParams() {
  return SERVICIOS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const servicio = SERVICIOS.find(s => s.slug === params.slug)
  if (!servicio) return { title: 'Servicio no encontrado' }
  return {
    // El layout raíz añade " | Relevvo Studio" — no repetir la marca acá.
    title: servicio.metaTitle,
    description: servicio.metaDescription,
    alternates: { canonical: `https://relevvostudio.com/servicios/${servicio.slug}` },
    openGraph: {
      type: 'website',
      locale: 'es_CO',
      url: `https://relevvostudio.com/servicios/${servicio.slug}`,
      title: `${servicio.metaTitle} — Relevvo Studio`,
      description: servicio.metaDescription,
    },
  }
}

export default function ServicioPage({ params }: { params: { slug: string } }) {
  const servicio = SERVICIOS.find(s => s.slug === params.slug)
  if (!servicio) notFound()

  const BASE = 'https://relevvostudio.com'
  const url = `${BASE}/servicios/${servicio.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: servicio.h1,
        description: servicio.metaDescription,
        provider: { '@id': `${BASE}/#organization` },
        areaServed: { '@type': 'Country', name: 'Colombia' },
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${BASE}/servicios` },
          { '@type': 'ListItem', position: 3, name: servicio.h1, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: servicio.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  }

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
        <span className="section-label">Servicios</span>
        <h1 className="type-hero heading-display" style={{ marginBottom: 20, maxWidth: 780 }}>
          {servicio.h1}
        </h1>
      </section>

      {/* ── El problema ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <p className="type-heading text-white" style={{ marginBottom: 12, fontSize: '1.375rem' }}>
          {servicio.problemaHeading}
        </p>
        <p className="type-body" style={{ color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
          {servicio.problemaBody}
        </p>
      </section>

      {/* ── Qué incluye ── */}
      <section className="py-8 px-4 max-w-3xl mx-auto">
        <span className="section-label" style={{ marginBottom: 20 }}>Qué incluye</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {servicio.incluye.map((item, i) => (
            <div key={i} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                <circle cx="8" cy="8" r="7" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1" />
                <path d="M5 8 L7 10 L11 6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="type-body" style={{ fontSize: '0.9375rem', margin: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Proceso — mismo método en las 4 landings, ver lib/servicios.ts ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <span className="section-label" style={{ marginBottom: 32 }}>Cómo trabajo</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {PROCESO_GENERICO.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, paddingBottom: i < PROCESO_GENERICO.length - 1 ? 32 : 0 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700,
              }}>
                {step.n}
              </div>
              <div>
                <p className="type-heading text-white" style={{ fontSize: '1rem', marginBottom: 6 }}>{step.title}</p>
                <p className="type-body" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Precio ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="card" style={{ padding: 'clamp(28px, 4vw, 40px)', textAlign: 'center' }}>
          <p className="type-body" style={{ color: 'var(--text-muted)', marginBottom: 8, fontSize: '0.875rem' }}>Precio desde</p>
          <p className="heading-display text-white" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: 16 }}>
            {PLANS[0].price} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>COP/mes</span>
          </p>
          <Link href="/planes" className="btn-primary btn-glow" style={{ display: 'inline-flex', padding: '13px 32px' }}>
            Ver todos los planes
          </Link>
        </div>
      </section>

      {/* TODO Fase 4: bloque de casos relacionados → /portafolio/[caso].
          Omitido a propósito: la ruta no existe todavía. No enlazar hasta que exista. */}

      {/* ── FAQ propio ── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <span className="section-label" style={{ marginBottom: 24 }}>Preguntas frecuentes</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {servicio.faq.map((item, i) => (
            <details key={i} className="card" style={{ padding: '18px 22px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9375rem', listStyle: 'none' }}>
                {item.question}
              </summary>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 12, lineHeight: 1.65 }}>
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 text-center max-w-2xl mx-auto">
        <h2 className="mb-6">
          <span className="heading-display text-white block" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            ¿Hablamos de
          </span>
          <span className="heading-serif text-white block" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            tu proyecto?
          </span>
        </h2>
        <Link href="/contacto" className="btn-primary btn-glow inline-flex items-center px-8 py-3.5">
          Contarnos tu proyecto
        </Link>
      </section>

      <Footer />
    </main>
  )
}
