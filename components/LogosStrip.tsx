'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// Banda marquee con los nombres de las marcas (diseño aprobado): nombres en
// Bricolage mantequilla separados por un ✺ uva. La primera copia es la lista
// real (la leen los lectores de pantalla); la segunda es el duplicado que
// hace el loop continuo y va con aria-hidden.
const BRANDS = [
  'Crussó',
  'Verslä',
  'LímiteLegal',
  'Osadí',
  'Eretz',
  'Alhambra',
  'Más Brownie',
  'Molicie',
  'Metro 73',
  'Forjar',
]

function BrandList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className={`mq-list${hidden ? ' mq-dup' : ''}`}
      aria-hidden={hidden || undefined}
    >
      {BRANDS.map(name => (
        <li key={name} className="mq-item">
          <span className="mq-name">{name}</span>
          <span className="mq-sep" aria-hidden="true">✺</span>
        </li>
      ))}
    </ul>
  )
}

export default function LogosStrip() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 92%' },
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="clientes"
      aria-label="Marcas con las que trabajamos"
      className="mq"
    >
      <div className="mq-track">
        <BrandList />
        <BrandList hidden />
      </div>

      <style jsx>{`
        .mq {
          margin-top: clamp(16px, 4vw, 40px);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          white-space: nowrap;
        }
        .mq-track {
          display: inline-flex;
          width: max-content;
          animation: mq-scroll 34s linear infinite;
        }
        .mq:hover .mq-track { animation-play-state: paused; }
        .mq :global(.mq-list) {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 18px 0;
        }
        .mq :global(.mq-item) {
          display: inline-flex;
          align-items: center;
        }
        .mq :global(.mq-name) {
          font-family: var(--font-bricolage), sans-serif;
          font-weight: 700;
          font-size: clamp(1.3rem, 2.4vw, 2rem);
          letter-spacing: -0.02em;
          color: var(--butter);
          margin: 0 26px;
        }
        .mq :global(.mq-sep) {
          color: var(--grape);
          font-size: clamp(1.7rem, 3.1vw, 2.6rem);
          line-height: 1;
        }
        @keyframes mq-scroll {
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mq { white-space: normal; }
          .mq-track { animation: none; display: block; width: auto; }
          .mq :global(.mq-list) { flex-wrap: wrap; justify-content: center; row-gap: 8px; }
          .mq :global(.mq-dup) { display: none; }
        }
      `}</style>
    </section>
  )
}
