'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { WA_URL } from '@/lib/constants'

const navLinks = [
  { label: 'Nosotros',   href: '/nosotros' },
  { label: 'Clientes',   href: '#clientes' },
  { label: 'Portafolio', href: '#portafolio' },
]

const WA_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  const close = useCallback(() => setMenuOpen(false), [])
  const toggle = useCallback(() => setMenuOpen(v => !v), [])

  /* body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* Escape key */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.from(navRef.current, { y: -16, duration: 0.7, ease: 'power3.out', delay: 0.1 })
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300"
      >
        <div
          className={`flex items-center gap-6 px-5 py-3 rounded-full border transition-all duration-300 ${
            scrolled
              ? 'bg-[rgba(10,10,10,0.88)] backdrop-blur-xl border-white/15 shadow-lg shadow-black/40'
              : 'bg-[rgba(10,10,10,0.6)] backdrop-blur-md border-white/10'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center mr-2" onClick={close}>
            <Image
              src="/images/Relevvostd@3x.png"
              alt="Relevvo Studio"
              width={110} height={36}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary btn-glow py-2 px-5 text-sm ml-2 hidden md:flex items-center gap-1.5">
            {WA_ICON} Escríbenos
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
            onClick={toggle}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-[18px] h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-[18px] h-[2px] bg-white rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-[18px] h-[2px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer — always in DOM, animated via CSS */}
      <div
        ref={drawerRef}
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'visible' : 'invisible pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={close}
        />

        {/* Panel slides down from top */}
        <div
          className={`absolute top-0 left-0 right-0 bg-[#0d0d0d] border-b border-white/10 px-6 pt-24 pb-8 flex flex-col gap-2 shadow-2xl transition-transform duration-[380ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={close}
              className="flex items-center justify-between py-4 text-[1.05rem] font-semibold text-white/80 hover:text-white border-b border-white/8 transition-colors last:border-0"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              {link.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ))}

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="btn-primary flex items-center justify-center gap-2 mt-4 py-4 text-base"
          >
            {WA_ICON} Escríbenos por WhatsApp
          </Link>
        </div>
      </div>
    </>
  )
}
