'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

const logos: { name: string; src: string | null; href: string }[] = [
  { name: 'Molicié',           src: '/images/Logos/MOLICIE.png',         href: 'https://www.instagram.com/moliciehogar/' },
  { name: 'Crusso',            src: '/images/Logos/CRUSSO.png',          href: 'https://www.instagram.com/tiendacrusso/' },
  { name: 'Verslä',            src: '/images/Logos/versla.png',          href: 'https://www.instagram.com/verslafeminite/' },
  { name: 'Metro 73',          src: '/images/Logos/METRO73.png',         href: 'https://www.instagram.com/vivemetro73/' },
  { name: 'LimiteLegal',       src: '/images/Logos/limitelegal.png',     href: 'https://www.instagram.com/limite_legalco/' },
  { name: 'Forjar',            src: '/images/Logos/Forjar.png',          href: 'https://www.instagram.com/forjar_inversiones/' },
]

export default function NosotrosHero() {
  const headingRef = useRef<HTMLDivElement>(null)
  const logosRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
    const items = logosRef.current?.querySelectorAll('.ns-logo')
    if (items) {
      gsap.fromTo(Array.from(items),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.07, delay: 0.8 }
      )
    }
  }, [])

  return (
    <section className="relative min-h-[65vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 overflow-hidden">
      {/* Heading */}
      <div ref={headingRef} style={{ willChange: 'transform, opacity' }} className="mb-14">
        <span className="section-label mb-6 inline-flex justify-center">Sobre nosotros</span>
        <h1 className="mb-6">
          <span className="type-hero heading-display">Diseño con{' '}</span>
          <span className="type-hero heading-serif text-lilac">propósito.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-[color:var(--text)] text-lg leading-relaxed">
          En <strong className="text-butter font-semibold">Relevvo Studio</strong> creemos que las marcas se construyen
          con estrategia, pero se sostienen con personas. Combinamos{' '}
          <strong className="text-butter font-semibold">criterio profesional</strong> con una forma de trabajar
          <strong className="text-butter font-semibold"> cercana, clara y honesta.</strong>
        </p>
      </div>

      {/* Logo grid — white/monochrome, basement.studio style */}
      <div className="w-full max-w-3xl">
        <p className="text-muted text-xs mb-8 tracking-[0.2em] uppercase font-mono">
          Nuestros diseños hacen parte de
        </p>
        <div
          ref={logosRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden"
          style={{ border: '1px solid var(--border)', borderRadius: '12px' }}
        >
          {logos.map((logo, i) => (
            <a
              key={i}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${logo.name} en Instagram`}
              className="ns-logo group flex items-center justify-center"
              style={{
                aspectRatio: '2/1',
                background: 'var(--night-2)',
                transition: 'background 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--night-3)'
                el.style.boxShadow = 'inset 0 0 0 1px var(--border-hover)'
                const img = el.querySelector('img') as HTMLElement | null
                if (img) { img.style.filter = 'none'; img.style.opacity = '1' }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--night-2)'
                el.style.boxShadow = 'none'
                const img = el.querySelector('img') as HTMLElement | null
                if (img) { img.style.filter = 'grayscale(55%) brightness(1.3)'; img.style.opacity = '0.85' }
              }}
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={160}
                  height={64}
                  className="object-contain w-auto transition-all duration-300"
                  style={{ maxHeight: '68px', maxWidth: '85%', filter: 'grayscale(55%) brightness(1.3)', opacity: 0.85 }}
                  unoptimized
                />
              ) : (
                <span
                  className="font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 group-hover:opacity-100"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
                >
                  {logo.name}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
