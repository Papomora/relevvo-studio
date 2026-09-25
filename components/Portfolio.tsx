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

function CaseMeta({ c, dark = true }: { c: Featured; dark?: boolean }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-white/70 mb-1">
          {c.category}
        </p>
        <h3 className="heading-display text-white text-2xl md:text-3xl">{c.client}</h3>
        {c.note && <p className="text-white/70 text-sm mt-1">{c.note}</p>}
      </div>
      <ul className="flex flex-wrap gap-1.5" aria-label="Servicios">
        {c.services.map((s) => (
          <li
            key={s}
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              dark ? 'border-white/20 bg-black/40 text-white/85' : 'border-white/15 bg-white/5 text-white/80'
            } backdrop-blur-sm`}
          >
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
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/85 hover:text-white underline-offset-4 hover:underline"
    >
      {label}
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

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
      <div className="pf-heading text-center mb-14">
        <span className="pill-badge mb-6 inline-flex">Portafolio</span>
        <h2 className="mb-4">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            Trabajo que{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            salió del estudio.
          </span>
        </h2>
        <p className="text-white/70 text-base max-w-lg mx-auto leading-relaxed">
          Branding, contenido y visuales de producto para marcas reales. Esto es lo que hacemos cada mes.
        </p>
      </div>

      <div className="pf-grid grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── 1. Más Brownie — caso grande ── */}
        <article className="pf-card group lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src="/clientes/masbrownie/banner1.png"
              alt="Empaque de Más Brownie, brownie de chocolate 0 g de azúcares añadidos, flotando entre trozos de brownie"
              fill
              sizes="(max-width: 1024px) 100vw, 760px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <CaseMeta c={brownie} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 p-1">
            {[
              { src: '/clientes/masbrownie/banner2.png', alt: 'Empaque Más Brownie sobre cama de brownies' },
              { src: '/clientes/masbrownie/banner3.png', alt: 'Empaque Más Brownie en escena de panadería con chispas de chocolate' },
              { src: '/clientes/masbrownie/banner4.png', alt: 'Empaque Más Brownie frente a brownies apilados' },
            ].map((img) => (
              <div key={img.src} className="relative aspect-[3/2] overflow-hidden rounded-lg">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 1024px) 33vw, 250px" className="object-cover" />
              </div>
            ))}
          </div>
        </article>


        {/* ── 2. Relevvo Studio — contenido propio ── */}
        <article className="pf-card relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/nosotros/cliente-logo-word.png"
              alt="Pieza para Instagram de Relevvo Studio: «El cliente que llegó con un logo de Word»"
              fill
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
            />
          </div>
          <div className="p-5 md:p-6 flex flex-col gap-4">
            <CaseMeta c={relevvo} dark={false} />
            {relevvo.url && <IgLink url={relevvo.url} label="Ver en Instagram" />}
          </div>
        </article>

        {/* ── Casos por marca ── */}
        {cases.map((c) => {
          const media = (
            <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
              {c.cover ? (
                <Image
                  src={c.cover}
                  alt={`Trabajo de Relevvo Studio para ${c.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              ) : c.logo ? (
                <Image src={c.logo} alt={`Logo de ${c.name}`} fill sizes="(max-width: 1024px) 60vw, 240px" className="object-contain p-14" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center heading-display text-white/90 text-4xl md:text-5xl">
                  {c.name}
                </span>
              )}
            </div>
          )
          return (
            <article key={c.name} className="pf-card group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col">
              {media}
              <div className="p-5 md:p-6 flex flex-col gap-4 flex-1 justify-between">
                <CaseMeta c={{ client: c.name, category: c.category ?? c.services[0], services: c.services }} dark={false} />
                {c.url && <IgLink url={c.url} label="Ver en Instagram" />}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
