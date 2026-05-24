'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const services = [
  { num: '01', label: 'Logos & Branding',     color: '#A78BFA' },
  { num: '02', label: 'Landing Pages',         color: '#60A5FA' },
  { num: '03', label: 'Páginas Web',           color: '#34D399' },
  { num: '04', label: 'Productos Digitales',   color: '#F472B6' },
  { num: '05', label: 'Presentaciones',        color: '#FBBF24' },
  { num: '06', label: 'Inteligencia Artificial',color: '#C084FC' },
  { num: '07', label: 'Fotografía',            color: '#FB923C' },
  { num: '08', label: 'Estrategia',            color: '#41E575' },
]

function Pill({ num, label, color }: { num: string; label: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className="flex-shrink-0 mx-2 cursor-default select-none"
      onMouseEnter={() => {
        if (!ref.current) return
        ref.current.style.background = `${color}18`
        ref.current.style.borderColor = `${color}60`
        ref.current.style.boxShadow = `0 0 24px ${color}30, 0 0 8px ${color}20`
        ref.current.style.transform = 'scale(1.04)'
        const num = ref.current.querySelector('.pill-num') as HTMLElement
        const lbl = ref.current.querySelector('.pill-label') as HTMLElement
        if (num) num.style.color = color
        if (lbl) lbl.style.color = '#fff'
      }}
      onMouseLeave={() => {
        if (!ref.current) return
        ref.current.style.background = 'rgba(255,255,255,0.04)'
        ref.current.style.borderColor = 'rgba(255,255,255,0.1)'
        ref.current.style.boxShadow = 'none'
        ref.current.style.transform = 'scale(1)'
        const num = ref.current.querySelector('.pill-num') as HTMLElement
        const lbl = ref.current.querySelector('.pill-label') as HTMLElement
        if (num) num.style.color = 'rgba(124,58,237,0.5)'
        if (lbl) lbl.style.color = 'rgba(255,255,255,0.55)'
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '12px 22px',
        borderRadius: 999,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(8px)',
        transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.3s ease, transform 0.2s ease',
        willChange: 'transform',
      }}
    >
      <span
        className="pill-num font-mono text-xs"
        style={{ color: 'rgba(124,58,237,0.5)', letterSpacing: '0.1em', transition: 'color 0.25s ease' }}
      >
        {num}
      </span>
      <span
        className="pill-label heading-display whitespace-nowrap"
        style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)', transition: 'color 0.25s ease' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Solution() {
  const headingRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const tweenRef   = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(headingRef.current, {
      y: 40, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: headingRef.current, start: 'top 82%' },
    })

    const track = trackRef.current
    if (!track) return
    const totalW = track.scrollWidth / 2

    tweenRef.current = gsap.to(track, {
      x: -totalW,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalW),
      },
    })

    const pause = () => tweenRef.current?.pause()
    const play  = () => tweenRef.current?.play()
    track.addEventListener('mouseenter', pause)
    track.addEventListener('mouseleave', play)
    return () => {
      track.removeEventListener('mouseenter', pause)
      track.removeEventListener('mouseleave', play)
    }
  }, [])

  const doubled = [...services, ...services]

  return (
    <section className="py-24 overflow-hidden">
      <div ref={headingRef} className="text-center px-4 mb-14 max-w-4xl mx-auto">
        <span className="section-label" style={{ justifyContent: 'center' }}>Solución</span>
        <h2 className="mb-6">
          <span className="heading-display text-white block" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            Todas las necesidades,
          </span>
          <span className="heading-serif text-white block" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)' }}>
            un solo aliado.
          </span>
        </h2>
        <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
          En Relevvo cubrimos de forma integral tus necesidades visuales y estratégicas,
          para que no tengas que coordinar múltiples proveedores.
        </p>
      </div>

      {/* Pill marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0A0A, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0A0A, transparent)' }} />

        <div
          ref={trackRef}
          className="flex items-center py-4"
          style={{ width: 'max-content', gap: 0 }}
        >
          {doubled.map((s, i) => (
            <Pill key={i} num={s.num} label={s.label} color={s.color} />
          ))}
        </div>
      </div>
    </section>
  )
}
