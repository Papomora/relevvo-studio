'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Shared typography scale (all bento cards use the same) ──
const CARD_TITLE: React.CSSProperties = {
  fontFamily: 'var(--font-bricolage)',
  fontWeight: 800,
  fontSize: '1.375rem',        // fixed — same on all cards
  letterSpacing: '-0.025em',
  lineHeight: 1.25,
  color: '#fff',
  marginBottom: '0.625rem',
}

const CARD_DESC: React.CSSProperties = {
  fontSize: '0.9375rem',       // fixed — same on all cards
  lineHeight: 1.65,
  color: 'rgba(255,255,255,0.65)',
}

const STEP_NUM: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontWeight: 700,
  fontSize: '0.6875rem',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  color: 'rgba(167,139,250,0.8)',
}

export default function Proceso() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
    })

    const cards = gridRef.current?.querySelectorAll('.proc-card')
    if (cards) {
      gsap.from(Array.from(cards), {
        y: 50, opacity: 0, duration: 0.75, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      })
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">

      {/* ── Heading ── */}
      <div ref={headingRef} className="mb-14 md:grid md:grid-cols-2 md:gap-16 items-end">
        <div>
          <span className="pill-badge mb-6 inline-flex">Proceso</span>
          <h2>
            <span
              className="heading-display text-white block"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}
            >
              Solicita sin
            </span>
            <span
              className="heading-serif text-white block"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 0.95 }}
            >
              fricción
            </span>
          </h2>
        </div>
        <p style={{ ...CARD_DESC, marginTop: '1.5rem' }} className="md:mt-0 md:pb-1">
          Pide diseños, piezas estratégicas o ajustes cuando los necesites.
          Entendemos tu contexto, tu marca y tus metas antes de ejecutar.
        </p>
      </div>

      {/* ── Bento grid ── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
      >

        {/* ── 01 — Suscríbete con claridad (2col wide) ── */}
        <div
          className="proc-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07] sm:col-span-2"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: 220 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-transparent pointer-events-none" />

          {/* Decorative bg number */}
          <div
            className="absolute -right-4 -bottom-6 select-none pointer-events-none opacity-[0.035] group-hover:opacity-[0.07] transition-opacity duration-500"
            style={{ fontSize: '10rem', lineHeight: 1, color: '#7C3AED', fontFamily: 'var(--font-bricolage)', fontWeight: 900 }}
          >
            1
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span style={STEP_NUM}>01</span>
              <span style={{ ...STEP_NUM, color: 'rgba(255,255,255,0.6)' }} className="group-hover:!text-white/70 transition-colors">
                Inicio
              </span>
            </div>

            <div className="mt-8">
              <h3 style={CARD_TITLE}>Suscríbete con claridad</h3>
              <p style={CARD_DESC} className="max-w-sm group-hover:!text-white/80 transition-colors">
                Elige un plan mensual y centraliza todos tus requerimientos en un único flujo.
                Sin costos ocultos, sin contratos eternos.
              </p>
            </div>

            <div className="flex gap-2 mt-6 flex-wrap">
              {['Plan BASIC', 'Plan MID', 'Plan FULL'].map((t, i) => (
                <span
                  key={i}
                  className="group-hover:border-accent/30 group-hover:text-white/80 transition-all duration-300"
                  style={{
                    fontSize: '0.6875rem', fontFamily: 'var(--font-inter)', fontWeight: 600,
                    padding: '4px 12px', borderRadius: 100,
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.6)',
                    transitionDelay: `${i * 40}ms`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── 02 — Recibe con velocidad (1col) ── */}
        <div
          className="proc-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07] sm:col-span-1"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: 220 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-transparent pointer-events-none" />

          <div
            className="absolute bottom-2 right-3 select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-500"
            style={{ fontSize: '7rem', lineHeight: 1, color: '#7C3AED', fontFamily: 'var(--font-bricolage)', fontWeight: 900 }}
          >
            ↑
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col justify-between">
            <span style={STEP_NUM}>02</span>
            <div>
              <h3 style={CARD_TITLE}>Recibe con velocidad</h3>
              <p style={CARD_DESC} className="group-hover:!text-white/80 transition-colors">
                Entregas ágiles, procesos claros, priorización según impacto.
              </p>
            </div>
          </div>
        </div>

        {/* ── 03 — Ajustamos todo (full width) ── */}
        <div
          className="proc-card neon-card group relative overflow-hidden rounded-2xl border border-white/[0.07] sm:col-span-3"
          style={{ background: 'rgba(255,255,255,0.03)', minHeight: 120 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/15 via-purple-900/10 to-transparent pointer-events-none" />

          <div
            className="absolute right-0 top-0 bottom-0 w-40 flex flex-col justify-center gap-2 px-4 opacity-[0.05] group-hover:opacity-[0.11] transition-opacity pointer-events-none"
          >
            {[90, 60, 100, 40, 75, 55].map((w, i) => (
              <div key={i} className="h-px rounded-full bg-accent" style={{ width: `${w}%` }} />
            ))}
          </div>

          <div className="relative z-10 p-8 h-full flex flex-col md:flex-row md:items-center gap-6 justify-between">
            <div className="flex items-start md:items-center gap-6">
              <span style={STEP_NUM} className="flex-shrink-0">03</span>
              <div>
                <h3 style={CARD_TITLE}>Ajustamos todo</h3>
                <p style={CARD_DESC} className="max-w-lg group-hover:!text-white/80 transition-colors">
                  Iteramos contigo hasta que cada entrega esté alineada al 100% con lo que tu marca necesita.
                </p>
              </div>
            </div>

            <Link
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-glow flex-shrink-0 inline-flex items-center gap-2 text-sm px-7 py-3"
              data-cursor
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escríbenos ahora
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
