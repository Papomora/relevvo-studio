'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const features = [
  {
    icon: '⬛',
    title: 'Figma en tiempo real',
    desc: 'Sigue el trabajo directamente en Figma, comenta sobre el archivo y visualiza avances en vivo.',
  },
  {
    icon: '⚡',
    title: 'Entrega ágil y continua',
    desc: 'Recibe entregas constantes, con prioridades claras y sin perder el ritmo del día a día de tu negocio.',
  },
  {
    icon: '💱',
    title: 'Tarifa mensual clara',
    desc: 'Sin sorpresas y con control total de tu inversión desde el primer mes.',
  },
  {
    icon: '🎉',
    title: 'Diseño con impacto real',
    desc: 'Diseñamos para vender, posicionar tu marca y mejorar la experiencia de tus clientes.',
  },
  {
    icon: '✏️',
    title: 'Iteración continua',
    desc: 'Refinamos cada pieza las veces que haga falta hasta que cumpla el objetivo definido.',
  },
  {
    icon: '📁',
    title: 'Revisión continua',
    desc: 'Lideramos cada entrega contigo hasta que cumplas el objetivo definido.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })
    const items = gridRef.current?.children
    if (items) {
      gsap.from(Array.from(items), {
        y: 40, duration: 0.6, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto text-center">
      <div ref={headingRef}>
        <span className="pill-badge mb-6 inline-flex">Features</span>

        <h2 className="mb-5">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Razones por las que{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            nos amarás.
          </span>
        </h2>

        <p className="text-white/55 text-lg mb-16 max-w-xl mx-auto leading-relaxed">
          Después de Relevvo, no vuelves a contratar diseño.<br />
          Tomas decisiones con método, claridad y resultados.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-4 p-8 card"
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="text-3xl mb-1">{f.icon}</span>
            <h3 className="font-display font-bold text-lg text-white">{f.title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
