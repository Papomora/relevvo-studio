'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ── Animation helper ──────────────────────────────────────────
function useReveal(ref: React.RefObject<HTMLElement | null>, options?: { y?: number; delay?: number }) {
  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return
    gsap.registerPlugin(ScrollTrigger)
    gsap.from(ref.current, {
      y: options?.y ?? 50,
      opacity: 0,
      duration: 0.95,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 84%' },
    })
  }, [])
}

// ── Sub-components ────────────────────────────────────────────
function ChapterLabel({ num, title }: { num: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { y: 20 })
  return (
    <div ref={ref} className="flex items-center gap-4 mb-8">
      <span className="font-mono text-xs text-muted" style={{ letterSpacing: '0.15em' }}>{num}</span>
      <div className="h-px flex-1" style={{ background: 'var(--border)', maxWidth: 40 }} />
      <span className="font-mono text-xs uppercase" style={{ color: 'var(--lilac)', letterSpacing: '0.12em' }}>{title}</span>
    </div>
  )
}

function BigQuote({ text, accent = 'var(--butter)' }: { text: string; accent?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { y: 60 })
  return (
    <div ref={ref} className="py-10 md:py-16 text-center px-4">
      <p
        className="heading-display mx-auto"
        style={{
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          letterSpacing: '-0.035em',
          lineHeight: 1.15,
          color: accent,
          maxWidth: 820,
        }}
      >
        "{text}"
      </p>
    </div>
  )
}

export default function AIStory() {
  const introRef     = useRef<HTMLDivElement>(null)
  const ch1Ref       = useRef<HTMLDivElement>(null)
  const toolsRef     = useRef<HTMLDivElement>(null)
  const ch2Ref       = useRef<HTMLDivElement>(null)
  const limitsRef    = useRef<HTMLDivElement>(null)
  const ch3Ref       = useRef<HTMLDivElement>(null)
  const statsRef     = useRef<HTMLDivElement>(null)
  const ch4Ref       = useRef<HTMLDivElement>(null)
  const manifestoRef = useRef<HTMLDivElement>(null)
  const ch5Ref       = useRef<HTMLDivElement>(null)
  const closerRef    = useRef<HTMLDivElement>(null)

  // Counter animation on stats
  useEffect(() => {
    if (typeof window === 'undefined') return
    // Con movimiento reducido se quedan las cifras finales del SSR.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const counters = document.querySelectorAll('.stat-counter')
    counters.forEach(el => {
      const num = parseInt(el.getAttribute('data-num') || '0')
      const suffix = el.getAttribute('data-suffix') || ''
      const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return
        let start = 0
        const duration = 1400
        const step = (ts: number) => {
          if (!start) start = ts
          const p = Math.min((ts - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          ;(el as HTMLElement).textContent = Math.round(eased * num) + suffix
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
        obs.disconnect()
      }, { threshold: 0.5 })
      obs.observe(el)
    })
  }, [])

  useReveal(introRef,     { y: 40 })
  useReveal(ch1Ref,       { y: 30 })
  useReveal(toolsRef,     { y: 40 })
  useReveal(ch2Ref,       { y: 30 })
  useReveal(limitsRef,    { y: 40 })
  useReveal(ch3Ref,       { y: 30 })
  useReveal(statsRef,     { y: 50 })
  useReveal(ch4Ref,       { y: 30 })
  useReveal(manifestoRef, { y: 40 })
  useReveal(ch5Ref,       { y: 30 })
  useReveal(closerRef,    { y: 60 })

  return (
    <section className="py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">

        {/* ── SECTION HEADER ── */}
        <div className="text-center mb-24">
          <span className="pill-badge mb-6 inline-flex">El impulso que tu marca necesita</span>
          <h2 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            <span className="heading-display block">Diseño que mueve</span>
            <span className="heading-serif text-lilac block">negocios.</span>
          </h2>
          <p className="text-[color:var(--text)] text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Más de 20 marcas y nueve años de oficio detrás de cada entrega. Esta es la diferencia entre tener diseño y tener una marca que realmente trabaja para ti.
          </p>
        </div>

        {/* ── INTRO BLOCK ── */}
        <div
          ref={introRef}
          className="rounded-3xl p-10 md:p-16 mb-8 relative overflow-hidden"
          style={{ background: 'var(--grape)' }}
        >
          {/* Anillo decorativo, como el bloque CTA final del home */}
          <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{ border: '56px solid rgba(245,242,201,0.08)' }} />
          <h3
            className="heading-display mb-5 relative z-10"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}
          >
            ¿Tu marca se ve bien<br />
            <span className="heading-serif" style={{ fontSize: '1.08em' }}>pero no consigue clientes?</span>
          </h3>
          <p className="text-butter/85 text-lg leading-relaxed relative z-10 max-w-2xl">
            El problema no es el diseño — es la estrategia que falta detrás. En Relevvo no te damos solo piezas gráficas.
            Te damos una marca con identidad, contenido con propósito y entregas que llegan cuando dijimos que llegaban.
          </p>
        </div>

        {/* ── CAPÍTULO 1: EL ERROR MÁS COMÚN ── */}
        <ChapterLabel num="01" title="El error más común" />

        <div ref={ch1Ref} className="mb-8">
          <h3
            className="heading-display mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Las marcas invierten en diseño sin invertir en posicionamiento.
          </h3>
          <p className="text-[color:var(--text)] text-base md:text-lg leading-relaxed mb-4">
            Un logo bonito no garantiza ventas. Una publicación bien diseñada no garantiza visibilidad.
            Siempre hace falta algo más: una estrategia clara, una voz consistente y un equipo que entienda tu negocio.
          </p>
        </div>

        {/* Comparativa del mercado */}
        <div ref={toolsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { stage: 'Freelancer', problem: '"Entrega rápido, pero no entiende mi marca ni tiene visión estratégica."', featured: false },
            { stage: 'Agencia tradicional', problem: '"Cotiza pieza por pieza, tarda semanas y nunca hablas con quien hace el trabajo."', featured: false },
            { stage: 'Relevvo', problem: '"Velocidad de freelancer, estrategia de agencia. Precio fijo y publicado."', featured: true },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={item.featured
                ? { background: 'var(--grape)', border: '1px solid transparent' }
                : { background: 'var(--night-2)', border: '1px solid var(--border)' }}
            >
              <span className="font-mono text-xs mb-3 block uppercase" style={{ color: item.featured ? 'var(--butter)' : 'var(--lilac)', letterSpacing: '0.1em' }}>{item.stage}</span>
              <p className={`${item.featured ? 'text-butter' : 'text-muted'} text-sm leading-relaxed italic`}>{item.problem}</p>
            </div>
          ))}
        </div>

        <BigQuote text="Una marca bonita sin estrategia es un barco con motor pero sin timón." accent="var(--butter)" />

        {/* ── CAPÍTULO 2: LO QUE NOS DIFERENCIA ── */}
        <ChapterLabel num="02" title="Lo que nos diferencia" />

        <div ref={ch2Ref} className="mb-8">
          <h3
            className="heading-display mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            No somos un proveedor de diseño.<br />Somos tu socio de crecimiento.
          </h3>
          <p className="text-[color:var(--text)] text-base md:text-lg leading-relaxed">
            La mayoría de las agencias te entregan archivos. Nosotros te entregamos resultados. La diferencia
            está en cómo entendemos tu marca antes de abrir cualquier programa.
          </p>
        </div>

        <div
          ref={limitsRef}
          className="rounded-3xl p-8 md:p-12 mb-16"
          style={{ background: 'var(--night-2)', border: '1px solid var(--border)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                label: 'Agencia tradicional',
                items: [
                  'Tiempos de entrega de semanas',
                  'Poca comunicación con el cliente',
                  'Cobra por proyecto (impredecible)',
                  'Diseña sin entender el negocio',
                  'Revisiones extra cobradas aparte',
                ],
                color: 'var(--text-muted)', text: 'text-muted', bg: 'var(--night-3)', border: 'var(--border)',
              },
              {
                label: 'Relevvo',
                items: [
                  'Entregas ágiles y constantes',
                  'Comunicación directa, sin burocracia',
                  'Plan mensual claro y predecible',
                  'Estrategia antes que estética',
                  'Revisiones por pieza incluidas en cada plan',
                ],
                color: 'var(--butter)', text: 'text-butter', bg: 'var(--grape)', border: 'transparent',
              },
            ].map((col, ci) => (
              <div key={ci} className="rounded-2xl p-6" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
                <h4 className="font-mono text-xs mb-5 uppercase" style={{ color: col.color, letterSpacing: '0.1em' }}>{col.label}</h4>
                <ul className="space-y-3">
                  {col.items.map((item, ii) => (
                    <li key={ii} className={`flex items-start gap-3 text-sm ${col.text}`}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: col.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── CAPÍTULO 3: LOS NÚMEROS QUE IMPORTAN ── */}
        <ChapterLabel num="03" title="Los números que importan" />

        <div ref={ch3Ref} className="mb-8">
          <h3
            className="heading-display mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Marcas reales. Oficio comprobable.
          </h3>
          <p className="text-[color:var(--text)] text-base md:text-lg leading-relaxed">
            No hablamos de potencial — hablamos de lo que ya está construido: identidades, contenido y
            comunidades para marcas reales, que puedes ver en nuestro portafolio.
          </p>
        </div>

        {/* Stats — counter animation on scroll */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            // Cifras con respaldo en lib/founder.ts: 20+ = marcas en la carrera
            // completa del director creativo (confirmado por el dueño); 9+ =
            // años desde 2016 según TIMELINE; 2 = países activos (Col · Méx).
            // Etiquetas sin cruzar cifras entre tarjetas: el contador anima
            // cada una por separado y a mitad de animación "14+ en nueve años"
            // junto a "6+ años" se leía como contradicción.
            { value: '20+', num: 20, suffix: '+', label: 'Marcas trabajadas por nuestro director creativo' },
            { value: '9+',  num: 9,  suffix: '+', label: 'Años de oficio en diseño, desde 2016' },
            { value: '2',   num: 2,  suffix: '',  label: 'Países con marcas activas: Colombia y México' },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 text-center group"
              style={{ background: 'var(--night-2)', border: '1px solid var(--border)', transition: 'border-color .3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
            >
              <p
                className="heading-display mb-2 stat-counter"
                data-num={s.num}
                data-suffix={s.suffix}
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', letterSpacing: '-0.04em' }}
              >
                {s.value}
              </p>
              <p className="text-muted text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Narrative block */}
        <div
          className="rounded-3xl p-10 md:p-14 mb-16 relative overflow-hidden"
          style={{ background: 'var(--butter)' }}
        >
          <span className="font-mono text-xs mb-4 block" style={{ color: 'var(--grape)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Lo que realmente mueve una marca</span>
          <h3
            className="heading-display mb-5"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.3, color: 'var(--night)' }}
          >
            Una marca no crece por tener un logo bonito.<br />
            Crece cuando el mensaje correcto llega a la persona correcta, en el momento exacto.
          </h3>
          <p className="text-night/80 text-base leading-relaxed max-w-2xl">
            Diseñamos para que tu audiencia te recuerde. Planeamos la estrategia para que te elija. Ejecutamos para que te recomiende.
            Eso es lo que construimos en Relevvo.
          </p>
        </div>

        {/* ── CAPÍTULO 4: NUESTRA FORMA DE TRABAJAR ── */}
        <ChapterLabel num="04" title="Nuestra forma de trabajar" />

        <div ref={ch4Ref} className="mb-8">
          <h3
            className="heading-display mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Como si la marca fuera nuestra.
          </h3>
          <p className="text-[color:var(--text)] text-base md:text-lg leading-relaxed">
            Trabajamos como si tu marca fuera nuestra. Con el mismo nivel de exigencia, atención al detalle
            y urgencia que tendría el dueño del negocio.
          </p>
        </div>

        {/* Manifiesto */}
        <div
          ref={manifestoRef}
          className="rounded-3xl p-10 md:p-14 mb-16"
          style={{ background: 'var(--night-2)', border: '1px solid var(--border)' }}
        >
          <h4 className="font-mono text-xs mb-8 text-lilac uppercase" style={{ letterSpacing: '0.12em' }}>Así trabajamos</h4>
          <div className="space-y-8">
            {[
              { text: 'Primero entendemos tu negocio. Antes de diseñar una sola pieza, hacemos las preguntas incómodas que nadie más hace.' },
              { text: 'Construimos tu identidad con intención. Cada color tiene un argumento. Cada tipografía, una razón. Nada es decoración — todo comunica.' },
              { text: 'Ejecutamos sin cuellos de botella. Tu marca siempre activa, siempre coherente, siempre avanzando.' },
              { text: 'Medimos lo que importa. Los datos nos dicen qué funciona. Iteramos hasta que los números hablen solos.' },
              { text: 'Usamos IA donde acelera, no donde decide. Investigación, moodboards e iteración rápida se apoyan en tecnología. La dirección de arte, la coherencia de marca y la aprobación final son criterio humano — siempre.' },
              { text: 'Somos transparentes. Si algo no está funcionando, te lo decimos antes de que lo notes tú.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 items-start">
                <span className="text-lilac font-mono text-sm flex-shrink-0 mt-0.5">—</span>
                <p className="text-[color:var(--text)] text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <BigQuote text="La IA cambia cómo trabajamos, no por qué diseñamos." accent="var(--lilac)" />

        {/* Proyecto pequeño vs. corporativo */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-16"
          style={{ background: 'var(--night-2)', border: '1px solid var(--border)' }}
        >
          <h4 className="font-mono text-xs mb-8 text-lilac uppercase" style={{ letterSpacing: '0.12em' }}>Dónde ayuda la IA, y dónde no</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-6" style={{ background: 'var(--night-3)', border: '1px solid var(--border)' }}>
              <h5 className="font-mono text-xs mb-4 uppercase" style={{ color: 'var(--lilac)', letterSpacing: '0.1em' }}>Proyecto pequeño</h5>
              <p className="text-muted text-sm leading-relaxed">
                Piezas puntuales, prototipos rápidos, primeras versiones. Ahí la IA acelera muchísimo el proceso —
                y lo usamos sin pena, porque el objetivo es velocidad sin sacrificar criterio.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'var(--grape)' }}>
              <h5 className="font-mono text-xs mb-4 uppercase" style={{ color: 'var(--butter)', letterSpacing: '0.1em' }}>Proyecto corporativo</h5>
              <p className="text-butter/85 text-sm leading-relaxed">
                Sistemas de marca completos, manuales, señalética, papelería, decenas de piezas coherentes entre sí.
                Ahí la IA sola no basta: se necesita dominio real de herramientas profesionales y visión estratégica humana.
              </p>
            </div>
          </div>
        </div>

        {/* ── CAPÍTULO 5: PARA QUIÉN SOMOS ── */}
        <ChapterLabel num="05" title="¿Para quién somos?" />

        <div ref={ch5Ref} className="mb-8">
          <h3
            className="heading-display mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            No somos para todo el mundo.
          </h3>
          <p className="text-[color:var(--text)] text-base md:text-lg leading-relaxed mb-6">
            No somos para todo el mundo — y eso es intencional. Somos para quienes ya saben que el diseño
            es una inversión, no un gasto. Para quienes están cansados de los freelancers inconsistentes
            y las agencias que no responden.
          </p>
          <p className="text-[color:var(--text)] text-base md:text-lg leading-relaxed">
            Si tu marca ya vende pero quiere crecer. Si estás lanzando y quieres hacerlo bien desde el principio.
            Si necesitas un equipo que entienda tu negocio tanto como tú — estás en el lugar correcto.
          </p>
        </div>

        {/* CLOSER */}
        <div
          ref={closerRef}
          className="rounded-3xl p-12 md:p-20 text-center mt-8 relative overflow-hidden"
          style={{ background: 'var(--grape)' }}
        >
          <div aria-hidden className="absolute -bottom-28 -left-24 w-80 h-80 rounded-full pointer-events-none"
            style={{ border: '64px solid rgba(245,242,201,0.08)' }} />
          <h3
            className="heading-display relative z-10 mx-auto mb-6"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: 640 }}
          >
            No somos más rápidos porque hacemos menos.<br />
            Somos más rápidos porque sabemos exactamente qué hacer.
          </h3>
          <p className="text-butter/85 text-base relative z-10">
            Eso es Relevvo.
          </p>
        </div>

      </div>
    </section>
  )
}
