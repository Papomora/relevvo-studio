'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

// Hanzo-style "What's included" — clean checklist + testimonial side-by-side

const INCLUDED = [
  'Solicitudes de diseño ilimitadas',
  'Entrega en 48 horas promedio',
  'Plan mensual fijo — sin sorpresas',
  'Comunicación directa y asincrónica',
  'Alcance flexible según tu marca',
  'Pausa o cancela cuando quieras',
  'IA + criterio humano en cada pieza',
  'Estrategia incluida siempre',
]

export default function WhatIncluded() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const itemsRef   = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(leftRef.current, {
      x: -40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })
    gsap.from(rightRef.current, {
      x: 40, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
    })

    const items = itemsRef.current?.querySelectorAll('li')
    if (items) {
      gsap.from(Array.from(items), {
        x: -20, opacity: 0, duration: 0.5, ease: 'power3.out', stagger: 0.07,
        scrollTrigger: { trigger: itemsRef.current, start: 'top 82%' },
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px clamp(20px, 5vw, 80px)',
        maxWidth: 1320,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
      }}
      className="responsive-2col"
    >
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Left: heading + checklist ── */}
      <div ref={leftRef}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ width: 20, height: 1, background: 'rgba(124,58,237,0.8)' }} />
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(167,139,250,0.8)', fontFamily: 'var(--font-inter)' }}>
            Precio fijo, sin límites
          </span>
        </div>

        <h2
          className="heading-display text-white"
          style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', lineHeight: 0.95, letterSpacing: '-0.04em', marginBottom: 36 }}
        >
          Todo lo que<br />
          <span className="heading-serif">necesitas,</span><br />
          incluido.
        </h2>

        <ul ref={itemsRef} style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {INCLUDED.map((item, i) => (
            <li
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '13px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                fontSize: '0.9375rem',
                color: 'rgba(255,255,255,0.65)',
                transition: 'color .2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
            >
              {/* Hanzo check circle */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="10" r="9" stroke="rgba(65,229,117,0.4)" strokeWidth="1" />
                <path d="M6.5 10 L9 12.5 L13.5 7.5" stroke="#41E575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-glow"
          style={{ marginTop: 32, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: '100px', fontSize: '0.9375rem', fontWeight: 600 }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Hablemos de tu proyecto
        </Link>
      </div>

      {/* ── Right: booking card + testimonial ── */}
      <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Booking card — Hanzo "only 2 spots left" */}
        <div
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 20,
            padding: '32px 28px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#41E575', animation: 'pulse 2s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#41E575', fontFamily: 'var(--font-inter)' }}>
              Agenda abierta — solo 3 cupos
            </span>
          </div>

          <h3
            className="heading-display text-white"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 12 }}
          >
            Agenda una llamada<br />de diagnóstico gratis
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 24 }}>
            30 minutos para entender tu marca, tus metas y si somos la opción correcta para ti.
          </p>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              background: '#fff', color: '#0A0A0A',
              borderRadius: '100px', padding: '12px 24px',
              fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none',
              transition: 'background .2s, transform .2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f0f0f0'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
          >
            Reservar llamada gratuita →
          </Link>
        </div>

        {/* Testimonial snippet */}
        <div
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 20,
            padding: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 18 }}>
            "Relevvo transformó nuestra marca en semanas. Velocidad de freelancer, calidad de gran agencia. Sin broncas."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(124,58,237,0.4), rgba(167,139,250,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'rgba(167,139,250,0.9)' }}>CR</div>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>Carlos Ramírez</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>CEO · Marca Digital MX</div>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  )
}
