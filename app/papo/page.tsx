'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

const WA = 'https://wa.me/573223094005?text=Hola%20Camilo%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20sobre%20un%20proyecto%20de%20branding'

const T = {
  bg:      '#0A0A0A',
  card:    'rgba(255,255,255,0.03)',
  border:  'rgba(255,255,255,0.07)',
  primary: '#D2BBFF',
  accent:  '#7C3AED',
  muted:   'rgba(255,255,255,0.4)',
}

const services = [
  { icon: '◈', title: 'Identidad de Marca', desc: 'Construcción de marca desde cero. Logo, paleta, tipografía y tono de voz que representan quién eres.' },
  { icon: '◉', title: 'Brandbook', desc: 'Manual completo de marca. Todo lo que necesitas para aplicar tu identidad en cualquier medio, de forma consistente.' },
  { icon: '◫', title: 'Rediseño de Marca', desc: 'Cuando ya tienes marca pero necesita evolucionar. La actualizamos sin perder la esencia que construiste.' },
  { icon: '◌', title: 'Naming & Concepto', desc: 'El nombre correcto lo cambia todo. Encontramos el concepto estratégico que define tu posición en el mercado.' },
]

const brands = [
  { name: 'ARü',      cat: 'Accesorios Premium',  color: '#C9B882' },
  { name: 'Crusso',   cat: 'Retail & Moda',        color: '#C0392B' },
  { name: 'Molicie',  cat: 'Hogar & Decoración',   color: '#F59E0B' },
  { name: 'Verslä',   cat: 'Moda Femenina',         color: '#F472B6' },
  { name: 'Khalifa',  cat: 'Marketing',             color: '#60A5FA' },
  { name: 'Gadotec',  cat: 'Tecnología',            color: '#34D399' },
  { name: 'Ecomms',   cat: 'Digital',               color: '#A78BFA' },
  { name: 'Visuality',cat: 'Publicidad Exterior',   color: '#F87171' },
]

function useReveal(ref: React.RefObject<HTMLElement | null>, y = 40) {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(ref.current, { y, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
  }, [])
}

export default function PapoPage() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const servRef     = useRef<HTMLDivElement>(null)
  const brandsRef   = useRef<HTMLDivElement>(null)
  const aboutRef    = useRef<HTMLDivElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)

  // Hero entrance
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({ delay: 0.1 })
    const els = heroRef.current?.querySelectorAll('[data-hero]')
    if (els) tl.from(Array.from(els), { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12 })
  }, [])

  useReveal(servRef)
  useReveal(brandsRef)
  useReveal(aboutRef)
  useReveal(ctaRef, 30)

  return (
    <main style={{ background: T.bg, minHeight: '100vh', color: '#fff' }}>

      {/* ── NAV ── */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 800, fontSize: 18, letterSpacing: '-0.04em', color: '#fff' }}>Papo</span>
          <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>Diseño</span>
        </div>
        <Link href={WA} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, padding: '8px 18px', borderRadius: 99, background: 'linear-gradient(135deg,#7C3AED,#D2BBFF)', color: '#fff', textDecoration: 'none' }}>
          Hablemos
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* glow */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div ref={heroRef} style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <div data-hero style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 99, border: `1px solid ${T.border}`, marginBottom: 32, fontSize: 11, color: T.muted, fontFamily: 'var(--font-inter)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#41E575', display: 'inline-block' }} />
            Diseñador de marca · Colombia
          </div>

          <h1 data-hero style={{ margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-0.04em' }}>
            <span style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: '#fff', display: 'block' }}>
              Construyo marcas
            </span>
            <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(3rem, 9vw, 7.5rem)', color: 'rgba(255,255,255,0.75)', display: 'block' }}>
              que se recuerdan.
            </span>
          </h1>

          <p data-hero style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: T.muted, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px' }}>
            Branding estratégico para empresas que quieren una identidad visual tan sólida que no necesitan presentarse dos veces.
          </p>

          <div data-hero style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, background: 'linear-gradient(135deg,#7C3AED,#D2BBFF)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 30px rgba(124,58,237,0.35)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Iniciar proyecto
            </Link>
            <a href="#marcas" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', borderRadius: 14, border: `1px solid ${T.border}`, color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Ver portafolio
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div ref={servRef}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: T.primary, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Servicios</span>
            <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.035em', margin: 0 }}>
              Lo que hago
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {services.map((s, i) => (
              <div key={i} style={{ padding: '28px 28px 32px', borderRadius: 20, background: T.card, border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: 28, marginBottom: 16, color: T.primary }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 14, color: T.muted, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARCAS ── */}
      <section id="marcas" style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
        <div ref={brandsRef}>
          <div style={{ marginBottom: 48, textAlign: 'center' }}>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: T.primary, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>Portafolio</span>
            <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.035em', margin: 0 }}>
              Marcas que construí
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {brands.map((b, i) => (
              <div key={i} style={{ padding: '24px 20px', borderRadius: 16, background: T.card, border: `1px solid ${T.border}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: `linear-gradient(90deg, ${b.color}80, transparent)` }} />
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${b.color}20`, border: `1px solid ${b.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: 16, color: b.color, marginBottom: 12 }}>
                  {b.name[0]}
                </div>
                <p style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em', margin: '0 0 4px', color: '#fff' }}>{b.name}</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: T.muted, margin: 0, letterSpacing: '0.04em' }}>{b.cat}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ padding: '80px 24px', maxWidth: 760, margin: '0 auto' }}>
        <div ref={aboutRef} style={{ padding: '48px 40px', borderRadius: 24, background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: 11, color: T.primary, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>Quién soy</span>
          <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.035em', margin: '0 0 20px', position: 'relative' }}>
            Camilo León.<br />
            <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400, color: 'rgba(255,255,255,0.6)' }}>Diseñador de marca.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 16px', position: 'relative' }}>
            Llevo años construyendo marcas visuales que van más allá de un logo bonito. Trabajo en la intersección entre estrategia y diseño: primero entiendo quién eres, luego creo la imagen que lo comunica.
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, margin: '0 0 32px', position: 'relative' }}>
            Soy parte del equipo de <strong style={{ color: T.primary }}>Relevvo Studio</strong>, desde donde trabajamos para que las marcas colombianas compitan con estética global y estrategia local.
          </p>
          <Link href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg,#7C3AED,#D2BBFF)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', position: 'relative' }}>
            Conversemos →
          </Link>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '80px 24px 120px', textAlign: 'center' }}>
        <div ref={ctaRef} style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', margin: '0 0 16px' }}>
            ¿Tu marca necesita<br />
            <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontWeight: 400 }}>una identidad sólida?</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 16, color: T.muted, margin: '0 0 36px', lineHeight: 1.65 }}>
            Cuéntame tu proyecto. Sin formularios largos, sin esperas innecesarias.
          </p>
          <Link href={WA} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, background: 'linear-gradient(135deg,#7C3AED,#D2BBFF)', color: '#fff', fontWeight: 800, fontSize: 16, textDecoration: 'none', boxShadow: '0 12px 40px rgba(124,58,237,0.4)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Iniciar proyecto
          </Link>
          <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-inter)' }}>
            Parte de <Link href="/" style={{ color: T.primary, textDecoration: 'none' }}>Relevvo Studio</Link>
          </p>
        </div>
      </section>

    </main>
  )
}
