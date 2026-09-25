'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { DotPattern } from '@/components/ui/dot-pattern'
import { SERVICIOS } from '@/lib/servicios'

export default function Features() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
    })

    const cards = gridRef.current?.querySelectorAll('.feat-card')
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 50, opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          delay: i * 0.07,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
        })
      })
    }
  }, [])

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">

      {/* ── Heading ─────────────────────────────────────────── */}
      <div ref={headingRef} className="mb-14 md:grid md:grid-cols-2 md:gap-16 items-end">
        <div>
          <span className="section-label">Por qué Relevvo</span>
          <h2>
            <span className="heading-display text-white block"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              Razones por las que
            </span>
            <span className="heading-serif text-white block"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              nos amarás.
            </span>
          </h2>
        </div>
        <p className="text-white/60 text-base leading-relaxed mt-6 md:mt-0 md:pb-1">
          Después de Relevvo, no vuelves a contratar diseño de la misma manera.
          Método, claridad y un proceso que ves avanzar.
        </p>
      </div>

      {/* ── Bento grid ──────────────────────────────────────── */}
      {/*
          Desktop layout (5 cols):
          [  01: 3col × 2row  ] [ 02: 2col ]
          [  01 cont.         ] [ 03: 1col ] [ 04: 1col ]
          [ 05: 2col          ] [   06: 3col            ]
      */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 lg:grid-rows-3 gap-3"
      >

        {/* ── 01 — Figma en tiempo real (large hero) ─────── */}
        <div className="feat-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07]
          lg:col-start-1 lg:col-end-4 lg:row-start-1 lg:row-end-3 sm:col-span-2"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: '300px' }}>

          {/* Dot-grid texture */}
          <DotPattern width={22} height={22} cr={0.8} className="opacity-20" />

          {/* Neon glow on hover */}
          <div className="absolute -top-20 left-1/3 w-80 h-80 rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 65%)' }} />

          {/* Bottom gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.6), transparent)' }} />

          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent/35" style={{ letterSpacing: '0.12em' }}>01</span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold"
                  style={{
                    background: 'rgba(34,197,94,0.12)',
                    color: '#4ade80',
                    border: '1px solid rgba(34,197,94,0.25)',
                    letterSpacing: '0.12em',
                  }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              {/* Figma wordmark — no icon AI */}
              <span className="font-mono text-xs text-white/20 group-hover:text-accent/50 transition-colors tracking-widest">
                FIGMA
              </span>
            </div>

            {/* Middle — headline */}
            <div className="my-6">
              <h3 className="heading-display text-white group-hover:text-white transition-colors"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', letterSpacing: '-0.04em', lineHeight: 1.05 }}>
                Figma en<br />tiempo real
              </h3>
              <p className="text-white/60 leading-relaxed mt-3 max-w-xs group-hover:text-white/75 transition-colors duration-300" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
                Sigue el trabajo directamente en Figma, comenta sobre el archivo y visualiza avances en vivo.
              </p>
            </div>

            {/* Bottom — pill tags */}
            <div className="flex gap-2 flex-wrap">
              {['Branding', 'Web', 'Social', 'Motion'].map((tag, i) => (
                <span key={i}
                  className="text-xs font-mono px-3 py-1 rounded-full border border-white/[0.08] text-white/30
                  group-hover:border-accent/30 group-hover:text-white/55 transition-all duration-300"
                  style={{ transitionDelay: `${i * 50}ms` }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 02 — Entrega ágil (wide, 1 row) ───────────── */}
        <div className="feat-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07]
          lg:col-start-4 lg:col-end-6 lg:row-start-1 lg:row-end-2"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: '160px' }}>

          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/25 to-transparent pointer-events-none" />

          {/* Horizontal speed lines */}
          <div className="absolute right-0 top-0 bottom-0 w-24 flex flex-col justify-center gap-1.5 px-3 opacity-20 group-hover:opacity-40 transition-opacity">
            {[100, 70, 90, 50, 80].map((w, i) => (
              <div key={i} className="h-px rounded-full bg-accent"
                style={{ width: `${w}%`, transitionDelay: `${i * 40}ms` }} />
            ))}
          </div>

          <div className="relative z-10 p-7 h-full flex flex-col justify-between">
            <span className="font-mono text-xs text-accent/35" style={{ letterSpacing: '0.12em' }}>02</span>
            <div>
              <h3 className="heading-display text-white mb-2" style={{ fontSize: '1.25rem', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Entrega ágil<br />y continua
              </h3>
              <p className="text-white/60 group-hover:text-white/75 transition-colors" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                Entregas constantes, sin perder el ritmo.
              </p>
            </div>
          </div>
        </div>

        {/* ── 03 — Tarifa clara (small square) ──────────── */}
        <div className="feat-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07]
          lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: '155px' }}>

          <div className="absolute inset-0 bg-gradient-to-br from-violet-800/20 to-transparent pointer-events-none" />

          {/* Big decorative $ */}
          <div className="absolute -bottom-4 -right-2 font-mono font-black text-7xl select-none pointer-events-none
            opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500"
            style={{ color: 'rgba(124,58,237,1)', lineHeight: 1 }}>$</div>

          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <span className="font-mono text-xs text-accent/35" style={{ letterSpacing: '0.12em' }}>03</span>
            <div>
              <h3 className="heading-display text-white mb-2" style={{ fontSize: '1.25rem', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Tarifa mensual clara
              </h3>
              <p className="text-white/60 group-hover:text-white/75 transition-colors" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                Precio fijo publicado. Sin cotizaciones sorpresa.
              </p>
            </div>
          </div>
        </div>

        {/* ── 04 — Diseño con impacto (small square) ─────── */}
        <div className="feat-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07]
          lg:col-start-5 lg:col-end-6 lg:row-start-2 lg:row-end-3"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: '155px' }}>

          <div className="absolute inset-0 bg-gradient-to-br from-purple-700/25 to-violet-900/10 pointer-events-none" />

          {/* Color swatches decorative */}
          <div className="absolute bottom-0 right-0 flex gap-0.5 p-2 opacity-35 group-hover:opacity-70 transition-opacity duration-400">
            {['#7C3AED', '#a78bfa', '#5b21b6', '#2e1065'].map((c, i) => (
              <div key={i} className="w-3.5 h-7 rounded-sm group-hover:scale-y-110 transition-transform duration-300"
                style={{ background: c, transitionDelay: `${i * 40}ms` }} />
            ))}
          </div>

          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
            <span className="font-mono text-xs text-accent/35" style={{ letterSpacing: '0.12em' }}>04</span>
            <div>
              <h3 className="heading-display text-white mb-2" style={{ fontSize: '1.25rem', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Diseño con impacto
              </h3>
              <p className="text-white/60 group-hover:text-white/75 transition-colors" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                Para vender y posicionar.
              </p>
            </div>
          </div>
        </div>

        {/* ── 05 — Revisiones incluidas (2col, 1 row) ───── */}
        <div className="feat-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07]
          lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: '155px' }}>

          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 to-transparent pointer-events-none" />

          {/* Big ↻ background char — no ∞: las revisiones son fijas por plan */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-[7rem] select-none pointer-events-none
            opacity-[0.055] group-hover:opacity-[0.12] transition-opacity duration-500"
            style={{ color: 'rgba(124,58,237,1)', lineHeight: 1, fontFamily: 'var(--font-bricolage)' }}>
            ↻
          </div>

          <div className="relative z-10 p-7 h-full flex flex-col justify-between">
            <span className="font-mono text-xs text-accent/35" style={{ letterSpacing: '0.12em' }}>05</span>
            <div>
              <h3 className="heading-display text-white mb-2" style={{ fontSize: '1.25rem', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Revisiones incluidas
              </h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/75 transition-colors" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                De 2 a 4 revisiones por pieza según tu plan, sin cobros extra.
              </p>
            </div>
          </div>
        </div>

        {/* ── 06 — Siempre a tu lado (3col, 1 row) ──────── */}
        <div className="feat-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07]
          lg:col-start-3 lg:col-end-6 lg:row-start-3 lg:row-end-4 sm:col-span-2"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: '155px' }}>

          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/20 via-purple-900/10 to-transparent pointer-events-none" />

          {/* Chat bubble decorations */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2
            opacity-25 group-hover:opacity-55 transition-opacity duration-500 pointer-events-none">
            <div className="rounded-2xl rounded-tr-sm px-3 py-1.5 text-[11px] font-mono whitespace-nowrap"
              style={{ background: 'rgba(124,58,237,0.45)', color: 'rgba(255,255,255,0.7)' }}>
              ¿Cómo va el logo?
            </div>
            <div className="rounded-2xl rounded-tl-sm px-3 py-1.5 text-[11px] font-mono self-end whitespace-nowrap"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' }}>
              ¡Listo! Revisa Figma 🎨
            </div>
            <div className="rounded-2xl rounded-tr-sm px-3 py-1.5 text-[11px] font-mono"
              style={{ background: 'rgba(124,58,237,0.3)', color: 'rgba(255,255,255,0.7)' }}>
              Perfecto 🔥
            </div>
          </div>

          <div className="relative z-10 p-7 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent/35" style={{ letterSpacing: '0.12em' }}>06</span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-semibold"
                style={{ color: 'rgba(74,222,128,0.8)', letterSpacing: '0.1em' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                EN LÍNEA
              </span>
            </div>
            <div>
              <h3 className="heading-display text-white mb-2" style={{ fontSize: '1.25rem', letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                Siempre a tu lado
              </h3>
              <p className="text-white/60 leading-relaxed group-hover:text-white/75 transition-colors max-w-xs" style={{ fontSize: '0.9rem', lineHeight: 1.65 }}>
                Comunicación directa y un solo equipo para branding, contenido y fotografía.
              </p>
            </div>
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
            className="text-xs font-mono px-4 py-2 rounded-full border border-white/[0.08] text-white/60
              hover:border-accent/40 hover:text-white/80 transition-all duration-300"
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
