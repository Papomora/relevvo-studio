'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const projects = [
  { title: 'Gadotec', category: 'Branding', src: '/images/portfolio/Mockup 1 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Cueto', category: 'Vehicle Wrap', src: '/images/portfolio/Mockup 2 (EXAMPLE ONLY)@2x.jpg', wide: true },
  { title: 'Khalifa Marketing', category: 'Branding', src: '/images/portfolio/Mockup 3 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Dipa Pa', category: 'Branding', src: '/images/portfolio/Mockup 4 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Vitalpet', category: 'Branding', src: '/images/portfolio/Mockup 5 (EXAMPLE ONLY)@2x.jpg', wide: true },
  { title: 'Ruka Cravia', category: 'Branding', src: '/images/portfolio/Mockup 6 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Ecomms', category: 'Digital', src: '/images/portfolio/Mockup 7 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'HomsyCare', category: 'Branding', src: '/images/portfolio/Mockup 8 (EXAMPLE ONLY)@2x.jpg', wide: true },
  { title: 'Arü', category: 'Branding', src: '/images/portfolio/Mockup 9 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Cuéntame', category: 'Digital', src: '/images/portfolio/Mockup 10 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Amorigen', category: 'Branding', src: '/images/portfolio/Mockup 11 (EXAMPLE ONLY)@2x.jpg', wide: false },
  { title: 'Proyecto', category: 'Branding', src: '/images/portfolio/Mockup 12 (EXAMPLE ONLY)@2x.jpg', wide: false },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })
    const items = gridRef.current?.children
    if (items) {
      gsap.from(Array.from(items), {
        y: 60, scale: 0.96, duration: 0.7, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="portafolio" className="py-24 px-4 max-w-6xl mx-auto">
      <div ref={headingRef} className="text-center mb-14">
        <span className="pill-badge mb-6 inline-flex">Portafolio</span>
        <h2>
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Trabajo que{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            habla por sí solo.
          </span>
        </h2>
      </div>

      {/* Masonry-style grid */}
      <div ref={gridRef} className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="break-inside-avoid card group overflow-hidden cursor-pointer"
            style={{ willChange: 'transform, opacity' }}
          >
            <div className={`relative w-full ${project.wide ? 'aspect-[4/3]' : 'aspect-square'} bg-[#1a1a1a] overflow-hidden`}>
              <Image
                src={project.src}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                unoptimized
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-5 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="font-display font-bold text-white text-lg">{project.title}</p>
                  <p className="text-white/70 text-sm">{project.category}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
