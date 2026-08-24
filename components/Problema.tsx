'use client'

// No tuve acceso al prototipo del artifact citado en el prompt (no puedo
// abrir enlaces de claude.ai/code/artifact desde esta sesión) — el copy de
// abajo es propio, siguiendo el ángulo que sí venía especificado: contratar
// diseño hoy es caro, lento y opaco. Si el prototipo dice otra cosa,
// ajústalo — la estructura (4 dolores, grid 2x2) sí sigue el pedido.

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DOLORES = [
  {
    title: 'Agencias que cobran caro por poco',
    body: 'Tarifas de $2M+ al mes por un par de piezas y una llamada de estado. El presupuesto se va en estructura, no en resultado.',
  },
  {
    title: 'Entregas que se demoran semanas',
    body: 'Un logo tarda un mes. Una campaña, dos. Mientras tanto tu marca sigue esperando y la competencia no.',
  },
  {
    title: 'Procesos opacos, sin visibilidad',
    body: 'No sabes en qué va tu proyecto hasta que te mandan el PDF final. Cero acceso al proceso, cero forma de ajustar a tiempo.',
  },
  {
    title: 'Freelancers sin continuidad',
    body: 'Un diseñador suelto resuelve una pieza, no una marca. Cuando se va, se va también el criterio y el contexto que tenía de tu negocio.',
  },
]

export default function Problema() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(sectionRef.current?.querySelector('.problema-heading') ?? null, {
      opacity: 0, y: 24, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
    const cards = gridRef.current?.children
    if (cards) {
      gsap.from(Array.from(cards), {
        opacity: 0, y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <div className="problema-heading text-center mb-14" style={{ willChange: 'opacity' }}>
        <span className="section-label" style={{ justifyContent: 'center' }}>El problema</span>
        <h2>
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Contratar diseño hoy es{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            caro, lento y opaco.
          </span>
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
        {DOLORES.map((d, i) => (
          <div key={i} className="card" style={{ padding: 'clamp(24px, 3vw, 32px)' }}>
            <p className="type-heading text-white" style={{ marginBottom: 10 }}>{d.title}</p>
            <p className="type-body" style={{ color: 'var(--text-muted)' }}>{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
