'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { STUDIES, TIMELINE, APTITUDES, METRICS } from '@/lib/founder'
import { PROCESO_GENERICO } from '@/lib/servicios'

// ── Constants ──────────────────────────────────────────────────
const WA = 'https://wa.me/573223094005?text=Hola%20Camilo%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20sobre%20un%20proyecto'
const WA_AGENCY = 'https://wa.me/573223094005?text=Hola%2C%20quiero%20trabajar%20con%20Relevvo%20Studio'

// [COMPLETAR: falta un PDF de la hoja de vida en /public y una URL de
// LinkedIn real]. Ninguno de los dos aparece en ningún archivo del repo —
// no se inventa ni el archivo ni el enlace. El botón de descarga y el de
// LinkedIn se omiten a propósito hasta que existan (ver ESTADO.md); un
// botón roto es peor que ningún botón.

const T = {
  bg: '#0A0A0A', accent: '#7C3AED', accentL: '#A78BFA',
  green: '#41E575', muted: 'rgba(255,255,255,0.45)',
  border: 'rgba(255,255,255,0.08)', card: 'rgba(255,255,255,0.03)',
  fd: 'var(--font-bricolage)', fs: 'var(--font-instrument)', fb: 'var(--font-inter)',
}

const services = [
  { n: '01', title: 'Identidad de Marca', sub: 'Logo · Paleta · Tipografía · Tono de voz', color: '#A259FF' },
  { n: '02', title: 'Brandbook Completo', sub: 'Manual de marca · Guías de aplicación', color: '#FF6B6B' },
  { n: '03', title: 'Rediseño de Marca',  sub: 'Evolución de identidad · Sin perder esencia', color: '#67E8F9' },
  { n: '04', title: 'Naming & Concepto',  sub: 'Posicionamiento · Nombre estratégico', color: '#F9A8D4' },
  { n: '05', title: 'Contenido Visual',   sub: 'Social · Ecommerce · Fotografía', color: '#6EE7B7' },
  { n: '06', title: 'Prompting IA',       sub: 'Midjourney · Firefly · DALL·E · Claude', color: '#D4A27F' },
]

const brands = [
  { name: 'ARü',               cat: 'Accesorios Premium',    color: '#C9B882', year: '2024', tags: ['Identidad', 'Brandbook'], href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-quien-soy' },
  { name: 'Crusso',            cat: 'Mobiliario Premium',    color: '#C0392B', year: '2024', tags: ['Branding', 'Motion'],    href: 'https://www.instagram.com/tiendacrusso/' },
  { name: 'Molicié',          cat: 'Hogar & Decoración',    color: '#D4A757', year: '2023', tags: ['Identidad', 'Contenido'], href: 'https://www.instagram.com/moliciehogar/' },
  { name: 'Verslä',            cat: 'Moda Femenina',         color: '#F472B6', year: '2024', tags: ['Branding', 'Social'],    href: 'https://www.instagram.com/verslafeminite/' },
  { name: 'Khalifa',           cat: 'Marketing Digital',     color: '#60A5FA', year: '2023', tags: ['Identidad', 'Web'],      href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-brand-khalifa' },
  { name: 'Gadotec',           cat: 'Tecnología',            color: '#34D399', year: '2023', tags: ['Branding', 'Naming'],   href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-brand-gadotec' },
  { name: 'Ecomms',            cat: 'Comercio Digital',      color: '#A78BFA', year: '2024', tags: ['Identidad', 'Ecommerce'], href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-brand-ecomms' },
  { name: 'Visuality',         cat: 'Publicidad Exterior',   color: '#F87171', year: '2024', tags: ['Branding', 'OOH'],      href: 'https://instagram.com' },
  { name: 'Metro 73',          cat: 'Estilo de vida',        color: '#818CF8', year: '2024', tags: ['Branding', 'Social'],   href: 'https://www.instagram.com/vivemetro73/' },
  { name: 'LímiteLegal',       cat: 'Legal & Consultoría',   color: '#94A3B8', year: '2024', tags: ['Identidad', 'Web'],     href: 'https://www.instagram.com/limite_legalco/' },
  { name: 'Forjar',            cat: 'Inversiones',           color: '#FBBF24', year: '2024', tags: ['Branding', 'Naming'],  href: 'https://www.instagram.com/forjar_inversiones/' },
]

const tools: { name: string; logo?: string; emoji?: string; cat: 'Design' | 'AI'; color: string }[] = [
  { name: 'Figma',         logo: '/images/tools/Figma_logo.png',         cat: 'Design', color: '#A259FF' },
  { name: 'Illustrator',   logo: '/images/tools/Illustrator_logo.png',   cat: 'Design', color: '#FF7C00' },
  { name: 'Photoshop',     logo: '/images/tools/Photoshop_logo.png',     cat: 'Design', color: '#31A8FF' },
  { name: 'After Effects', logo: '/images/tools/AfterEffects_logo.png',  cat: 'Design', color: '#9999FF' },
  { name: 'Premiere Pro',  logo: '/images/tools/PremierePro_logo.png',   cat: 'Design', color: '#9999FF' },
  { name: 'Claude',        logo: '/images/tools/Claude_logo.png',     cat: 'AI', color: '#D4A27F' },
  { name: 'Midjourney',    logo: '/images/tools/Midjourney_logo.png', cat: 'AI', color: '#7C9FD4' },
  { name: 'ChatGPT',       logo: '/images/tools/ChatGPT_logo.png',    cat: 'AI', color: '#10A37F' },
  { name: 'Firefly',       logo: '/images/tools/Firefly_logo.png',    cat: 'AI', color: '#FF6B6B' },
  { name: 'Gemini',        logo: '/images/tools/Gemini_logo.png',     cat: 'AI', color: '#4285F4' },
  { name: 'Freepik',       logo: '/images/tools/Freepik_logo.png',    cat: 'AI', color: '#1273EB' },
]

const proceso = PROCESO_GENERICO

// ── Scroll reveal helper ───────────────────────────────────────
function useReveal(ref: React.RefObject<HTMLElement | null>, opts?: { y?: number; delay?: number; stagger?: number }) {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(ref.current, {
      y: opts?.y ?? 40, opacity: 0, duration: 0.85, ease: 'power3.out',
      delay: opts?.delay ?? 0,
      scrollTrigger: { trigger: ref.current, start: 'top 88%' },
    })
  }, [])
}

// ── Section label ──────────────────────────────────────────────
function SLabel({ n, label }: { n: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { y: 16 })
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{ width: 22, height: 1, background: T.accent }} />
      <span style={{ fontFamily: T.fb, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: T.accentL }}>
        {n} — {label}
      </span>
    </div>
  )
}

// Herramientas con filtro Todo/Diseño/IA — una sola lista en vez de dos
// columnas etiquetadas (maqueta: design/BentoCV.dc.html).
type ToolFilter = 'Todo' | 'Design' | 'AI'

export default function PapoPage() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const [toolFilter, setToolFilter] = useState<ToolFilter>('Todo')
  const headerRef    = useRef<HTMLDivElement>(null)
  const servicesRef  = useRef<HTMLElement>(null)
  const brandsRef    = useRef<HTMLElement>(null)
  const bentoRef     = useRef<HTMLElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)

  // Métricas del bento — 3 vienen de lib/founder.ts (fuente única), la
  // cuarta ("marcas en portafolio") se calcula del array `brands` de arriba
  // en vez de escribirse a mano, para que nunca se desincronice con él.
  const bentoMetrics = [
    { value: METRICS[0].num, label: 'marcas con Relevvo' },
    { value: METRICS[1].num, label: 'años de oficio' },
    { value: METRICS[3].num, label: 'países activos' },
    { value: String(brands.length), label: 'marcas en portafolio' },
  ]

  const filteredTools = tools.filter(t => toolFilter === 'Todo' || t.cat === toolFilter)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Encabezado mínimo — fundido simple, sin reveal cinematográfico.
    gsap.from(headerRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' })

    // Services stagger
    const svcs = servicesRef.current?.querySelectorAll('.svc-row')
    if (svcs) gsap.from(Array.from(svcs), { x: -30, opacity: 0, stagger: 0.08, duration: 0.65, ease: 'power3.out', scrollTrigger: { trigger: servicesRef.current, start: 'top 85%' } })

    // Brand cards stagger — immediateRender:false prevents invisible-on-mount bug
    const cards = brandsRef.current?.querySelectorAll('.brand-card')
    if (cards) gsap.from(Array.from(cards), {
      y: 40, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: { trigger: brandsRef.current, start: 'top bottom', once: true },
    })

    // Bento cells stagger — reemplaza las animaciones separadas que tenían
    // Stack/Formación/Trayectoria/Competencias/Proceso cuando eran secciones
    // independientes.
    const bentoCells = bentoRef.current?.querySelectorAll('.bento-cell')
    if (bentoCells) gsap.from(Array.from(bentoCells), {
      y: 24, opacity: 0, stagger: 0.06, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: bentoRef.current, start: 'top 85%' },
    })

    // CTA reveal
    gsap.from(ctaRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' } })
  }, [])

  return (
    <main style={{ background: 'transparent', minHeight: '100vh', color: '#fff', position: 'relative' }}>
      <style jsx global>{`
        @media(max-width:640px){ .cta-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:900px){ .brands-grid{ grid-template-columns:repeat(2,1fr)!important; } }
        @media(max-width:500px){ .brands-grid{ grid-template-columns:1fr!important; } }

        /* ── Bento "Perfil profesional" (01) ── */
        .bento-cell { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 26px; display: flex; flex-direction: column; }
        .bento-row { border-radius: 10px; transition: background .2s ease; }
        .bento-row:hover { background: rgba(124,58,237,0.09); }
        .bento-chip { display: inline-flex; align-items: center; gap: 7px; padding: 7px 13px; border-radius: 100px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); font-size: 0.8125rem; color: rgba(255,255,255,0.72); transition: border-color .2s ease, background .2s ease; }
        .bento-chip:hover { border-color: rgba(255,255,255,0.25); background: rgba(255,255,255,0.07); }
        .bento-filt { cursor: pointer; font-family: var(--font-inter); border: none; transition: background .2s ease, color .2s ease, border-color .2s ease; }
        .bento-clamp1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
        .bento-grid { display: grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap: 14px; }
        .bento-traj { grid-column: span 7; }
        .bento-right { grid-column: span 5; display: grid; gap: 14px; align-content: start; }
        .bento-proceso { grid-column: span 12; }
        .bento-metrics { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 10px; }
        .bento-apt-formacion { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
        .bento-proc-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 22px; }
        @media(max-width:900px){ .bento-traj, .bento-right, .bento-proceso{ grid-column: span 12!important; } .bento-proc-grid{ grid-template-columns:repeat(2,1fr)!important; } }
        @media(max-width:560px){ .bento-metrics, .bento-apt-formacion{ grid-template-columns:repeat(2,1fr)!important; } .bento-proc-grid{ grid-template-columns:1fr!important; } }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(20px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 17, letterSpacing: '-0.04em', color: '#fff' }}>Papo</span>
          <span style={{ fontFamily: T.fs, fontStyle: 'italic', fontSize: 17, color: T.muted }}>León</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ fontSize: 12, color: T.muted, textDecoration: 'none', padding: '6px 12px', borderRadius: 99, border: `1px solid ${T.border}`, transition: 'color .2s' }}>
            Relevvo Studio ↗
          </Link>
          <Link href={WA} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 99, background: T.accent, color: '#fff', textDecoration: 'none' }}>
            Trabajemos juntos
          </Link>
        </div>
      </nav>

      {/* ── ENCABEZADO MÍNIMO ──
          Reemplaza el hero anterior (titular gigante + reveal cinematográfico)
          y la sección "Sobre mí" que traía foto grande con glow/anillo
          animados — el usuario dijo que se sentía "una presentación". Esto
          es una franja compacta: foto pequeña, nombre, rol, una línea de
          bio. Va directo al contenido debajo, sin pitch. */}
      <div ref={headerRef} style={{ padding: 'clamp(130px,14vw,160px) clamp(20px,6vw,80px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: `1px solid ${T.border}` }}>
            <Image src="/founder.png" alt="Juan Camilo León" width={128} height={128}
                   style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
          </div>
          <div>
            {/* Único <h1> de la página. */}
            <h1 style={{ fontFamily: T.fd, fontWeight: 800, fontSize: 'clamp(1.5rem,3vw,2rem)', letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
              Juan Camilo "Papo" León Mora
            </h1>
            <p style={{ fontSize: '0.9375rem', color: T.muted, margin: '4px 0 0', fontFamily: T.fb }}>
              Fundador &amp; Director Creativo — Relevvo Studio · Colombia 🇨🇴
            </p>
          </div>
        </div>
        <p style={{ fontSize: '1rem', lineHeight: 1.65, color: T.muted, maxWidth: 620, margin: '20px 0 0', fontFamily: T.fb }}>
          Diseño de marca con estrategia primero: entender el negocio antes de diseñar la identidad
          que lo comunica. Nueve años de oficio, hoy dentro de un equipo — el detalle está debajo.
        </p>
      </div>

      {/* ── 01 — PERFIL PROFESIONAL (bento) ──
          Trayectoria, métricas, formación, competencias, herramientas y
          proceso en una sola rejilla — antes eran 5 secciones apiladas.
          Maqueta: design/BentoCV.dc.html. */}
      <section ref={bentoRef} style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <div style={{ marginBottom: 28 }}>
          <SLabel n="01" label="Perfil profesional" />
          <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 1, margin: 0, color: '#fff' }}>
            Quién soy, en corto.
          </h2>
        </div>

        <div className="bento-grid">

          {/* ── Trayectoria — la celda más grande, a propósito ── */}
          <div className="bento-cell bento-traj" style={{ gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Trayectoria</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)' }}>2016 — hoy</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TIMELINE.map((item, i) => (
                <div key={i} className="bento-row" style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 14, padding: 10, alignItems: 'start' }}>
                  <span style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '0.75rem', paddingTop: 2, fontVariantNumeric: 'tabular-nums', color: item.current ? T.accentL : 'rgba(255,255,255,0.3)' }}>
                    {item.year}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: T.fd, fontWeight: 700, fontSize: '0.9375rem', color: '#fff' }}>{item.role}</span>
                      <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)' }}>· {item.place}</span>
                      {item.current && (
                        <span style={{ fontSize: 10, fontFamily: T.fb, fontWeight: 700, padding: '2px 9px', borderRadius: 99, background: 'rgba(124,58,237,0.15)', color: T.accentL }}>
                          hoy
                        </span>
                      )}
                    </div>
                    <span className="bento-clamp1" style={{ fontSize: '0.8125rem', lineHeight: 1.45, color: 'rgba(255,255,255,0.38)' }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Columna derecha ── */}
          <div className="bento-right">

            {/* Métricas — suben primero, es donde cae el ojo tras el titular */}
            <div className="bento-cell" style={{ padding: '22px 26px' }}>
              <div className="bento-metrics">
                {bentoMetrics.map((m, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <span style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', color: T.accentL }}>{m.value}</span>
                    <span style={{ fontSize: '0.6875rem', lineHeight: 1.3, color: 'rgba(255,255,255,0.38)' }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aptitudes + Formación */}
            <div className="bento-apt-formacion">
              <div className="bento-cell" style={{ gap: 14, padding: 22 }}>
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Aptitudes</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {APTITUDES.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)' }}>{a.name}</span>
                      <span style={{ display: 'flex', gap: 2, flexShrink: 0 }} aria-label={`${a.level} de 5 estrellas`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <span key={s} style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: s < a.level ? T.accentL : 'rgba(255,255,255,0.14)' }} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-cell" style={{ gap: 14, padding: 22 }}>
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Formación</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {STUDIES.map((s, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontFamily: T.fd, fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3, color: '#fff' }}>{s.title}</span>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{s.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Herramientas — una sola lista, filtro Todo/Diseño/IA */}
            <div className="bento-cell" style={{ gap: 16, padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Herramientas</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {([
                    { id: 'Todo' as ToolFilter, label: 'Todo' },
                    { id: 'Design' as ToolFilter, label: 'Diseño' },
                    { id: 'AI' as ToolFilter, label: 'IA' },
                  ]).map(f => (
                    <button
                      key={f.id}
                      className="bento-filt"
                      onClick={() => setToolFilter(f.id)}
                      style={{
                        padding: '4px 11px', borderRadius: 100, fontSize: '0.6875rem', fontWeight: 600,
                        background: toolFilter === f.id ? T.accent : 'transparent',
                        color: toolFilter === f.id ? '#fff' : 'rgba(255,255,255,0.4)',
                        border: toolFilter === f.id ? '1px solid transparent' : `1px solid ${T.border}`,
                      }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {filteredTools.map((tool, i) => (
                  <span key={i} className="bento-chip">
                    <img src={tool.logo} alt="" style={{ width: 14, height: 14, objectFit: 'contain' }} />
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── Proceso — ancho completo ── */}
          <div className="bento-cell bento-proceso" style={{ gap: 20, padding: '26px 28px' }}>
            <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Cómo trabajo</span>
            <div className="bento-proc-grid">
              {proceso.map((step, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '0.75rem', color: T.accentL }}>{step.n}</span>
                    <span style={{ display: 'block', height: 1, flexGrow: 1, background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                  <span style={{ fontFamily: T.fd, fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.25, color: '#fff' }}>{step.title}</span>
                  <span style={{ fontSize: '0.8125rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.4)' }}>{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 02 — SERVICIOS ── */}
      <section ref={servicesRef} style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <SLabel n="02" label="Qué hago" />
        <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 40px', color: '#fff' }}>
          Servicios
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {services.map((s, i) => (
            <div key={i} className="svc-row"
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 0', borderBottom: `1px solid ${T.border}`,
                cursor: 'default', transition: 'background .2s',
                borderRadius: activeService === i ? 10 : 0,
                paddingLeft: activeService === i ? 14 : 0,
                paddingRight: activeService === i ? 14 : 0,
              }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ fontFamily: T.fb, fontSize: 11, fontWeight: 700, color: activeService === i ? s.color : T.muted, letterSpacing: '0.1em', minWidth: 28 }}>{s.n}</span>
                <h3 style={{ fontFamily: T.fd, fontWeight: 800, fontSize: 'clamp(1.25rem,3vw,2rem)', letterSpacing: '-0.03em', color: activeService === i ? '#fff' : 'rgba(255,255,255,0.75)', margin: 0, transition: 'color .2s' }}>
                  {s.title}
                </h3>
              </div>
              <span style={{ fontSize: 12, color: activeService === i ? s.color : T.muted, fontFamily: T.fb, textAlign: 'right', maxWidth: 200, transition: 'color .2s', letterSpacing: '0.02em' }}>
                {s.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 03 — MARCAS ── */}
      <section ref={brandsRef} id="marcas" style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <SLabel n="03" label="Portafolio" />
        <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 36px', color: '#fff' }}>
          Marcas en portafolio
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="brands-grid">
          {brands.map((b, i) => (
            <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" className="brand-card"
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${b.color}55`; el.style.transform = 'translateY(-5px)'; el.style.boxShadow = `0 16px 40px ${b.color}20` }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
              style={{ padding: '28px 24px', borderRadius: 18, background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', border: `1px solid ${T.border}`, cursor: 'pointer', transition: 'all .3s ease', position: 'relative', overflow: 'hidden', minHeight: 200, textDecoration: 'none', display: 'block' }}>
              {/* Gradient bg tint on hover side */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(135deg, ${b.color}08 0%, transparent 60%)`, pointerEvents: 'none' }} />
              {/* Color accent top */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${b.color} 0%, ${b.color}40 70%, transparent 100%)` }} />
              {/* Year + Avatar row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: `${b.color}22`, border: `1.5px solid ${b.color}45`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fd, fontWeight: 900, fontSize: 22, color: b.color }}>
                  {b.name[0]}
                </div>
                <span style={{ fontSize: 11, color: T.muted, letterSpacing: '0.06em', fontFamily: T.fb }}>{b.year}</span>
              </div>
              <p style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.025em', margin: '0 0 4px', color: '#fff' }}>{b.name}</p>
              <p style={{ fontFamily: T.fb, fontSize: 10, color: T.muted, margin: '0 0 14px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{b.cat}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {b.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}35`, fontFamily: T.fb }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: 11, color: b.color, opacity: 0.8, fontWeight: 600 }}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <div ref={ctaRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="cta-grid">

          {/* Personal CTA */}
          <div style={{ padding: '36px 32px', borderRadius: 20, background: `rgba(124,58,237,0.08)`, border: `1px solid rgba(124,58,237,0.25)`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }} />
            <span style={{ fontSize: 32, display: 'block', marginBottom: 14 }}>🤝</span>
            <h3 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(1.4rem,2.5vw,1.875rem)', letterSpacing: '-0.035em', margin: '0 0 10px', color: '#fff' }}>
              ¿Tu marca necesita<br />
              <span style={{ fontFamily: T.fs, fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>una identidad sólida?</span>
            </h3>
            <p style={{ fontSize: '0.9rem', color: T.muted, margin: '0 0 24px', lineHeight: 1.6, fontFamily: T.fb }}>
              Cuéntame tu proyecto. Sin formularios, sin esperas.
            </p>
            <Link href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 99, background: T.accent, color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 8px 28px rgba(124,58,237,0.4)' }}>
              💬 Escríbeme
            </Link>
          </div>

          {/* Agency CTA */}
          <div style={{ padding: '36px 32px', borderRadius: 20, background: T.card, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, background: 'rgba(255,255,255,0.05)', border: `1px solid ${T.border}`, fontSize: 11, color: T.muted, marginBottom: 14, fontFamily: T.fb }}>
              🏢 Parte de
            </div>
            <h3 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(1.4rem,2.5vw,1.875rem)', letterSpacing: '-0.035em', margin: '0 0 10px', color: '#fff' }}>
              Relevvo Studio 🚀
            </h3>
            <p style={{ fontSize: '0.9rem', color: T.muted, margin: '0 0 24px', lineHeight: 1.6, fontFamily: T.fb }}>
              Diseño, contenido, ads y ecommerce en un solo equipo.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/"
                style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 99, background: '#fff', color: '#0A0A0A', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                🌐 Ver agencia
              </Link>
              <Link href={WA_AGENCY} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 99, border: `1px solid ${T.border}`, color: T.muted, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                💬 Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: '28px clamp(20px,6vw,80px)', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: T.fb, margin: 0 }}>
          © 2025 Juan Camilo León Mora &nbsp;·&nbsp;
          <Link href="/" style={{ color: T.accentL, textDecoration: 'none' }}>Relevvo Studio</Link>
          &nbsp;·&nbsp; Colombia 🇨🇴
        </p>
      </footer>

    </main>
  )
}
