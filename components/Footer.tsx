'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WA_URL } from '@/lib/constants'

export default function Footer() {
  const headingRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 50, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
    })
    gsap.from(btnRef.current, {
      y: 24, duration: 0.7, ease: 'back.out(1.6)', delay: 0.15,
      scrollTrigger: { trigger: btnRef.current, start: 'top 90%' },
    })
    gsap.from(bottomRef.current, {
      y: 20, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: bottomRef.current, start: 'top 95%' },
    })
  }, [])

  return (
    <footer id="contacto" className="border-t border-white/10 mt-16">
      {/* CTA Banner */}
      <div className="py-20 px-4 text-center max-w-3xl mx-auto">
        <div ref={headingRef}>
          <h2 className="mb-6">
            <span className="heading-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              ¿Listo para hacerlo{' '}
            </span>
            <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              simple?
            </span>
          </h2>
          <p className="text-white/55 text-lg mb-8">
            Agenda una cita y hablemos de tu marca.
          </p>
        </div>
        <Link
          ref={btnRef}
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-glow text-base px-10 py-4 inline-flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Agenda una cita
        </Link>
      </div>

      {/* Bottom bar */}
      <div ref={bottomRef} className="border-t border-white/10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/images/Relevvostd@3x.png" alt="Relevvo Studio" width={100} height={32} className="object-contain" />
          </Link>

          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link>
            <Link href="#precios" className="hover:text-white transition-colors">Precios</Link>
            <Link href="#portafolio" className="hover:text-white transition-colors">Clientes</Link>
          </div>

          <p className="text-white/30 text-sm">
            © 2025 Relevvo Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
