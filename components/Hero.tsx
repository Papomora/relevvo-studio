'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

export default function Hero() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btn1Ref = useRef<HTMLAnchorElement>(null)
  const btn2Ref = useRef<HTMLAnchorElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)
  const bgGlow2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline({ delay: 0.15 })

    tl.from(badgeRef.current,  { y: 30, duration: 0.7, ease: 'power4.out' })
      .from(headingRef.current,{ y: 55, duration: 0.9, ease: 'power4.out' }, '-=0.4')
      .from(subRef.current,    { y: 28, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(btn1Ref.current,   { y: 22, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.35')
      .from(btn2Ref.current,   { y: 22, duration: 0.6, ease: 'back.out(1.4)' }, '-=0.45')

    // Main glow pulse
    gsap.to(bgGlowRef.current, {
      scale: 1.2,
      duration: 5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Secondary glow — offset phase
    gsap.to(bgGlow2Ref.current, {
      scale: 1.3,
      duration: 7,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 2,
    })
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Gradient hero overlay — funde el video global en el bottom del hero */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 60%, #0A0A0A 100%)', zIndex: 1 }} />

      {/* Background glows — on top of video */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.22) 0%, transparent 65%)',
          willChange: 'transform',
          zIndex: 2,
        }}
      />
      <div
        ref={bgGlow2Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)',
          willChange: 'transform',
          zIndex: 2,
        }}
      />

      {/* Badge */}
      <div ref={badgeRef} className="pill-badge mb-8" style={{ position: 'relative', zIndex: 3 }}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Corre, no te quedes atrás
      </div>

      {/* Main heading — H1 con keyword primaria */}
      <h1
        ref={headingRef}
        className="max-w-4xl mx-auto mb-6"
        style={{ willChange: 'transform', position: 'relative', zIndex: 3 }}
      >
        <span className="heading-display text-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
          Hazlo{' '}
        </span>
        <span className="heading-serif text-white" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
          Simple
        </span>
      </h1>

      {/* Subtitle — keyword-rich para SEO */}
      <p
        ref={subRef}
        className="max-w-xl mx-auto text-white/60 text-lg md:text-xl mb-10 leading-relaxed"
        style={{ position: 'relative', zIndex: 3 }}
      >
        La agencia de diseño gráfico y marketing digital en Colombia que convierte tu marca en resultados reales.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3" style={{ position: 'relative', zIndex: 3 }}>
        <Link ref={btn1Ref} href={WA_URL} target="_blank" rel="noopener noreferrer"
          className="btn-primary btn-glow text-base px-8 py-4 flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Agenda una cita
        </Link>
        <Link ref={btn2Ref} href="#precios" className="btn-secondary text-base px-8 py-4">
          Planes
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style={{ zIndex: 3 }}>
        <span className="text-white/60 text-[11px] tracking-[0.18em] uppercase font-medium">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 bg-white/80"
            style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
      `}</style>
    </section>
  )
}
