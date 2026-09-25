'use client'

import { useId, useState } from 'react'
import { WA_NUMBER } from '@/lib/constants'

// ── Envío ──────────────────────────────────────────────────────
// Entrega por WhatsApp por decisión del cliente (ago 2026): no hay
// backend, correo ni base de datos de respaldo. Si window.open() falla
// y el usuario no usa el enlace de respaldo del estado de éxito, ese
// lead se pierde sin dejar rastro en ningún lado — no lo hay dónde
// buscarlo después. Por eso el enlace de respaldo de abajo no es
// opcional, y por eso window.open() se llama síncrono (ver handleSubmit).
function buildWhatsAppUrl(data: {
  nombre: string; empresa: string; correo: string
  servicio: string; presupuesto: string; mensaje: string
}): string {
  const lineas = [
    `Hola, quiero contarles sobre un proyecto:`,
    `Nombre: ${data.nombre}`,
    data.empresa && `Empresa: ${data.empresa}`,
    `Correo: ${data.correo}`,
    data.servicio && `Servicio: ${data.servicio}`,
    data.presupuesto && `Presupuesto: ${data.presupuesto}`,
    data.mensaje && `Mensaje: ${data.mensaje}`,
  ].filter(Boolean)
  const texto = encodeURIComponent(lineas.join('\n'))
  return `https://wa.me/${WA_NUMBER}?text=${texto}`
}

const SERVICIOS = ['Branding', 'Diseño Web', 'Redes Sociales', 'Contenido con IA', 'Otro']
const PRESUPUESTOS = ['Menos de $2M', '$2M – $4M', 'Más de $4M', 'Aún no sé']

type Errors = Partial<Record<'nombre' | 'correo', string>>

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export default function ContactForm() {
  const idBase = useId()
  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [correo, setCorreo] = useState('')
  const [servicio, setServicio] = useState('')
  const [presupuesto, setPresupuesto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [sentUrl, setSentUrl] = useState('')

  const validate = (): Errors => {
    const next: Errors = {}
    if (!nombre.trim()) next.nombre = 'Escribe tu nombre.'
    if (!correo.trim()) next.correo = 'Escribe tu correo.'
    else if (!isValidEmail(correo)) next.correo = 'Ese correo no parece válido.'
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    // window.open() debe llamarse de forma SÍNCRONA, en el mismo stack del
    // clic del usuario. Safari (y cualquier navegador móvil) bloquea la
    // ventana si pasa por un await antes — un setTimeout de "carga falsa"
    // ya lo rompía: el usuario veía "éxito" y WhatsApp nunca se abría.
    const url = buildWhatsAppUrl({ nombre, empresa, correo, servicio, presupuesto, mensaje })
    setSentUrl(url) // guardado para el enlace de respaldo, mismo mensaje exacto
    const win = window.open(url, '_blank', 'noopener,noreferrer')
    setStatus(win ? 'success' : 'error')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--night-2)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    padding: '13px 16px',
    fontSize: '0.9375rem',
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--text-muted)',
    marginBottom: 8,
  }

  const chip = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px',
    borderRadius: 100,
    fontSize: '0.8125rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: `1px solid ${active ? 'var(--grape)' : 'var(--border)'}`,
    background: active ? 'var(--grape)' : 'transparent',
    color: active ? 'var(--butter)' : 'var(--text-muted)',
    transition: 'all 0.2s ease',
  })

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="card"
        style={{ padding: 'clamp(32px,5vw,48px)', textAlign: 'center' }}
      >
        <p className="type-heading" style={{ marginBottom: 8, color: 'var(--butter)' }}>Se abrió WhatsApp con tu mensaje listo</p>
        <p className="type-body" style={{ color: 'var(--text-muted)' }}>
          Solo confirma el envío allá.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 20 }}>
        <div>
          <label htmlFor={`${idBase}-nombre`} style={labelStyle}>Nombre *</label>
          <input
            id={`${idBase}-nombre`}
            type="text"
            value={nombre}
            onChange={e => { setNombre(e.target.value); if (errors.nombre) setErrors(({ correo }) => ({ correo })) }}
            aria-invalid={!!errors.nombre}
            aria-describedby={errors.nombre ? `${idBase}-nombre-err` : undefined}
            style={{ ...inputStyle, borderColor: errors.nombre ? '#F87171' : 'var(--border)' }}
          />
          {errors.nombre && (
            <p id={`${idBase}-nombre-err`} role="alert" style={{ color: '#F87171', fontSize: '0.8125rem', marginTop: 6 }}>
              {errors.nombre}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${idBase}-empresa`} style={labelStyle}>Empresa</label>
          <input
            id={`${idBase}-empresa`}
            type="text"
            value={empresa}
            onChange={e => setEmpresa(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idBase}-correo`} style={labelStyle}>Correo *</label>
        <input
          id={`${idBase}-correo`}
          type="email"
          value={correo}
          onChange={e => { setCorreo(e.target.value); if (errors.correo) setErrors(({ nombre }) => ({ nombre })) }}
          aria-invalid={!!errors.correo}
          aria-describedby={errors.correo ? `${idBase}-correo-err` : undefined}
          style={{ ...inputStyle, borderColor: errors.correo ? '#F87171' : 'var(--border)' }}
        />
        {errors.correo && (
          <p id={`${idBase}-correo-err`} role="alert" style={{ color: '#F87171', fontSize: '0.8125rem', marginTop: 6 }}>
            {errors.correo}
          </p>
        )}
      </div>

      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend style={labelStyle}>Servicio</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SERVICIOS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setServicio(v => v === s ? '' : s)}
              aria-pressed={servicio === s}
              style={chip(servicio === s)}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset style={{ border: 'none', padding: 0 }}>
        <legend style={labelStyle}>Presupuesto mensual estimado</legend>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PRESUPUESTOS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPresupuesto(v => v === p ? '' : p)}
              aria-pressed={presupuesto === p}
              style={chip(presupuesto === p)}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${idBase}-mensaje`} style={labelStyle}>Mensaje</label>
        <textarea
          id={`${idBase}-mensaje`}
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
        />
      </div>

      <div aria-live="polite" style={{ minHeight: 0 }}>
        {status === 'error' && (
          <div role="alert" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ color: '#F87171', fontSize: '0.875rem' }}>
              WhatsApp no se abrió solo. Toca aquí para abrirlo con tu mensaje listo.
            </p>
            {/* Ancla real, no un botón con onClick: algunos navegadores/webviews
                (Instagram, Facebook) bloquean el popup aunque window.open() sea
                síncrono. Un <a href> lo abre el navegador de forma nativa, sin
                pasar por ningún bloqueador — es la red de seguridad real, y
                por eso vive en la rama de error, no en la de éxito. */}
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ alignSelf: 'flex-start' }}
            >
              Abrir WhatsApp
            </a>
          </div>
        )}
      </div>

      <button type="submit" className="btn-primary btn-glow" style={{ alignSelf: 'flex-start' }}>
        Enviar mensaje
      </button>
    </form>
  )
}
