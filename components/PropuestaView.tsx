'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import type { Propuesta } from '@/lib/propuestas'

const fmtCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)

function useReveal(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(ref.current, {
      y: 36, opacity: 0, duration: 0.8, delay, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 86%' },
    })
  }, [])
}

export default function PropuestaView({ propuesta: p }: { propuesta: Propuesta }) {
  const heroRef      = useRef<HTMLDivElement>(null)
  const resumenRef   = useRef<HTMLDivElement>(null)
  const objetivosRef = useRef<HTMLDivElement>(null)
  const alcanceRef   = useRef<HTMLDivElement>(null)
  const fasesRef     = useRef<HTMLDivElement>(null)
  const inversionRef = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLDivElement>(null)

  useReveal(resumenRef)
  useReveal(objetivosRef, 0.05)
  useReveal(alcanceRef)
  useReveal(fasesRef)
  useReveal(inversionRef)
  useReveal(ctaRef, 0.1)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.from(heroRef.current, { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })
  }, [])

  const itemsUnico = p.inversion.items.filter(it => it.tipo === 'unico')
  const itemsMensual = p.inversion.items.filter(it => it.tipo !== 'unico')
  const mixedBilling = itemsUnico.length > 0 && itemsMensual.length > 0

  const subtotal = itemsMensual.reduce((acc, it) => acc + it.valor, 0)
  const descuentoPct = p.inversion.descuentoPct || 0
  const descuentoValor = Math.round(subtotal * (descuentoPct / 100))
  const total = subtotal - descuentoValor
  const totalUnico = itemsUnico.reduce((acc, it) => acc + it.valor, 0)

  const vigenciaFecha = new Date(p.fecha)
  vigenciaFecha.setDate(vigenciaFecha.getDate() + p.vigenciaDias)
  const vigenciaTexto = vigenciaFecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })

  const waHref = `https://wa.me/573223094005?text=${encodeURIComponent(p.whatsappMensaje)}`

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F2F2F2' }}>

      {/* ── Minimal header ── */}
      <header style={{
        padding: '28px clamp(20px, 5vw, 80px)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <Image src="/images/Relevvostd@3x.png" alt="Relevvo Studio" width={130} height={40} className="object-contain" priority />
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase' as const,
          color: 'rgba(167,139,250,0.8)', border: '1px solid rgba(124,58,237,0.3)',
          padding: '6px 14px', borderRadius: 100, background: 'rgba(124,58,237,0.08)',
        }}>Propuesta confidencial</span>
      </header>

      {/* ── Hero ── */}
      <div ref={heroRef} style={{ padding: '64px clamp(20px, 5vw, 80px) 48px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#7C3AED', marginBottom: 14 }}>
          Propuesta de trabajo · {p.fecha}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900,
          fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', letterSpacing: '-.03em', lineHeight: 1.05, marginBottom: 14,
        }}>
          Para <span style={{ color: '#A78BFA' }}>{p.cliente}</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-instrument), Georgia, serif', fontStyle: 'italic',
          fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)', color: 'rgba(255,255,255,0.6)', marginBottom: 28,
        }}>{p.proyecto}</p>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '.78rem', color: 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 16px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#41E575' }} />
          Válida hasta el {vigenciaTexto}
        </div>
      </div>

      {/* ── Resumen ── */}
      <div ref={resumenRef} style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.65)' }}>{p.resumen}</p>
      </div>

      {/* ── Objetivos ── */}
      {p.objetivos?.length > 0 && (
        <div ref={objetivosRef} style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel text="Objetivos" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {p.objetivos.map((obj, i) => (
              <div key={i} style={{
                display: 'flex', gap: 10, padding: 16, borderRadius: 10,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#41E575" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span style={{ fontSize: '.88rem', lineHeight: 1.55, color: 'rgba(255,255,255,0.7)' }}>{obj}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Alcance ── */}
      <div ref={alcanceRef} style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel text="Alcance del proyecto" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {p.alcance.map((item, i) => (
            <div key={i} style={{
              padding: '18px 20px', borderRadius: 12,
              background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontWeight: 700, fontSize: '.94rem', marginBottom: 4 }}>{item.concepto}</p>
                <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.descripcion}</p>
              </div>
              {item.cantidad && (
                <span style={{
                  fontSize: '.72rem', fontWeight: 700, color: '#A78BFA',
                  background: 'rgba(124,58,237,0.1)', padding: '5px 12px', borderRadius: 100, height: 'fit-content',
                }}>{item.cantidad}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Fases ── */}
      {p.fases && p.fases.length > 0 && (
        <div ref={fasesRef} style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel text="Cómo trabajamos" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {p.fases.map((f, i) => (
              <div key={i} style={{
                display: 'flex', gap: 20, padding: '20px 0',
                borderBottom: i < p.fases!.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <span style={{
                  fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900, fontSize: '1.4rem',
                  color: 'rgba(124,58,237,0.4)', flexShrink: 0, minWidth: 36,
                }}>{f.numero}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                    <p style={{ fontWeight: 700, fontSize: '.95rem' }}>{f.titulo}</p>
                    {f.duracion && (
                      <span style={{ fontSize: '.68rem', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' as const, letterSpacing: '.06em' }}>{f.duracion}</span>
                    )}
                  </div>
                  <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{f.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Por qué con nosotros ── */}
      {p.porQue && (
        <div style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            padding: '28px 30px', borderRadius: 14,
            background: 'rgba(65,229,117,0.05)', border: '1px solid rgba(65,229,117,0.18)',
          }}>
            <p style={{
              fontSize: '.68rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase' as const,
              color: '#41E575', marginBottom: 10,
            }}>{p.porQue.titulo}</p>
            <p style={{ fontSize: '.92rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.65)' }}>{p.porQue.texto}</p>
          </div>
        </div>
      )}

      {/* ── Demo de producto (antes/después) ── */}
      {p.demoProducto && (
        <div style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel text={p.demoProducto.titulo} />
          <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 24, maxWidth: 640 }}>
            {p.demoProducto.intro}
          </p>

          {/* Antes — compacto */}
          <div style={{
            display: 'flex', gap: 16, alignItems: 'center', padding: '14px 16px', marginBottom: 22,
            borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ position: 'relative', width: 64, height: 64, borderRadius: 8, overflow: 'hidden', flexShrink: 0, background: '#111' }}>
              <Image src={p.demoProducto.antes.imagen} alt={p.demoProducto.antes.nombre} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div>
              <span style={{ fontSize: '.6rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em', color: 'rgba(255,255,255,0.35)' }}>Así está hoy en la tienda</span>
              <p style={{ fontSize: '.82rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{p.demoProducto.antes.nombre}</p>
            </div>
          </div>

          {/* Después — mockup ficha Shopify */}
          <div style={{
            borderRadius: 18, overflow: 'hidden', border: '2px solid #7C3AED',
            boxShadow: '0 20px 60px rgba(124,58,237,0.18)',
          }}>
            {/* Browser-style top bar to sell "esto es tu tienda" */}
            <div style={{ background: '#1a1a1a', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#F87171' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FBBF24' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#41E575' }} />
              <span style={{
                marginLeft: 10, fontSize: '.68rem', color: 'rgba(255,255,255,0.35)',
                fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const,
              }}>factoryartesanias.com/products/organizador-hot-wheels</span>
            </div>

            <div style={{ background: '#fff', padding: 'clamp(18px, 3vw, 32px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(20px, 3vw, 36px)' }} className="pdp-grid">
                <style>{`@media(max-width:640px){.pdp-grid{grid-template-columns:1fr !important}}`}</style>

                {/* Galería */}
                <div style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden', background: '#f7f7f7' }}>
                  <Image src={p.demoProducto.despues.imagen} alt={p.demoProducto.despues.nombre} fill style={{ objectFit: 'contain' }} unoptimized />
                  {p.demoProducto.despues.pills && p.demoProducto.despues.pills.length > 0 && (
                    <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {p.demoProducto.despues.pills.map((pill, i) => (
                        <span key={i} style={{
                          fontSize: '.66rem', fontWeight: 800, color: '#fff',
                          background: i === 0 ? '#41E575' : '#EF4444',
                          padding: '5px 11px', borderRadius: 100, width: 'fit-content',
                          textTransform: 'uppercase' as const, letterSpacing: '.03em',
                        }}>{pill}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div>
                  <span style={{ fontSize: '.68rem', fontWeight: 700, color: '#7C3AED', textTransform: 'uppercase' as const, letterSpacing: '.08em' }}>
                    Diseño y Organización
                  </span>
                  <h4 style={{
                    fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 800, color: '#111',
                    fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', lineHeight: 1.2, margin: '6px 0 10px',
                  }}>{p.demoProducto.despues.nombre}</h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.9-6.2-3.3-6.2 3.3 1.2-6.9-5-4.9 6.9-1z"/></svg>
                    ))}
                    <span style={{ fontSize: '.72rem', color: '#999', marginLeft: 4 }}>(ejemplo ilustrativo)</span>
                  </div>

                  {p.demoProducto.despues.precio && (
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                      {p.demoProducto.despues.precioAntes && (
                        <span style={{ fontSize: '.95rem', color: '#aaa', textDecoration: 'line-through' }}>
                          {fmtCOP(p.demoProducto.despues.precioAntes)}
                        </span>
                      )}
                      <span style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#111' }}>
                        {fmtCOP(p.demoProducto.despues.precio)}
                      </span>
                    </div>
                  )}

                  {p.demoProducto.despues.stockTexto && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444' }} />
                      <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#EF4444' }}>{p.demoProducto.despues.stockTexto}</span>
                    </div>
                  )}

                  <p style={{ fontSize: '.84rem', color: '#555', lineHeight: 1.65, marginBottom: 14 }}>{p.demoProducto.despues.descripcion}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 20 }}>
                    {p.demoProducto.despues.bullets.map((b, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, fontSize: '.8rem', color: '#333' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    width: '100%', textAlign: 'center' as const, background: '#111', color: '#fff',
                    fontWeight: 700, fontSize: '.85rem', padding: '13px', borderRadius: 8, marginBottom: 14,
                  }}>
                    Agregar al carrito
                  </div>

                  {p.demoProducto.despues.trustBadges && (
                    <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '8px 16px', borderTop: '1px solid #eee', paddingTop: 12 }}>
                      {p.demoProducto.despues.trustBadges.map((t, i) => (
                        <span key={i} style={{ fontSize: '.7rem', color: '#888', display: 'flex', alignItems: 'center', gap: 5 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#41E575" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '.74rem', color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>
            La foto es tuya, procesada por nosotros. El precio, las reseñas y el stock son de ejemplo para mostrar el estilo — se activan con datos reales de tu tienda.
          </p>
        </div>
      )}

      {/* ── Inversión ── */}
      <div ref={inversionRef} style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
        <SectionLabel text="Inversión" />

        {mixedBilling && (
          <div style={{
            borderRadius: 16, overflow: 'hidden', marginBottom: 14,
            border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.025)',
          }}>
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '.66rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'rgba(255,255,255,0.4)' }}>Paso 1 · Pago único</span>
            </div>
            {itemsUnico.map((it, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '16px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '.9rem',
              }}>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{it.concepto}</span>
                <span style={{ fontWeight: 600, fontFamily: 'var(--font-bricolage), sans-serif' }}>{fmtCOP(it.valor)}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Subtotal único</span>
              <span style={{ fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>{fmtCOP(totalUnico)}</span>
            </div>
          </div>
        )}

        <div style={{
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.05)',
        }}>
          {mixedBilling && (
            <div style={{ padding: '12px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '.66rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: 'rgba(167,139,250,0.8)' }}>Paso 2 · Plan mensual (desde el segundo mes)</span>
            </div>
          )}
          {itemsMensual.map((it, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '16px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '.9rem',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>{it.concepto}</span>
              <span style={{ fontWeight: 600, fontFamily: 'var(--font-bricolage), sans-serif' }}>{fmtCOP(it.valor)}</span>
            </div>
          ))}

          {descuentoPct > 0 && (
            <div style={{
              display: 'flex', justifyContent: 'space-between', padding: '16px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '.9rem', color: '#41E575',
            }}>
              <span>Descuento ({descuentoPct}%)</span>
              <span style={{ fontWeight: 600 }}>-{fmtCOP(descuentoValor)}</span>
            </div>
          )}

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '22px 24px', background: 'rgba(124,58,237,0.1)',
          }}>
            <span style={{ fontSize: '.8rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em', color: 'rgba(255,255,255,0.6)' }}>
              {mixedBilling ? 'Mensual' : (p.inversion.moneda === 'COP' ? 'Total' : `Total (${p.inversion.moneda})`)}
            </span>
            <span style={{
              fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff',
            }}>{fmtCOP(total)}{mixedBilling && <span style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>/mes</span>}</span>
          </div>
        </div>

        {p.inversion.notaPago && (
          <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.4)', marginTop: 12, lineHeight: 1.6 }}>{p.inversion.notaPago}</p>
        )}
      </div>

      {/* ── Condiciones ── */}
      {p.condiciones && p.condiciones.length > 0 && (
        <div style={{ padding: '0 clamp(20px, 5vw, 80px) 56px', maxWidth: 900, margin: '0 auto' }}>
          <SectionLabel text="Condiciones" />
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 18 }}>
            {p.condiciones.map((c, i) => (
              <li key={i} style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── CTA ── */}
      <div ref={ctaRef} style={{ padding: '0 clamp(20px, 5vw, 80px) 100px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          borderRadius: 20, padding: 'clamp(32px, 5vw, 56px)', textAlign: 'center' as const,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.05) 100%)',
          border: '1px solid rgba(124,58,237,0.3)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900,
            fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-.02em', marginBottom: 12,
          }}>¿Arrancamos?</h3>
          <p style={{ fontSize: '.9rem', color: 'rgba(255,255,255,0.55)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Escríbenos por WhatsApp para confirmar la propuesta y coordinar el primer paso.
          </p>
          <Link href={waHref} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#7C3AED', color: '#fff', fontWeight: 700, fontSize: '.9rem',
            padding: '14px 32px', borderRadius: 100, textDecoration: 'none',
          }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Aceptar propuesta por WhatsApp
          </Link>
        </div>
      </div>

      <footer style={{ padding: '24px', textAlign: 'center' as const, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '.72rem', color: 'rgba(255,255,255,0.25)' }}>
        Relevvo Studio · hola@relevvostudio.com · +57 322 309 4005 · www.relevvostudio.com
      </footer>
    </main>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      <div style={{ width: 22, height: 1, background: '#7C3AED' }} />
      <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.8)' }}>{text}</span>
    </div>
  )
}
