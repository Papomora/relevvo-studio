'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { SERVICIOS } from '@/lib/servicios'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const BOX = 'feat-card rounded-[18px] p-[26px] flex flex-col justify-between gap-7 min-h-[210px]'

const BOX_TITLE: React.CSSProperties = {
  fontFamily: 'var(--font-bricolage)',
  fontWeight: 700,
  fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
}

const BIG_N: React.CSSProperties = {
  fontFamily: 'var(--font-bricolage)',
  fontWeight: 800,
  fontSize: '3.4rem',
  lineHeight: 1,
  letterSpacing: '-0.05em',
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(headingRef.current, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
      })

      const cards = gridRef.current?.querySelectorAll('.feat-card')
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 50, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">

      {/* ── Heading ─────────────────────────────────────────── */}
      <div ref={headingRef} className="flex flex-wrap items-end justify-between gap-5 mb-12">
        <div>
          <span className="section-label">Por qué Relevvo</span>
          <h2
            className="heading-display mt-[18px]"
            style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.035em' }}
          >
            Un proceso que <span className="heading-serif text-lilac">ves avanzar.</span>
          </h2>
        </div>
        <p className="text-muted text-base leading-relaxed max-w-[40ch]">
          Después de Relevvo, no vuelves a contratar diseño de la misma manera.
          Método, claridad y un proceso que ves avanzar.
        </p>
      </div>

      {/* ── Bento ──────────────────────────────────────────────
          Desktop (1.4fr 1fr 1fr):
          [ Figma (2 filas) ] [ Revisiones ] [ Precio fijo ]
          [ Figma cont.     ] [ Un solo equipo (2 col)     ]  */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-3.5"
      >
        {/* ── Figma en tiempo real ── */}
        <div className={`${BOX} bg-night-2 border border-[color:var(--border)] text-butter sm:col-span-2 lg:col-span-1 lg:row-span-2`}>
          <div>
            <h3 style={BOX_TITLE}>Figma en tiempo real</h3>
            <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed max-w-sm">
              Sigue el trabajo directamente en Figma, comenta sobre el archivo y visualiza avances en vivo.
            </p>
          </div>
          <div className="grid gap-2 font-mono text-xs" aria-hidden="true">
            <span className="w-max max-w-full rounded-[10px] px-3 py-2 border border-[color:var(--border)] bg-[rgba(245,242,201,0.07)] text-[color:var(--text)]">
              ¿Cómo va el logo?
            </span>
            <span className="w-max max-w-full ml-auto rounded-[10px] px-3 py-2 bg-grape text-butter">
              ¡Listo! Revisa Figma 🎨
            </span>
            <span className="w-max max-w-full rounded-[10px] px-3 py-2 border border-[color:var(--border)] bg-[rgba(245,242,201,0.07)] text-[color:var(--text)]">
              Perfecto 🔥
            </span>
          </div>
        </div>

        {/* ── Revisiones incluidas ── */}
        <div className={`${BOX} bg-butter text-night`}>
          <span style={BIG_N} aria-hidden="true">2–4</span>
          <div>
            <h3 style={BOX_TITLE}>Revisiones incluidas</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">
              De 2 a 4 revisiones por pieza según tu plan, sin cobros extra.
            </p>
          </div>
        </div>

        {/* ── Precio fijo publicado ── */}
        <div className={`${BOX} bg-grape text-butter`}>
          <span style={BIG_N} aria-hidden="true">$</span>
          <div>
            <h3 style={BOX_TITLE}>Precio fijo publicado</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">
              Tarifa mensual clara. Sin cotizaciones sorpresa.
            </p>
          </div>
        </div>

        {/* ── Un solo equipo ── */}
        <div className={`${BOX} bg-night-3 text-butter sm:col-span-2`}>
          <div>
            <h3 style={BOX_TITLE}>Un solo equipo para branding, contenido y fotografía</h3>
            <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">
              Siempre a tu lado: comunicación directa con quien hace el trabajo.
            </p>
          </div>
        </div>
      </div>

      {/* ── Enlaces a las 4 landings de servicio — SEO interno, no
          decorativo: sin esto /servicios/* no recibe enlaces desde el home. ── */}
      <div className="mt-10 flex flex-wrap items-center gap-3">
        {SERVICIOS.map(s => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            className="text-sm font-medium px-4 py-2 rounded-full border border-[color:var(--border-hover)] text-butter
              hover:bg-[rgba(245,242,201,0.08)] transition-colors duration-200
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-butter"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
