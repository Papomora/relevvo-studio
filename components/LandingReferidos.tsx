'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const WA_BASE = 'https://wa.me/573223094005'
const WA_REFERIDO = `${WA_BASE}?text=Hola%2C%20quiero%20unirme%20al%20programa%20de%20referidos%20de%20Relevvo%20Studio`

const plans = [
  { name: 'BASIC',  price: '$700.000',    commission: '$30.000',   pct: 4.3,   color: 'from-violet-600/20 to-purple-900/10',  border: 'rgba(124,58,237,0.3)' },
  { name: 'MID',    price: '$1.990.000',  commission: '$99.500',   pct: 5,  color: 'from-violet-500/30 to-purple-700/15', border: 'rgba(124,58,237,0.55)', featured: true },
  { name: 'FULL',   price: '$3.990.000',  commission: '$399.000',  pct: 10, color: 'from-violet-700/20 to-indigo-900/10', border: 'rgba(124,58,237,0.3)' },
]

const steps = [
  {
    num: '01',
    title: 'Vos referís',
    desc: 'Tu cliente necesita diseño, branding o contenido. Nos lo pasás por WhatsApp, email o formulario. Un mensaje es suficiente.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 C10.3 4 4 10.3 4 18 C4 20.6 4.7 23 6 25.1 L4 32 L11.1 30.1 C13.2 31.3 15.5 32 18 32 C25.7 32 32 25.7 32 18 C32 10.3 25.7 4 18 4Z" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" fill="rgba(124,58,237,0.12)" strokeLinejoin="round"/>
        <circle cx="12" cy="18" r="1.5" fill="rgba(124,58,237,0.9)"/>
        <circle cx="18" cy="18" r="1.5" fill="rgba(124,58,237,0.9)"/>
        <circle cx="24" cy="18" r="1.5" fill="rgba(124,58,237,0.9)"/>
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Nosotros cerramos',
    desc: 'Presentamos los planes (BASIC $700k, MID $1.990k, FULL $3.990k). Hacemos el seguimiento. El cliente firma directamente con nosotros.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="8" width="24" height="18" rx="4" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" fill="rgba(124,58,237,0.12)"/>
        <path d="M12 16 L16 20 L24 13" stroke="rgba(124,58,237,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 28 L16 28" stroke="rgba(124,58,237,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 28 L26 28" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Vos cobrás',
    desc: 'Tu comisión garantizada llega a tu cuenta el mismo día que el cliente firma. Sin esperas, sin condicionantes, sin excusas.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="10" width="26" height="18" rx="4" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" fill="rgba(124,58,237,0.12)"/>
        <circle cx="18" cy="19" r="4" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5"/>
        <path d="M18 15 L18 13 M18 25 L18 23 M22 19 L24 19 M14 19 L12 19" stroke="rgba(124,58,237,0.6)" strokeWidth="1" strokeLinecap="round"/>
        <path d="M5 15 L31 15" stroke="rgba(124,58,237,0.4)" strokeWidth="1"/>
      </svg>
    ),
  },
]

const targets = [
  {
    emoji: '🏢',
    title: 'Agencias Digitales',
    sub: 'Web, Social, Marketing',
    desc: 'Hacen estrategia pero no tienen diseñadores propios. Su cliente pide branding y ellos no lo hacen.',
    pitch: '"Tu cliente necesita diseño, vos no lo hacés. Nosotros sí. Referís y ganás comisión instantánea."',
    color: 'from-violet-600/15',
  },
  {
    emoji: '💻',
    title: 'Freelancers',
    sub: 'Dev, Copywriter, Consultor',
    desc: 'Especialistas en 1-2 cosas que reciben clientes que piden más servicios de los que ofrecen.',
    pitch: '"Cuando tu cliente quiere diseño además de tu servicio, refierenos. Cobrás comisión sin hacer nada extra."',
    color: 'from-purple-600/15',
  },
  {
    emoji: '🎨',
    title: 'Equipos Creativos',
    sub: 'Empresas medianas saturadas',
    desc: 'Tienen diseñadores pero están a tope de capacidad. Proyectos overflow que no pueden atender.',
    pitch: '"Cada proyecto que no podés hacer es comisión perdida. Referínos y cobrás mensual."',
    color: 'from-indigo-600/15',
  },
  {
    emoji: '🎯',
    title: 'Consultores & Coaches',
    sub: 'Mentores de negocio',
    desc: 'Atienden clientes que necesitan branding, landing pages o contenido visual para crecer.',
    pitch: '"Mejorá el valor de tu servicio refiriendo diseño. Tu cliente queda feliz, vos cobrás."',
    color: 'from-fuchsia-600/15',
  },
]

const faqs = [
  { q: '¿Cuándo cobro?', a: 'El mismo día que el cliente firma el contrato. Sin demoras, sin "cuando pague el cliente".' },
  { q: '¿Mi cliente se entera que yo cobro comisión?', a: 'No, a menos que vos lo cuentes. Es 100% confidencial entre nosotros.' },
  { q: '¿Hay límite de referidos?', a: 'No. Referí cuanto quieras. Cada cliente que firma = nueva comisión para vos.' },
  { q: '¿Qué pasa si el cliente cancela al mes 2?', a: 'Tu comisión ya fue pagada el día que firmó. No hay reembolso, no perdés nada.' },
  { q: '¿Necesito suscribirme o pagar algo?', a: 'Cero. Es gratis unirse, gratis referir. Solo ganás.' },
  { q: '¿Es legal? ¿Puedo referir competidores?', a: '100% legal. Es modelo estándar en servicios creativos. Podés referir agencias, competidores, quien sea.' },
]

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M8 3l5 5-5 5"/>
    </svg>
  )
}

export default function LandingReferidos() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)
  const plansRef   = useRef<HTMLDivElement>(null)
  const targetsRef = useRef<HTMLDivElement>(null)
  const faqRef     = useRef<HTMLDivElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  const [activePlan, setActivePlan] = useState(1)
  const [openFaq, setOpenFaq]       = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Hero entrance
    const heroEls = heroRef.current?.querySelectorAll('.hero-el')
    if (heroEls) {
      gsap.from(Array.from(heroEls), {
        y: 50, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.2,
      })
    }

    // Steps
    const stepCards = stepsRef.current?.querySelectorAll('.step-card')
    if (stepCards) {
      gsap.from(Array.from(stepCards), {
        y: 50, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
      })
    }

    // Plans
    const planCards = plansRef.current?.querySelectorAll('.plan-card')
    if (planCards) {
      gsap.from(Array.from(planCards), {
        y: 40, duration: 0.65, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: plansRef.current, start: 'top 82%' },
      })
    }

    // Targets
    const targetCards = targetsRef.current?.querySelectorAll('.target-card')
    if (targetCards) {
      gsap.from(Array.from(targetCards), {
        y: 40, duration: 0.65, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: targetsRef.current, start: 'top 82%' },
      })
    }

    // FAQ + CTA
    gsap.from(faqRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: faqRef.current, start: 'top 82%' },
    })
    gsap.from(ctaRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' },
    })
  }, [])

  return (
    <div style={{ paddingTop: '80px' }}>

      {/* ── HERO ── */}
      <section ref={heroRef} className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-24 max-w-4xl mx-auto">
        <div className="hero-el">
          <span className="pill-badge mb-8 inline-flex">Programa de Referidos</span>
        </div>

        <h1 className="hero-el mb-6">
          <span className="heading-display text-white block" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Gana dinero
          </span>
          <span className="heading-serif text-white block" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            mientras nosotros trabajamos.
          </span>
        </h1>

        <p className="hero-el text-white/55 text-xl leading-relaxed max-w-2xl mb-10">
          ¿Tu cliente pide diseño? Nosotros lo hacemos.
          Vos recibís <strong className="text-white/80">comisión garantizada</strong> el mismo día que firma.
          Sin cuotas, sin MLM, sin B.S.
        </p>

        {/* Commission badges */}
        <div className="hero-el flex flex-wrap justify-center gap-3 mb-10">
          {plans.map((p) => (
            <div key={p.name} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03]">
              <span className="text-white/40 text-xs font-mono">{p.name}</span>
              <span className="text-accent font-bold text-sm">{p.commission}</span>
            </div>
          ))}
        </div>

        <div className="hero-el flex flex-wrap justify-center gap-4">
          <Link href={WA_REFERIDO} target="_blank" rel="noopener noreferrer"
            className="btn-primary btn-glow text-base px-8 py-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Quiero referir clientes
          </Link>
          <a href="#como-funciona" className="btn-secondary text-base px-8 py-4">
            Cómo funciona
          </a>
        </div>

        {/* Trust strip */}
        <div className="hero-el mt-16 flex flex-wrap justify-center gap-x-10 gap-y-3 text-white/35 text-sm">
          {['Comisión garantizada', 'Pago el mismo día', 'Sin límite de referidos', '10+ clientes activos'].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-accent/60" />
              {t}
            </span>
          ))}
        </div>
      </section>

      <hr className="divider-accent max-w-5xl mx-auto" />

      {/* ── CÓMO FUNCIONA ── */}
      <section id="como-funciona" className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Proceso</span>
          <h2>
            <span className="heading-display text-white block" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              3 pasos.
            </span>
            <span className="heading-serif text-white block" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              Eso es todo.
            </span>
          </h2>
        </div>

        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {steps.map((step, i) => (
            <div key={i} className="step-card card p-8 flex flex-col gap-5" style={{ willChange: 'transform' }}>
              <div className="flex items-start justify-between">
                <div>{step.icon}</div>
                <span className="num-display">{step.num}</span>
              </div>
              <div className="divider-accent" />
              <h3 className="heading-display text-white text-xl">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider-accent max-w-5xl mx-auto" />

      {/* ── CALCULADORA DE COMISIONES ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <span className="section-label">Comisiones</span>
        <h2 className="mb-4">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
            ¿Cuánto podés{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
            ganar?
          </span>
        </h2>
        <p className="text-white/50 mb-12 max-w-md mx-auto">
          Elegí el plan que creés que necesita tu cliente y mirá tu comisión exacta.
        </p>

        {/* Plan selector */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {plans.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActivePlan(i)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-250 ${
                activePlan === i
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'border border-white/10 text-white/50 hover:border-white/25 hover:text-white/80'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Active plan detail */}
        <div ref={plansRef}>
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`plan-card transition-all duration-400 ${activePlan === i ? 'block' : 'hidden'}`}
            >
              <div
                className="relative mx-auto max-w-md p-10 rounded-3xl border text-left"
                style={{
                  background: 'rgba(124,58,237,0.07)',
                  border: `1px solid ${p.border}`,
                }}
              >
                {p.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-accent text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Plan más popular
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-white/40 text-xs font-mono mb-1">Relevvo {p.name}</p>
                    <p className="heading-display text-white" style={{ fontSize: '2.2rem' }}>{p.price}</p>
                    <p className="text-white/40 text-sm">/mes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/40 text-xs mb-1">Tu comisión ({p.pct}%)</p>
                    <p className="heading-display text-accent" style={{ fontSize: '2.2rem' }}>{p.commission}</p>
                    <p className="text-white/40 text-xs">pago único</p>
                  </div>
                </div>

                {/* Proyección */}
                <div className="border-t border-white/8 pt-5 grid grid-cols-3 gap-4 text-center">
                  {[1, 3, 5].map((n) => {
                    const val = parseInt(p.commission.replace(/\D/g,'')) * n
                    return (
                      <div key={n}>
                        <p className="text-white/30 text-xs mb-1">{n} ref/mes</p>
                        <p className="text-white font-bold text-sm">${val.toLocaleString('es-CO')}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-sm mt-8">Sin límite — referí 10 clientes al mes si querés.</p>
      </section>

      <hr className="divider-accent max-w-5xl mx-auto" />

      {/* ── ¿PARA QUIÉN? ── */}
      <section className="py-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-label">Referidores</span>
          <h2>
            <span className="heading-display text-white block" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              ¿Esto es para vos
            </span>
            <span className="heading-serif text-white block" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              si sos…
            </span>
          </h2>
        </div>

        <div ref={targetsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
          {targets.map((t, i) => (
            <div
              key={i}
              className="target-card group card p-7 flex flex-col gap-4 overflow-hidden"
              style={{ willChange: 'transform' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${t.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]`} />

              <div className="relative z-10 flex items-center gap-3">
                <span className="text-3xl">{t.emoji}</span>
                <div>
                  <p className="text-white font-bold heading-display text-lg">{t.title}</p>
                  <p className="text-white/40 text-xs">{t.sub}</p>
                </div>
              </div>

              <p className="relative z-10 text-white/55 text-sm leading-relaxed">{t.desc}</p>

              <div className="relative z-10 border-t border-white/6 pt-4">
                <p className="text-accent/80 text-xs italic leading-snug group-hover:text-accent transition-colors duration-300">
                  {t.pitch}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider-accent max-w-5xl mx-auto" />

      {/* ── POR QUÉ RELEVVO ── */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center">
        <span className="section-label">Por qué funciona</span>
        <h2 className="mb-14">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
            No es promesa.
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
            {' '}Es garantía.
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          {[
            { icon: '⚡', title: 'Pago instantáneo', desc: 'El mismo día que firma el cliente. No "cuando pague". No "a fin de mes".' },
            { icon: '📋', title: 'Planes claros', desc: '$700k, $1.990k, $3.990k. Fácil de explicar, fácil de vender.' },
            { icon: '🛡️', title: 'Riesgo cero', desc: 'Si el cliente no paga, ese riesgo lo asumimos nosotros. Vos ya cobraste.' },
            { icon: '🤫', title: 'Confidencial', desc: 'Tu cliente jamás se entera que recibes comisión, a menos que vos lo cuentes.' },
            { icon: '🔁', title: 'Sin cuotas', desc: 'Sin mínimos. Un referido está bien. Cien referidos están mejor.' },
            { icon: '💼', title: 'Portfolio real', desc: 'Vive Metro, Tienda Crusso, Molicie Hogar y más. Tu cliente verá trabajo probado.' },
          ].map((item, i) => (
            <div key={i} className="card p-6 flex flex-col gap-3">
              <span className="text-2xl">{item.icon}</span>
              <h3 className="heading-display text-white text-base">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider-accent max-w-5xl mx-auto" />

      {/* ── FAQ ── */}
      <section ref={faqRef} className="py-24 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-label">FAQ</span>
          <h2>
            <span className="heading-display text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              Preguntas{' '}
            </span>
            <span className="heading-serif text-white" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)' }}>
              frecuentes.
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div key={i} className="card overflow-hidden" style={{ willChange: 'transform' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-7 py-5 flex items-center justify-between gap-4"
              >
                <span className="text-white/85 font-semibold text-sm">{faq.q}</span>
                <span
                  className="text-accent flex-shrink-0 transition-transform duration-300"
                  style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M8 3v10M3 8h10"/>
                  </svg>
                </span>
              </button>
              {openFaq === i && (
                <div className="px-7 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/6 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr className="divider-accent max-w-5xl mx-auto" />

      {/* ── CTA FINAL ── */}
      <section ref={ctaRef} className="py-32 px-4 text-center max-w-3xl mx-auto">
        <span className="pill-badge mb-8 inline-flex">¿Listo para empezar?</span>
        <h2 className="mb-6">
          <span className="heading-display text-white block" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Un mensaje.
          </span>
          <span className="heading-serif text-white block" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Una comisión.
          </span>
        </h2>
        <p className="text-white/50 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
          Escribinos por WhatsApp, contanos quién es tu cliente y nosotros nos encargamos del resto.
          Vos cobrás el mismo día que firma.
        </p>

        <Link href={WA_REFERIDO} target="_blank" rel="noopener noreferrer"
          className="btn-primary btn-glow text-lg px-12 py-5 flex items-center gap-3 mx-auto w-fit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Quiero referir ahora
        </Link>

        <p className="text-white/25 text-sm mt-6">
          O visitá <Link href="/" className="text-accent/60 hover:text-accent transition-colors">relevvostudio.com</Link> para ver el portfolio completo
        </p>
      </section>

    </div>
  )
}
