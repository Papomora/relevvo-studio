import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/contacto/ContactForm'
import { WA_URL, INSTAGRAM_URL, CONTACT_EMAIL } from '@/lib/constants'

// El layout raíz ya añade " | Relevvo Studio" vía title.template — no
// repetir el nombre de marca aquí (lo hacía y salía duplicado en <title>).
export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Cuéntanos tu proyecto de branding, diseño o marketing digital. Respondemos el mismo día hábil.',
  alternates: { canonical: 'https://relevvostudio.com/contacto' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://relevvostudio.com/contacto',
    title: 'Contacto — Relevvo Studio',
    description: 'Cuéntanos tu proyecto. Respondemos el mismo día hábil.',
  },
}

const FAQ_CONTACTO = [
  {
    q: '¿Cuánto tardan en responder?',
    a: 'El mismo día hábil, casi siempre en menos de 4 horas. Si escribes un viernes en la tarde, respondemos el lunes a primera hora.',
  },
  {
    q: '¿Qué formas de pago manejan?',
    a: 'Transferencia bancaria o pago electrónico en Colombia. Para proyectos mensuales, facturamos por adelantado; para proyectos únicos, 50% al iniciar y 50% contra entrega.',
  },
  {
    q: '¿Hay permanencia mínima?',
    a: 'No. Trabajamos mes a mes en los planes de acompañamiento continuo. Puedes pausar o terminar cuando quieras, con un mes de aviso.',
  },
]

function IconWhatsApp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.5 8.5 0 0 1-12.9 7.3L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5Z" />
      <path d="M8.5 10.5c0 3 2.5 5.5 5.5 5.5" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}
function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CanalCard({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <div className="card" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14, height: '100%' }}>
        <div style={{ color: 'var(--lilac)', flexShrink: 0 }}>{icon}</div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</p>
          <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--butter)' }}>{value}</p>
        </div>
      </div>
    </a>
  )
}

export default function ContactoPage() {
  return (
    <main>
      <Navbar />

      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: 'clamp(140px, 16vw, 180px) clamp(20px, 5vw, 80px) clamp(80px, 10vw, 104px)',
        }}
      >
        <span className="section-label">Contacto</span>
        <h1 className="type-hero heading-display" style={{ marginBottom: 20, maxWidth: 780 }}>
          Cuéntanos tu proyecto.
        </h1>
        <p className="type-body" style={{ color: 'var(--text-muted)', maxWidth: 560, marginBottom: 64, fontSize: '1.0625rem' }}>
          Respondemos el mismo día hábil. Sin formularios eternos ni respuestas automáticas genéricas — lee un humano y contesta un humano.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]" style={{ gap: 'clamp(40px, 6vw, 80px)' }}>
          {/* ── Formulario ── */}
          <div>
            <ContactForm />
          </div>

          {/* ── Canales + privacidad ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div>
              <p className="section-label" style={{ marginBottom: 16 }}>Canales directos</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <CanalCard icon={<IconWhatsApp />} label="WhatsApp" value="+57 322 309 4005" href={WA_URL} />
                <CanalCard icon={<IconMail />} label="Correo" value={CONTACT_EMAIL} href={`mailto:${CONTACT_EMAIL}`} />
                <CanalCard icon={<IconInstagram />} label="Instagram" value="@relevvo_studio" href={INSTAGRAM_URL} />
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Tus datos solo se usan para responder tu mensaje — no los compartimos ni los usamos para nada más.
            </p>
          </div>
        </div>

        {/* ── FAQ corta ── */}
        <div style={{ marginTop: 'clamp(80px, 10vw, 104px)', maxWidth: 720 }}>
          <p className="section-label" style={{ marginBottom: 24 }}>Preguntas rápidas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {FAQ_CONTACTO.map((item, i) => (
              <details key={i} className="card" style={{ padding: '18px 22px', marginBottom: 12 }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9375rem', listStyle: 'none', color: 'var(--butter)' }}>
                  {item.q}
                </summary>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 12, lineHeight: 1.65 }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
