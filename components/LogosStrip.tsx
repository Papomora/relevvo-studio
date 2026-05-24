'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const logos: { name: string; src: string | null; href: string | null; cta?: boolean }[] = [
  { name: 'Molicié',           src: '/images/Logos/MOLICIE.png',         href: 'https://instagram.com' },
  { name: 'Crusso',            src: '/images/Logos/CRUSSO.png',          href: 'https://instagram.com' },
  { name: 'Verslä',            src: '/images/Logos/versla.png',          href: 'https://instagram.com' },
  { name: 'Metro 73',          src: '/images/Logos/METRO73.png',         href: 'https://www.instagram.com/vivemetro73/' },
  { name: 'LimiteLegal',       src: '/images/Logos/limitelegal.png',     href: 'https://www.instagram.com/limite_legalco/' },
  { name: 'Forjar',            src: '/images/Logos/Forjar.png',          href: 'https://www.instagram.com/forjar_inversiones/' },
  { name: 'Fresas la Playita', src: '/images/Logos/fresaslaplayita.png', href: 'https://www.instagram.com/fresaslaplayita/' },
  { name: 'cta',               src: null,                                 href: null, cta: true },
]

export default function LogosStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const items = gridRef.current?.querySelectorAll('.logo-card')
    if (items) {
      gsap.from(Array.from(items), {
        y: 24, opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 84%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="clientes" className="py-20 px-4 max-w-5xl mx-auto">

      {/* Label */}
      <div className="flex items-center justify-center mb-12">
        <span className="section-label" style={{ justifyContent: 'center' }}>
          Nuestros diseños hacen parte de
        </span>
      </div>

      {/* Grid de cuadros — basement.studio style */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-4 gap-px"
        style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}
      >
        {logos.map((logo, i) => {
          const sharedStyle: React.CSSProperties = logo.cta ? {
            aspectRatio: '1 / 1',
            background: 'rgba(124,58,237,0.06)',
            cursor: 'default',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
            boxShadow: 'inset 0 0 0 1px rgba(124,58,237,0.2)',
          } : {
            aspectRatio: '1 / 1',
            background: 'rgba(255,255,255,0.025)',
            cursor: logo.href ? 'pointer' : 'default',
            transition: 'background 0.3s ease, box-shadow 0.3s ease',
          }

          const inner = logo.cta ? (
            <div className="text-center px-4 flex flex-col items-center gap-2">
              <div className="w-5 h-px mb-1" style={{ background: 'rgba(124,58,237,0.6)' }} />
              <span className="font-display font-bold uppercase text-white/35 leading-tight"
                style={{ fontSize: '0.65rem', letterSpacing: '0.18em' }}>
                Tu marca
              </span>
              <span className="font-display font-bold uppercase leading-tight"
                style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: 'rgba(124,58,237,0.7)' }}>
                es la siguiente
              </span>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.12) 0%, transparent 70%)' }} />
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={260}
                  height={110}
                  className="object-contain w-auto transition-all duration-300 group-hover:brightness-150 group-hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.7)]"
                  style={{ maxHeight: '96px', maxWidth: '78%', filter: 'brightness(0.6) saturate(0)' }}
                  unoptimized
                />
              ) : (
                <span
                  className="font-display font-bold text-sm tracking-widest uppercase transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(124,58,237,0.7)]"
                  style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.12em' }}
                >
                  {logo.name}
                </span>
              )}
            </>
          )

          const neonEnter = (e: React.MouseEvent<HTMLElement>) => {
            const el = e.currentTarget
            el.style.background = 'rgba(124,58,237,0.08)'
            el.style.boxShadow = 'inset 0 0 0 1px rgba(124,58,237,0.55), 0 0 24px rgba(124,58,237,0.2), 0 0 60px rgba(124,58,237,0.08)'
          }
          const neonLeave = (e: React.MouseEvent<HTMLElement>) => {
            const el = e.currentTarget
            el.style.background = 'rgba(255,255,255,0.025)'
            el.style.boxShadow = 'none'
          }

          return logo.href ? (
            <a key={i} href={logo.href} target="_blank" rel="noopener noreferrer"
              className="logo-card group relative flex items-center justify-center"
              style={sharedStyle} data-cursor
              onMouseEnter={neonEnter} onMouseLeave={neonLeave}>
              {inner}
            </a>
          ) : (
            <div key={i}
              className="logo-card group relative flex items-center justify-center"
              style={sharedStyle}
              onMouseEnter={neonEnter} onMouseLeave={neonLeave}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
