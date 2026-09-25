'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { WA_URL } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// showCta=false oculta el banner grande: el home ya cierra con su propio CTA
// (VideoParallaxSection) y dos llamados seguidos se sentían repetidos.
export default function Footer({ showCta = true }: { showCta?: boolean }) {
  const footerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLAnchorElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: 50, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      })
    }
    if (btnRef.current) {
      gsap.from(btnRef.current, {
        y: 24, duration: 0.7, ease: 'back.out(1.6)', delay: 0.15,
        scrollTrigger: { trigger: btnRef.current, start: 'top 90%' },
      })
    }
    gsap.from(bottomRef.current, {
      y: 20, duration: 0.6, ease: 'power2.out',
      scrollTrigger: { trigger: bottomRef.current, start: 'top 95%' },
    })
  }, { scope: footerRef, dependencies: [showCta] })

  return (
    <footer ref={footerRef} id="contacto" className="mt-16 md:mt-[120px]">
      {/* Banner CTA: bloque sólido uva con botón mantequilla */}
      {showCta && (
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 md:pb-24">
        <div
          className="relative overflow-hidden bg-grape rounded-[28px] text-center"
          style={{ padding: 'clamp(40px, 7vw, 88px) clamp(22px, 5vw, 64px)' }}
        >
          <div
            aria-hidden="true"
            className="absolute rounded-full pointer-events-none"
            style={{
              right: '-8%',
              top: '-30%',
              width: 'min(440px, 55vw)',
              aspectRatio: '1 / 1',
              border: 'clamp(36px, 6vw, 80px) solid rgba(245,242,201,0.08)',
            }}
          />
          <div ref={headingRef} className="relative">
            <h2
              className="heading-display mb-6 [text-wrap:balance]"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 700 }}
            >
              ¿Listo para hacerlo{' '}
              <span className="heading-serif text-butter">simple?</span>
            </h2>
            <p className="text-butter text-lg mb-8" style={{ opacity: 0.85 }}>
              Agenda una cita y hablemos de tu marca.
            </p>
          </div>
          <Link
            ref={btnRef}
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative btn-primary text-base px-8 py-4 inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-butter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agenda una cita
          </Link>
        </div>
      </div>
      )}

      {/* Barra inferior: filete superior, logo, enlaces, © */}
      <div ref={bottomRef} className="pt-14 pb-10" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-5 text-sm text-muted">
          <Link href="/" aria-label="Relevvo Studio, inicio">
            <Image src="/images/Relevvostd@3x.png" alt="Relevvo Studio" width={100} height={32} className="object-contain h-[22px] w-auto" />
          </Link>

          <nav aria-label="Pie de página" className="flex flex-wrap justify-center items-center gap-x-5 gap-y-2">
            <Link href="/nosotros" className="hover:text-butter transition-colors">Nosotros</Link>
            <Link href="/papo" className="hover:text-butter transition-colors">Sobre mí</Link>
            <Link href="/contacto" className="hover:text-butter transition-colors">Contacto</Link>
            <Link href="/#clientes" className="hover:text-butter transition-colors">Clientes</Link>
            <Link href="/#portafolio" className="hover:text-butter transition-colors">Portafolio</Link>
          </nav>

          <p>
            © 2025 Relevvo Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
