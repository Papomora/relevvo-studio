'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(line1Ref.current, {
      y: 60, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    gsap.from(line2Ref.current, {
      y: 40, duration: 0.8, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <span className="pill-badge mb-6 inline-flex">Beneficios</span>

      <div ref={line1Ref} style={{ willChange: 'transform, opacity' }}>
        <h2 className="mb-6 leading-none">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            Rápido, confiable y{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            sin límites innecesarios.
          </span>
        </h2>
      </div>

      <div ref={line2Ref} style={{ willChange: 'transform, opacity' }}>
        <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
          Relevvo sustituye la incertidumbre de freelancers poco consistentes y los altos
          costos de las agencias tradicionales por un modelo mensual claro y predecible
        </p>
      </div>
    </section>
  )
}
