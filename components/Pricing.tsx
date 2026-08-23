'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

const plans = [
  {
    name: 'Relevvo BASIC',
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
    name: 'Relevvo MID',
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
    name: 'Relevvo FULL',
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

export default function Pricing() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const headingRef  = useRef<HTMLDivElement>(null)
  const bannerRef   = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })
    gsap.from(bannerRef.current, {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
      scrollTrigger: { trigger: bannerRef.current, start: 'top 82%' },
    })
    const cards = cardsRef.current?.children
    if (cards) {
      gsap.from(Array.from(cards), {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.18,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
      })
      // Featured card gets extra scale punch
      const featured = cardsRef.current?.querySelector('.plan-featured')
      if (featured) {
        gsap.from(featured, {
          scale: 0.92, duration: 0.9, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
          delay: 0.18,
        })
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="planes" className="py-24 px-4 max-w-5xl mx-auto">

      {/* ── Heading ─────────────────────────────────────────── */}
      <div ref={headingRef} className="text-center mb-10">
        <span className="pill-badge mb-6 inline-flex">Planes de trabajo</span>
        <h2 className="mb-4">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Invierte en tu{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            marca.
          </span>
        </h2>
        <p className="text-white/55 text-lg max-w-xl mx-auto">
          Cada marca tiene necesidades distintas. Por eso trabajamos con presupuestos
          a medida — sin tarifas fijas que limiten tu visión.
        </p>
      </div>

      {/* ── Budget banner ────────────────────────────────────── */}
      <div
        ref={bannerRef}
        className="relative overflow-hidden rounded-2xl border border-accent/25 mb-12 p-8 text-center"
        style={{
          background: 'rgba(124,58,237,0.07)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Glow orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)' }} />

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-accent/70 uppercase tracking-widest">Presupuesto personalizado</span>
          </div>
          <h3 className="heading-display text-white mb-3"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}>
            Tu presupuesto es el punto de partida,<br className="hidden md:block" /> no el límite.
          </h3>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-6">
            Diseñamos propuestas que se ajustan a lo que tienes hoy y a donde quieres llegar.
            Hablemos — sin compromisos, sin plantillas genéricas.
          </p>
          <Link
            href={`${WA_URL.split('?')[0]}?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20presupuesto%20para%20mi%20marca`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-glow inline-flex items-center gap-2 px-8 py-3.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hablemos de tu presupuesto
          </Link>
        </div>
      </div>

      {/* ── Plan cards (sin precios) ─────────────────────────── */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative flex flex-col rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 ${
              plan.featured
                ? 'plan-featured border-accent/50 bg-[rgba(124,58,237,0.07)] shadow-lg shadow-accent/10'
                : 'border-white/[0.07] bg-[rgba(255,255,255,0.03)]'
            }`}
            style={{ padding: '1.75rem' }}
          >
            {/* Badge */}
            <div className="flex justify-start mb-4" style={{ minHeight: '24px' }}>
              {plan.badge && (
                <span className={`text-xs font-semibold px-3 py-0.5 rounded-full ${
                  plan.featured
                    ? 'bg-accent text-white'
                    : 'bg-white/10 text-white/60'
                }`}>
                  {plan.badge}
                </span>
              )}
            </div>

            {/* Plan name */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="heading-display text-white/90 text-sm tracking-wide">{plan.name}</span>
            </div>

            {/* Tag */}
            <p className="text-white/45 text-sm leading-relaxed mb-6 italic">
              "{plan.tag}"
            </p>

            {/* Features */}
            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-white/55">
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="rgba(124,58,237,0.5)" strokeWidth="1" />
                    <path d="M5 8 L7 10 L11 6" stroke="rgba(124,58,237,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <Link
              href={`${WA_URL.split('?')[0]}?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.name)}%2C%20%C2%BFpodr%C3%ADamos%20hablar%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm py-3 flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 ${
                plan.featured
                  ? 'btn-primary btn-glow'
                  : 'btn-secondary'
              }`}
            >
              Consultar este plan
            </Link>
          </div>
        ))}
      </div>

      {/* ── Bottom note ─────────────────────────────────────── */}
      <p className="text-center text-white/30 text-sm">
        Todos los planes incluyen onboarding, estrategia inicial y comunicación directa con el equipo.
        <br />Los precios se definen según el alcance real de tu proyecto.
      </p>
    </section>
  )
}
