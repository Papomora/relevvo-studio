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
          background: '#120E18',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Bloque uva sólido + anillo mantequilla, el mismo lenguaje del
            CTA final del home (paleta del logo, sin halos). */}
        <div
          style={{
            position: 'absolute',
            top: -170,
            right: -150,
            width: 560,
            height: 560,
            borderRadius: 280,
            background: '#5E3F97',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -90,
            right: -70,
            width: 400,
            height: 400,
            borderRadius: 200,
            border: '56px solid rgba(245,242,201,0.10)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, background: '#B7A2E6', display: 'flex' }} />
          <div style={{ fontSize: 24, color: '#D9D5B0', letterSpacing: 2, display: 'flex' }}>
            RELEVVO STUDIO
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 78, fontWeight: 800, color: '#F5F2C9', lineHeight: 1.05, letterSpacing: -2, display: 'flex' }}>
            Diseño sin límites.
          </div>
          <div style={{ display: 'flex', marginTop: 10 }}>
            <div style={{ fontSize: 78, fontWeight: 800, color: '#F5F2C9', background: '#5E3F97', borderRadius: 10, padding: '0 18px 6px', lineHeight: 1.05, letterSpacing: -2, display: 'flex' }}>
              Resultados.
            </div>
          </div>
        </div>

        <div style={{ fontSize: 27, color: '#ADA8A0', display: 'flex', maxWidth: 900 }}>
          Branding, diseño y marketing con IA — Colombia
        </div>
      </div>
    ),
    size,
  )
}
