'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/useReducedMotion'

// WebGL crudo, sin three.js: un solo triángulo a pantalla completa y el mismo
// fragment shader. three.js pesaba ~340KB en cada página solo para esto.

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAG = `
precision highp float;
uniform vec2 resolution;
uniform float time;
const float xScale = 1.0;
const float yScale = 0.45;
const float distortion = 0.04;
void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
  float d = length(p) * distortion;
  float rx = p.x * (1.0 + d);
  float gx = p.x;
  float bx = p.x * (1.0 - d);
  float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
  float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
  float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
  gl_FragColor = vec4(r, g, b, 1.0);
}
`

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)
  if (!s) return null
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s)
    return null
  }
  return s
}

export function WebGLShader() {
  const reduceMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    const program = gl.createProgram()
    if (!vs || !fs || !program) {
      canvas.style.display = 'none'
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.style.display = 'none'
      return
    }
    gl.useProgram(program)

    // Triángulo que cubre todo el viewport (más barato que dos triángulos).
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'resolution')
    const uTime = gl.getUniformLocation(program, 'time')
    gl.clearColor(0, 0, 0, 0)

    let time = 0
    let raf: number | null = null

    const draw = () => {
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Tope de DPR: fondo ambiental al 18% de opacidad, no necesita resolución
    // nativa. En pantallas pequeñas (móvil) se baja a 1x para ahorrar batería.
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1 : 1.5)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      if (raf === null) draw()
    }

    const loop = () => {
      time += 0.01
      draw()
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf)
      raf = null
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (raf === null) loop()
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) {
      // Con "reducir movimiento" solo queda el fotograma estático de resize().
      document.addEventListener('visibilitychange', onVisibility)
      if (!document.hidden) loop()
    }

    return () => {
      stop()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      // Solo se pierde el contexto si el canvas se desmontó de verdad. Si el
      // efecto se re-ejecuta (cambia reduceMotion, StrictMode) el canvas sigue
      // en el DOM y getContext() devolvería un contexto ya perdido.
      setTimeout(() => {
        if (!canvas.isConnected) gl.getExtension('WEBGL_lose_context')?.loseContext()
      }, 0)
    }
  }, [reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block pointer-events-none"
      style={{ zIndex: -1, opacity: 0.18 }}
    />
  )
}
