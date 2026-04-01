'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const steps = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 8 L20 32 M8 20 L32 20" strokeLinecap="round" />
        <circle cx="20" cy="20" r="12" />
        <path d="M14 14 L26 26 M26 14 L14 26" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Suscríbete con claridad',
    desc: 'Elige un plan mensual y centraliza todos tus requerimientos en un único flujo. Sin costos ocultos, sin contratos eternos.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20 6 L20 34 M12 14 L20 6 L28 14" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 28 L30 28" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    title: 'Recibe con velocidad',
    desc: 'Entregas en tiempos ágiles, con procesos claros y priorización según lo que más impacto genere para tu negocio.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 20 L18 24 L26 16" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="13" />
        <path d="M20 7 L20 4 M20 36 L20 33 M7 20 L4 20 M36 20 L33 20" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    title: 'Ajustamos todo',
    desc: 'Iteramos contigo hasta que cada entrega esté alineada al 100% con lo que tu marca necesita para convertir y crecer.',
  },
]

export default function Proceso() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })

    const cards = cardsRef.current?.children
    if (cards) {
      gsap.from(Array.from(cards), {
        y: 50, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto text-center">
      {/* Badge */}
      <div ref={headingRef}>
        <span className="pill-badge mb-6 inline-flex">Proceso</span>

        <h2 className="mb-5">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Solicita sin{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            fricción
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-white/55 text-lg mb-16 leading-relaxed">
          Pide diseños, piezas estratégicas o ajustes cuando los necesites. En
          Relevvo entendemos tu contexto, tu marca y tus metas antes de ejecutar.
        </p>
      </div>

      {/* Steps */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-4 p-8 card" style={{ willChange: 'transform, opacity' }}>
            <div className="text-white/80 mb-2">{step.icon}</div>
            <h3 className="font-display font-bold text-xl text-white">{step.title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <Link href="#contacto" className="btn-primary text-base px-10 py-4">
        Escríbenos ahora
      </Link>
    </section>
  )
}
