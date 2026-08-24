'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from '@/lib/useReducedMotion'

export function WebGLShader() {
  const reduceMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null, camera: null, renderer: null, mesh: null, uniforms: null, animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;
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

    refs.scene = new THREE.Scene()
    refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    // Tope de 1.5x. Sin tope, en pantallas retina/4K el devicePixelRatio (2-3)
    // multiplica x4-x9 el número de fragmentos de un shader a pantalla completa.
    // Es un fondo ambiental al 18% de opacidad — no necesita resolución nativa.
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    refs.renderer.setClearColor(new THREE.Color(0x000000), 0)
    refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

    refs.uniforms = {
      resolution: { value: [window.innerWidth, window.innerHeight] },
      time:       { value: 0.0 },
      xScale:     { value: 1.0 },
      yScale:     { value: 0.45 },
      distortion: { value: 0.04 },
    }

    const positions = new THREE.BufferAttribute(
      new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,1,0]), 3
    )
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', positions)

    const material = new THREE.RawShaderMaterial({
      vertexShader, fragmentShader, uniforms: refs.uniforms, side: THREE.DoubleSide,
    })

    refs.mesh = new THREE.Mesh(geometry, material)
    refs.scene.add(refs.mesh)

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      refs.renderer.setSize(window.innerWidth, window.innerHeight, false)
      refs.uniforms.resolution.value = [window.innerWidth, window.innerHeight]
    }
    handleResize()

    const renderFrame = () => {
      if (refs.renderer && refs.scene && refs.camera)
        refs.renderer.render(refs.scene, refs.camera)
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      renderFrame()
      refs.animationId = requestAnimationFrame(animate)
    }

    // Pausa el bucle cuando la pestaña no está visible. Antes seguía
    // renderizando a 60fps en segundo plano, quemando batería sin que
    // nadie lo viera.
    const stop = () => {
      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId)
        refs.animationId = null
      }
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (refs.animationId === null) animate()
    }

    if (reduceMotion) {
      // Con "reducir movimiento" activo se pinta un solo fotograma estático
      // en vez de animar. El fondo sigue ahí; deja de moverse.
      renderFrame()
    } else {
      animate()
      document.addEventListener('visibilitychange', onVisibility)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', onVisibility)
      refs.mesh?.geometry.dispose()
      if (refs.mesh?.material instanceof THREE.Material) refs.mesh.material.dispose()
      refs.renderer?.dispose()
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
