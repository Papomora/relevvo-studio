'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Testimonial() {
  const cardRef = useRef<HTMLElement>(null)

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
    <section className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-12 md:py-16">
      {/* Bloque sólido mantequilla con texto noche (mockup "home final"). */}
      <figure
        ref={cardRef}
        className="grid grid-cols-1 sm:grid-cols-[auto_1fr] items-center gap-5 sm:gap-8 lg:gap-12 bg-butter text-night rounded-3xl"
        style={{ padding: 'clamp(24px, 5vw, 56px)', margin: 0 }}
      >
        <div
          className="relative overflow-hidden rounded-full shrink-0"
          style={{ width: 'clamp(96px, 14vw, 168px)', aspectRatio: '1 / 1' }}
        >
          <Image
            src="/images/Eliana.png"
            alt="Eliana García - CEO Etología Canina Colombia"
            fill
            className="object-cover object-top"
            sizes="168px"
          />
        </div>

        <div>
          <blockquote
            className="heading-serif"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', lineHeight: 1.2, margin: 0 }}
          >
            &ldquo;En Etología Canina estamos muy contentos con el desarrollo y crecimiento que hemos tenido
            con Relevvo, hemos llegado a lugares donde antes no creíamos, el impacto digital que
            hemos tenido en ventas ha sido muy grande.&rdquo;
          </blockquote>

          <figcaption className="mt-4 font-sans text-[15px]">
            <cite className="not-italic font-semibold">Eliana García</cite>
            <span className="opacity-70"> · CEO de Etología Canina Colombia</span>
          </figcaption>
        </div>
      </figure>
    </section>
  )
}
