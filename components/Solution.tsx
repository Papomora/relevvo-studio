'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const services = [
  { icon: '✦', label: 'Logos' },
  { icon: '🖥', label: 'Landing Pages' },
  { icon: '💻', label: 'Páginas Web' },
  { icon: '📱', label: 'Digital Products' },
  { icon: '📊', label: 'Presentaciones' },
  { icon: '🤖', label: 'Inteligencia Artificial' },
  { icon: '📷', label: 'Fotografía' },
  { icon: '📈', label: 'Estrategia' },
]

export default function Solution() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })
    const pills = pillsRef.current?.children
    if (pills) {
      gsap.from(Array.from(pills), {
        scale: 0.85, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.07,
        scrollTrigger: { trigger: pillsRef.current, start: 'top 82%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 text-center max-w-5xl mx-auto">
      {/* Top CTA */}
      <Link href="#contacto" className="btn-primary mb-16 inline-flex mx-auto">
        Conversemos
      </Link>

      {/* Badge */}
      <div ref={headingRef} className="mt-8">
        <span className="pill-badge mb-6 inline-flex">Solution</span>

        <h2 className="mb-6">
          <span className="heading-display text-white block" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Todas las necesidades,
          </span>
          <span className="heading-serif text-white block" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            un solo aliado.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-white/55 text-lg mb-12 leading-relaxed">
          Construir y escalar un negocio va mucho más allá de un sitio web. En Relevvo cubrimos de forma
          integral tus necesidades visuales y estratégicas, para que no tengas que coordinar múltiples proveedores
        </p>
      </div>

      {/* Service pills */}
      <div ref={pillsRef} className="flex flex-wrap justify-center gap-3">
        {services.map((s, i) => (
          <div
            key={i}
            className="pill-badge text-white/80 hover:text-white hover:border-white/25 transition-all duration-200 cursor-default text-sm"
            style={{ willChange: 'transform, opacity' }}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
