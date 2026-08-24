'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/lib/useReducedMotion'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    // Con "reducir movimiento" activo no se instala Lenis: el scroll suave
    // es justo el tipo de movimiento que esa preferencia pide desactivar, y
    // además provoca mareo en usuarios con trastornos vestibulares.
    // El navegador hace scroll nativo y las animaciones de GSAP las corta
    // el bloque @media de globals.css.
    if (reduceMotion) return

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update())

    // Use GSAP ticker so Lenis stays in sync with GSAP animations
    const rafCallback = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [reduceMotion])

  return <>{children}</>
}
