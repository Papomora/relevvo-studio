'use client'

// ── Sección "Detrás de cámara" — construyendo el Instagram de Relevvo ──
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const INSTAGRAM_URL = 'https://www.instagram.com/relevvostudio'

export default function InstagramTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoWrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(sectionRef.current, {
      y: 30, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
  }, [])

  const handlePlay = () => {
    setPlaying(true)
    // video only starts downloading once the user actually asks for it
    requestAnimationFrame(() => videoRef.current?.play())
  }

  return (
    <section ref={sectionRef} className="py-20 px-4 max-w-5xl mx-auto" style={{ willChange: 'transform, opacity' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* ── Texto + CTA ── */}
        <div>
          <span className="pill-badge mb-6 inline-flex">Detrás de cámara</span>
          <h2 className="mb-6">
            <span className="type-display heading-display text-white">Estamos construyendo{' '}</span>
            <span className="type-display heading-serif text-white">nuestro Instagram.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-4">
            Además de las marcas que gestionamos, estamos empezando a mostrar cómo se ve
            Relevvo por dentro: el proceso, el equipo, los aciertos y los que no salieron
            a la primera. Contenido real, no una vitrina.
          </p>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Si quieres ver ese lado del estudio antes que nadie, síguenos — apenas estamos empezando.
          </p>

          <Link
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-6 py-3 inline-flex items-center gap-2"
          >
            Seguir en Instagram
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </Link>
        </div>

        {/* ── Video vertical (click-to-play, carga liviana) ── */}
        <div
          ref={videoWrapRef}
          className="relative rounded-3xl overflow-hidden mx-auto"
          style={{
            aspectRatio: '9/16', maxWidth: 340, width: '100%',
            border: '1px solid rgba(124,58,237,0.25)',
            background: '#0A0A0A',
          }}
        >
          <video
            ref={videoRef}
            src="/videos/relevvo-instagram.mp4"
            poster="/images/nosotros/relevvo-instagram-poster.jpg"
            className="w-full h-full object-cover"
            playsInline
            controls={playing}
            loop
            preload="none"
          />

          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Reproducir video"
              className="absolute inset-0 flex items-center justify-center group"
              style={{ background: 'rgba(0,0,0,0.15)' }}
            >
              <span
                className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: 64, height: 64,
                  background: 'rgba(124,58,237,0.9)',
                  boxShadow: '0 8px 30px rgba(124,58,237,0.5)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 3 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {/* Reel-style pill */}
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full font-mono text-[10px]"
            style={{ background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.06em' }}
          >
            @relevvostudio
          </div>
        </div>
      </div>
    </section>
  )
}
