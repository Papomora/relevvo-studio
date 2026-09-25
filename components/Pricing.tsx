'use client'

import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { PLANS as plans, MARKET_COMPARISON } from '@/lib/planes'

// `compact`: usa la cifra abreviada (`short`) del banner de mercado. El
// home la necesita — celda angosta, tipografía de display, la cifra
// completa partía a dos líneas y descuadraba las tres tarjetas. /planes
// tiene espacio de sobra y llama a este componente sin la prop, así que
// sigue mostrando la cifra completa (`figure`). Mismo dato en lib/planes.ts,
// dos presentaciones.
//
// Sin animación de scroll-reveal a propósito. La tenía (GSAP + ScrollTrigger,
// como el resto del sitio) pero se reportó dos veces la misma tarjeta de
// planes invisible en el navegador — el reveal se quedaba atascado en su
// estado inicial (opacity: 0) cuando el disparador de scroll no calculaba
// bien el momento, algo que se agrava con Lenis (scroll suave) de por medio.
// Esta es la sección donde el visitante decide si contratar o no: el riesgo
// de que quede invisible pesa más que el valor decorativo de la animación.
// No reintroducir scroll-reveal acá sin una red de seguridad que garantice
// visibilidad si el trigger falla.
//
// Bloque "Frente al mercado": el argumento es VALOR, no precio. MID
// ($2.990.000) cae dentro del rango pyme de MARKET_COMPARISON y FULL lo
// supera, así que no se puede decir "somos más baratos". Cada punto de
// VALUE_POINTS tiene respaldo en lib/planes.ts o en Features.tsx — no
// agregar promesas que un plan no liste.
const VALUE_POINTS = [
  'Precio mensual fijo y publicado, sin cotizaciones sorpresa',
  'Revisiones por pieza incluidas en cada plan (de 2 a 4)',
  'Fotografía profesional incluida desde el plan MID',
  'Avances visibles en Figma mientras trabajamos',
  'Un solo equipo para branding, contenido y fotografía',
]

export default function Pricing({ compact = false }: { compact?: boolean } = {}) {
  return (
    <section id="planes" className="py-24 px-4 max-w-6xl mx-auto">

      {/* ── Heading ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-5 mb-12">
        <div>
          <span className="section-label">Planes de trabajo</span>
          <h2
            className="heading-display mt-[18px]"
            style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.035em' }}
          >
            Invierte en tu <span className="heading-serif text-lilac">marca.</span>
          </h2>
        </div>
        <p className="text-muted text-base leading-relaxed max-w-[44ch]">
          Precios fijos, sin letra pequeña. Si tu proyecto necesita algo distinto,
          lo ajustamos hablando — no a ciegas con un formulario.
        </p>
      </div>

      {/* ── Comparación con el mercado ────────────────────────
          Cifras verificadas en SEO_SEM_RESEARCH.md — no extrapolar
          ninguna otra a partir de estas tres. */}
      <div className="rounded-[20px] border border-[color:var(--border)] bg-night-2 mb-12 p-[clamp(24px,4vw,40px)]">
        <div className="mb-8 max-w-3xl">
          <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-lilac">
            Frente al mercado
          </span>
          <h3
            className="heading-display mt-3 mb-3"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            La diferencia no está en la tarifa,{' '}
            <span className="heading-serif text-lilac">está en lo que incluye.</span>
          </h3>
          <p className="text-muted text-base leading-relaxed">
            Estas son las cifras de referencia para contratar diseño y marketing en Colombia.
            Con Relevvo la inversión también es real — la diferencia es que sabes desde el primer día qué recibes cada mes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6 mb-8">
          {MARKET_COMPARISON.map((m, i) => (
            <div key={i} className="border-t border-[color:var(--border-hover)] pt-4">
              <p
                className="heading-display mb-1 tabular-nums"
                style={{ fontSize: '1.6rem', letterSpacing: '-0.035em', whiteSpace: compact ? 'nowrap' : 'normal' }}
              >
                {compact ? m.short : m.figure}
              </p>
              <p className="text-muted text-sm">{m.desc}</p>
            </div>
          ))}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
          {VALUE_POINTS.map((v, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[0.9375rem] text-[color:var(--text)]">
              <span className="flex-none w-1.5 h-1.5 rounded-full bg-lilac mt-[0.6em]" aria-hidden="true" />
              {v}
            </li>
          ))}
        </ul>

        <Link
          href={`${WA_URL.split('?')[0]}?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20presupuesto%20para%20mi%20marca`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2 px-7 py-3.5"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          Hablemos de tu proyecto
        </Link>
      </div>

      {/* ── Plan cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8 items-stretch">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`flex flex-col gap-[18px] rounded-[20px] p-7 text-left ${
              plan.featured
                ? 'bg-grape text-butter border border-transparent'
                : 'bg-night-2 text-[color:var(--text)] border border-[color:var(--border)]'
            }`}
          >
            <span
              className={`font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] ${
                plan.featured ? 'text-butter' : 'text-lilac'
              }`}
            >
              {plan.badge ?? plan.id.toUpperCase()}
            </span>

            <h3 className="font-display font-bold text-butter text-[1.3rem] leading-tight">{plan.name}</h3>

            <div
              className="font-display font-extrabold text-butter tabular-nums"
              style={{ fontSize: 'clamp(2rem, 3.4vw, 2.7rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              {plan.price}{' '}
              <span className="font-sans font-medium text-[13px] tracking-normal opacity-75">COP/mes</span>
            </div>

            <p className={`heading-serif text-[1.2rem] leading-snug ${plan.featured ? 'text-butter' : 'text-[color:var(--text)]'}`}>
              {plan.tag}
            </p>

            <ul className="grid gap-[9px] text-[0.9375rem] flex-1 content-start">
              {plan.features.map((feat, j) => (
                <li key={j} className="flex gap-2.5">
                  <span
                    className={`flex-none w-1.5 h-1.5 rounded-full mt-[0.6em] ${plan.featured ? 'bg-butter' : 'bg-lilac'}`}
                    aria-hidden="true"
                  />
                  {feat}
                </li>
              ))}
            </ul>

            <Link
              href={`${WA_URL.split('?')[0]}?text=Hola%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.name)}%2C%20%C2%BFpodr%C3%ADamos%20hablar%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className={`${plan.featured ? 'btn-primary' : 'btn-secondary'} text-sm py-3 gap-2`}
            >
              Consultar este plan
            </Link>
          </div>
        ))}
      </div>

      {/* ── Bottom note ─────────────────────────────────────── */}
      <p className="text-muted text-sm mb-10">
        Todos los planes incluyen onboarding, estrategia inicial y comunicación directa con el equipo.
        <br />Precios mensuales fijos en pesos colombianos, antes de impuestos.
      </p>

      {/* ── Proyecto a la medida ── alternativa, no un cuarto plan: ancho
          completo y tratamiento distinto a propósito, para que no compita
          visualmente con las 3 tarjetas de arriba. Sin precio — no hay
          cifra real que mostrar, se cotiza según alcance. */}
      <div className="rounded-[20px] border border-[color:var(--border)] p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <span className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-lilac mb-3 inline-flex">
              Proyecto a la medida
            </span>
            <h3
              className="heading-display mb-3"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.875rem)', fontWeight: 700, letterSpacing: '-0.03em' }}
            >
              ¿No encajas en un plan mensual?
            </h3>
            <p className="text-muted text-base leading-relaxed max-w-xl">
              Un branding puntual, una web o una sesión de fotos sueltos — sin suscripción. Alcance
              definido contigo, cotización según lo que pidas, un solo pago en vez de mensualidad.
              El{' '}
              <Link href="/servicios/diseno-web" className="text-lilac hover:text-butter underline underline-offset-2">
                diseño web
              </Link>
              {' '}es el caso más común: ningún plan mensual lo trae incluido, así que se cotiza acá.
            </p>
          </div>
          <Link
            href="/contacto"
            className="btn-secondary inline-flex items-center gap-2 px-8 py-3.5 whitespace-nowrap"
          >
            Cotizar mi proyecto
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
