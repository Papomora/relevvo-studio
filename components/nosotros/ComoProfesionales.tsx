'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

const points = [
  {
    title: 'Pensamos en resultados, no solo en diseño',
    body: 'Cada decisión visual y cada pieza de contenido tiene un propósito claro: apoyar los objetivos comerciales de la marca. Diseñamos para comunicar mejor, posicionar con claridad y facilitar la conversión.',
  },
  {
    title: 'Trabajamos con método y procesos claros',
    body: 'No improvisamos. Usamos sistemas, planificación mensual y flujos de trabajo definidos que nos permiten ser consistentes, eficientes y confiables en el tiempo.',
    highlight: true,
  },
  {
    title: 'La tecnología acelera; el criterio decide',
    body: 'Apoyamos investigación, moodboards e iteración rápida en herramientas de IA para ganar tiempo. Pero cada decisión de marca —color, tipografía, mensaje, tono— pasa por nuestro equipo. La tecnología no reemplaza el criterio creativo: lo potencia.',
  },
]

export default function ComoProfesionales() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(imageRef.current,
      { x: -50 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )
    gsap.fromTo(contentRef.current,
      { x: 50 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } }
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div ref={imageRef} className="relative rounded-2xl overflow-hidden aspect-[4/5]" style={{ willChange: 'transform, opacity' }}>
          <Image
            src="/images/nosotros/cliente-logo-word.png"
            alt="El cliente que llegó con un logo de Word — contenido de Relevvo Studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ willChange: 'transform, opacity' }}>
          <h2 className="mb-8">
            <span className="type-display heading-display text-white">Como{' '}</span>
            <span className="type-display heading-serif text-white">profesionales</span>
          </h2>

          <div className="flex flex-col gap-7">
            {points.map((p, i) => (
              <div key={i} className={`${p.highlight ? 'border border-accent/40 rounded-xl p-4 bg-accent/5' : ''}`}>
                <h3 className="font-display font-bold text-white text-lg mb-2">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
