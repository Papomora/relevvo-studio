'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import type { Parrilla, ParrillaPieza } from '@/lib/parrillas'

function waLink(numero: string, mensaje: string) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

function useReveal(ref: React.RefObject<HTMLElement | null>, delay = 0) {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(ref.current, {
      y: 30, opacity: 0, duration: 0.7, delay, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 88%' },
    })
  }, [])
}

function ApproveBtn({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(65,229,117,0.1)', border: '1px solid rgba(65,229,117,0.3)',
      color: '#41E575', fontWeight: 700, fontSize: '.78rem',
      padding: '10px 20px', borderRadius: 100, textDecoration: 'none',
    }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  )
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      aria-pressed={checked}
      style={{
        width: 22, height: 22, borderRadius: 6, flexShrink: 0, cursor: 'pointer',
        border: checked ? '2px solid #41E575' : '2px solid rgba(255,255,255,0.2)',
        background: checked ? '#41E575' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s',
      }}
    >
      {checked && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
    </button>
  )
}

function PiezaCard({ pieza, numero: numeroLabel, checked, onToggle, showCheckbox }: {
  pieza: ParrillaPieza; numero: string; checked?: boolean; onToggle?: () => void; showCheckbox?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref)
  return (
    <div ref={ref} style={{
      borderRadius: 16, padding: '24px 26px', background: checked ? 'rgba(65,229,117,0.05)' : 'rgba(255,255,255,0.025)',
      border: checked ? '1px solid rgba(65,229,117,0.3)' : '1px solid rgba(255,255,255,0.07)', marginBottom: 14,
      transition: 'background .2s, border-color .2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {showCheckbox && onToggle && (
          <div style={{ paddingTop: 2 }}>
            <Checkbox checked={!!checked} onChange={onToggle} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900, fontSize: '.85rem',
              color: 'rgba(124,58,237,0.6)',
            }}>{numeroLabel}</span>
            <span style={{
              fontSize: '.64rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em',
              color: '#A78BFA', background: 'rgba(124,58,237,0.1)', padding: '4px 10px', borderRadius: 100,
            }}>{pieza.tipo} · {pieza.categoria}</span>
            {pieza.protagonista && (
              <span style={{ fontSize: '.72rem', color: 'rgba(255,255,255,0.4)' }}>{pieza.protagonista}</span>
            )}
            {pieza.prioridad && (
              <span style={{ fontSize: '.62rem', fontWeight: 800, color: '#FBBF24', background: 'rgba(251,191,36,0.1)', padding: '4px 10px', borderRadius: 100 }}>★ Prioridad</span>
            )}
          </div>

          {pieza.hook && (
            <p style={{
              fontFamily: 'var(--font-instrument), Georgia, serif', fontStyle: 'italic',
              fontSize: '1.15rem', color: '#fff', marginBottom: 14, lineHeight: 1.4,
            }}>&ldquo;{pieza.hook}&rdquo;</p>
          )}

          {pieza.guion && pieza.guion.length > 0 && (
            <ol style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14, paddingLeft: 0, listStyle: 'none' }}>
              {pieza.guion.map((linea, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, fontSize: '.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  <span style={{ color: 'rgba(124,58,237,0.5)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span>{linea}</span>
                </li>
              ))}
            </ol>
          )}

          {pieza.slides && pieza.slides.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {pieza.slides.map((s, i) => (
                <div key={i} style={{
                  fontSize: '.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
                  padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8,
                  borderLeft: '2px solid rgba(124,58,237,0.4)',
                }}>{s}</div>
              ))}
            </div>
          )}

          {pieza.copy && (
            <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: 14 }}>{pieza.copy}</p>
          )}

          {pieza.caption && (
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 6, fontStyle: 'italic' as const }}>
              Caption: {pieza.caption}
            </p>
          )}

          {pieza.cta && (
            <p style={{ fontSize: '.76rem', color: 'rgba(167,139,250,0.75)', marginBottom: 18 }}>CTA: {pieza.cta}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ParrillaView({ parrilla: p }: { parrilla: Parrilla }) {
  const heroRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.from(heroRef.current, { y: 24, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 })
  }, [])

  const semanas = Array.from(new Set(p.piezas.map(pz => pz.semana))).sort((a, b) => a - b)
  const historiasPorSemana = new Map((p.historias || []).map(h => [h.semana, h]))
  const finalMsg = `Aprobado ✅ - PARRILLA COMPLETA ${p.mes.toUpperCase()} - ${p.cliente}`

  const candidatas = useMemo(() => p.piezas.filter(pz => !pz.fueraDeCalendario), [p.piezas])
  const fueraDeCalendario = useMemo(() => p.piezas.filter(pz => pz.fueraDeCalendario), [p.piezas])
  const cupo = p.cupoPlan

  const [selected, setSelected] = useState<Set<number>>(
    () => new Set(candidatas.filter(pz => pz.prioridad).map(pz => pz.numero))
  )

  const toggle = (numero: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(numero)) next.delete(numero)
      else next.add(numero)
      return next
    })
  }

  const seleccionadas = candidatas.filter(pz => selected.has(pz.numero))
  const conteo = seleccionadas.length
  const conteoColor = !cupo ? '#41E575' : conteo === cupo ? '#41E575' : conteo > cupo ? '#EF4444' : '#FBBF24'

  const seleccionMsg = seleccionadas.length === 0
    ? `Hola, todavía no he elegido las piezas de ${p.mes} para ${p.cliente}.`
    : `Confirmo estas piezas para la parrilla de ${p.mes} — ${p.cliente} (${conteo}${cupo ? `/${cupo}` : ''}):\n\n` +
      seleccionadas.map(pz => `${pz.numero}) ${pz.tipo} · ${pz.protagonista || pz.categoria}`).join('\n')

  return (
    <main style={{ background: '#0A0A0A', minHeight: '100vh', color: '#F2F2F2' }}>

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
        }}>Parrilla de contenido</span>
      </header>

      <div ref={heroRef} style={{ padding: '64px clamp(20px, 5vw, 80px) 40px', maxWidth: 900, margin: '0 auto' }}>
        <p style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase' as const, color: '#7C3AED', marginBottom: 14 }}>
          {p.mes} · {p.handle}
        </p>
        <h1 style={{
          fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900,
          fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-.03em', lineHeight: 1.08, marginBottom: 18,
        }}>Parrilla <span style={{ color: '#A78BFA' }}>{p.cliente}</span></h1>

        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
          {[
            { label: 'Protagonistas', value: p.protagonistas },
            { label: 'Pilar', value: p.pilar },
            { label: 'Formato', value: p.formato },
          ].map((tag, i) => (
            <div key={i} style={{
              fontSize: '.76rem', color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px',
            }}>
              <span style={{ color: 'rgba(167,139,250,0.7)', fontWeight: 700, marginRight: 6 }}>{tag.label}:</span>{tag.value}
            </div>
          ))}
        </div>
      </div>

      {/* ── SELECTOR: elige tus piezas del mes ── */}
      {cupo && (
        <div style={{ padding: '0 clamp(20px, 5vw, 80px) 40px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{
            borderRadius: 18, padding: 'clamp(20px, 4vw, 30px)',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(124,58,237,0.03) 100%)',
            border: '1px solid rgba(124,58,237,0.25)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' as const, marginBottom: 18 }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 800,
                  fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)', marginBottom: 6,
                }}>Elige tus {cupo} piezas de {p.mes}</h2>
                <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 480 }}>
                  El plan incluye {cupo} piezas al mes. Hay {candidatas.length} piezas listas para elegir — marca las que quieres publicar este mes y confirma por WhatsApp al final.
                </p>
              </div>
              <div style={{
                fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900, fontSize: '1.8rem',
                color: conteoColor, flexShrink: 0, textAlign: 'right' as const,
              }}>
                {conteo}<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', fontWeight: 700 }}>/{cupo}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 20 }}>
              {candidatas.map(pz => (
                <label key={pz.numero} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '10px 8px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer',
                }}>
                  <Checkbox checked={selected.has(pz.numero)} onChange={() => toggle(pz.numero)} />
                  <span style={{ fontSize: '.7rem', fontWeight: 700, color: 'rgba(124,58,237,0.6)', fontFamily: 'var(--font-bricolage), sans-serif', width: 28, flexShrink: 0 }}>
                    #{pz.numero}
                  </span>
                  <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.8)', flex: 1 }}>
                    {pz.tipo} · {pz.protagonista || pz.categoria}
                  </span>
                  {pz.prioridad && <span style={{ fontSize: '.6rem', fontWeight: 800, color: '#FBBF24' }}>★</span>}
                  <span style={{ fontSize: '.68rem', color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>Sem {pz.semana}</span>
                </label>
              ))}
            </div>

            {conteo > cupo && (
              <p style={{ fontSize: '.76rem', color: '#EF4444', marginBottom: 14 }}>
                Elegiste {conteo - cupo} pieza{conteo - cupo > 1 ? 's' : ''} de más para el plan de {cupo}. Desmarca alguna o coordina con nosotros si quieres ampliar el plan este mes.
              </p>
            )}

            <Link href={waLink(p.whatsappNumero, seleccionMsg)} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: conteo === 0 ? 'rgba(65,229,117,0.15)' : '#41E575', color: conteo === 0 ? '#41E575' : '#0A0A0A',
              fontWeight: 800, fontSize: '.85rem', padding: '13px 26px', borderRadius: 100, textDecoration: 'none',
            }}>
              ✅ Confirmar selección por WhatsApp
            </Link>
          </div>
        </div>
      )}

      {semanas.map(sem => (
        <div key={sem} style={{ padding: '0 clamp(20px, 5vw, 80px) 20px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '32px 0 18px' }}>
            <div style={{ width: 22, height: 1, background: '#7C3AED' }} />
            <span style={{ fontSize: '.68rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase' as const, color: 'rgba(167,139,250,0.8)' }}>
              Semana {sem}
            </span>
          </div>

          {p.piezas.filter(pz => pz.semana === sem).map(pz => (
            <div key={pz.numero}>
              <PiezaCard
                pieza={pz}
                numero={`Pieza ${pz.numero}`}
                checked={selected.has(pz.numero)}
                onToggle={pz.fueraDeCalendario ? undefined : () => toggle(pz.numero)}
                showCheckbox={!pz.fueraDeCalendario}
              />
              <div style={{ marginTop: -6, marginBottom: 18 }}>
                <ApproveBtn
                  href={waLink(p.whatsappNumero, `Aprobado ✅ - Pieza ${pz.numero} - ${pz.tipo} ${pz.categoria}${pz.protagonista ? ` (${pz.protagonista})` : ''} - ${p.cliente}`)}
                  label={`Aprobar Pieza ${pz.numero}`}
                />
              </div>
            </div>
          ))}

          {historiasPorSemana.has(sem) && (
            <div style={{
              borderRadius: 14, padding: '18px 22px', background: 'rgba(65,229,117,0.04)',
              border: '1px solid rgba(65,229,117,0.15)', marginBottom: 20,
            }}>
              <p style={{ fontSize: '.68rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.1em', color: '#41E575', marginBottom: 10 }}>
                Historias · Semana {sem}
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 18, marginBottom: 14 }}>
                {historiasPorSemana.get(sem)!.items.map((item, i) => (
                  <li key={i} style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{item}</li>
                ))}
              </ul>
              <ApproveBtn
                href={waLink(p.whatsappNumero, `Aprobado ✅ - Historias Semana ${sem} - ${p.cliente}`)}
                label={`Aprobar Historias S${sem}`}
              />
            </div>
          )}
        </div>
      ))}

      <div style={{ padding: '20px clamp(20px, 5vw, 80px) 100px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{
          borderRadius: 20, padding: 'clamp(32px, 5vw, 48px)', textAlign: 'center' as const,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.05) 100%)',
          border: '1px solid rgba(124,58,237,0.3)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-bricolage), sans-serif', fontWeight: 900,
            fontSize: 'clamp(1.3rem, 2.8vw, 1.8rem)', letterSpacing: '-.02em', marginBottom: 10,
          }}>¿Ya revisaste todo?</h3>
          <p style={{ fontSize: '.86rem', color: 'rgba(255,255,255,0.5)', marginBottom: 24, maxWidth: 440, margin: '0 auto 24px' }}>
            {cupo
              ? `Usa el selector de arriba para confirmar tus ${cupo} piezas, o aprueba absolutamente todo el contenido de una sola vez (incluye lo que quede fuera del cupo).`
              : 'Aprueba la parrilla completa de una sola vez.'}
          </p>
          <Link href={waLink(p.whatsappNumero, finalMsg)} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#7C3AED', color: '#fff', fontWeight: 700, fontSize: '.9rem',
            padding: '14px 32px', borderRadius: 100, textDecoration: 'none',
          }}>
            ✅ Aprobar parrilla completa de {p.mes}
          </Link>
        </div>
      </div>

      <footer style={{ padding: '24px', textAlign: 'center' as const, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '.72rem', color: 'rgba(255,255,255,0.25)' }}>
        Relevvo Studio · hola@relevvostudio.com · +57 322 309 4005 · www.relevvostudio.com
      </footer>
    </main>
  )
}
