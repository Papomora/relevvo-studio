'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQ_ITEMS } from '@/lib/faq'

function FaqRow({ question, answer, idBase, isOpen, onToggle }: {
  question: string; answer: string; idBase: string; isOpen: boolean; onToggle: () => void
}) {
  const panelId = `${idBase}-panel`
  const buttonId = `${idBase}-button`
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <h3 style={{ margin: 0 }}>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '20px 22px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            color: 'var(--text)',
            font: 'inherit',
          }}
        >
          <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{question}</span>
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              flexShrink: 0, color: 'var(--accent)',
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              transition: 'transform 0.25s ease',
            }}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        style={{ padding: isOpen ? '0 22px 20px' : 0 }}
      >
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
          {answer}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const idBase = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(sectionRef.current, {
      opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 max-w-3xl mx-auto" style={{ willChange: 'opacity' }}>
      <div className="text-center mb-14">
        <span className="section-label" style={{ justifyContent: 'center' }}>Preguntas frecuentes</span>
        <h2>
          <span className="heading-display text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
            Lo que más{' '}
          </span>
          <span className="heading-serif text-white" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
            preguntan.
          </span>
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {FAQ_ITEMS.map((item, i) => (
          <FaqRow
            key={i}
            idBase={`${idBase}-${i}`}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(prev => (prev === i ? null : i))}
          />
        ))}
      </div>
    </section>
  )
}
