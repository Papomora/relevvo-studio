'use client'

export default function VideoBackground() {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.85,
          zIndex: -2,
          pointerEvents: 'none',
          // Force GPU compositing — fixes position:fixed freeze on iOS Safari
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          willChange: 'transform',
          // Dark fallback if video fails to load (e.g. iOS power-save mode)
          backgroundColor: '#0A0A0A',
        }}
      >
        <source src="/videos/2dov.mp4" type="video/mp4" />
      </video>
      {/* Global overlay — mantiene legibilidad en todas las secciones */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(10,10,10,0.45)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}
