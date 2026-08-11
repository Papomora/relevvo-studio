'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

// ── Constants ──────────────────────────────────────────────────
const WA = 'https://wa.me/573223094005?text=Hola%20Camilo%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20sobre%20un%20proyecto'
const WA_AGENCY = 'https://wa.me/573223094005?text=Hola%2C%20quiero%20trabajar%20con%20Relevvo%20Studio'

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
  { name: 'Fresitas la Playita', cat: 'Gastronomía',         color: '#F472B6', year: '2024', tags: ['Identidad', 'Social'], href: 'https://www.instagram.com/fresaslaplayita/' },
]

const tools = [
  { name: 'Figma',         emoji: '🎨', cat: 'Design',   color: '#A259FF' },
  { name: 'Illustrator',   emoji: '✏️', cat: 'Design',   color: '#FF7C00' },
  { name: 'Photoshop',     emoji: '🖼️', cat: 'Design',   color: '#31A8FF' },
  { name: 'After Effects', emoji: '🎬', cat: 'Design',   color: '#9999FF' },
  { name: 'InDesign',      emoji: '📄', cat: 'Design',   color: '#FF3366' },
  { name: 'Claude',        emoji: '🧠', cat: 'AI',       color: '#D4A27F' },
  { name: 'Midjourney',    emoji: '🌌', cat: 'AI',       color: '#7C9FD4' },
  { name: 'ChatGPT',       emoji: '💬', cat: 'AI',       color: '#10A37F' },
  { name: 'Firefly',       emoji: '🔥', cat: 'AI',       color: '#FF6B6B' },
  { name: 'DALL·E',        emoji: '🎭', cat: 'AI',       color: '#B794F4' },
]

const proceso = [
  { n: '01', title: 'Escucho tu historia',  desc: 'Antes de diseñar una sola línea entiendo tu negocio, tus clientes y qué te hace diferente.' },
  { n: '02', title: 'Defino la estrategia', desc: 'Posicionamiento, arquetipo de marca y oportunidades. La estrategia siempre va antes que la estética.' },
  { n: '03', title: 'Diseño con propósito', desc: 'Cada elemento visual tiene un argumento. No decoro — comunico.' },
  { n: '04', title: 'Entrego listo',        desc: 'Archivos completos, guía de aplicación y acompañamiento post-entrega.' },
]

// ── Clip-reveal helper ─────────────────────────────────────────
function RevealLine({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!innerRef.current) return
    gsap.from(innerRef.current, { y: '108%', duration: 1.05, ease: 'power4.out', delay })
  }, [delay])
  return (
    <div ref={wrapRef} style={{ overflow: 'hidden', display: 'block', ...style }}>
      <div ref={innerRef}>{children}</div>
    </div>
  )
}

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

export default function PapoPage() {
  const [activeService, setActiveService] = useState<number | null>(null)
  const heroRef      = useRef<HTMLDivElement>(null)
  const badgeRef     = useRef<HTMLDivElement>(null)
  const subRef       = useRef<HTMLDivElement>(null)
  const ctasRef      = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const aboutRef     = useRef<HTMLElement>(null)
  const servicesRef  = useRef<HTMLElement>(null)
  const brandsRef    = useRef<HTMLElement>(null)
  const stackRef     = useRef<HTMLElement>(null)
  const procesoRef   = useRef<HTMLElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    // Badge + sub + ctas fade-in after clip-reveal
    gsap.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out', delay: 0.15 })
    gsap.from(subRef.current,   { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.2 })
    gsap.from(ctasRef.current,  { y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', delay: 1.35 })

    // Stats stagger
    const stats = statsRef.current?.querySelectorAll('.stat-item')
    if (stats) gsap.from(Array.from(stats), { y: 30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: statsRef.current, start: 'top 88%' } })

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

    // Tool chips stagger
    const chips = stackRef.current?.querySelectorAll('.tool-chip')
    if (chips) gsap.from(Array.from(chips), {
      scale: 0.88, opacity: 0, stagger: 0.04, duration: 0.5, ease: 'back.out(1.4)',
      immediateRender: false,
      scrollTrigger: { trigger: stackRef.current, start: 'top bottom', once: true },
    })

    // Proceso steps
    const steps = procesoRef.current?.querySelectorAll('.proc-step')
    if (steps) gsap.from(Array.from(steps), { x: -20, opacity: 0, stagger: 0.15, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: procesoRef.current, start: 'top 85%' } })

    // CTA reveal
    gsap.from(ctaRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 88%' } })
  }, [])

  useReveal(aboutRef, { y: 40 })

  return (
    <main style={{ background: 'transparent', minHeight: '100vh', color: '#fff', position: 'relative' }}>
      <style jsx global>{`
        @keyframes pulse-g     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
        @keyframes ticker-left  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes photo-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes photo-glow   { from{opacity:.7} to{opacity:1} }
        @keyframes ring-pulse   { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.8;transform:scale(1.02)} }
        @media(max-width:768px){ .about-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:640px){ .cta-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:900px){ .brands-grid{ grid-template-columns:repeat(2,1fr)!important; } }
        @media(max-width:500px){ .brands-grid{ grid-template-columns:1fr!important; } }
        @media(max-width:640px){ .stats-grid{ grid-template-columns:repeat(2,1fr)!important; } .stats-grid .stat-item:nth-child(2){ border-right:none!important; } }
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

      {/* ── HERO ── */}
      <section style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px) 60px', maxWidth: 1200, margin: '0 auto' }}>

        {/* Availability badge */}
        <div ref={badgeRef} style={{ marginBottom: 32 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 99, border: '1px solid rgba(65,229,117,0.25)', background: 'rgba(65,229,117,0.07)', fontSize: 12, color: T.green, fontWeight: 600, letterSpacing: '0.04em' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.green, animation: 'pulse-g 2s ease-in-out infinite' }} />
            Disponible para nuevos proyectos
          </span>
        </div>

        {/* Headline — clip-reveal per line */}
        <div style={{ marginBottom: 28 }}>
          <RevealLine delay={0.15}>
            <h1 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(3.2rem,9vw,8.5rem)', lineHeight: 0.92, letterSpacing: '-0.05em', color: '#fff', margin: 0 }}>
              Diseño
            </h1>
          </RevealLine>
          <RevealLine delay={0.28}>
            <h1 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(3.2rem,9vw,8.5rem)', lineHeight: 0.92, letterSpacing: '-0.05em', color: '#fff', margin: 0 }}>
              que construye
            </h1>
          </RevealLine>
          <RevealLine delay={0.42}>
            <h1 style={{ fontFamily: T.fs, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(3.2rem,9vw,8.5rem)', lineHeight: 0.92, color: T.accentL, margin: 0 }}>
              marcas reales.
            </h1>
          </RevealLine>
        </div>

        {/* Sub + meta */}
        <div ref={subRef} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'flex-end', gap: 32, maxWidth: 900 }}>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: T.muted, maxWidth: 440, margin: 0, fontFamily: T.fb }}>
            Branding estratégico para marcas que quieren una identidad tan sólida que no necesitan presentarse dos veces.
            <br /><span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.875rem' }}>Colombia 🇨🇴 · Director en Relevvo Studio</span>
          </p>
          {/* CTA pair */}
          <div ref={ctasRef} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link href={WA} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 99, background: T.accent, color: '#fff', fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none', boxShadow: '0 8px 28px rgba(124,58,237,0.35)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Iniciemos un proyecto
            </Link>
            <a href="#marcas"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', borderRadius: 99, border: `1px solid ${T.border}`, color: T.muted, fontSize: '0.9375rem', textDecoration: 'none' }}>
              Ver portafolio ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div ref={statsRef} style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="stats-grid">
          {[
            { num: '8+',   label: 'Marcas construidas' },
            { num: '5+',   label: 'Años de experiencia' },
            { num: '100%', label: 'Compromiso' },
            { num: '2',    label: 'Países activos' },
          ].map((s, i) => (
            <div key={i} className="stat-item" style={{ padding: '28px 24px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${T.border}` : 'none' }}>
              <div style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.75rem)', letterSpacing: '-0.05em', color: '#fff', lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 11, color: T.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 6, fontFamily: T.fb }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 01 — SOBRE MÍ ── */}
      <section ref={aboutRef} style={{ padding: 'clamp(64px,8vw,96px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="about-grid">

        {/* Photo */}
        <div style={{ position: 'relative' }}>
          {/* Ambient glow behind the photo */}
          <div style={{ position: 'absolute', inset: -20, borderRadius: 32, background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.22) 0%, transparent 70%)', filter: 'blur(20px)', animation: 'photo-glow 4s ease-in-out infinite alternate', pointerEvents: 'none' }} />
          {/* Outer animated ring */}
          <div style={{ position: 'absolute', inset: -6, borderRadius: 26, border: '1.5px solid rgba(124,58,237,0.4)', animation: 'ring-pulse 3s ease-in-out infinite', pointerEvents: 'none' }} />
          {/* Photo container */}
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '2px solid rgba(124,58,237,0.55)', boxShadow: '0 0 0 1px rgba(124,58,237,0.15), 0 0 40px rgba(124,58,237,0.3), 0 24px 60px rgba(0,0,0,0.5)', aspectRatio: '4/5', maxWidth: 400, position: 'relative', animation: 'photo-float 6s ease-in-out infinite' }}>
            <img src="/founder.png" alt="Juan Camilo León" style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center 10%', display: 'block', marginTop: '-8%' }} />
            {/* Gradient overlay bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 100%)', pointerEvents: 'none' }} />
          </div>
          {/* Floating tag */}
          <div style={{ position: 'absolute', bottom: 20, left: -16, background: T.accent, color: '#fff', borderRadius: 12, padding: '10px 16px', fontSize: 12, fontWeight: 700, boxShadow: '0 8px 24px rgba(124,58,237,0.45)', whiteSpace: 'nowrap' }}>
            Director Creativo ✦
          </div>
          {/* Experience badge */}
          <div style={{ position: 'absolute', top: -8, right: -16, background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(12px)', border: `1px solid ${T.border}`, borderRadius: 12, padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 22, color: '#fff', lineHeight: 1 }}>5+</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>años</div>
          </div>
        </div>

        {/* Text */}
        <div>
          <SLabel n="01" label="Sobre mí" />
          <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-0.04em', lineHeight: 1.0, margin: '0 0 20px', color: '#fff' }}>
            Hola, soy Camilo.<br />
            <span style={{ fontFamily: T.fs, fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>diseñador de marca.</span>
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: T.muted, marginBottom: 16 }}>
            Trabajo en la intersección entre <strong style={{ color: '#fff' }}>estrategia y diseño</strong>: primero entiendo quién eres y a quién le hablas, luego construyo la identidad que lo comunica.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: T.muted, marginBottom: 28 }}>
            Fotografía, producción visual y diseño de marca. Ocho marcas construidas, cinco años de oficio, un equipo detrás: <strong style={{ color: T.accentL }}>Relevvo Studio</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              '🎯 Estrategia antes que estética',
              '⚡ Entregas rápidas sin perder calidad',
              '🤖 IA + criterio humano en cada pieza',
              '📊 Diseño orientado a resultados reales',
            ].map((attr, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: T.card, border: `1px solid ${T.border}`, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: T.fb }}>
                {attr}
              </div>
            ))}
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
          Marcas construidas
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

      {/* ── 04 — STACK ── */}
      <section ref={stackRef} style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <SLabel n="04" label="Stack" />
        <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 36px', color: '#fff' }}>
          Herramientas
        </h2>
        {/* Category labels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 20 }}>
          {(['Design', 'AI'] as const).map(cat => (
            <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 20, height: 1, background: T.accent }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: T.muted, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: T.fb }}>
                {cat === 'Design' ? 'Diseño' : 'Inteligencia Artificial'}
              </span>
            </div>
          ))}
        </div>
        {/* Tool chips — compact pill grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {(['Design', 'AI'] as const).map(cat => (
            <div key={cat} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
              {tools.filter(t => t.cat === cat).map((tool, i) => (
                <div key={i} className="tool-chip"
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${tool.color}55`; el.style.background = `${tool.color}12`; el.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = T.border; el.style.background = 'rgba(255,255,255,0.04)'; el.style.transform = 'translateY(0)' }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 14px', borderRadius: 100, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)', border: `1px solid ${T.border}`, cursor: 'default', transition: 'all .2s ease' }}>
                  <span style={{ fontSize: 16, lineHeight: 1 }}>{tool.emoji}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', fontFamily: T.fd, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{tool.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 — PROCESO ── */}
      <section ref={procesoRef} style={{ padding: 'clamp(48px,6vw,80px) clamp(20px,6vw,80px)', maxWidth: 1200, margin: '0 auto', borderTop: `1px solid ${T.border}` }}>
        <SLabel n="05" label="Proceso" />
        <h2 style={{ fontFamily: T.fd, fontWeight: 900, fontSize: 'clamp(2rem,4.5vw,3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, margin: '0 0 48px', color: '#fff' }}>
          Cómo trabajo
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 640 }}>
          {proceso.map((step, i) => (
            <div key={i} className="proc-step" style={{ display: 'flex', gap: 24, position: 'relative', paddingBottom: i < proceso.length - 1 ? 40 : 0 }}>
              {/* Line */}
              {i < proceso.length - 1 && (
                <div style={{ position: 'absolute', left: 19, top: 40, bottom: 0, width: 1, background: `linear-gradient(to bottom, rgba(124,58,237,0.4), transparent)` }} />
              )}
              {/* Dot */}
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: T.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.fb, fontWeight: 800, fontSize: 12, color: '#fff', flexShrink: 0, boxShadow: '0 0 0 4px rgba(124,58,237,0.15), 0 0 0 8px rgba(124,58,237,0.07)' }}>
                {step.n}
              </div>
              <div style={{ paddingTop: 8 }}>
                <h3 style={{ fontFamily: T.fd, fontWeight: 800, fontSize: '1.125rem', letterSpacing: '-0.025em', color: '#fff', margin: '0 0 8px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: T.muted, margin: 0, fontFamily: T.fb }}>{step.desc}</p>
              </div>
            </div>
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
