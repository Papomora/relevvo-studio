'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

const works = [
  { src: '/images/portfolio/Mockup 1 (EXAMPLE ONLY)@2x.jpg',  client: 'Molicié',   category: 'Branding',  span: 'col-span-2 row-span-2' },
  { src: '/images/portfolio/Mockup 2 (EXAMPLE ONLY)@2x.jpg',  client: 'ARÜ',       category: 'Diseño',    span: 'col-span-1 row-span-1' },
  { src: '/images/portfolio/Mockup 3 (EXAMPLE ONLY)@2x.jpg',  client: 'Verslä',    category: 'Social',    span: 'col-span-1 row-span-1' },
  { src: '/images/portfolio/Mockup 4 (EXAMPLE ONLY)@2x.jpg',  client: 'Crusso',    category: 'Motion',    span: 'col-span-1 row-span-2' },
  { src: '/images/portfolio/Mockup 5 (EXAMPLE ONLY)@2x.jpg',  client: 'Visuality', category: 'Branding',  span: 'col-span-2 row-span-1' },
  { src: '/images/portfolio/Mockup 6 (EXAMPLE ONLY)@2x.jpg',  client: 'Molicié',   category: 'Campaña',   span: 'col-span-1 row-span-1' },
  { src: '/images/portfolio/Mockup 7 (EXAMPLE ONLY)@2x.jpg',  client: 'ARÜ',       category: 'Web',       span: 'col-span-1 row-span-1' },
  { src: '/images/portfolio/Mockup 8 (EXAMPLE ONLY)@2x.jpg',  client: 'Verslä',    category: 'Editorial', span: 'col-span-2 row-span-1' },
  { src: '/images/portfolio/Mockup 9 (EXAMPLE ONLY)@2x.jpg',  client: 'Crusso',    category: 'Social',    span: 'col-span-1 row-span-2' },
  { src: '/images/portfolio/Mockup 10 (EXAMPLE ONLY)@2x.jpg', client: 'Visuality', category: 'Branding',  span: 'col-span-1 row-span-1' },
  { src: '/images/portfolio/Mockup 11 (EXAMPLE ONLY)@2x.jpg', client: 'Molicié',   category: 'Campaña',   span: 'col-span-2 row-span-1' },
  { src: '/images/portfolio/Mockup 12 (EXAMPLE ONLY)@2x.jpg', client: 'ARÜ',       category: 'Diseño',    span: 'col-span-1 row-span-1' },
]

export default function PortfolioGallery() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const [active, setActive]   = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
    })

    const items = gridRef.current?.querySelectorAll('.portfolio-item')
    if (items) {
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 60, opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%' },
        })
      })
    }
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight' && lightbox !== null) setLightbox(prev => prev !== null ? (prev + 1) % works.length : null)
      if (e.key === 'ArrowLeft' && lightbox !== null) setLightbox(prev => prev !== null ? (prev - 1 + works.length) % works.length : null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  return (
    <section id="portafolio" className="py-24 px-4 max-w-6xl mx-auto">

      {/* ── Heading ─────────────────────────────────────────── */}
      <div ref={headingRef} className="mb-14 md:grid md:grid-cols-2 md:gap-16 items-end">
        <div>
          <span className="section-label">Nuestro trabajo</span>
          <h2>
            <span className="heading-display text-white block"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              Marcas que
            </span>
            <span className="heading-serif text-white block"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
              hablan por sí solas.
            </span>
          </h2>
        </div>
        <p className="text-white/50 text-base leading-relaxed mt-6 md:mt-0 md:pb-1">
          Proyectos reales, resultados medibles. Cada pieza diseñada con intención,
          coherencia visual y foco en el negocio del cliente.
        </p>
      </div>

      {/* ── Masonry / bento grid ─────────────────────────────── */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3"
      >
        {works.map((work, i) => (
          <div
            key={i}
            className={`portfolio-item group relative overflow-hidden rounded-2xl cursor-pointer ${work.span}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setLightbox(i)}
            data-cursor
            style={{ willChange: 'transform' }}
          >
            {/* Image */}
            <Image
              src={work.src}
              alt={`${work.client} — ${work.category}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
              unoptimized
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-400" />

            {/* Hover overlay with info */}
            <div className={`absolute inset-0 flex flex-col justify-end p-4 transition-all duration-400 ${
              active === i ? 'opacity-100' : 'opacity-0'
            }`}
              style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }}>
              <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <span className="font-mono text-[10px] text-accent/80 uppercase tracking-widest block mb-0.5">
                  {work.category}
                </span>
                <span className="heading-display text-white text-sm font-semibold">
                  {work.client}
                </span>
              </div>
            </div>

            {/* Corner number */}
            <div className="absolute top-3 right-3 font-mono text-[10px] text-white/20 group-hover:text-white/50 transition-colors">
              {String(i + 1).padStart(2, '0')}
            </div>

            {/* Expand icon */}
            <div className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center
              border border-white/20 bg-black/30 transition-all duration-300 ${active === i ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA row ─────────────────────────────────────────── */}
      <div className="mt-12 text-center">
        <p className="text-white/35 text-sm mb-4">
          ¿Tu marca podría estar aquí?
        </p>
        <a
          href={`${WA_URL.split('?')[0]}?text=Hola%2C%20vi%20su%20portafolio%20y%20me%20gustar%C3%ADa%20trabajar%20con%20Relevvo`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary inline-flex items-center gap-2 text-sm"
        >
          Trabajemos juntos
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          {/* Prev */}
          <button
            className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev - 1 + works.length) % works.length : null) }}
          >
            ←
          </button>

          {/* Next */}
          <button
            className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); setLightbox(prev => prev !== null ? (prev + 1) % works.length : null) }}
          >
            →
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
            style={{ maxHeight: '80vh', aspectRatio: '16/10' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={works[lightbox].src}
              alt={`${works[lightbox].client} — ${works[lightbox].category}`}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <span className="font-mono text-xs text-accent/70 uppercase tracking-widest block">{works[lightbox].category}</span>
            <span className="text-white/80 text-sm font-semibold">{works[lightbox].client}</span>
            <span className="text-white/30 text-xs block mt-1">{lightbox + 1} / {works.length}</span>
          </div>
        </div>
      )}
    </section>
  )
}
