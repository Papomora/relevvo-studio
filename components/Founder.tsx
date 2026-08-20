'use client'

// ── Sección fundador — Juan Camilo "Papo" León Mora ──────────
// Foto: /public/founder.png (portrait, editorial dark bg)
// Contenido basado en su hoja de vida (bio, estudios, aptitudes,
// herramientas y experiencia laboral completa).

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { WA_URL } from '@/lib/constants'

const studies = [
  { title: 'Técnico en Diseño e Integración de Multimedia', detail: 'Culminado en 2016' },
  { title: 'Diseño Visual', detail: 'Cursando actualmente — 5to semestre' },
]

// Rating out of 5 — matches the stars next to each skill in the CV
const aptitudes = [
  { name: 'Diseñador Gráfico', level: 5 },
  { name: 'Creatividad', level: 4 },
  { name: 'Innovador', level: 4 },
  { name: 'Comediante', level: 3 },
  { name: 'Cantante', level: 1 },
]

const tools = [
  { name: 'Photoshop', src: '/images/tools/Photoshop_logo.png' },
  { name: 'Illustrator', src: '/images/tools/Illustrator_logo.png' },
  { name: 'After Effects', src: '/images/tools/AfterEffects_logo.png' },
  { name: 'Premiere Pro', src: '/images/tools/PremierePro_logo.png' },
  { name: 'Figma', src: '/images/tools/Figma_logo.png' },
  { name: 'DaVinci Resolve', src: '/images/tools/DaVinciResolve_logo.png' },
  { name: 'Creative Cloud', src: '/images/tools/CreativeCloud_logo.png' },
]

const timeline = [
  {
    year: '2016', role: 'Asistente Audiovisual', place: 'RCN Televisión',
    desc: 'Acompañamiento y realización de fotografías, videos y piezas gráficas.',
  },
  {
    year: '2020', role: 'Diseñador Gráfico', place: 'Quality and Price',
    desc: 'Generación de contenido, fotografía de producto, e-commerce y manejo de redes sociales.',
  },
  {
    year: '2021', role: 'Diseñador Gráfico', place: 'Think Click · Neofy',
    desc: 'Branding y creación de marca, diseño y prototipado web, creación de conceptos visuales.',
  },
  {
    year: '2021', role: 'Diseñador E-Learning', place: 'ADN Training',
    desc: 'Creación de key-visual, diseño y prototipado UI, diseño instruccional y piezas publicitarias.',
  },
  {
    year: '2023', role: 'Diseñador Gráfico Junior', place: 'Hoytrabajas',
    desc: 'Campañas de fortalecimiento de marca basadas en growth, P.O.P y estrategia visual en redes sociales de alto impacto.',
  },
  {
    year: '2024', role: 'Designer Lead', place: 'ecomms — México & USA',
    desc: 'Creación de marca, branding y retoque fotográfico para e-commerce en Estados Unidos y México.',
  },
  {
    year: '2025', role: 'Creative Designer', place: 'Ariadna (Grupo Barnier) — cuenta LG Colombia',
    desc: 'Apoyo creativo en piezas digitales, P.O.P y retail — optimización de piezas masivas y propuestas de campaña.',
  },
  {
    year: 'Hoy', role: 'Fundador & Director Creativo', place: 'Relevvo Studio',
    desc: 'Todo ese camino hoy vive dentro de Relevvo — una agencia hecha con la misma mezcla de criterio, curiosidad y ganas de anticiparse a lo que viene.',
    current: true,
  },
]

export default function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const photoRef   = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const tlRef      = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Opacity-only reveals — an x/y-transform reveal that never fires (e.g.
    // ScrollTrigger's cached trigger position going stale once below-the-
    // fold images finish loading and shift document height) leaves content
    // visibly clipped/shifted on mobile instead of just not-yet-faded-in.
    gsap.from(photoRef.current, {
      opacity: 0, duration: 1, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    gsap.from(textRef.current, {
      opacity: 0, duration: 1, ease: 'power2.out', delay: 0.1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    })
    const items = tlRef.current?.querySelectorAll('.tl-item')
    if (items) {
      gsap.from(Array.from(items), {
        opacity: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: tlRef.current, start: 'top 85%' },
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto">
      <span className="pill-badge mb-10 inline-flex">El equipo</span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* ── Foto ── */}
        <div ref={photoRef} className="relative" style={{ willChange: 'opacity' }}>
          <div
            className="w-full rounded-3xl overflow-hidden"
            style={{
              aspectRatio: '4/5',
              background: 'linear-gradient(160deg, rgba(124,58,237,0.12) 0%, rgba(10,10,10,0.95) 100%)',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            <img src="/founder.png" alt="Juan Camilo Papo León Mora"
                 className="w-full h-full object-cover"
                 style={{ filter: 'grayscale(15%) contrast(1.08)', objectPosition: 'center 15%' }} />
          </div>

          {/* Years badge */}
          <div
            className="absolute top-6 -right-3 px-4 py-3 rounded-xl text-center"
            style={{ background: '#0A0A0A', border: '1px solid rgba(124,58,237,0.4)' }}
          >
            <p className="heading-display text-white" style={{ fontSize: '1.7rem', letterSpacing: '-0.05em', lineHeight: 1 }}>9+</p>
            <p className="font-mono text-xs text-white/40 mt-1" style={{ letterSpacing: '0.08em' }}>años</p>
          </div>

          {/* International badge */}
          <div
            className="absolute -bottom-3 -left-3 px-4 py-2 rounded-xl"
            style={{ background: '#0A0A0A', border: '1px solid rgba(65,229,117,0.35)' }}
          >
            <p className="font-mono text-xs" style={{ color: '#41E575', letterSpacing: '0.08em' }}>🌎 Col · Méx · USA</p>
          </div>

          {/* Purple accent block */}
          <div
            className="absolute -bottom-5 -right-5 w-24 h-24 rounded-2xl"
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.25)', zIndex: -1 }}
          />

          {/* ── Estudios ── */}
          <div className="mt-10">
            <span className="font-mono text-xs text-white/25 uppercase mb-4 block" style={{ letterSpacing: '0.12em' }}>
              Estudios
            </span>
            <div className="flex flex-col gap-4">
              {studies.map((s, i) => (
                <div key={i}>
                  <p className="text-white/80 text-sm font-medium leading-snug">{s.title}</p>
                  <p className="text-white/35 text-xs mt-0.5">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Texto ── */}
        <div ref={textRef} style={{ willChange: 'opacity' }}>
          <span
            className="font-mono text-xs uppercase mb-4 block"
            style={{ color: 'rgba(124,58,237,0.8)', letterSpacing: '0.14em' }}
          >
            Fundador & Director Creativo
          </span>

          <h2
            className="heading-display text-white mb-2"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
          >
            Juan Camilo
          </h2>
          <h2
            className="heading-serif text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            "Papo" León Mora
          </h2>

          <p className="text-white/60 text-base leading-relaxed mb-4">
            Amo ser esto que la gente llama "creativo". Soy diseñador gráfico, y mi paso por
            distintos proyectos y caminos muy diferentes entre sí me hizo desarrollar el gusto
            por estar en la tendencia, ser innovador y anticiparme a las necesidades — algo que
            terminó llevándome a trabajar en México, ampliando horizontes.
          </p>

          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Fuera de la pantalla me encanta cocinar, ilustrar y salir en bici — es de mis hábitos
            más espontáneos, junto con las ideas locas que después terminan siendo un proyecto.
            No diseño para que algo se vea bien: diseño para que funcione, conecte y venda.
          </p>

          {/* Aptitudes — con calificación en estrellas, como en la hoja de vida */}
          <div className="mb-8">
            <span className="font-mono text-xs text-white/25 uppercase mb-3 block" style={{ letterSpacing: '0.12em' }}>
              Aptitudes
            </span>
            <div className="flex flex-col gap-2 max-w-xs">
              {aptitudes.map((a, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <span className="text-white/70 text-sm">{a.name}</span>
                  <span className="flex gap-0.5 shrink-0" aria-label={`${a.level} de 5 estrellas`}>
                    {Array.from({ length: 5 }).map((_, s) => (
                      <svg key={s} width="13" height="13" viewBox="0 0 24 24"
                        fill={s < a.level ? '#D2BBFF' : 'none'}
                        stroke={s < a.level ? '#D2BBFF' : 'rgba(255,255,255,0.2)'}
                        strokeWidth="1.5">
                        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6L12 2z" />
                      </svg>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Herramientas */}
          <div className="mb-8">
            <span className="font-mono text-xs text-white/25 uppercase mb-3 block" style={{ letterSpacing: '0.12em' }}>
              Mis herramientas
            </span>
            <div className="flex flex-wrap gap-3">
              {tools.map((t, i) => (
                <div
                  key={i}
                  title={t.name}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Image src={t.src} alt={t.name} width={24} height={24} className="object-contain" unoptimized />
                </div>
              ))}
            </div>
          </div>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm px-6 py-3 inline-flex items-center gap-2"
          >
            Hablemos directamente
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Experiencia laboral ── */}
      <div ref={tlRef} className="mt-16 pt-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-mono text-xs text-white/25 uppercase mb-8 block" style={{ letterSpacing: '0.12em' }}>
          Experiencia laboral
        </span>
        <div className="flex flex-col">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="tl-item grid gap-4 py-5"
              style={{
                gridTemplateColumns: '70px 1fr',
                borderBottom: i === timeline.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <span
                className="font-mono text-xs pt-0.5"
                style={{ color: item.current ? 'rgba(124,58,237,0.9)' : 'rgba(255,255,255,0.3)', letterSpacing: '0.06em' }}
              >
                {item.year}
              </span>
              <div>
                <p className="text-white text-sm font-semibold leading-snug">
                  {item.role}
                  {item.place && <span className="text-white/40 font-normal"> · {item.place}</span>}
                  {item.current && (
                    <span
                      className="ml-2 text-[10px] font-mono px-2 py-0.5 rounded-full align-middle"
                      style={{ background: 'rgba(124,58,237,0.15)', color: 'rgba(210,187,255,0.9)' }}
                    >
                      hoy
                    </span>
                  )}
                </p>
                <p className="text-white/40 text-xs leading-relaxed mt-1.5 max-w-xl">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
