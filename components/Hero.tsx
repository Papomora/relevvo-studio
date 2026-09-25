'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

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

  // useGSAP revierte todos los tweens al desmontar.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Fade-ins after the line reveals
      gsap.from(badgeRef.current,  { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 })
      gsap.from(subRef.current,    { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.1 })
      gsap.from(ctasRef.current,   { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.25 })
      gsap.from(thumbsRef.current, { y: 32, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 1.4 })
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
      {/* ── Badge (sin escasez inventada) ── */}
      <div ref={badgeRef} className="mb-8" style={{ position: 'relative', zIndex: 2 }}>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--border)',
            borderRadius: 100, padding: '6px 14px',
            fontSize: '0.8125rem', fontWeight: 500, color: 'var(--butter-dim)',
          }}
        >
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--lilac)' }} />
          Estudio creativo en Colombia y México
        </span>
      </div>

      {/* ── Giant stacked headline (Hanzo-style) ──
          Un solo <h1> por página: las tres líneas son <span> dentro del mismo
          heading. Antes eran tres <h1> hermanos y Google leía tres títulos. */}
      <h1 style={{ position: 'relative', zIndex: 2, margin: '0 0 32px' }}>

        <RevealLine delay={0.15}>
          <span className="heading-display hero-headline hero-line">
            Branding,
            {/* Decorativa: el mismo empaque aparece en las miniaturas; con
                aria-hidden el nombre accesible del <h1> queda limpio. */}
            <span className="hero-pill" aria-hidden="true" />
          </span>
        </RevealLine>

        <RevealLine delay={0.28}>
          <span className="heading-serif hero-headline hero-line hero-serif">
            contenido y
          </span>
        </RevealLine>

        <RevealLine delay={0.42}>
          <span className="heading-display hero-headline hero-line">
            <span className="hero-mark">fotografía.</span>
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
        <p style={{ fontSize: '1.125rem', lineHeight: 1.65, color: 'var(--text)', maxWidth: 440 }}>
          Todo hecho por nuestro equipo, con fotografía propia y un plan mensual fijo: sin cotizaciones sorpresa ni cobros por revisión.
        </p>

        <div ref={ctasRef} style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ gap: 10, padding: '14px 24px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flex: 'none' }}>
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />
            </svg>
            Hablemos hoy
          </Link>
          <Link
            href="/#planes"
            className="btn-secondary"
            style={{ padding: '14px 24px', borderRadius: '100px', fontSize: '0.9375rem' }}
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
        .hero-line {
          display: block;
          font-size: clamp(3.3rem, 10.6vw, 10rem);
          line-height: 0.9;
          letter-spacing: -0.035em;
          font-weight: 800;
          color: var(--butter);
          padding-bottom: 0.04em;
        }
        .hero-serif {
          color: var(--lilac);
          font-weight: 400;
          font-size: clamp(3.37rem, 10.8vw, 10.2rem);
          letter-spacing: -0.03em;
        }
        .hero-pill {
          display: inline-block;
          vertical-align: 0.08em;
          width: 0.95em;
          height: 0.62em;
          margin-left: 0.12em;
          border-radius: 999px;
          background: url('/clientes/masbrownie/banner2.png') center 40% / cover no-repeat, var(--night-3);
        }
        .hero-mark {
          display: inline-block;
          margin-top: 0.1em;
          line-height: 0.95;
          padding: 0 0.12em;
          border-radius: 0.08em;
          background: var(--grape);
          color: var(--butter);
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
        }
        .thumb-card {
          position: relative;
          flex: 1 0 auto;
          min-width: 96px;
          height: 120px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--night-2);
          display: block;
          transition: transform .3s ease, border-color .3s ease;
        }
        .thumb-card--wide { flex: 2 0 auto; }
        .thumb-card :global(img) { transition: transform .5s ease; }
        .thumb-card:hover,
        .thumb-card:focus-visible {
          transform: translateY(-3px);
          border-color: var(--border-hover);
        }
        .thumb-card:hover :global(img) { transform: scale(1.05); }
        .thumb-card:focus-visible { outline: 2px solid var(--butter); outline-offset: 3px; }
        .thumb-shade {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(18,14,24,0) 35%, rgba(18,14,24,0.8) 100%);
          pointer-events: none;
        }
        .thumb-label {
          position: absolute; left: 12px; right: 12px; bottom: 10px;
          display: flex; flex-direction: column; gap: 2px;
          font-family: ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace;
          font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--butter);
          text-shadow: 0 1px 8px rgba(0,0,0,0.65);
        }
        .thumb-kind { color: var(--butter); }
        .thumb-client { color: var(--butter-dim); }
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
