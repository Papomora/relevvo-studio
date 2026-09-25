'use client'

// No tuve acceso al prototipo del artifact citado en el prompt (no puedo
// abrir enlaces de claude.ai/code/artifact desde esta sesión) — el copy de
// abajo es propio, siguiendo el ángulo que sí venía especificado. Ángulo
// ajustado (sep 2026) de "caro" a "impredecible": con MID en $2.990.000 y
// FULL en $6.490.000 ya no podemos criticar una cifra ("$2M+ al mes") que
// nuestros propios planes superan. El dolor es lo que se recibe por el
// dinero (piezas sueltas, cobros por revisión, cotizaciones sorpresa), no
// el monto. No reintroducir cifras de precio acá.
// La estructura (4 dolores, grid 2x2) sí sigue el pedido. Diseño aprobado:
// sin tarjetas, cada dolor separado por una línea fina arriba.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(sectionRef.current?.querySelector('.problema-heading') ?? null, {
        opacity: 0, y: 24, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      const items = gridRef.current?.children
      if (items) {
        gsap.from(Array.from(items), {
          opacity: 0, y: 24, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
        })
      }
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1200px]"
      style={{
        paddingBlock: 'clamp(72px, 10vw, 128px)',
        paddingInline: 'clamp(16px, 4vw, 48px)',
      }}
    >
      <div className="problema-heading">
        <span className="section-label">El problema</span>
        <h2
          className="heading-display"
          style={{
            fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)',
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: '-0.035em',
            textWrap: 'balance',
          }}
        >
          Contratar diseño hoy es{' '}
          <span className="heading-serif" style={{ color: 'var(--lilac)', lineHeight: 1 }}>
            impredecible, lento y opaco.
          </span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{ columnGap: 'clamp(24px, 5vw, 72px)', marginTop: 48 }}
      >
        {DOLORES.map(d => (
          <div
            key={d.title}
            style={{ borderTop: '1px solid var(--border)', padding: '26px 0 30px' }}
          >
            <h3
              className="font-display"
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.3,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: 'var(--butter)',
                margin: '0 0 8px',
              }}
            >
              {d.title}
            </h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', maxWidth: '52ch', lineHeight: 1.65 }}>
              {d.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
