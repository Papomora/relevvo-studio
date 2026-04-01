'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const plans = [
  {
    name: 'Relevvo BASIC',
    price: '$1,600,000',
    tag: 'Para marcas que ya venden y quieren crecer',
    featured: false,
    features: [
      'Hasta 12 piezas mensuales',
      'Logo básico o ajuste de logo',
      'Mini brand kit',
      'Gestión de redes',
      'IA básica',
      '2 revisiones por pieza',
      'Soporte asincrónico',
      'Aplican TYC',
    ],
  },
  {
    name: 'Relevvo MID',
    price: '$3,490,000',
    tag: 'El plan más balanceado y vendible',
    featured: true,
    features: [
      '16–20 piezas mensuales',
      'Branding continuo y coherencia visual',
      'Sesión de fotografía profesional',
      'Generación de imágenes con IA',
      'Community Manager',
      'Planeación mensual de contenido',
      '3 revisiones por pieza',
      'Aplican TYC',
    ],
  },
  {
    name: 'Relevvo FULL',
    price: '$4,990,000',
    tag: 'Para marcas que quieren resultados, no solo contenido',
    featured: false,
    features: [
      'Unlimited design requests',
      'IA avanzada',
      'Fotografía profesional',
      'Community Manager dedicado',
      'Gestión de pauta',
      'Estrategia de contenido y campañas',
      '4 revisiones por pieza',
      'Aplican TYC',
    ],
  },
]

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [discount, setDiscount] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
    })
    const cards = cardsRef.current?.children
    if (cards) {
      gsap.from(Array.from(cards), {
        y: 50, duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="precios" className="py-24 px-4 max-w-5xl mx-auto text-center">
      <div ref={headingRef}>
        <span className="pill-badge mb-6 inline-flex">Precios</span>
        <h2 className="mb-4">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            Precios{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            simples.
          </span>
        </h2>
        <p className="text-white/55 text-lg mb-14 max-w-lg mx-auto">
          Planes mensuales claros, sin sobrecostos de agencia y enfocados en resultados reales.
        </p>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative flex flex-col p-8 rounded-2xl border text-left transition-all duration-300 ${
              plan.featured
                ? 'border-accent bg-[rgba(124,58,237,0.08)] shadow-lg shadow-accent/20'
                : 'border-white/10 bg-[rgba(255,255,255,0.03)]'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-white text-xs font-semibold px-4 py-1 rounded-full">
                  Más popular
                </span>
              </div>
            )}

            {/* Dot indicator */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white/50 text-xs">{plan.name}</span>
            </div>

            {/* Price */}
            <div className="mb-2">
              <span className="heading-display text-white" style={{ fontSize: '2rem' }}>
                {discount
                  ? `$${Math.round(parseInt(plan.price.replace(/\D/g, '')) * 0.85).toLocaleString('es-CO')}`
                  : plan.price}
              </span>
              <span className="text-white/50 text-sm ml-1">/mes</span>
            </div>

            <p className="text-white/55 text-sm mb-6 leading-snug">{plan.tag}</p>

            <Link href="#contacto" className="btn-primary text-sm py-3 mb-6">
              Suscríbete
            </Link>

            {/* Discount toggle */}
            <label className="flex items-center gap-2 mb-6 cursor-pointer">
              <div
                className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${discount ? 'bg-accent' : 'bg-white/20'}`}
                onClick={() => setDiscount(!discount)}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${discount ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-white/50 text-xs">Descuento Yovel</span>
            </label>

            {/* Features list */}
            <ul className="flex flex-col gap-2.5">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-white/70">
                  <span className="text-accent mt-0.5 flex-shrink-0">+</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
