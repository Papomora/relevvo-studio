'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const lines = [
  { text: 'Presencia.',   size: 'clamp(4rem, 10vw, 9rem)' },
  { text: 'Estrategia.',  size: 'clamp(4rem, 10vw, 9rem)' },
  { text: 'Resultados.',  size: 'clamp(4rem, 10vw, 9rem)' },
]

const statement = [
  'No somos una agencia más.',
  'Somos el equipo que construye marcas',
  'que la gente recuerda — incluso cuando no quiere.',
]

export default function WordReveal() {
  const sectionRef  = useRef<HTMLElement>(null)
  const pinRef      = useRef<HTMLDivElement>(null)
  const linesRef    = useRef<(HTMLDivElement | null)[]>([])
  const stmtRef     = useRef<(HTMLParagraphElement | null)[]>([])
  const dividerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // ── Pin the section while animating ───────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=260%',
          pin: pinRef.current,
          scrub: 0.8,
        },
      })

      // Each word: fade + scale in, hold, fade out
      linesRef.current.forEach((el, i) => {
        const isLast = i === linesRef.current.length - 1
        tl.fromTo(
          el,
          { opacity: 0, scale: 0.85, y: 40 },
          { opacity: 1, scale: 1,    y: 0,  duration: 0.6, ease: 'power3.out' },
          i * 1.2
        )
        if (!isLast) {
          tl.to(el, { opacity: 0, scale: 1.08, y: -30, duration: 0.5, ease: 'power2.in' }, i * 1.2 + 0.7)
        }
      })

      // After words: show divider line
      tl.from(dividerRef.current, { scaleX: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'left' }, 3.8)

      // Statement lines appear staggered
      stmtRef.current.forEach((el, i) => {
        tl.from(el, { opacity: 0, y: 22, duration: 0.5, ease: 'power3.out' }, 4.1 + i * 0.35)
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: '360vh' }}
    >
      {/* Pinned inner */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
        style={{ background: '#0A0A0A' }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
          style={{
            width: '60vw', height: '60vw',
            background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)',
          }}
        />

        {/* Word stack — all stacked in same position */}
        <div className="relative" style={{ height: 'clamp(5rem, 12vw, 11rem)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {lines.map((line, i) => (
            <div
              key={i}
              ref={(el) => { linesRef.current[i] = el }}
              className="absolute heading-display text-white"
              style={{
                fontSize: line.size,
                letterSpacing: '-0.04em',
                opacity: 0,
                willChange: 'transform, opacity',
                // Last word stays, so it gets a gradient color
                ...(i === lines.length - 1 ? {
                  background: 'linear-gradient(135deg, #fff 30%, rgba(124,58,237,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                } : {}),
              }}
            >
              {line.text}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          className="mt-12 mb-8"
          style={{
            width: 'clamp(40px, 6vw, 80px)',
            height: '1px',
            background: 'rgba(124,58,237,0.6)',
            transformOrigin: 'left',
          }}
        />

        {/* Statement */}
        <div className="max-w-2xl mx-auto space-y-2">
          {statement.map((line, i) => (
            <p
              key={i}
              ref={(el) => { stmtRef.current[i] = el }}
              className="text-white/60 leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
                letterSpacing: '-0.01em',
                ...(i === 0 ? { color: 'rgba(255,255,255,0.9)', fontWeight: 600 } : {}),
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
