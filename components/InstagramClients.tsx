'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const clients = [
  {
    name: 'Vive Metro',
    handle: '@vivemetro73',
    url: 'https://www.instagram.com/vivemetro73/',
    category: 'Bienes Raíces',
    initials: 'VM',
    avatarBg: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    bannerBg: 'linear-gradient(120deg, rgba(124,58,237,0.18) 0%, rgba(168,85,247,0.08) 100%)',
    borderColor: 'rgba(124,58,237,0.35)',
  },
  {
    name: 'Alhambra Condominio',
    handle: 'Alhambra Campestre',
    url: 'https://www.facebook.com/alhambracondominocampestre',
    category: 'Inmobiliaria',
    initials: 'AC',
    avatarBg: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    bannerBg: 'linear-gradient(120deg, rgba(29,78,216,0.18) 0%, rgba(59,130,246,0.08) 100%)',
    borderColor: 'rgba(59,130,246,0.35)',
  },
  {
    name: 'Tienda Crusso',
    handle: '@tiendacrusso',
    url: 'https://www.instagram.com/tiendacrusso/',
    category: 'Retail & Moda',
    initials: 'TC',
    avatarBg: 'linear-gradient(135deg, #be185d, #ec4899)',
    bannerBg: 'linear-gradient(120deg, rgba(190,24,93,0.18) 0%, rgba(236,72,153,0.08) 100%)',
    borderColor: 'rgba(236,72,153,0.35)',
  },
  {
    name: 'Molicie Hogar',
    handle: '@moliciehogar',
    url: 'https://www.instagram.com/moliciehogar/',
    category: 'Hogar & Decoración',
    initials: 'MH',
    avatarBg: 'linear-gradient(135deg, #b45309, #f59e0b)',
    bannerBg: 'linear-gradient(120deg, rgba(180,83,9,0.18) 0%, rgba(245,158,11,0.08) 100%)',
    borderColor: 'rgba(245,158,11,0.35)',
  },
  {
    name: 'Forjar Inversiones',
    handle: '@forjar_inversiones',
    url: 'https://www.instagram.com/forjar_inversiones/',
    category: 'Inversiones',
    initials: 'FI',
    avatarBg: 'linear-gradient(135deg, #065f46, #10b981)',
    bannerBg: 'linear-gradient(120deg, rgba(6,95,70,0.18) 0%, rgba(16,185,129,0.08) 100%)',
    borderColor: 'rgba(16,185,129,0.35)',
  },
  {
    name: 'Vers La Féminité',
    handle: '@verslafeminite',
    url: 'https://www.instagram.com/verslafeminite/',
    category: 'Moda Femenina',
    initials: 'VF',
    avatarBg: 'linear-gradient(135deg, #9d174d, #f472b6)',
    bannerBg: 'linear-gradient(120deg, rgba(157,23,77,0.18) 0%, rgba(244,114,182,0.08) 100%)',
    borderColor: 'rgba(244,114,182,0.35)',
  },
]

export default function InstagramClients() {
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
    })

    const cards = gridRef.current?.querySelectorAll('.ig-card')
    if (cards) {
      // Staggered entrance
      gsap.from(Array.from(cards), {
        y: 40,
        duration: 0.65,
        ease: 'power3.out',
        stagger: { amount: 0.4, from: 'start' },
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      })

      // Shimmer on each card after entrance
      Array.from(cards).forEach((card, i) => {
        const shimmer = card.querySelector('.card-shimmer') as HTMLElement
        if (shimmer) {
          gsap.fromTo(
            shimmer,
            { x: '-100%' },
            {
              x: '200%',
              duration: 1.2,
              ease: 'power2.inOut',
              delay: 0.6 + i * 0.12,
              scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            }
          )
        }
      })
    }
  }, [])

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div ref={headingRef} className="mb-12 text-center">
        <span className="pill-badge mb-6 inline-flex">Nuestros clientes</span>
        <h2 className="mb-4">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            Marcas que ya{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
            confían en nosotros.
          </span>
        </h2>
        <p className="text-white/50 text-base max-w-lg mx-auto leading-relaxed">
          Conoce el trabajo que hacemos para nuestros clientes. Cada perfil, una historia de marca.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {clients.map((client, i) => (
          <Link
            key={i}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-card group relative flex items-center gap-4 px-5 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            style={{
              background: client.bannerBg,
              border: `1px solid ${client.borderColor}`,
              backdropFilter: 'blur(10px)',
              willChange: 'transform',
            }}
          >
            {/* Shimmer sweep */}
            <div
              className="card-shimmer absolute inset-y-0 w-1/3 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
                zIndex: 1,
              }}
            />

            {/* Hover brightness */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-300 pointer-events-none" />

            {/* Initials avatar */}
            <div
              className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-sm"
              style={{
                background: client.avatarBg,
                boxShadow: `0 0 16px ${client.borderColor}`,
              }}
            >
              {client.initials}
            </div>

            {/* Info */}
            <div className="relative z-10 flex-1 min-w-0">
              <p
                className="font-display font-bold text-white leading-tight truncate"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', letterSpacing: '-0.02em' }}
              >
                {client.name}
              </p>
              <p
                className="font-mono text-xs mt-0.5 truncate"
                style={{ color: client.borderColor.replace('0.35', '0.9') }}
              >
                {client.handle}
              </p>
            </div>

            {/* Category badge */}
            <div className="relative z-10 flex-shrink-0">
              <span
                className="text-[11px] font-medium px-3 py-1 rounded-full"
                style={{
                  background: client.borderColor.replace('0.35', '0.15'),
                  border: `1px solid ${client.borderColor}`,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {client.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
