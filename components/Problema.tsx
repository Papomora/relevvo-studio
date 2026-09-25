'use client'

// No tuve acceso al prototipo del artifact citado en el prompt (no puedo
// abrir enlaces de claude.ai/code/artifact desde esta sesión) — el copy de
// abajo es propio, siguiendo el ángulo que sí venía especificado. Ángulo
// ajustado (sep 2026) de "caro" a "impredecible": con MID en $2.990.000 y
// FULL en $6.490.000 ya no podemos criticar una cifra ("$2M+ al mes") que
// nuestros propios planes superan. El dolor es lo que se recibe por el
// dinero (piezas sueltas, cobros por revisión, cotizaciones sorpresa), no
// el monto. No reintroducir cifras de precio acá.
// La estructura (4 dolores, grid 2x2) sí sigue el pedido.

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DOLORES = [
  {
    title: 'Pagas mucho y no sabes bien por qué',
    body: 'Piezas sueltas sin un hilo de marca, cada revisión extra se cobra aparte y la cotización cambia a mitad de camino. El presupuesto se va en sorpresas, no en resultado.',
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
            impredecible, lento y opaco.
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
