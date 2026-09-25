'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Testimonial() {
  const cardRef = useRef<HTMLDivElement>(null)

  // useGSAP revierte el tween y su ScrollTrigger al desmontar.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(cardRef.current, {
        y: 50, scale: 0.97, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
      })
    })
  }, { scope: cardRef })

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <div
        ref={cardRef}
        className="card rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0"
      >
        {/* Text side */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="flex gap-1 mb-5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="text-white">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <blockquote className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
            "En Etología Canina estamos muy contentos con el desarrollo y crecimiento que hemos tenido
            con Relevvo, hemos llegado a lugares donde antes no creíamos, el impacto digital que
            hemos tenido en ventas ha sido muy grande."
          </blockquote>

          <div>
            <p className="font-semibold text-white">Eliana García</p>
            <p className="text-white/65 text-sm">CEO de Etología Canina Colombia</p>
          </div>
        </div>

        {/* Eliana photo */}
        <div className="relative h-64 md:h-auto overflow-hidden rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none">
          <Image
            src="/images/Eliana.png"
            alt="Eliana García - CEO Etología Canina Colombia"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
