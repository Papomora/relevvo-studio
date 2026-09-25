'use client'

// ── Sección "El equipo" del home — Juan Camilo "Papo" León Mora ──
// Foto: /public/founder.png, en marco sólido uva (mockup "home final").
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

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

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

  useGSAP(() => {
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
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24"
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 lg:gap-[72px] items-center">

        {/* ── Foto: marco sólido uva ── */}
        <div ref={photoRef} style={{ willChange: 'opacity' }}>
          <div
            className="w-full max-w-[420px] md:max-w-none rounded-[20px] overflow-hidden bg-grape"
            style={{ aspectRatio: '4/5' }}
          >
            {/* next/image: founder.png pesa 2 MB en PNG. Servido así se
                convierte a WebP y se redimensiona al ancho real del hueco. */}
            <Image src="/founder.png" alt="Juan Camilo Papo León Mora"
                   width={720} height={900}
                   sizes="(max-width: 768px) 100vw, 480px"
                   className="w-full h-full object-cover object-top" />
          </div>
        </div>

        {/* ── Texto ── */}
        <div ref={textRef} style={{ willChange: 'opacity' }}>
          <span className="section-label font-mono" style={{ marginBottom: 0 }}>Quién está detrás</span>

          <h2
            className="heading-display mt-[18px] mb-6 [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', letterSpacing: '-0.035em', lineHeight: 1, fontWeight: 700 }}
          >
            Juan Camilo{' '}
            <span className="heading-serif text-lilac">&ldquo;Papo&rdquo;</span>{' '}
            León Mora
          </h2>

          <p className="text-base leading-relaxed mb-4 max-w-[54ch]" style={{ color: 'var(--text)' }}>
            Relevvo trabaja con un núcleo pequeño y estable, liderado desde la dirección
            creativa. Cuando un proyecto lo pide, ese núcleo se amplía con especialistas
            del área que haga falta — fotografía, motion, pauta — en vez de tercerizar a
            ciegas o inflar un equipo fijo que no todos los proyectos necesitan.
          </p>

          <p className="text-muted text-sm leading-relaxed max-w-[54ch]">
            No diseñamos para que algo se vea bien: diseñamos para que funcione, conecte y venda.
          </p>

          {/* Datos: fila de 3 con filete superior */}
          <dl className="grid grid-cols-3 mt-[34px]" style={{ borderTop: '1px solid var(--border)' }}>
            {[
              { n: '9+', label: 'años de oficio, desde 2016' },
              { n: '20+', label: 'marcas en su carrera' },
              { n: '2', label: 'países: Colombia y México' },
            ].map(f => (
              <div key={f.n} className="pt-[18px] pr-4 flex flex-col-reverse justify-end">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd
                  className="font-display font-extrabold text-butter"
                  style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.4rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
                >
                  {f.n}
                </dd>
              </div>
            ))}
          </dl>

          {/* Herramientas — del estudio, no de una sola persona */}
          <div className="mt-10 mb-8">
            <span className="font-mono text-xs text-muted uppercase mb-3 block" style={{ letterSpacing: '0.12em' }}>
              Herramientas del estudio
            </span>
            <div className="flex flex-wrap gap-3">
              {tools.map((t, i) => (
                <div
                  key={i}
                  title={t.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-night-2 transition-transform duration-200 hover:scale-110 motion-reduce:transition-none motion-reduce:hover:scale-100"
                  style={{ border: '1px solid var(--border)' }}
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/papo"
              className="text-sm px-6 py-3 inline-flex items-center gap-2 text-muted hover:text-butter transition-colors"
            >
              Conoce al fundador
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
