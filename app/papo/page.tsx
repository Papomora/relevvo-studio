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

// Tokens del sistema (app/globals.css) — paleta del logo, sin el violeta
// por defecto de Tailwind ni colores por marca.
const T = {
  grape: 'var(--grape)', lilac: 'var(--lilac)', butter: 'var(--butter)',
  night: 'var(--night)', text: 'var(--text)', muted: 'var(--text-muted)',
  border: 'var(--border)', borderHover: 'var(--border-hover)',
  card: 'var(--night-2)', card2: 'var(--night-3)',
  fd: 'var(--font-bricolage)', fs: 'var(--font-instrument)', fb: 'var(--font-inter)',
}

const services = [
  { n: '01', title: 'Identidad de Marca', sub: 'Logo · Paleta · Tipografía · Tono de voz' },
  { n: '02', title: 'Brandbook Completo', sub: 'Manual de marca · Guías de aplicación' },
  { n: '03', title: 'Rediseño de Marca',  sub: 'Evolución de identidad · Sin perder esencia' },
  { n: '04', title: 'Naming & Concepto',  sub: 'Posicionamiento · Nombre estratégico' },
  { n: '05', title: 'Contenido Visual',   sub: 'Social · Ecommerce · Fotografía' },
  { n: '06', title: 'Prompting IA',       sub: 'Midjourney · Firefly · DALL·E · Claude' },
]

const brands = [
  { name: 'Osadí',             cat: 'Accesorios Premium', year: '2024', tags: ['Identidad', 'Brandbook'], href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-quien-soy' },
  { name: 'Crusso',            cat: 'Mobiliario Premium', year: '2024', tags: ['Branding', 'Motion'],    href: 'https://www.instagram.com/tiendacrusso/' },
  { name: 'Molicié',          cat: 'Hogar & Decoración', year: '2023', tags: ['Identidad', 'Contenido'], href: 'https://www.instagram.com/moliciehogar/' },
  { name: 'Verslä',            cat: 'Moda Femenina', year: '2024', tags: ['Branding', 'Social'],    href: 'https://www.instagram.com/verslafeminite/' },
  { name: 'Khalifa',           cat: 'Marketing Digital', year: '2023', tags: ['Identidad', 'Web'],      href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-brand-khalifa' },
  { name: 'Gadotec',           cat: 'Tecnología', year: '2023', tags: ['Branding', 'Naming'],   href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-brand-gadotec' },
  { name: 'Ecomms',            cat: 'Comercio Digital', year: '2024', tags: ['Identidad', 'Ecommerce'], href: 'https://camiloleonfotografia.wixsite.com/papodiseno/copia-de-brand-ecomms' },
  { name: 'Visuality',         cat: 'Publicidad Exterior', year: '2024', tags: ['Branding', 'OOH'],      href: 'https://instagram.com' },
  { name: 'Metro 73',          cat: 'Estilo de vida', year: '2024', tags: ['Branding', 'Social'],   href: 'https://www.instagram.com/vivemetro73/' },
  { name: 'LímiteLegal',       cat: 'Legal & Consultoría', year: '2024', tags: ['Identidad', 'Web'],     href: 'https://www.instagram.com/limite_legalco/' },
  { name: 'Forjar',            cat: 'Inversiones', year: '2024', tags: ['Branding', 'Naming'],  href: 'https://www.instagram.com/forjar_inversiones/' },
]

const tools: { name: string; logo?: string; emoji?: string; cat: 'Design' | 'AI' }[] = [
  { name: 'Figma',         logo: '/images/tools/Figma_logo.png',         cat: 'Design' },
  { name: 'Illustrator',   logo: '/images/tools/Illustrator_logo.png',   cat: 'Design' },
  { name: 'Photoshop',     logo: '/images/tools/Photoshop_logo.png',     cat: 'Design' },
  { name: 'After Effects', logo: '/images/tools/AfterEffects_logo.png',  cat: 'Design' },
  { name: 'Premiere Pro',  logo: '/images/tools/PremierePro_logo.png',   cat: 'Design' },
  { name: 'Claude',        logo: '/images/tools/Claude_logo.png',     cat: 'AI' },
  { name: 'Midjourney',    logo: '/images/tools/Midjourney_logo.png', cat: 'AI' },
  { name: 'ChatGPT',       logo: '/images/tools/ChatGPT_logo.png',    cat: 'AI' },
  { name: 'Firefly',       logo: '/images/tools/Firefly_logo.png',    cat: 'AI' },
  { name: 'Gemini',        logo: '/images/tools/Gemini_logo.png',     cat: 'AI' },
  { name: 'Freepik',       logo: '/images/tools/Freepik_logo.png',    cat: 'AI' },
]

const proceso = PROCESO_GENERICO

// Inicial de cada marca en bloques sólidos alternos (uva / mantequilla /
// noche), el mismo ritmo de color del portafolio del home.
const AVATARS: React.CSSProperties[] = [
  { background: 'var(--grape)', color: 'var(--butter)' },
  { background: 'var(--butter)', color: 'var(--night)' },
  { background: 'var(--night-3)', color: 'var(--butter)', border: '1px solid var(--border)' },
]

// ── Íconos de servicios — SVG dibujados a mano, stroke-based, sin emoji ni
// icon pack, para que los 6 tengan un mismo lenguaje visual. Uno por
// concepto; donde el concepto no tiene una forma obvia, se usa una figura
// abstracta simple (círculo, capas, rombo) en vez de algo confuso. ──
function IconMark({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  )
}
function IconLayers({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 L21 8 L12 13 L3 8 Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M3 13 L12 18 L21 13" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 17.5 L12 22.5 L21 17.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  )
}
function IconRefresh({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4.5 12a7.5 7.5 0 0 1 12.6-5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M19.5 12a7.5 7.5 0 0 1-12.6 5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M17.5 4.5 V7.5 H14.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 19.5 V16.5 H9.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconTag({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="5" width="14" height="14" rx="3" transform="rotate(45 12 12)" stroke={color} strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.6" fill={color} />
    </svg>
  )
}
function IconImage({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke={color} strokeWidth="1.6" />
      <circle cx="8.5" cy="9.5" r="1.6" stroke={color} strokeWidth="1.6" />
      <path d="M4 17 L9 12 L13 15.5 L16 12.5 L20 16.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconSpark({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3 C12.6 8 13.8 10.4 19 11 C13.8 11.6 12.6 14 12 19 C11.4 14 10.2 11.6 5 11 C10.2 10.4 11.4 8 12 3 Z" stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  )
}

// Un ícono por servicio, en el mismo orden que el array `services`.
const SERVICE_ICONS = [IconMark, IconLayers, IconRefresh, IconTag, IconImage, IconSpark]

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
      <div style={{ width: 22, height: 1, background: T.lilac }} />
      <span style={{ fontFamily: T.fb, fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: T.lilac }}>
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
    const svcs = servicesRef.current?.querySelectorAll('.svc-card')
    if (svcs) gsap.from(Array.from(svcs), { y: 24, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: servicesRef.current, start: 'top 85%' } })

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
    <main style={{ background: 'transparent', minHeight: '100vh', color: 'var(--text)', position: 'relative' }}>
      <style jsx global>{`
        @media(max-width:640px){ .cta-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:900px){ .brands-grid{ grid-template-columns:repeat(2,1fr)!important; } }
        @media(max-width:500px){ .brands-grid{ grid-template-columns:1fr!important; } }

        /* ── Encabezado / banner ── */
        .papo-header-grid { display: grid; grid-template-columns: minmax(140px,220px) 1fr; gap: 36px; align-items: center; }
        @media(max-width:640px){ .papo-header-grid{ grid-template-columns: 1fr!important; gap: 20px; } .papo-header-grid > div:first-child{ max-width: 150px!important; } }

        /* ── Servicios: tarjetas con icono ── */
        .svc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media(max-width:900px){ .svc-grid{ grid-template-columns: repeat(2,1fr)!important; } }
        @media(max-width:560px){ .svc-grid{ grid-template-columns: 1fr!important; } }

        /* ── Bento "Perfil profesional" (01) ── */
        .bento-cell { background: var(--night-2); border: 1px solid var(--border); border-radius: 20px; padding: 26px; display: flex; flex-direction: column; }
        .bento-row { border-radius: 10px; transition: background .2s ease; }
        .bento-row:hover { background: var(--night-3); }
        .bento-chip { display: inline-flex; align-items: center; gap: 7px; padding: 7px 13px; border-radius: 100px; background: var(--night-3); border: 1px solid var(--border); font-size: 0.8125rem; color: var(--text); transition: border-color .2s ease, background .2s ease; }
        .bento-chip:hover { border-color: var(--border-hover); }
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
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(18,14,24,0.9)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 17, letterSpacing: '-0.04em', color: T.butter }}>Papo</span>
          <span style={{ fontFamily: T.fs, fontStyle: 'italic', fontSize: 17, color: T.lilac }}>León</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ fontSize: 12, color: T.muted, textDecoration: 'none', padding: '6px 12px', borderRadius: 99, border: `1px solid ${T.border}`, transition: 'color .2s' }}>
            Relevvo Studio ↗
          </Link>
          <Link href={WA} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, fontWeight: 700, padding: '8px 18px', borderRadius: 99, background: T.butter, color: T.night, textDecoration: 'none' }}>
            Trabajemos juntos
          </Link>
        </div>
      </nav>

      {/* ── ENCABEZADO / BANNER ──
          No es el hero viejo (titular gigante + reveal cinematográfico +
          pitch) ni la franja mínima de la versión anterior (foto de 64px en
          línea con el nombre) — es un punto medio que el usuario pidió
          después de ver ambas: foto con presencia real, sin volver al
          drama. Dos columnas en desktop (foto ~40%, texto ~60%), apiladas
          en mobile. Fundido simple al cargar, sin RevealLine. */}
      <div ref={headerRef} style={{ padding: 'clamp(120px,14vw,150px) clamp(20px,6vw,80px) 56px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="papo-header-grid">
          <div style={{ width: '100%', maxWidth: 220, aspectRatio: '1 / 1', borderRadius: 24, overflow: 'hidden', border: `1px solid ${T.border}` }}>
            <Image src="/founder.png" alt="Juan Camilo León" width={440} height={440} priority
                   sizes="(max-width: 640px) 45vw, 220px"
                   style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }} />
          </div>
          <div>
            {/* Único <h1> de la página. */}
            <h1 style={{ fontFamily: T.fd, fontWeight: 800, fontSize: 'clamp(1.875rem,4.5vw,2.75rem)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: T.butter }}>
              Juan Camilo "Papo" León Mora
            </h1>
            <p style={{ fontSize: '1rem', color: T.muted, margin: '10px 0 0', fontFamily: T.fb }}>
              Fundador &amp; Director Creativo — Relevvo Studio · Colombia
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.65, color: T.text, maxWidth: 560, margin: '18px 0 0', fontFamily: T.fb }}>
              Diseño de marca con estrategia primero: entender el negocio antes de diseñar la
              identidad que lo comunica. Nueve años de oficio, hoy dentro de un equipo — el
              detalle está debajo.
            </p>
          </div>
        </div>
      </div>

      {/* ── 01 — PERFIL PROFESIONAL (bento) ──
          Trayectoria, métricas, formación, competencias, herramientas y
          proceso en una sola rejilla — antes eran 5 secciones apiladas.
          Maqueta: design/BentoCV.dc.html. */}
      <section ref={bentoRef} style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <div style={{ marginBottom: 28 }}>
          <SLabel n="01" label="Perfil profesional" />
          <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 1, margin: 0, color: T.butter }}>
            Quién soy, en corto.
          </h2>
        </div>

        <div className="bento-grid">

          {/* ── Trayectoria — la celda más grande, a propósito ── */}
          <div className="bento-cell bento-traj" style={{ gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>Trayectoria</span>
              <span style={{ fontSize: '0.75rem', color: T.muted }}>2016 — hoy</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {TIMELINE.map((item, i) => (
                <div key={i} className="bento-row" style={{ display: 'grid', gridTemplateColumns: '46px minmax(0,1fr)', gap: 14, padding: 10, alignItems: 'start' }}>
                  <span style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '0.75rem', paddingTop: 2, fontVariantNumeric: 'tabular-nums', color: item.current ? T.lilac : T.muted }}>
                    {item.year}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, flexWrap: 'wrap' }}>
                      <span style={{ fontFamily: T.fd, fontWeight: 700, fontSize: '0.9375rem', color: T.butter }}>{item.role}</span>
                      <span style={{ fontSize: '0.8125rem', color: T.muted }}>· {item.place}</span>
                      {item.current && (
                        <span style={{ fontSize: 10, fontFamily: T.fb, fontWeight: 700, padding: '2px 9px', borderRadius: 99, background: T.grape, color: T.butter }}>
                          hoy
                        </span>
                      )}
                    </div>
                    <span className="bento-clamp1" style={{ fontSize: '0.8125rem', lineHeight: 1.45, color: T.muted }}>{item.desc}</span>
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
                    <span style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.03em', color: T.butter }}>{m.value}</span>
                    <span style={{ fontSize: '0.6875rem', lineHeight: 1.3, color: T.muted }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aptitudes + Formación */}
            <div className="bento-apt-formacion">
              <div className="bento-cell" style={{ gap: 14, padding: 22 }}>
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>Aptitudes</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {APTITUDES.map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: '0.8125rem', color: T.text }}>{a.name}</span>
                      <span style={{ display: 'flex', gap: 2, flexShrink: 0 }} aria-label={`${a.level} de 5 estrellas`}>
                        {Array.from({ length: 5 }).map((_, s) => (
                          <span key={s} style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: s < a.level ? T.lilac : 'rgba(245,242,201,0.14)' }} />
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bento-cell" style={{ gap: 14, padding: 22 }}>
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>Formación</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {STUDIES.map((s, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <span style={{ fontFamily: T.fd, fontWeight: 700, fontSize: '0.875rem', lineHeight: 1.3, color: T.butter }}>{s.title}</span>
                      <span style={{ fontSize: '0.75rem', color: T.muted }}>{s.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Herramientas — una sola lista, filtro Todo/Diseño/IA */}
            <div className="bento-cell" style={{ gap: 16, padding: '22px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>Herramientas</span>
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
                        background: toolFilter === f.id ? T.grape : 'transparent',
                        color: toolFilter === f.id ? T.butter : T.muted,
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
            <span className="font-mono" style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: T.muted }}>Cómo trabajo</span>
            <div className="bento-proc-grid">
              {proceso.map((step, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '0.75rem', color: T.lilac }}>{step.n}</span>
                    <span style={{ display: 'block', height: 1, flexGrow: 1, background: T.border }} />
                  </div>
                  <span style={{ fontFamily: T.fd, fontWeight: 700, fontSize: '0.9375rem', lineHeight: 1.25, color: T.butter }}>{step.title}</span>
                  <span style={{ fontSize: '0.8125rem', lineHeight: 1.55, color: T.muted }}>{step.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 02 — SERVICIOS ── */}
      <section ref={servicesRef} style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <SLabel n="02" label="Qué hago" />
        <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 40px', color: T.butter }}>
          Servicios
        </h2>
        <div className="svc-grid">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[i]
            const active = activeService === i
            return (
              <div key={i} className="svc-card"
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
                style={{
                  padding: 24, borderRadius: 16,
                  border: `1px solid ${active ? 'transparent' : T.border}`,
                  background: active ? T.grape : T.card,
                  transition: 'border-color .2s ease, background .2s ease, transform .2s ease',
                  transform: active ? 'translateY(-3px)' : 'none',
                }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 16,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: active ? 'rgba(245,242,201,0.12)' : T.card2,
                }}>
                  <Icon color={active ? 'var(--butter)' : 'var(--lilac)'} />
                </div>
                <h3 style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '1.0625rem', letterSpacing: '-0.02em', color: T.butter, margin: '0 0 6px' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: active ? 'rgba(245,242,201,0.85)' : T.muted, fontFamily: T.fb, lineHeight: 1.5, margin: 0, transition: 'color .2s ease' }}>
                  {s.sub}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 03 — MARCAS ── */}
      <section ref={brandsRef} id="marcas" style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <SLabel n="03" label="Portafolio" />
        <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 36px', color: T.butter }}>
          Marcas en portafolio
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="brands-grid">
          {brands.map((b, i) => (
            <a key={i} href={b.href} target="_blank" rel="noopener noreferrer" className="brand-card"
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.borderHover; el.style.transform = 'translateY(-5px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border; el.style.transform = 'translateY(0)' }}
              style={{ padding: '28px 24px', borderRadius: 18, background: T.card, border: `1px solid ${T.border}`, cursor: 'pointer', transition: 'border-color .3s ease, transform .3s ease', position: 'relative', overflow: 'hidden', minHeight: 200, textDecoration: 'none', display: 'block' }}>
              {/* Year + Avatar row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, ...AVATARS[i % AVATARS.length], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fd, fontWeight: 900, fontSize: 22 }}>
                  {b.name[0]}
                </div>
                <span style={{ fontSize: 11, color: T.muted, letterSpacing: '0.06em', fontFamily: T.fb }}>{b.year}</span>
              </div>
              <p style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.025em', margin: '0 0 4px', color: T.butter }}>{b.name}</p>
              <p style={{ fontFamily: T.fb, fontSize: 10, color: T.muted, margin: '0 0 14px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{b.cat}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {b.tags.map((t, j) => (
                    <span key={j} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 20, background: 'transparent', color: T.muted, border: `1px solid ${T.border}`, fontFamily: T.fb }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: 11, color: T.lilac, fontWeight: 600 }}>↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <div ref={ctaRef} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="cta-grid">

          {/* Personal CTA */}
          <div style={{ padding: '36px 32px', borderRadius: 20, background: T.grape, position: 'relative', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', top: -60, right: -60, width: 180, height: 180, borderRadius: '50%', border: '36px solid rgba(245,242,201,0.08)', pointerEvents: 'none' }} />
            <span style={{ fontSize: 32, display: 'block', marginBottom: 14 }}>🤝</span>
            <h3 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(1.4rem,2.5vw,1.875rem)', letterSpacing: '-0.035em', margin: '0 0 10px', color: T.butter }}>
              ¿Tu marca necesita<br />
              <span style={{ fontFamily: T.fs, fontStyle: 'italic', fontWeight: 400, color: T.butter }}>una identidad sólida?</span>
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(245,242,201,0.85)', margin: '0 0 24px', lineHeight: 1.6, fontFamily: T.fb }}>
              Cuéntame tu proyecto. Sin formularios, sin esperas.
            </p>
            <Link href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 99, background: T.butter, color: T.night, fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
              💬 Escríbeme
            </Link>
          </div>

          {/* Agency CTA */}
          <div style={{ padding: '36px 32px', borderRadius: 20, background: T.card, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 99, background: T.card2, border: `1px solid ${T.border}`, fontSize: 11, color: T.muted, marginBottom: 14, fontFamily: T.fb }}>
              🏢 Parte de
            </div>
            <h3 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(1.4rem,2.5vw,1.875rem)', letterSpacing: '-0.035em', margin: '0 0 10px', color: T.butter }}>
              Relevvo Studio 🚀
            </h3>
            <p style={{ fontSize: '0.9rem', color: T.muted, margin: '0 0 24px', lineHeight: 1.6, fontFamily: T.fb }}>
              Diseño, contenido, ads y ecommerce en un solo equipo.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/"
                style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 99, background: T.butter, color: T.night, fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
                🌐 Ver agencia
              </Link>
              <Link href={WA_AGENCY} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 99, border: `1px solid ${T.borderHover}`, color: T.butter, fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                💬 Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${T.border}`, padding: '28px clamp(20px,6vw,80px)', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: T.muted, fontFamily: T.fb, margin: 0 }}>
          © 2025 Juan Camilo León Mora &nbsp;·&nbsp;
          <Link href="/" style={{ color: T.lilac, textDecoration: 'none' }}>Relevvo Studio</Link>
          &nbsp;·&nbsp; Colombia
        </p>
      </footer>

    </main>
  )
}
