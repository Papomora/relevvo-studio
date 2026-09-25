'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const STEPS = [
  {
    n: '01',
    title: 'Suscríbete con claridad',
    desc: 'Elige un plan mensual y centraliza todos tus requerimientos en un único flujo. Sin costos ocultos, sin contratos eternos.',
  },
  {
    n: '02',
    title: 'Recibe con velocidad',
    desc: 'Entregas ágiles, procesos claros, priorización según impacto.',
  },
  {
    n: '03',
    title: 'Ajustamos todo',
    desc: 'Iteramos contigo hasta que cada entrega esté alineada al 100% con lo que tu marca necesita.',
  },
]

export default function Proceso() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLOListElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
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
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-6xl mx-auto">

      {/* ── Heading ── */}
      <div ref={headingRef} className="flex flex-wrap items-end justify-between gap-5 mb-[52px]">
        <div>
          <span className="section-label">Proceso</span>
          <h2
            className="heading-display mt-[18px]"
            style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.035em' }}
          >
            Solicita <span className="heading-serif text-lilac">sin fricción.</span>
          </h2>
        </div>
        <p className="text-muted text-base leading-relaxed max-w-[40ch]">
          Pide diseños, piezas estratégicas o ajustes cuando los necesites.
          Entendemos tu contexto, tu marca y tus metas antes de ejecutar.
        </p>
      </div>

      {/* ── Pasos: columnas con filete mantequilla ── */}
      <ol ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-[clamp(20px,3vw,40px)]">
        {STEPS.map((step, i) => (
          <li key={step.n} className="proc-card border-t-2 border-butter pt-[22px] flex flex-col">
            <span
              className="font-display font-extrabold text-grape"
              style={{ fontSize: '4.6rem', lineHeight: 0.9, letterSpacing: '-0.05em' }}
            >
              {step.n}
            </span>
            <h3
              className="font-display font-semibold text-butter mt-3.5 mb-2"
              style={{ fontSize: '1.35rem', lineHeight: 1.25, letterSpacing: '-0.02em' }}
            >
              {step.title}
            </h3>
            <p className="text-muted leading-relaxed">{step.desc}</p>

            {i === 0 && (
              <div className="flex gap-2 mt-5 flex-wrap">
                {['Plan BASIC', 'Plan MID', 'Plan FULL'].map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] px-3 py-1 rounded-full border border-[color:var(--border-hover)] text-butter-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {i === 2 && (
              <Link
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary self-start inline-flex items-center gap-2 text-sm px-6 py-3 mt-5"
                data-cursor
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
                Escríbenos ahora
              </Link>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
