'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/10 mt-16">
      {/* CTA Banner */}
      <div className="py-20 px-4 text-center max-w-3xl mx-auto">
        <h2 className="mb-6">
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            ¿Listo para hacerlo{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            simple?
          </span>
        </h2>
        <p className="text-white/55 text-lg mb-8">
          Agenda una cita y hablemos de tu marca.
        </p>
        <Link
          href="https://wa.me/57XXXXXXXXXX"
          target="_blank"
          className="btn-primary text-base px-10 py-4"
        >
          Agenda una cita
        </Link>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/">
            <Image src="/images/Relevvostd@3x.png" alt="Relevvo Studio" width={100} height={32} className="object-contain" />
          </Link>

          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="/nosotros" className="hover:text-white transition-colors">Nosotros</Link>
            <Link href="#precios" className="hover:text-white transition-colors">Precios</Link>
            <Link href="#portafolio" className="hover:text-white transition-colors">Clientes</Link>
          </div>

          <p className="text-white/30 text-sm">
            © 2025 Relevvo Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
