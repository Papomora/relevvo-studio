'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline({ delay: 0.2 })

    tl.from(badgeRef.current,   { y: 20, duration: 0.6, ease: 'power3.out' })
      .from(headingRef.current, { y: 35, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .from(subRef.current,     { y: 18, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .from(ctasRef.current,    { y: 18, duration: 0.6, ease: 'power3.out' }, '-=0.3')

    // Subtle glow pulse
    gsap.to(bgGlowRef.current, {
      scale: 1.15,
      opacity: 0.7,
      duration: 4,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background glow */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Badge */}
      <div ref={badgeRef} className="pill-badge mb-8">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Corre, no te quedes atrás
      </div>

      {/* Main heading */}
      <h1
        ref={headingRef}
        className="max-w-4xl mx-auto mb-6"
        style={{ willChange: 'transform, opacity' }}
      >
        <span className="heading-display text-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
          Hazlo{' '}
        </span>
        <span className="heading-serif text-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
          Simple
        </span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subRef}
        className="max-w-xl mx-auto text-white/60 text-lg md:text-xl mb-10 leading-relaxed"
      >
        Dí adiós a los sobrecostos por gestión de diseño y marketing digital
      </p>

      {/* CTAs */}
      <div ref={ctasRef} className="flex flex-col sm:flex-row items-center gap-3">
        <Link href="#contacto" className="btn-primary text-base px-8 py-4">
          Agenda una cita
        </Link>
        <Link href="#precios" className="btn-secondary text-base px-8 py-4">
          Planes
        </Link>
      </div>
    </section>
  )
}
