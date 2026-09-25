'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FAQ_ITEMS } from '@/lib/faq'

function FaqRow({ question, answer, idBase, isOpen, onToggle, isLast }: {
  question: string; answer: string; idBase: string; isOpen: boolean; onToggle: () => void; isLast: boolean
}) {
  const panelId = `${idBase}-panel`
  const buttonId = `${idBase}-button`
  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: isLast ? '1px solid var(--border)' : undefined,
      }}
    >
      <h3 style={{ margin: 0 }}>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex justify-between items-start gap-4 py-[22px] text-left bg-transparent border-0 cursor-pointer font-display font-semibold text-butter focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-butter"
          style={{ fontSize: '1.12rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}
        >
          <span>{question}</span>
          <span
            aria-hidden="true"
            className="shrink-0 text-lilac font-sans font-normal transition-transform duration-200 motion-reduce:transition-none"
            style={{
              fontSize: '1.6rem',
              lineHeight: 1,
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        <p className="text-muted max-w-[62ch]" style={{ lineHeight: 1.65, margin: '0 0 22px' }}>
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
    <section
      ref={sectionRef}
      className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-16 md:py-24"
      style={{ willChange: 'opacity' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 lg:gap-[72px]">
        <div>
          <span className="section-label font-mono" style={{ marginBottom: 0 }}>Preguntas frecuentes</span>
          <h2
            className="heading-display mt-[18px] [text-wrap:balance]"
            style={{ fontSize: 'clamp(2.3rem, 5.4vw, 4.2rem)', lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 700 }}
          >
            Lo que{' '}
            <span className="heading-serif text-lilac">siempre nos preguntan.</span>
          </h2>
        </div>

        <div>
          {FAQ_ITEMS.map((item, i) => (
            <FaqRow
              key={i}
              idBase={`${idBase}-${i}`}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              isLast={i === FAQ_ITEMS.length - 1}
              onToggle={() => setOpenIndex(prev => (prev === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
