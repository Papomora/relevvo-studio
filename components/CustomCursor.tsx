'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// 8-bit pixel-art cursor — snaps to the mouse (no easing, true to the retro
// feel), swaps between two hand-pixelled sprite frames on an interval for
// the "animated" blink, and a third bigger frame on hover over interactive
// elements. Built from a 10x10 grid of <rect> with crisp (non-antialiased)
// edges — no image asset needed.
const GRID = 10
const PIXEL = 3 // px per grid cell at 1x scale

// 1 = purple pixel, 2 = light accent pixel (blink highlight), 0 = empty
const FRAME_A: number[][] = [
  [1,0,0,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0,0],
  [1,2,1,0,0,0,0,0,0,0],
  [1,2,2,1,0,0,0,0,0,0],
  [1,2,2,2,1,0,0,0,0,0],
  [1,2,2,2,2,1,0,0,0,0],
  [1,2,2,1,1,0,0,0,0,0],
  [1,1,2,1,0,0,0,0,0,0],
  [1,0,1,2,1,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0],
]
const FRAME_B: number[][] = [
  [1,0,0,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0,0],
  [1,1,1,0,0,0,0,0,0,0],
  [1,2,2,1,0,0,0,0,0,0],
  [1,2,2,2,1,0,0,0,0,0],
  [1,2,2,2,2,1,0,0,0,0],
  [1,1,1,2,2,1,0,0,0,0],
  [1,0,1,1,2,1,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,1,0,0,0,0,0],
]

const COLORS: Record<number, string> = { 1: '#0A0A0A', 2: '#7C3AED' }
const COLORS_HOVER: Record<number, string> = { 1: '#0A0A0A', 2: '#D2BBFF' }

function PixelCursor({ frame, hover }: { frame: number[][]; hover: boolean }) {
  const scale = hover ? 2 : 1.4
  const size = GRID * PIXEL * scale
  const colors = hover ? COLORS_HOVER : COLORS
  return (
    <svg
      width={size} height={size} viewBox={`0 0 ${GRID} ${GRID}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {frame.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={colors[cell]} /> : null
        )
      )}
    </svg>
  )
}

export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [frameIdx, setFrameIdx] = useState(0)
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

    // Blink between the two frames — classic step timing, not smooth
    const blink = setInterval(() => setFrameIdx(i => (i + 1) % 2), 420)

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
      <PixelCursor frame={frameIdx === 0 ? FRAME_A : FRAME_B} hover={hover} />
    </div>
  )
}
