'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const logos = ['ETOLOGÍA CANINA COLOMBIA', 'arü', 'cuéntame.app', '$ ecomms', 'HomsyCare']

export default function NosotrosHero() {
  const headingRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
    )
    gsap.fromTo(logosRef.current?.children ? Array.from(logosRef.current.children) : [],
      { y: 20 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.1, delay: 0.9 }
    )
    // Animated background glow
    gsap.to(bgRef.current, {
      backgroundPosition: '100% 50%',
      duration: 8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, [])

  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(124,58,237,0.18) 0%, transparent 65%)',
          willChange: 'background-position',
        }}
      />

      <div ref={headingRef} style={{ willChange: 'transform, opacity' }}>
        <h1 className="mb-8">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            Sobre{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}>
            nosotros
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-white/65 text-lg leading-relaxed mb-12">
          En <strong className="text-white font-semibold">Relevvo Studio</strong> creemos que las marcas se construyen con estrategia,
          pero se sostienen con personas. Por eso nuestro trabajo combina{' '}
          <strong className="text-white font-semibold">criterio profesional</strong> con una{' '}
          <strong className="text-white font-semibold">forma de trabajar cercana, clara y honesta.</strong>
        </p>
      </div>

      {/* Logos */}
      <div className="w-full max-w-3xl">
        <p className="text-white/35 text-sm mb-6 tracking-widest uppercase">Our designs are featured on:</p>
        <div ref={logosRef} className="flex flex-wrap justify-center gap-8 items-center">
          {logos.map((logo, i) => (
            <span
              key={i}
              className="text-white/45 hover:text-white/80 transition-colors duration-300 font-semibold text-sm tracking-tight"
              style={{ willChange: 'opacity' }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
