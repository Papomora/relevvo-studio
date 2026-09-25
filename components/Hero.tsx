'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'
import { ButtonColorful } from '@/components/ui/button-colorful'

gsap.registerPlugin(useGSAP)

// Miniaturas de trabajo real (mismos assets que el Portafolio).
const THUMBS: { src: string; label: string; client: string; position?: string }[] = [
  { src: '/clientes/masbrownie/banner1.png',         label: 'Producto',   client: 'Más Brownie' },
  { src: '/clientes/masbrownie/banner2.png',         label: 'Visuales',   client: 'Más Brownie' },
  { src: '/images/nosotros/cliente-logo-word.png',   label: 'Social',     client: 'Relevvo Studio', position: 'center 35%' },
  { src: '/clientes/masbrownie/banner3.png',         label: 'Campaña',    client: 'Más Brownie' },
]

// ── Hanzo-style clip reveal: line slides up from hidden bottom ──
function RevealLine({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const innerRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(innerRef.current, { y: '105%', duration: 1.0, ease: 'power4.out', delay })
    })
  }, { dependencies: [delay] })

  // <span display:block> en vez de <div>: se ve igual, pero permite anidar
  // este helper dentro de un <h1> sin producir HTML inválido.
  return (
    <span style={{ overflow: 'hidden', display: 'block', ...style }} className={className}>
      <span ref={innerRef} style={{ display: 'block' }}>{children}</span>
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLDivElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const thumbsRef  = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)

  // useGSAP revierte todos los tweens (incluido el glow infinito) al desmontar.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Fade-ins after the line reveals
      gsap.from(badgeRef.current,  { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 })
      gsap.from(subRef.current,    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.1 })
      gsap.from(ctasRef.current,   { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.25 })
      gsap.from(thumbsRef.current, { y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.4 })

      // Ambient glow pulse
      gsap.to(glowRef.current, { scale: 1.18, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'calc(40px + 68px + 40px)', /* bar + nav + spacing */
        paddingBottom: '60px',
        paddingLeft: 'clamp(20px, 5vw, 80px)',
        paddingRight: 'clamp(20px, 5vw, 80px)',
        maxWidth: 1320,
        margin: '0 auto',
      }}
    >
      {/* Bottom fade — removed to avoid hard cuts */}

      {/* Ambient glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: 600, height: 600, borderRadius: '50%',
          top: '30%', left: '60%', transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)',
          willChange: 'transform',
          zIndex: 0,
        }}
      />

      {/* ── Badge (sin escasez inventada) ── */}
      <div ref={badgeRef} className="mb-8" style={{ position: 'relative', zIndex: 2 }}>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(167,139,250,0.1)',
            border: '1px solid rgba(167,139,250,0.3)',
            borderRadius: 100, padding: '6px 16px',
            fontSize: '0.75rem', fontWeight: 700, color: '#C4B5FD',
            letterSpacing: '0.04em',
          }}
        >
          <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: '#A78BFA' }} />
          Estudio creativo en Colombia y México
        </span>
      </div>

      {/* ── Giant stacked headline (Hanzo-style) ──
          Un solo <h1> por página: las tres líneas son <span> dentro del mismo
          heading. Antes eran tres <h1> hermanos y Google leía tres títulos. */}
      <h1 style={{ position: 'relative', zIndex: 2, margin: '0 0 32px' }}>

        <RevealLine delay={0.15}>
          <span
            className="heading-display text-white hero-headline"
            style={{
              display: 'block',
              fontSize: 'clamp(4rem, 11vw, 10.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              fontWeight: 900,
            }}
          >
            Branding,
          </span>
        </RevealLine>

        <RevealLine delay={0.28}>
          <span
            className="heading-serif text-white hero-headline"
            style={{
              display: 'block',
              fontSize: 'clamp(4rem, 11vw, 10.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            contenido y
          </span>
        </RevealLine>

        <RevealLine delay={0.42}>
          <span
            className="heading-display hero-headline"
            style={{
              display: 'block',
              fontSize: 'clamp(4rem, 11vw, 10.5rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              fontWeight: 900,
              background: 'linear-gradient(135deg, rgba(124,58,237,0.9) 0%, rgba(167,139,250,0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            fotografía.
          </span>
        </RevealLine>

      </h1>

      {/* ── Sub + CTAs row ── */}
      <div
        ref={subRef}
        className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start md:items-end gap-6 md:gap-10"
        style={{
          position: 'relative', zIndex: 2,
          marginBottom: 56,
        }}
      >
        <p style={{ fontSize: '1.125rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)', maxWidth: 440 }}>
          Todo hecho por nuestro equipo, con fotografía propia y un plan mensual fijo: sin cotizaciones sorpresa ni cobros por revisión.
        </p>

        <div ref={ctasRef} style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
          <Link href={WA_URL} target="_blank" rel="noopener noreferrer">
            <ButtonColorful label="Hablemos hoy" />
          </Link>
          <Link
            href="/#planes"
            className="btn-secondary"
            style={{ padding: '13px 28px', borderRadius: '100px', fontSize: '0.9375rem' }}
          >
            Ver planes
          </Link>
        </div>
      </div>

      {/* ── Miniaturas de trabajo real → llevan al portafolio ── */}
      <div
        ref={thumbsRef}
        className="thumbs-scroll"
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: 12,
        }}
      >
        {THUMBS.map((thumb, i) => (
          <a
            key={thumb.src}
            href="/#portafolio"
            className={`thumb-card${i === 0 ? ' thumb-card--wide' : ''}`}
            aria-label={`${thumb.label}: ${thumb.client} — ver en el portafolio`}
          >
            <Image
              src={thumb.src}
              alt=""
              fill
              sizes="(max-width: 767px) 160px, 260px"
              style={{ objectFit: 'cover', objectPosition: thumb.position ?? 'center' }}
            />
            <span className="thumb-shade" aria-hidden="true" />
            <span className="thumb-label">
              <span className="thumb-kind">{thumb.label}</span>
              <span className="thumb-client">{thumb.client}</span>
            </span>
          </a>
        ))}
      </div>

      <style jsx>{`
        .thumb-card {
          position: relative;
          flex: 1 0 auto;
          min-width: 96px;
          height: 120px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          display: block;
          transition: transform .3s ease, border-color .3s ease;
        }
        .thumb-card--wide { flex: 2 0 auto; }
        .thumb-card :global(img) { transition: transform .5s ease; }
        .thumb-card:hover,
        .thumb-card:focus-visible {
          transform: translateY(-3px);
          border-color: rgba(167,139,250,0.6);
        }
        .thumb-card:hover :global(img) { transform: scale(1.05); }
        .thumb-card:focus-visible { outline: 2px solid #A78BFA; outline-offset: 3px; }
        .thumb-shade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.78) 100%);
          pointer-events: none;
        }
        .thumb-label {
          position: absolute; left: 12px; right: 12px; bottom: 10px;
          display: flex; flex-direction: column; gap: 2px;
          font-family: var(--font-inter);
        }
        .thumb-kind {
          font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #fff;
        }
        .thumb-client { font-size: 0.75rem; color: rgba(255,255,255,0.8); }
        @media (prefers-reduced-motion: reduce) {
          .thumb-card, .thumb-card :global(img) { transition: none; }
          .thumb-card:hover, .thumb-card:hover :global(img) { transform: none; }
        }
        @media (max-width: 480px) {
          .hero-headline { font-size: clamp(2.75rem, 15vw, 4rem) !important; }
        }
        @media (max-width: 767px) {
          .thumbs-scroll {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x proximity;
            margin: 0 -20px;
            padding: 0 20px 4px;
            mask-image: linear-gradient(90deg, transparent 0, black 12px, black calc(100% - 12px), transparent 100%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0, black 12px, black calc(100% - 12px), transparent 100%);
          }
          .thumb-card { min-width: 128px; scroll-snap-align: start; }
        }
      `}</style>
    </section>
  )
}
