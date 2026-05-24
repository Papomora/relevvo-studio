'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const brands = [
  {
    name: 'ARü',
    category: 'Accesorios Premium',
    services: ['Branding', 'Contenido', 'Pauta'],
    url: 'https://www.instagram.com/aru.accesorios/',
    palette: ['#4B5E3A', '#C9B882', '#F5F0E8'],
    accent: 'rgba(201,184,130,0.15)',
    border: 'rgba(201,184,130,0.3)',
    textAccent: '#C9B882',
    desc: 'Identidad de marca y estrategia de contenido para accesorios de lujo artesanal.',
  },
  {
    name: 'Crusso',
    category: 'Retail & Moda',
    services: ['Branding', 'Diseño', 'Fotografía'],
    url: 'https://www.instagram.com/tiendacrusso/',
    palette: ['#1A0A0A', '#8B1A1A', '#C0392B'],
    accent: 'rgba(192,57,43,0.15)',
    border: 'rgba(192,57,43,0.35)',
    textAccent: '#E74C3C',
    desc: 'Lanzamiento de marca premium para sillas y muebles de alta gama en Bogotá.',
  },
  {
    name: 'Molicie',
    category: 'Hogar & Decoración',
    services: ['Contenido', 'Estrategia', 'Pauta'],
    url: 'https://www.instagram.com/moliciehogar/',
    palette: ['#2C1A0E', '#8B5E3C', '#D4A574'],
    accent: 'rgba(180,83,9,0.15)',
    border: 'rgba(180,83,9,0.35)',
    textAccent: '#F59E0B',
    desc: 'Posicionamiento de marca y crecimiento orgánico para almohadas y cojines premium.',
  },
  {
    name: 'Verslä',
    category: 'Moda Femenina',
    services: ['Contenido', 'Pauta', 'Diseño'],
    url: 'https://www.instagram.com/verslafeminite/',
    palette: ['#0A0A0A', '#C9A84C', '#1C1C1C'],
    accent: 'rgba(157,23,77,0.15)',
    border: 'rgba(244,114,182,0.3)',
    textAccent: '#F472B6',
    desc: 'Estrategia digital y contenido fashion para moda femenina denim de autor.',
  },
  {
    name: 'Visuality',
    category: 'Publicidad Exterior',
    services: ['Estrategia', 'Diseño', 'Web'],
    url: '#',
    palette: ['#0A0A0A', '#CC0000', '#1A1A1A'],
    accent: 'rgba(204,0,0,0.12)',
    border: 'rgba(204,0,0,0.35)',
    textAccent: '#EF4444',
    desc: 'Marca y presencia digital para empresa de publicidad exterior y hologramas.',
  },
  {
    name: 'Groi',
    category: 'Consultoría',
    services: ['Branding', 'Web', 'Estrategia'],
    url: '#',
    palette: ['#0A0F1A', '#1E40AF', '#3B82F6'],
    accent: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.3)',
    textAccent: '#60A5FA',
    desc: 'Identidad corporativa y presencia digital para consultoría de crecimiento empresarial.',
  },
]

export default function Portfolio() {
  const headingRef  = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })

    const cards = gridRef.current?.querySelectorAll('.brand-card')
    if (cards) {
      gsap.from(Array.from(cards), {
        y: 50,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { amount: 0.45, from: 'start' },
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section id="portafolio" className="py-24 px-4 max-w-6xl mx-auto">
      <div ref={headingRef} className="text-center mb-14">
        <span className="pill-badge mb-6 inline-flex">Portafolio</span>
        <h2 className="mb-4">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Marcas que{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            construimos juntos.
          </span>
        </h2>
        <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
          Cada proyecto es una historia de marca. Aquí están algunas de las que hemos construido.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {brands.map((brand, i) => (
          <Link
            key={i}
            href={brand.url}
            target={brand.url !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="brand-card group relative flex flex-col justify-between p-7 rounded-2xl overflow-hidden transition-all duration-400 hover:scale-[1.02]"
            style={{
              background: brand.accent,
              border: `1px solid ${brand.border}`,
              backdropFilter: 'blur(10px)',
              minHeight: 220,
              willChange: 'transform',
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: brand.accent.replace('0.15', '0.25') }}
            />

            {/* Color palette swatch */}
            <div className="flex gap-1.5 mb-6 relative z-10">
              {brand.palette.map((color, ci) => (
                <div
                  key={ci}
                  className="rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{
                    width: ci === 0 ? 28 : 20,
                    height: ci === 0 ? 28 : 20,
                    background: color,
                    border: '1.5px solid rgba(255,255,255,0.1)',
                  }}
                />
              ))}
            </div>

            {/* Brand name */}
            <div className="relative z-10 flex-1">
              <h3
                className="heading-display text-white mb-1 transition-colors duration-300"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', letterSpacing: '-0.03em' }}
              >
                {brand.name}
              </h3>
              <p
                className="font-mono text-xs mb-4"
                style={{ color: brand.textAccent, letterSpacing: '0.08em' }}
              >
                {brand.category}
              </p>
              <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-400">
                {brand.desc}
              </p>
            </div>

            {/* Service tags */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-5">
              {brand.services.map((s, si) => (
                <span
                  key={si}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-full"
                  style={{
                    background: brand.border.replace('0.35', '0.12').replace('0.3', '0.12'),
                    border: `1px solid ${brand.border}`,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Arrow icon */}
            {brand.url !== '#' && (
              <div
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 -translate-x-2"
                style={{ color: brand.textAccent }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
