'use client'

import { useMemo, useState } from 'react'
import { PLANS, BUILDER_GROUPS, type Plan } from '@/lib/planes'
import { WA_NUMBER } from '@/lib/constants'

// "Arma tu plan": el visitante marca lo que necesita y le decimos qué plan
// lo cubre. Toda la lógica sale de BUILDER_GROUPS y PLANS en lib/planes.ts;
// acá no se escribe ningún precio ni ninguna regla de qué incluye qué.
//
// Sin scroll-reveal a propósito, por la misma razón que Pricing.tsx: es una
// sección de decisión y no puede quedar invisible si el trigger falla.

const ORDER: Plan['id'][] = ['basic', 'mid', 'full']
const rank = (id: Plan['id']) => ORDER.indexOf(id)
const planById = (id: Plan['id']) => PLANS.find((p) => p.id === id)!
const shortName = (p: Plan) => p.name.replace('Relevvo ', '')

// Losas isométricas de la ilustración, de abajo (BASIC) hacia arriba (FULL).
const SLAB_Y: Record<Plan['id'], number> = { basic: 222, mid: 152, full: 82 }

function Slab({ id, state }: { id: Plan['id']; state: 'off' | 'on' | 'top' }) {
  const y = SLAB_Y[id]
  const top = `160,${y - 52} 300,${y} 160,${y + 52} 20,${y}`
  const left = `20,${y} 160,${y + 52} 160,${y + 66} 20,${y + 14}`
  const right = `160,${y + 52} 300,${y} 300,${y + 14} 160,${y + 66}`
  const fill = state === 'top' ? 'var(--grape)' : state === 'on' ? 'var(--night-3)' : 'var(--night)'
  const side = state === 'top' ? '#4A3178' : state === 'on' ? '#1B1623' : 'var(--night)'
  const stroke = state === 'top' ? 'var(--butter)' : state === 'on' ? 'var(--lilac)' : 'rgba(245,242,201,0.22)'
  return (
    <g style={{ transition: 'opacity .3s' }}>
      <polygon points={left} fill={side} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <polygon points={right} fill={side} stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <polygon points={top} fill={fill} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <text
        x="312" y={y + 11} textAnchor="start"
        fontFamily="var(--font-inter), sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.5"
        fill={state === 'off' ? 'rgba(245,242,201,0.35)' : 'var(--butter)'}
      >
        {id.toUpperCase()}
      </text>
    </g>
  )
}

export default function PlanBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [manual, setManual] = useState<Plan['id'] | null>(null)

  const allOptions = useMemo(() => BUILDER_GROUPS.flatMap((g) => g.options), [])

  const recommended: Plan['id'] | null = useMemo(() => {
    let best = -1
    allOptions.forEach((o) => { if (selected.has(o.id)) best = Math.max(best, rank(o.minPlan)) })
    return best < 0 ? null : ORDER[best]
  }, [selected, allOptions])

  const view = manual ?? recommended
  const viewRank = view ? rank(view) : -1

  const toggle = (id: string) => {
    setManual(null)
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const uncovered = allOptions.filter((o) => selected.has(o.id) && rank(o.minPlan) > viewRank)
  const picked = allOptions.filter((o) => selected.has(o.id))
  const plan = view ? planById(view) : null

  const waHref = plan
    ? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        `Hola, armé mi plan en la web y me salió ${plan.name}.` +
          (picked.length ? ` Necesito: ${picked.map((o) => o.label.toLowerCase()).join(', ')}.` : ''),
      )}`
    : '#planes'

  return (
    <section id="arma-tu-plan" className="py-24 px-4 max-w-6xl mx-auto" aria-labelledby="arma-title">
      <div className="text-center mb-14">
        <span className="section-label" style={{ justifyContent: 'center' }}>Arma tu plan</span>
        <h2
          id="arma-title"
          className="heading-display"
          style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.035em' }}
        >
          Marca lo que necesita <span className="heading-serif text-lilac">tu marca.</span>
        </h2>
        <p className="text-muted mt-5 max-w-[60ch] mx-auto">
          Te mostramos qué plan lo cubre y por qué. Los planes se suman: cada uno trae todo lo del anterior.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-start">
        {/* ── Opciones ── */}
        <div className="flex flex-col gap-7">
          {BUILDER_GROUPS.map((g) => (
            <fieldset key={g.title}>
              <legend className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-lilac mb-3">
                {g.title}
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {g.options.map((o) => {
                  const on = selected.has(o.id)
                  const included = !on && viewRank >= rank(o.minPlan)
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(o.id)}
                      className={[
                        'rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors duration-200 border',
                        on
                          ? 'bg-grape border-grape text-butter'
                          : included
                            ? 'border-dashed border-lilac text-butter bg-transparent hover:bg-night-2'
                            : 'border-[color:var(--border-hover)] text-[color:var(--text)] bg-transparent hover:bg-night-2 hover:text-butter',
                      ].join(' ')}
                    >
                      {on && <span aria-hidden="true" className="mr-1.5">✓</span>}
                      {o.label}
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        {/* ── Resultado ── */}
        <div className="lg:sticky lg:top-28">
          <svg viewBox="0 0 370 300" className="w-full max-w-[390px] mx-auto block" role="img"
            aria-label={view ? `Plan ${view.toUpperCase()} resaltado` : 'Tres planes apilados: BASIC, MID y FULL'}>
            {ORDER.map((id) => (
              <Slab key={id} id={id} state={view === id ? 'top' : viewRank > rank(id) ? 'on' : 'off'} />
            ))}
          </svg>

          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6 text-sm text-muted" aria-label="Leyenda">
            <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-[4px] bg-grape" />Lo que marcaste</li>
            <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-[4px] border border-dashed border-lilac" />Lo que también trae tu plan</li>
            <li className="flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-[4px] border border-[color:var(--border-hover)]" />No incluido</li>
          </ul>

          <div role="group" aria-label="Ver un plan" className="grid grid-cols-3 mt-6 rounded-full border border-[color:var(--border-hover)] p-1">
            {ORDER.map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setManual(id)}
                className={`rounded-full py-2 text-xs font-semibold tracking-[0.12em] transition-colors ${
                  view === id ? 'bg-butter text-night' : 'text-muted hover:text-butter'
                }`}
              >
                {id.toUpperCase()}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-7 min-h-[140px]">
            {plan ? (
              <>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-lilac">
                  {manual && manual !== recommended ? 'Estás viendo' : 'Te toca'}
                </p>
                <p className="heading-display mt-2" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', lineHeight: 1.05 }}>
                  {plan.name} <span className="font-normal text-[color:var(--text)] text-[0.55em] tracking-normal">
                    <span className="tabular-nums">{plan.price}</span> COP/mes
                  </span>
                </p>
                <p className="heading-serif text-lg mt-2 text-[color:var(--text)]">{plan.tag}</p>
                {uncovered.length > 0 && (
                  <p className="mt-3 text-sm text-butter-dim">
                    {shortName(plan)} no cubre: {uncovered.map((o) => o.label.toLowerCase()).join(', ')}.
                    {recommended && <> Para eso necesitas {shortName(planById(recommended))}.</>}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="heading-display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', lineHeight: 1.1 }}>
                  Los planes van de <span className="tabular-nums">{PLANS[0].price}</span> a{' '}
                  <span className="tabular-nums">{PLANS[PLANS.length - 1].price}</span> al mes.
                </p>
                <p className="text-muted mt-2">Marca lo que necesitas y te decimos cuál te toca.</p>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {plan ? (
              <>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Quiero {shortName(plan)} →
                </a>
                <a href="#planes" className="btn-secondary">Ver los tres planes</a>
              </>
            ) : (
              <a href="#planes" className="btn-primary">Ver los tres planes →</a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
