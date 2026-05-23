'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// basement.studio–style cursor: dot snaps, ring follows with lag
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Skip on touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Show after first move
    gsap.set([dot, ring], { opacity: 0 })

    let mouseX = -100
    let mouseY = -100
    let ringX  = -100
    let ringY  = -100
    let rafId  = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dot, { x: mouseX, y: mouseY })
      gsap.set([dot, ring], { opacity: 1 })
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Hover state — expand ring on any interactive element
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement
      const isBtn = el.classList.contains('btn-primary') || el.classList.contains('btn-secondary')
      gsap.to(dot,  { scale: isBtn ? 0 : 2, background: '#a78bfa', duration: 0.35, ease: 'back.out(2)' })
      gsap.to(ring, { scale: isBtn ? 2.5 : 1.8, borderColor: 'rgba(167,139,250,0.9)', duration: 0.35, ease: 'back.out(2)' })
    }

    const onLeave = () => {
      gsap.to(dot,  { scale: 1, background: '#7C3AED', duration: 0.35, ease: 'back.out(2)' })
      gsap.to(ring, { scale: 1, borderColor: 'rgba(124,58,237,0.55)', duration: 0.35, ease: 'back.out(2)' })
    }

    document.addEventListener('mousemove', onMove)

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 7, height: 7,
          background: '#7C3AED',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 34, height: 34,
          border: '1.5px solid rgba(124,58,237,0.55)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
