'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Blog', href: '/blog' },
  { label: 'Clientes', href: '#clientes' },
  { label: 'Precios', href: '#precios' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // Entrance animation
    if (typeof window === 'undefined') return
    gsap.from(navRef.current, { y: -16, duration: 0.7, ease: 'power3.out', delay: 0.1 })

    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 transition-all duration-300`}
    >
      <div
        className={`flex items-center gap-6 px-5 py-3 rounded-full border transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.85)] backdrop-blur-xl border-white/15 shadow-lg shadow-black/40'
            : 'bg-[rgba(10,10,10,0.6)] backdrop-blur-md border-white/10'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center mr-2">
          <Image
            src="/images/Relevvostd@3x.png"
            alt="Relevvo Studio"
            width={110}
            height={36}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <Link href="#contacto" className="btn-primary py-2 px-5 text-sm ml-2 hidden md:flex">
          Escríbenos
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white transition-colors text-lg font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="#contacto" className="btn-primary text-center mt-2" onClick={() => setMenuOpen(false)}>
            Escríbenos
          </Link>
        </div>
      )}
    </nav>
  )
}
