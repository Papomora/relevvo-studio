'use client'

import { useEffect, useState } from 'react'

/**
 * Devuelve true si el sistema del usuario pide reducir movimiento.
 *
 * globals.css ya respeta `prefers-reduced-motion`, pero el CSS no puede
 * detener lo que corre en JS: el bucle del shader WebGL, el scroll suave de
 * Lenis y las animaciones de GSAP lo ignoraban por completo. Este hook les da
 * acceso a la misma preferencia.
 *
 * Arranca en `false` para que servidor y cliente rendericen igual en el primer
 * paso y no haya mismatch de hidratación; el valor real llega en el efecto.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
