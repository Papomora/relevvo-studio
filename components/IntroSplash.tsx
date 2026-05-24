'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function IntroSplash() {
  const [visible, setVisible] = useState(false)
  const [canSkip, setCanSkip] = useState(false)
  const [loading, setLoading] = useState(true)

  const wrapRef  = useRef<HTMLDivElement>(null)
  const vidRef   = useRef<HTMLVideoElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)   // the black overlay for fades
  const fadedOut = useRef(false)                  // prevent double-trigger

  // Fade black overlay IN → then hide whole wrapper
  const fadeToBlackAndDismiss = (duration = 0.7) => {
    if (fadedOut.current) return
    fadedOut.current = true
    sessionStorage.setItem('intro_seen', '1')
    gsap.to(blackRef.current, {
      opacity: 1,
      duration,
      ease: 'power2.inOut',
      onComplete: () => setVisible(false),
    })
  }

  useEffect(() => {
    if (sessionStorage.getItem('intro_seen')) return
    setVisible(true)

    // Show skip after 1.2s
    const skipTimer = setTimeout(() => setCanSkip(true), 1200)

    // Hard fallback at 4s
    const fallback = setTimeout(() => fadeToBlackAndDismiss(0.5), 4000)

    const vid = vidRef.current
    if (!vid) return

    // When video can play → fade black overlay OUT (fade in from black)
    const onCanPlay = () => {
      setLoading(false)
      gsap.to(blackRef.current, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      })
    }
    vid.addEventListener('canplay', onCanPlay)

    // Monitor time — fade to black 0.8s before end
    const onTimeUpdate = () => {
      if (!vid.duration || fadedOut.current) return
      const remaining = vid.duration - vid.currentTime
      if (remaining <= 0.8) {
        clearTimeout(fallback)
        fadeToBlackAndDismiss(0.75)
      }
    }
    vid.addEventListener('timeupdate', onTimeUpdate)

    // Fallback: video ended without timeupdate catching it
    vid.addEventListener('ended', () => fadeToBlackAndDismiss(0.4))

    vid.play().catch(() => {
      clearTimeout(fallback)
      fadeToBlackAndDismiss(0.3)
    })

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(fallback)
      vid.removeEventListener('canplay', onCanPlay)
      vid.removeEventListener('timeupdate', onTimeUpdate)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9990]"
      style={{ background: '#000' }}
    >
      {/* Video */}
      <video
        ref={vidRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src="/videos/1erv.mp4" type="video/mp4" />
      </video>

      {/* Black overlay — starts opaque (fade from black), fades back in at end */}
      <div
        ref={blackRef}
        className="absolute inset-0 z-10"
        style={{ background: '#000', opacity: 1, willChange: 'opacity' }}
      />

      {/* Spinner — shown while loading, above black overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3">
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{
              borderColor: 'rgba(124,58,237,0.35)',
              borderTopColor: 'rgba(124,58,237,0.9)',
            }}
          />
          <span className="font-mono text-[11px] tracking-widest uppercase"
            style={{ color: 'rgba(124,58,237,0.5)' }}>
            Cargando
          </span>
        </div>
      )}

      {/* Skip button */}
      {canSkip && (
        <button
          onClick={() => fadeToBlackAndDismiss(0.4)}
          className="absolute bottom-8 right-8 z-20 font-mono text-xs uppercase
            tracking-widest px-4 py-2 rounded-full border transition-opacity duration-200 hover:opacity-70"
          style={{
            color: 'rgba(255,255,255,0.5)',
            borderColor: 'rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.05)',
            letterSpacing: '0.1em',
          }}
        >
          Saltar →
        </button>
      )}
    </div>
  )
}
