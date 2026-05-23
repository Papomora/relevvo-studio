'use client'

// ── Sección fundador — Juan Camilo León Mora ─────────────────
// TODO: Reemplaza el placeholder de foto con tu imagen real.
// Pon el archivo en /public/founder.jpg (o .webp) y cambia la
// línea comentada de <img> abajo.

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

const skills = ['Branding', 'Estrategia', 'Diseño Web', 'Fotografía', 'Marketing Digital', 'Social Media']

export default function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(photoRef.current, {
      x: -40, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
    gsap.from(textRef.current, {
      x: 40, duration: 1, ease: 'power3.out', delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <span className="pill-badge mb-10 inline-flex">El equipo</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

        {/* ── Foto ── */}
        <div ref={photoRef} className="relative" style={{ willChange: 'transform' }}>
          <div
            className="w-full rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '4/5',
              background: 'rgba(124,58,237,0.08)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            {/*
              Cuando tengas la foto lista, reemplaza este bloque por:
              <img
                src="/founder.jpg"
                alt="Juan Camilo León Mora — Fundador Relevvo Studio"
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(20%) contrast(1.05)' }}
              />
            */}
            <div className="w-full h-full flex flex-col items-center justify-end p-8"
              style={{ background: 'linear-gradient(to bottom, rgba(124,58,237,0.05) 0%, rgba(124,58,237,0.18) 100%)' }}>
              <span
                className="heading-display text-white/10 select-none"
                style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', letterSpacing: '-0.06em', lineHeight: 1, marginBottom: 'auto', marginTop: '2rem' }}
              >
                JCL
              </span>
              <p className="font-mono text-xs text-white/25 uppercase tracking-widest text-center">
                Agrega tu foto en<br />/public/founder.jpg
              </p>
            </div>
          </div>

          {/* Accent block */}
          <div
            className="absolute -bottom-5 -right-5 w-28 h-28 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', zIndex: -1 }}
          />
          {/* Years badge */}
          <div
            className="absolute top-6 -right-4 px-4 py-3 rounded-xl text-center"
            style={{ background: '#0A0A0A', border: '1px solid rgba(124,58,237,0.35)' }}
          >
            <p className="heading-display text-white" style={{ fontSize: '1.6rem', letterSpacing: '-0.04em', lineHeight: 1 }}>5+</p>
            <p className="font-mono text-xs text-white/40 mt-1" style={{ letterSpacing: '0.08em' }}>años</p>
          </div>
        </div>

        {/* ── Texto ── */}
        <div ref={textRef} style={{ willChange: 'transform' }}>
          <span
            className="font-mono text-xs uppercase mb-4 block"
            style={{ color: 'rgba(124,58,237,0.8)', letterSpacing: '0.14em' }}
          >
            Fundador & Director Creativo
          </span>

          <h2
            className="heading-display text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.035em', lineHeight: 1.05 }}
          >
            Juan Camilo<br />
            <span className="heading-serif">León Mora</span>
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-4">
            Diseñador y estratega con más de 5 años construyendo marcas en Colombia y LATAM.
            Fundé Relevvo con una convicción clara: que el diseño de calidad y la estrategia real
            no deberían ser exclusivos de las grandes empresas.
          </p>

          <p className="text-white/40 text-sm leading-relaxed mb-8">
            He trabajado con marcas en moda denim, mobiliario premium, accesorios, publicidad exterior
            y tecnología. Cada proyecto es una oportunidad de transformar cómo una empresa se presenta
            al mundo — y qué tan bien le va después.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {skills.map((tag, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.28)',
                  color: 'rgba(167,139,250,0.85)',
                  letterSpacing: '0.02em',
                }}
              >
                {tag}
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
    </section>
  )
}
