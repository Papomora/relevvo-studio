import { ImageResponse } from 'next/og'

// El metadata declaraba /og-image.jpg, pero ese archivo NUNCA existió: cada
// vez que alguien compartía el sitio en WhatsApp, LinkedIn o Facebook la
// vista previa salía vacía. Para un estudio de diseño, esa miniatura ES la
// primera muestra de trabajo que ve un cliente.
//
// En vez de depender de un .jpg suelto, la imagen se genera aquí. Siempre
// existe, siempre coincide con la marca, y no hay que reexportarla a mano.
// Next detecta este archivo por convención y emite las etiquetas og:image
// y twitter:image solo.

export const runtime = 'edge'
export const alt = 'Relevvo Studio — Estudio de diseño y branding en Colombia'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0A0A',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Halo morado, el mismo acento del sitio */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.55) 0%, rgba(124,58,237,0) 70%)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#A78BFA', display: 'flex' }} />
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.62)', letterSpacing: 2, display: 'flex' }}>
            RELEVVO STUDIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.05, letterSpacing: -2, display: 'flex' }}>
            Diseño sin límites.
          </div>
          <div style={{ fontSize: 78, fontWeight: 800, color: '#A78BFA', lineHeight: 1.05, letterSpacing: -2, display: 'flex' }}>
            Resultados.
          </div>
        </div>

        <div style={{ fontSize: 27, color: 'rgba(255,255,255,0.55)', display: 'flex', maxWidth: 900 }}>
          Branding, diseño y marketing con IA — Colombia
        </div>
      </div>
    ),
    size,
  )
}
