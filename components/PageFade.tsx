'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function PageFade() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(ref.current, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        if (ref.current) ref.current.style.pointerEvents = 'none'
      },
    })
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[9990] bg-black pointer-events-none"
      style={{ willChange: 'opacity' }}
    />
  )
}
