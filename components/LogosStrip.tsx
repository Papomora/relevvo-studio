'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

// TODO: Actualiza href con la URL real (Instagram, web, etc.) de cada cliente
const logos = [
  { name: 'Molicié',    src: '/images/Logos/Logo 1@1.5x.png', href: 'https://instagram.com' },
  { name: 'ARÜ',        src: '/images/Logos/Logo 2@1.5x.png', href: 'https://instagram.com' },
  { name: 'Verslä',     src: '/images/Logos/Logo 3@1.5x.png', href: 'https://instagram.com' },
  { name: 'Crusso',     src: '/images/Logos/Logo 4@1.5x.png', href: 'https://instagram.com' },
  { name: 'Visuality',  src: '/images/Logos/Logo 5@1.5x.png', href: 'https://instagram.com' },
  { name: 'Cliente 6',  src: '/images/Logos/Logo 6@1.5x.png', href: '#' },
  { name: 'Cliente 7',  src: '/images/Logos/Logo 7@1.5x.png', href: '#' },
  { name: 'Cliente 8',  src: '/images/Logos/Logo 8@1.5x.png', href: '#' },
]

export default function LogosStrip() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(sectionRef.current, {
      y: 30, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    })

    // Infinite scroll animation
    const track = trackRef.current
    if (!track) return
    const totalWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: -totalWidth,
      duration: 20,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  const duplicated = [...logos, ...logos]

  return (
    <section ref={sectionRef} id="clientes" className="py-16 overflow-hidden">
      <div className="flex items-center justify-center mb-10">
        <span className="section-label" style={{ justifyContent: 'center' }}>
          Nuestros diseños hacen parte de
        </span>
      </div>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

        <div ref={trackRef} className="flex items-center gap-16 w-max px-8" style={{ willChange: 'transform' }}>
          {duplicated.map((logo, i) => (
            <a
              key={i}
              href={logo.href !== '#' ? logo.href : undefined}
              target={logo.href !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={logo.name}
              className="flex items-center justify-center h-12 px-2 opacity-40 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
              style={{ cursor: logo.href !== '#' ? 'pointer' : 'default' }}
              data-cursor
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="object-contain h-8 w-auto"
                unoptimized
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
