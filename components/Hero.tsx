'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { ButtonColorful } from '@/components/ui/button-colorful'

// ── Hanzo-style clip reveal: line slides up from hidden bottom ──
function RevealLine({ children, delay = 0, className = '', style = {} }: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!innerRef.current) return
    gsap.from(innerRef.current, {
      y: '105%',
      duration: 1.0,
      ease: 'power4.out',
      delay,
    })
  }, [delay])

  // <span display:block> en vez de <div>: se ve igual, pero permite anidar
  // este helper dentro de un <h1> sin producir HTML inválido.
  return (
    <span ref={wrapRef} style={{ overflow: 'hidden', display: 'block', ...style }} className={className}>
      <span ref={innerRef} style={{ display: 'block' }}>{children}</span>
    </span>
  )
}

export default function Hero() {
  const badgeRef   = useRef<HTMLDivElement>(null)
  const subRef     = useRef<HTMLDivElement>(null)
  const ctasRef    = useRef<HTMLDivElement>(null)
  const thumbsRef  = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Fade-ins after the line reveals
    gsap.from(badgeRef.current,  { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 })
    gsap.from(subRef.current,    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.1 })
    gsap.from(ctasRef.current,   { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.25 })
    gsap.from(thumbsRef.current, { y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.4 })

    // Ambient glow pulse
    gsap.to(glowRef.current, { scale: 1.18, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  }, [])

  return (
    <section
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

      {/* ── Booking badge ── */}
      <div ref={badgeRef} className="mb-8" style={{ position: 'relative', zIndex: 2 }}>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(65,229,117,0.1)',
            border: '1px solid rgba(65,229,117,0.25)',
            borderRadius: 100, padding: '6px 16px',
            fontSize: '0.75rem', fontWeight: 700, color: '#41E575',
            letterSpacing: '0.04em',
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#41E575', animation: 'pulse 2s ease-in-out infinite' }} />
          Cupos abiertos — solo 3 marcas este mes
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
            Diseño
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
            sin límites.
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
            Resultados.
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
        <p style={{ fontSize: '1.125rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.52)', maxWidth: 420 }}>
          Branding, contenido y fotografía propia, todo bajo un mismo techo. Plan mensual fijo, sin cotizaciones sorpresa ni cobros por revisión.
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

      {/* ── Hanzo-style project thumbnails row ── */}
      <div
        ref={thumbsRef}
        className="thumbs-scroll"
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', gap: 12,
        }}
      >
        {[
          { label: 'Branding',   accent: '#7C3AED', emoji: '🎨' },
          { label: 'Social',     accent: '#41E575', emoji: '📱' },
          { label: 'Ecommerce',  accent: '#FFB0CD', emoji: '🛒' },
          { label: 'Campañas',   accent: '#F59E0B', emoji: '📈' },
          { label: 'Fotografía', accent: '#A78BFA', emoji: '📸' },
        ].map((thumb, i) => (
          <div
            key={i}
            className="thumb-card"
            style={{
              flex: i === 0 ? '2 0 auto' : '1 0 auto',
              height: 120,
              borderRadius: 16,
              background: `linear-gradient(135deg, ${thumb.accent}22 0%, ${thumb.accent}0a 100%)`,
              border: `1px solid ${thumb.accent}35`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '16px',
              transition: 'transform .3s ease, border-color .3s, background .3s',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(-3px)'
              el.style.borderColor = `${thumb.accent}70`
              el.style.background = `linear-gradient(135deg, ${thumb.accent}33 0%, ${thumb.accent}15 100%)`
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'translateY(0)'
              el.style.borderColor = `${thumb.accent}35`
              el.style.background = `linear-gradient(135deg, ${thumb.accent}22 0%, ${thumb.accent}0a 100%)`
            }}
          >
            <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{thumb.emoji}</span>
            <span style={{
              fontSize: '0.6875rem', fontWeight: 700,
              color: thumb.accent,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'var(--font-inter)',
            }}>{thumb.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        .thumb-card { min-width: 96px; }
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
