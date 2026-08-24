'use client'

// ── Sección "El equipo" del home — Juan Camilo "Papo" León Mora ──
// Foto: /public/founder.png (portrait, editorial dark bg)
//
// Reencuadrada por pedido del usuario (ago 2026): esto ya no es un perfil
// personal completo — esa hoja de vida entera (estudios, aptitudes,
// experiencia con fechas) vive en /papo y sigue leyendo de lib/founder.ts
// desde ahí. Acá solo queda foto + badges + herramientas del estudio + el
// encuadre de equipo, con un enlace a /papo para quien quiera el resto.
//
// [COMPLETAR]: no hay dato real de cuántas personas o qué perfiles
// componen el "núcleo" fuera del fundador — no se inventó un número ni
// nombres. El copy de abajo describe el modelo (núcleo + especialistas por
// proyecto) sin afirmar una cifra, porque es lo único que es verificable.

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

const tools = [
  { name: 'Photoshop', src: '/images/tools/Photoshop_logo.png' },
  { name: 'Illustrator', src: '/images/tools/Illustrator_logo.png' },
  { name: 'After Effects', src: '/images/tools/AfterEffects_logo.png' },
  { name: 'Premiere Pro', src: '/images/tools/PremierePro_logo.png' },
  { name: 'Figma', src: '/images/tools/Figma_logo.png' },
  { name: 'DaVinci Resolve', src: '/images/tools/DaVinciResolve_logo.png' },
  { name: 'Creative Cloud', src: '/images/tools/CreativeCloud_logo.png' },
]

export default function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Opacity-only reveals — an x/y-transform reveal that never fires (e.g.
    // ScrollTrigger's cached trigger position going stale once below-the-
    // fold images finish loading and shift document height) leaves content
    // visibly clipped/shifted on mobile instead of just not-yet-faded-in.
    gsap.from(photoRef.current, {
      opacity: 0, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    gsap.from(textRef.current, {
      opacity: 0, duration: 1, ease: 'power2.out', delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <span className="pill-badge mb-10 inline-flex">El equipo</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* ── Foto ── */}
        <div ref={photoRef} className="relative" style={{ willChange: 'opacity' }}>
          <div
            className="w-full rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '4/5',
              background: 'linear-gradient(160deg, rgba(124,58,237,0.12) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            {/* next/image: founder.png pesa 2 MB en PNG. Servido así se
                convierte a WebP y se redimensiona al ancho real del hueco. */}
            <Image src="/founder.png" alt="Juan Camilo Papo León Mora"
                   width={720} height={900}
                   sizes="(max-width: 768px) 100vw, 480px"
                   className="w-full h-full object-cover"
                   style={{ filter: 'grayscale(15%) contrast(1.08)', objectPosition: 'center 15%' }} />
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
            <p className="font-mono text-xs" style={{ color: '#41E575', letterSpacing: '0.08em' }}>🌎 Col · Méx</p>
          </div>

          {/* Purple accent block */}
          <div
            className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', zIndex: -1 }}
          />
        </div>

        {/* ── Texto ── */}
        <div ref={textRef} style={{ willChange: 'opacity' }}>
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
            "Papo" León Mora
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-4">
            Relevvo trabaja con un núcleo pequeño y estable, liderado desde la dirección
            creativa. Cuando un proyecto lo pide, ese núcleo se amplía con especialistas
            del área que haga falta — fotografía, motion, pauta — en vez de tercerizar a
            ciegas o inflar un equipo fijo que no todos los proyectos necesitan.
          </p>

          <p className="text-white/40 text-sm leading-relaxed mb-8">
            No diseñamos para que algo se vea bien: diseñamos para que funcione, conecte y venda.
          </p>

          {/* Herramientas — del estudio, no de una sola persona */}
          <div className="mb-8">
            <span className="font-mono text-xs text-white/25 uppercase mb-3 block" style={{ letterSpacing: '0.12em' }}>
              Herramientas del estudio
            </span>
            <div className="flex flex-wrap gap-3">
              {tools.map((t, i) => (
                <div
                  key={i}
                  title={t.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Image src={t.src} alt={t.name} width={24} height={24} className="object-contain" unoptimized />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
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
            <Link
              href="/papo"
              className="text-sm px-6 py-3 inline-flex items-center gap-2 text-white/50 hover:text-white/85 transition-colors"
            >
              Conoce al fundador
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
