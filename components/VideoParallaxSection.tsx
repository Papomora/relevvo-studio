'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Types ─────────────────────────────────────────────────────
interface Props {
  variant?: 'statement' | 'cta' | 'split'
  eyebrow?: string
  headline: string
  subtext?: string
  showCta?: boolean
  minHeight?: string
  // overlay tint — how opaque the dark overlay is
  overlayOpacity?: number
}

// El CTA final del home escribe el titular como texto plano ("Construyamos
// tu marca juntos."). Para el acento serif del mockup se envuelve la última
// palabra; si el titular ya trae HTML propio se respeta tal cual.
function withSerifAccent(headline: string) {
  if (headline.includes('<')) return headline
  const i = headline.trimEnd().lastIndexOf(' ')
  if (i === -1) return headline
  return `${headline.slice(0, i)} <span class="heading-serif text-butter">${headline.slice(i + 1)}</span>`
}

const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'

// ── Component ─────────────────────────────────────────────────
export default function VideoParallaxSection({
  variant     = 'statement',
  eyebrow,
  headline,
  subtext,
  showCta     = false,
  minHeight   = '75vh',
  overlayOpacity = 0.45,
}: Props) {
  const sectionRef  = useRef<HTMLElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLSpanElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef  = useRef<HTMLParagraphElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)

  const isCta = variant === 'cta'

  // useGSAP = gsap.context + revert al desmontar: mata timeline, tweens y
  // ScrollTriggers (antes quedaban vivos tras navegar entre páginas).
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      })

      if (lineRef.current) {
        tl.from(lineRef.current, { scaleX: 0, duration: 0.8, ease: 'power3.out', transformOrigin: 'left' })
      }
      if (eyebrowRef.current) {
        tl.from(eyebrowRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      }
      if (headlineRef.current) {
        tl.from(headlineRef.current, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      }
      if (subtextRef.current) {
        tl.from(subtextRef.current, { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      }
      if (showCta && contentRef.current) {
        const btn = contentRef.current.querySelector('.parallax-cta')
        if (btn) tl.from(btn, { y: 20, opacity: 0, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.3')
      }

      // Parallax sutil: el contenido se desplaza un poco con el scroll.
      // En el bloque CTA sólido se omite: moverlo lo despega del layout.
      if (!isCta) {
        gsap.to(contentRef.current, {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    })
  }, { scope: sectionRef })

  const ctaButton = showCta && (
    <Link
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="parallax-cta btn-primary text-base px-8 py-4 inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-butter"
      data-cursor
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={WA_PATH} />
      </svg>
      Hablemos hoy
    </Link>
  )

  // ── Variante CTA: bloque sólido uva (mockup "home final") ──
  if (isCta) {
    return (
      <section
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24"
      >
        <div
          ref={contentRef}
          className="relative overflow-hidden bg-grape rounded-[28px]"
          style={{ padding: 'clamp(36px, 7vw, 96px) clamp(22px, 5vw, 64px)' }}
        >
          {/* Anillo decorativo mantequilla, muy tenue */}
          <div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              right: '-8%',
              top: '-30%',
              width: 'min(520px, 60vw)',
              aspectRatio: '1 / 1',
              border: 'clamp(40px, 7vw, 90px) solid rgba(245,242,201,0.08)',
            }}
          />

          <div className="relative">
            {eyebrow && (
              <span
                ref={eyebrowRef}
                className="section-label font-mono text-butter"
                style={{ color: 'var(--butter)', marginBottom: 0 }}
              >
                {eyebrow}
              </span>
            )}

            <h2
              ref={headlineRef}
              className="heading-display mt-[18px] mb-7 [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.6rem, 7vw, 6rem)', lineHeight: 0.95, letterSpacing: '-0.035em', fontWeight: 700 }}
              dangerouslySetInnerHTML={{ __html: withSerifAccent(headline) }}
            />

            {subtext && (
              <p
                ref={subtextRef}
                className="text-butter text-lg max-w-[46ch]"
                style={{ opacity: 0.85, marginBottom: showCta ? '2rem' : 0 }}
              >
                {subtext}
              </p>
            )}

            {ctaButton}
          </div>
        </div>
      </section>
    )
  }

  // ── Variantes statement / split (sin uso en el home) ──
  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight }}
    >
      {/* Capa oscura sobre el fondo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `rgba(18,14,24,${overlayOpacity})`, zIndex: 0 }}
      />

      {/* Retícula tenue (profundidad) */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.05 }}>
        {[25, 50, 75].map(pct => (
          <div key={pct} className="absolute w-full h-px bg-butter" style={{ top: `${pct}%` }} />
        ))}
        {[20, 40, 60, 80].map(pct => (
          <div key={pct} className="absolute h-full w-px bg-butter" style={{ left: `${pct}%` }} />
        ))}
      </div>

      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto px-6"
        style={{ willChange: 'transform' }}
      >
        <div
          className="max-w-4xl py-16 px-10 md:px-16 rounded-3xl bg-night-2"
          style={{ border: '1px solid var(--border)' }}
        >
          <div ref={lineRef} className="h-px mb-8 bg-lilac" style={{ width: 60 }} />

          {eyebrow && (
            <span
              ref={eyebrowRef}
              className="font-mono text-xs uppercase block mb-5 text-lilac"
              style={{ letterSpacing: '0.16em' }}
            >
              {eyebrow}
            </span>
          )}

          <h2
            ref={headlineRef}
            className="heading-display mb-6 type-hero"
            dangerouslySetInnerHTML={{ __html: headline }}
          />

          {subtext && (
            <p
              ref={subtextRef}
              className="text-lg leading-relaxed max-w-2xl"
              style={{ color: 'var(--text)', marginBottom: showCta ? '2.5rem' : 0 }}
            >
              {subtext}
            </p>
          )}

          {ctaButton}
        </div>
      </div>
    </section>
  )
}
