'use client'

// ── Sección fundador — Juan Camilo "Papo" León Mora ──────────
// Foto: agrega /public/founder.jpg (portrait, editorial dark bg)

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

const timeline = [
  { year: '2016', role: 'Asistente Audiovisual', place: 'RCN Televisión' },
  { year: '2021', role: 'Diseñador Gráfico & Branding', place: 'Think Click · Neofy' },
  { year: '2023', role: 'Growth & Visual Strategy', place: 'Hoytrabajas' },
  { year: '2024', role: 'Designer Lead', place: 'ecomms — México & USA' },
  { year: 'Hoy', role: 'Fundador & Director Creativo', place: 'Relevvo Studio' },
]

const tools = ['Photoshop', 'Illustrator', 'After Effects', 'Premiere', 'XD', 'Lightroom']

export default function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const tlRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(photoRef.current, {
      x: -50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    gsap.from(textRef.current, {
      x: 50, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    const items = tlRef.current?.querySelectorAll('.tl-item')
    if (items) {
      gsap.from(Array.from(items), {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.12,
        scrollTrigger: { trigger: tlRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <span className="pill-badge mb-10 inline-flex">El equipo</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* ── Foto ── */}
        <div ref={photoRef} className="relative" style={{ willChange: 'transform, opacity' }}>
          <div
            className="w-full rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '4/5',
              background: 'linear-gradient(160deg, rgba(124,58,237,0.12) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            {/*
              Reemplaza este bloque con:
              <img src="/founder.jpg" alt="Juan Camilo Papo León Mora"
                   className="w-full h-full object-cover object-top"
                   style={{ filter: 'grayscale(15%) contrast(1.08)' }} />
            */}
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="heading-display text-white/8 select-none"
                style={{ fontSize: 'clamp(6rem, 18vw, 12rem)', letterSpacing: '-0.06em' }}
              >
                JCL
              </span>
            </div>
          </div>

          {/* Years badge */}
          <div
            className="absolute top-6 -right-3 px-4 py-3 rounded-xl text-center"
            style={{ background: '#0A0A0A', border: '1px solid rgba(124,58,237,0.4)' }}
          >
            <p className="heading-display text-white" style={{ fontSize: '1.7rem', letterSpacing: '-0.05em', lineHeight: 1 }}>9+</p>
            <p className="font-mono text-xs text-white/40 mt-1" style={{ letterSpacing: '0.08em' }}>años</p>
          </div>

          {/* International badge */}
          <div
            className="absolute -bottom-3 -left-3 px-4 py-2 rounded-xl"
            style={{ background: '#0A0A0A', border: '1px solid rgba(65,229,117,0.35)' }}
          >
            <p className="font-mono text-xs" style={{ color: '#41E575', letterSpacing: '0.08em' }}>🌎 Col · Méx · USA</p>
          </div>

          {/* Purple accent block */}
          <div
            className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', zIndex: -1 }}
          />
        </div>

        {/* ── Texto ── */}
        <div ref={textRef} style={{ willChange: 'transform, opacity' }}>
          <span
            className="font-mono text-xs uppercase mb-4 block"
            style={{ color: 'rgba(124,58,237,0.8)', letterSpacing: '0.14em' }}
          >
            Fundador & Director Creativo
          </span>

          <h2
            className="heading-display text-white mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Juan Camilo
          </h2>
          <h2
            className="heading-serif text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            León Mora
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-4">
            Diseñador gráfico y estratega creativo que lleva más de 9 años en la industria.
            Mi carrera pasó por RCN Televisión, agencias digitales, startups de growth y trabajo
            internacional en México y Estados Unidos — todo eso hoy vive dentro de Relevvo.
          </p>

          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Me gusta estar en la tendencia, ser innovador y anticiparme a las necesidades.
            No diseño para que algo se vea bien — diseño para que funcione, conecte y venda.
          </p>

          {/* Tools */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tools.map((t, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full font-mono"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.02em',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-6 py-3 inline-flex items-center gap-2"
          >
            Hablemos directamente
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div ref={tlRef} className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-mono text-xs text-white/25 uppercase mb-8 block" style={{ letterSpacing: '0.12em' }}>
          Trayectoria
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="tl-item rounded-2xl p-5"
              style={{
                background: i === timeline.length - 1
                  ? 'rgba(124,58,237,0.1)'
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i === timeline.length - 1 ? 'rgba(124,58,237,0.3)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <span
                className="font-mono text-xs block mb-2"
                style={{
                  color: i === timeline.length - 1 ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.25)',
                  letterSpacing: '0.1em',
                }}
              >
                {item.year}
              </span>
              <p className="text-white/80 text-xs font-medium leading-snug mb-1">{item.role}</p>
              <p className="text-white/30 text-xs leading-snug">{item.place}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
