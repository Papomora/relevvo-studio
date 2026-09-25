'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ─────────────────────────────────────────────────────────────────────────────
// Solo trabajo real que existe en el repo. NO usar /images/portfolio/* — son
// mockups de stock marcados "(EXAMPLE ONLY)".
// Factory Artesanías NO se muestra (fue una muestra de propuesta, no trabajo
// publicable). Las marcas autorizadas para mostrar están en `cases`.
// Para darle foto a un caso: súbela a /public/images/work/<marca>.jpg y pon la
// ruta en `cover`. Sin `cover`, la tarjeta muestra el logo o el nombre.
// ─────────────────────────────────────────────────────────────────────────────

type Featured = {
  client: string
  category: string
  services: string[]
  note?: string
  url?: string
}

const brownie: Featured = {
  client: 'Más Brownie',
  category: 'Snack saludable',
  services: ['Visuales de producto', 'Landing'],
}

const relevvo: Featured = {
  client: 'Relevvo Studio',
  category: 'Marca propia · Redes',
  services: ['Contenido social', 'Dirección de arte'],
  url: 'https://www.instagram.com/relevvo_studio/',
}

type Case = {
  name: string
  category?: string
  services: string[]
  logo?: string
  cover?: string
  url?: string
}

const cases: Case[] = [
  { name: 'Crussó',      category: 'Mobiliario premium', services: ['Branding', 'Contenido mensual', 'Fotografía'], logo: '/images/Logos/CRUSSO.png',     url: 'https://www.instagram.com/tiendacrusso/' },
  { name: 'Verslä',      category: 'Moda femenina',      services: ['Contenido', 'Pauta', 'Diseño'],               logo: '/images/Logos/versla.png',      url: 'https://www.instagram.com/verslafeminite/' },
  { name: 'LímiteLegal', category: 'Legal & consultoría', services: ['Identidad', 'Web'],                          logo: '/images/Logos/limitelegal.png', url: 'https://www.instagram.com/limite_legalco/' },
  { name: 'Osadí',       services: ['Branding'] },
  { name: 'Eretz',       services: ['Branding'] },
  { name: 'Alhambra',    services: ['Branding'] },
]

type Tone = 'grape' | 'night' | 'butter'

// Rotación de bloques sólidos del mockup aprobado: Crussó uva, Verslä noche,
// LímiteLegal mantequilla, Osadí noche, Eretz mantequilla, Alhambra uva.
const TONES: Tone[] = ['grape', 'night', 'butter', 'night', 'butter', 'grape']

const TONE_CLASS: Record<Tone, string> = {
  grape: 'bg-grape text-butter',
  night: 'bg-night-2 text-butter border border-[color:var(--border)]',
  butter: 'bg-butter text-night',
}

function CaseMeta({ c }: { c: Featured }) {
  return (
    <div>
      <p className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] opacity-85">
        {c.category}
      </p>
      <h3
        className="font-display font-bold mt-1.5"
        style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)', lineHeight: 1, letterSpacing: '-0.035em' }}
      >
        {c.client}
      </h3>
      {c.note && <p className="text-sm mt-1 opacity-80">{c.note}</p>}
      <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Servicios">
        {c.services.map((s) => (
          <li key={s} className="text-xs px-2.5 py-[3px] rounded-full border border-current opacity-80">
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

function IgLink({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-[3] inline-flex items-center gap-1.5 mt-4 text-sm font-semibold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current rounded-sm"
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

// Degradado inferior para leer texto sobre foto (sin brillos ni vidrio).
const PHOTO_SHADE = 'absolute inset-0 pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.8),transparent_55%)]'

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.pf-heading', {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.pf-heading', start: 'top 80%', once: true },
        })
        gsap.from('.pf-card', {
          y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: '.pf-grid', start: 'top 80%', once: true },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="portafolio" className="py-24 px-4 max-w-6xl mx-auto">
      <div className="pf-heading flex flex-wrap items-end justify-between gap-5 mb-11">
        <div>
          <span className="section-label">Portafolio</span>
          <h2
            className="heading-display mt-[18px]"
            style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', lineHeight: 1, fontWeight: 700, letterSpacing: '-0.035em' }}
          >
            Trabajo que <span className="heading-serif text-lilac">salió del estudio.</span>
          </h2>
        </div>
        <p className="text-muted text-base leading-relaxed max-w-[40ch]">
          Branding, contenido y visuales de producto para marcas reales. Esto es lo que hacemos cada mes.
        </p>
      </div>

      <div className="pf-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {/* ── 1. Más Brownie — caso grande ── */}
        <article className="pf-card group relative sm:col-span-2 flex flex-col rounded-[18px] overflow-hidden bg-night-2 text-white min-h-[380px] sm:min-h-[420px] lg:min-h-[520px]">
          <Image
            src="/clientes/masbrownie/banner1.png"
            alt="Empaque de Más Brownie, brownie de chocolate 0 g de azúcares añadidos, flotando entre trozos de brownie"
            fill
            sizes="(max-width: 1024px) 100vw, 760px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <div className={PHOTO_SHADE} />
          <div className="relative z-[2] mt-auto p-[22px]">
            <CaseMeta c={brownie} />
          </div>
          <div className="relative z-[2] grid grid-cols-3 gap-1 px-1 pb-1">
            {[
              { src: '/clientes/masbrownie/banner2.png', alt: 'Empaque Más Brownie sobre cama de brownies' },
              { src: '/clientes/masbrownie/banner3.png', alt: 'Empaque Más Brownie en escena de panadería con chispas de chocolate' },
              { src: '/clientes/masbrownie/banner4.png', alt: 'Empaque Más Brownie frente a brownies apilados' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[3/2] overflow-hidden rounded-[10px]">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 33vw, 250px" className="object-cover" />
              </div>
            ))}
          </div>
        </article>

        {/* ── 2. Relevvo Studio — contenido propio ── */}
        <article className="pf-card group relative flex flex-col rounded-[18px] overflow-hidden bg-night-2 text-white min-h-[380px] lg:min-h-[520px]">
          <Image
            src="/images/nosotros/cliente-logo-word.png"
            alt="Pieza para Instagram de Relevvo Studio: «El cliente que llegó con un logo de Word»"
            fill
            sizes="(max-width: 1024px) 100vw, 380px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
          />
          <div className={PHOTO_SHADE} />
          <div className="relative z-[2] mt-auto p-[22px]">
            <CaseMeta c={relevvo} />
            {relevvo.url && <IgLink url={relevvo.url} label="Ver en Instagram" />}
          </div>
        </article>

        {/* ── Casos por marca: bloques de color sólido ── */}
        {cases.map((c, i) => {
          const tone = TONES[i % TONES.length]
          const meta = { client: c.name, category: c.category ?? c.services[0], services: c.services }

          if (c.cover) {
            return (
              <article key={c.name} className="pf-card group relative flex flex-col rounded-[18px] overflow-hidden bg-night-2 text-white min-h-[260px] sm:min-h-[320px]">
                <Image
                  src={c.cover}
                  alt={`Trabajo de Relevvo Studio para ${c.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                <div className={PHOTO_SHADE} />
                <div className="relative z-[2] mt-auto p-[22px]">
                  <CaseMeta c={meta} />
                  {c.url && <IgLink url={c.url} label="Ver en Instagram" />}
                </div>
              </article>
            )
          }

          return (
            <article
              key={c.name}
              className={`pf-card relative flex flex-col justify-between rounded-[18px] overflow-hidden min-h-[260px] sm:min-h-[320px] ${TONE_CLASS[tone]}`}
            >
              {c.logo ? (
                <div className="flex-1 flex items-center justify-center p-7">
                  <div className="relative w-full h-[110px]">
                    <Image
                      src={c.logo}
                      alt={`Logo de ${c.name}`}
                      fill
                      sizes="(max-width: 1024px) 60vw, 240px"
                      className="object-contain"
                      style={tone === 'butter' ? { filter: 'invert(1) brightness(.2)' } : undefined}
                    />
                  </div>
                </div>
              ) : (
                <span
                  aria-hidden="true"
                  className="flex-1 flex items-center justify-center p-7 font-display font-extrabold"
                  style={{ fontSize: 'clamp(2.4rem, 4.6vw, 3.6rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
                >
                  {c.name}
                </span>
              )}
              <div className="p-[22px]">
                <CaseMeta c={meta} />
                {c.url && <IgLink url={c.url} label="Ver en Instagram" />}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
