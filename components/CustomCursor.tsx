'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// 8-bit pixel-art cursor — snaps to the mouse (no easing, true to the retro
// feel). The arrow shape itself is FIXED (a clean solid right-triangle,
// black outline / purple fill — the classic minimal pixel pointer); the
// "animated" part is a 1px sparkle that blinks on and off near the tip,
// game-select-cursor style, instead of the shape itself changing (which
// reads as a rendering glitch, not an animation). Built from a <rect> grid
// with crisp, non-antialiased edges — no image asset needed.
const GRID = 9
const PIXEL = 3 // px per grid cell at 1x scale

// Solid right-triangle arrowhead: 1 = black outline, 2 = purple fill, 0 = empty
const ARROW: number[][] = [
  [1,0,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0],
  [1,2,1,0,0,0,0,0,0],
  [1,2,2,1,0,0,0,0,0],
  [1,2,2,2,1,0,0,0,0],
  [1,2,2,2,2,1,0,0,0],
  [1,2,2,2,2,2,1,0,0],
  [1,1,1,1,1,1,1,1,0],
]

// Sparkle pixels (relative to the same grid), shown only on the "on" blink beat
const SPARKLE: [number, number][] = [[8, 1], [7, 3]]

const COLORS: Record<number, string> = { 1: '#0A0A0A', 2: '#7C3AED' }
const COLORS_HOVER: Record<number, string> = { 1: '#0A0A0A', 2: '#D2BBFF' }

function PixelCursor({ blinkOn, hover }: { blinkOn: boolean; hover: boolean }) {
  const scale = hover ? 2.2 : 1.6
  const size = GRID * PIXEL * scale
  const colors = hover ? COLORS_HOVER : COLORS
  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${GRID} ${GRID}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {ARROW.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={colors[cell]} /> : null
        )
      )}
      {blinkOn && SPARKLE.map(([x, y]) => (
        <rect key={`s-${x}-${y}`} x={x} y={y} width={1} height={1} fill={colors[2]} />
      ))}
    </svg>
  )
}

export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [blinkOn, setBlinkOn] = useState(true)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const wrap = wrapRef.current
    if (!wrap) return

    gsap.set(wrap, { opacity: 0 })

    const onMove = (e: MouseEvent) => {
      // No easing — 8-bit pointers snap, they don't glide
      gsap.set(wrap, { x: e.clientX, y: e.clientY, opacity: 1 })
    }
    document.addEventListener('mousemove', onMove)

    // Blink the sparkle accent — classic step timing, not smooth
    const blink = setInterval(() => setBlinkOn(v => !v), 420)

    const onEnter = () => setHover(true)
    const onLeave = () => setHover(false)
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      clearInterval(blink)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-2px, -2px)',
        willChange: 'transform',
      }}
    >
      <PixelCursor blinkOn={blinkOn} hover={hover} />
    </div>
  )
}
