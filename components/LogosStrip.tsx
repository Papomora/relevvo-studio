'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const logos = [
  { name: 'Logo 1', src: '/images/Logos/Logo 1@1.5x.png' },
  { name: 'Logo 2', src: '/images/Logos/Logo 2@1.5x.png' },
  { name: 'Logo 3', src: '/images/Logos/Logo 3@1.5x.png' },
  { name: 'Logo 4', src: '/images/Logos/Logo 4@1.5x.png' },
  { name: 'Logo 5', src: '/images/Logos/Logo 5@1.5x.png' },
  { name: 'Logo 6', src: '/images/Logos/Logo 6@1.5x.png' },
  { name: 'Logo 7', src: '/images/Logos/Logo 7@1.5x.png' },
  { name: 'Logo 8', src: '/images/Logos/Logo 8@1.5x.png' },
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
      <p className="text-center text-white/40 text-sm mb-8 tracking-widest uppercase">
        Nuestros diseños hacen parte de:
      </p>

      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

        <div ref={trackRef} className="flex items-center gap-16 w-max px-8" style={{ willChange: 'transform' }}>
          {duplicated.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-12 px-2 opacity-50 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={120}
                height={40}
                className="object-contain h-8 w-auto"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
