'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const points = [
  {
    title: 'Somos cercanos y transparentes',
    body: 'Creemos en la comunicación clara. Hablamos directo, explicamos procesos y evitamos tecnicismos innecesarios. Queremos que el cliente entienda qué se hace y por qué.',
  },
  {
    title: 'Nos involucramos como parte del equipo',
    body: 'No trabajamos "por fuera". Nos integramos al negocio del cliente, entendemos su contexto y acompañamos el crecimiento como un aliado real, no como un proveedor distante.',
  },
  {
    title: 'Valoramos las relaciones a largo plazo',
    body: 'Buscamos construir confianza, no solo entregar piezas. Cuando una marca crece, cambia o escala, estamos ahí para adaptarnos y evolucionar junto a ella.',
  },
]

export default function ComoPersonas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(contentRef.current,
      { x: -50 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )
    gsap.fromTo(imageRef.current,
      { x: 50 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Content (left) */}
        <div ref={contentRef} style={{ willChange: 'transform, opacity' }}>
          <h2 className="mb-8">
            <span className="type-display heading-display text-white">Como{' '}</span>
            <span className="type-display heading-serif text-white">personas</span>
          </h2>

          <div className="flex flex-col gap-7">
            {points.map((p, i) => (
              <div key={i}>
                <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image (right) */}
        <div ref={imageRef} className="relative rounded-2xl overflow-hidden aspect-[4/5]" style={{ willChange: 'transform, opacity' }}>
          <Image
            src="/images/nosotros/origen-personal.png"
            alt="Así nació Relevvo Studio — origen personal"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
