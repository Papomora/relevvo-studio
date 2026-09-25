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
// Cuando haya fotos reales de otras marcas, súbelas a /public/images/work/ y
// muévelas de `otherBrands` a `featured`.
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

const factory: Featured = {
  client: 'Factory Artesanías',
  category: 'Artesanías en madera · Tienda Shopify',
  services: ['Retoque de producto', 'Ficha ecommerce'],
  note: 'Muestra hecha sobre la foto real de su catálogo.',
}

const relevvo: Featured = {
  client: 'Relevvo Studio',
  category: 'Marca propia · Redes',
  services: ['Contenido social', 'Dirección de arte'],
  url: 'https://www.instagram.com/relevvo_studio/',
}

type Brand = {
  name: string
  category: string
  services: string[]
  logo?: string
  url?: string
}

const otherBrands: Brand[] = [
  { name: 'Crussó',      category: 'Mobiliario premium',   services: ['Branding', 'Contenido mensual'], logo: '/images/Logos/CRUSSO.png',      url: 'https://www.instagram.com/tiendacrusso/' },
  { name: 'Molicié',     category: 'Hogar & decoración',   services: ['Contenido', 'Estrategia', 'Pauta'], logo: '/images/Logos/MOLICIE.png', url: 'https://www.instagram.com/moliciehogar/' },
  { name: 'Verslä',      category: 'Moda femenina',        services: ['Contenido', 'Pauta', 'Diseño'], logo: '/images/Logos/versla.png',       url: 'https://www.instagram.com/verslafeminite/' },
  { name: 'Metro 73',    category: 'Estilo de vida',       services: ['Branding', 'Social'],           logo: '/images/Logos/METRO73.png',      url: 'https://www.instagram.com/vivemetro73/' },
  { name: 'LímiteLegal', category: 'Legal & consultoría',  services: ['Identidad', 'Web'],             logo: '/images/Logos/limitelegal.png',  url: 'https://www.instagram.com/limite_legalco/' },
  { name: 'Forjar',      category: 'Inversiones',          services: ['Branding', 'Naming'],           logo: '/images/Logos/Forjar.png',       url: 'https://www.instagram.com/forjar_inversiones/' },
  { name: 'ARü',         category: 'Accesorios premium',   services: ['Branding', 'Contenido', 'Pauta'],                                         url: 'https://www.instagram.com/aru.accesorios/' },
  { name: 'Visuality',   category: 'Publicidad exterior',  services: ['Estrategia', 'Diseño', 'Web'] },
  { name: 'Groi',        category: 'Consultoría',          services: ['Branding', 'Web', 'Estrategia'] },
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
          Visuales de producto, retoque para ecommerce y contenido para redes. Esto es lo que hacemos cada mes.
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

        {/* ── 2. Factory Artesanías — antes / después ── */}
        <article className="pf-card relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] flex flex-col">
          <div className="grid grid-cols-2 gap-1 p-1 flex-1">
            <figure className="relative min-h-[260px] overflow-hidden rounded-xl bg-white">
              <Image
                src="/images/factory-demo/hotwheels-antes.jpg"
                alt="Antes: foto original del organizador de pared Hot Wheels en madera, con sombra y fondo gris"
                fill
                sizes="(max-width: 1024px) 50vw, 190px"
                className="object-cover"
              />
              <figcaption className="absolute top-2 left-2 text-[0.6875rem] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-black/75 text-white">
                Antes
              </figcaption>
            </figure>
            <figure className="relative min-h-[260px] overflow-hidden rounded-xl bg-white">
              <Image
                src="/images/factory-demo/hotwheels-despues.jpg"
                alt="Después: el mismo organizador Hot Wheels retocado, con fondo blanco limpio y colores consistentes"
                fill
                sizes="(max-width: 1024px) 50vw, 190px"
                className="object-contain"
              />
              <figcaption className="absolute top-2 left-2 text-[0.6875rem] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-violet-600 text-white">
                Después
              </figcaption>
            </figure>
          </div>
          <div className="p-5 md:p-6">
            <CaseMeta c={factory} dark={false} />
          </div>
        </article>

        {/* ── 3. Relevvo Studio — contenido propio ── */}
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

        {/* ── Otras marcas — lista compacta ── */}
        <div className="pf-card lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
          <h3 className="heading-display text-white text-xl mb-1">Otras marcas con las que trabajamos</h3>
          <p className="text-white/65 text-sm mb-6">
            Branding, contenido y pauta. Las que tienen enlace abren su Instagram.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {otherBrands.map((b) => {
              const inner = (
                <>
                  <span className="relative w-10 h-10 shrink-0 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center overflow-hidden">
                    {b.logo ? (
                      <Image src={b.logo} alt="" fill sizes="40px" className="object-contain p-1" />
                    ) : (
                      <span className="text-sm font-bold text-white/80" aria-hidden="true">{b.name.charAt(0)}</span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-white">{b.name}</span>
                    <span className="block text-xs text-white/65 truncate">
                      {b.category} · {b.services.join(', ')}
                    </span>
                  </span>
                  {b.url && (
                    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-white/50 group-hover:text-white transition-colors shrink-0">
                      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </>
              )
              return (
                <li key={b.name} className="border-b border-white/[0.08]">
                  {b.url ? (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${b.name} en Instagram`}
                      className="group flex items-center gap-3 py-3 rounded-md transition-colors hover:bg-white/[0.03]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 py-3">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
