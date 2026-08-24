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
      <span className="font-mono text-xs text-white/20" style={{ letterSpacing: '0.15em' }}>{num}</span>
      <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)', maxWidth: 40 }} />
      <span className="font-mono text-xs uppercase" style={{ color: 'rgba(124,58,237,0.7)', letterSpacing: '0.12em' }}>{title}</span>
    </div>
  )
}

function BigQuote({ text, accent = '#fff' }: { text: string; accent?: string }) {
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
            <span className="heading-display text-white block">Diseño que mueve</span>
            <span className="heading-serif text-white block">negocios.</span>
          </h2>
          <p className="text-white/45 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Más de 20 marcas han crecido con Relevvo. Esta es la diferencia entre tener diseño y tener una marca que realmente trabaja para ti.
          </p>
        </div>

        {/* ── INTRO BLOCK ── */}
        <div
          ref={introRef}
          className="rounded-3xl p-10 md:p-16 mb-8 relative overflow-hidden"
          style={{
            background: 'rgba(124,58,237,0.08)',
            border: '1px solid rgba(124,58,237,0.2)',
          }}
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 65%)' }} />
          <h3
            className="heading-display text-white mb-5 relative z-10"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.2 }}
          >
            ¿Tu marca se ve bien<br />
            <span style={{
              background: 'linear-gradient(135deg, #fff 30%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>pero no consigue clientes?</span>
          </h3>
          <p className="text-white/55 text-lg leading-relaxed relative z-10 max-w-2xl">
            El problema no es el diseño — es la estrategia que falta detrás. En Relevvo no te damos solo piezas gráficas.
            Te damos una marca con identidad, contenido con propósito y entregas que llegan cuando dijimos que llegaban.
          </p>
        </div>

        {/* ── CAPÍTULO 1: EL ERROR MÁS COMÚN ── */}
        <ChapterLabel num="01" title="El error más común" />

        <div ref={ch1Ref} className="mb-8">
          <h3
            className="heading-display text-white mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Las marcas invierten en diseño sin invertir en posicionamiento.
          </h3>
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-4">
            Un logo bonito no garantiza ventas. Una publicación bien diseñada no garantiza visibilidad.
            Siempre hace falta algo más: una estrategia clara, una voz consistente y un equipo que entienda tu negocio.
          </p>
        </div>

        {/* Comparativa del mercado */}
        <div ref={toolsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          {[
            { stage: 'Freelancer', problem: '"Entrega rápido, pero no entiende mi marca ni tiene visión estratégica."', color: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.25)', text: '#60A5FA' },
            { stage: 'Agencia tradicional', problem: '"Cobra mucho, tarda semanas y nunca hablas con quien hace el trabajo."', color: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#F59E0B' },
            { stage: 'Relevvo', problem: '"Velocidad de freelancer, estrategia de agencia. Precio fijo y publicado."', color: 'rgba(124,58,237,0.12)', border: 'rgba(124,58,237,0.3)', text: '#A78BFA' },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl p-6" style={{ background: item.color, border: `1px solid ${item.border}` }}>
              <span className="font-mono text-xs mb-3 block" style={{ color: item.text, letterSpacing: '0.1em' }}>{item.stage}</span>
              <p className="text-white/60 text-sm leading-relaxed italic">"{item.problem}"</p>
            </div>
          ))}
        </div>

        <BigQuote text="Una marca bonita sin estrategia es un barco con motor pero sin timón." accent="rgba(255,255,255,0.85)" />

        {/* ── CAPÍTULO 2: LO QUE NOS DIFERENCIA ── */}
        <ChapterLabel num="02" title="Lo que nos diferencia" />

        <div ref={ch2Ref} className="mb-8">
          <h3
            className="heading-display text-white mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            No somos un proveedor de diseño.<br />Somos tu socio de crecimiento.
          </h3>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">
            La mayoría de las agencias te entregan archivos. Nosotros te entregamos resultados. La diferencia
            está en cómo entendemos tu marca antes de abrir cualquier programa.
          </p>
        </div>

        <div
          ref={limitsRef}
          className="rounded-3xl p-8 md:p-12 mb-16"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
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
                  'Revisiones limitadas y costosas',
                ],
                color: '#F87171', bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)',
              },
              {
                label: 'Relevvo',
                items: [
                  'Entregas ágiles y constantes',
                  'Comunicación directa, sin burocracia',
                  'Plan mensual claro y predecible',
                  'Estrategia antes que estética',
                  'Iteramos hasta que funcione',
                ],
                color: '#41E575', bg: 'rgba(65,229,117,0.08)', border: 'rgba(65,229,117,0.2)',
              },
            ].map((col, ci) => (
              <div key={ci} className="rounded-2xl p-6" style={{ background: col.bg, border: `1px solid ${col.border}` }}>
                <h4 className="font-mono text-xs mb-5 uppercase" style={{ color: col.color, letterSpacing: '0.1em' }}>{col.label}</h4>
                <ul className="space-y-3">
                  {col.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3 text-sm text-white/60">
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
            className="heading-display text-white mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Marcas reales. Resultados medibles.
          </h3>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">
            No hablamos de potencial — hablamos de lo que ya hemos construido: identidades, comunidades, ventas.
            Cada cliente que crece con nosotros es la prueba de que el método funciona.
          </p>
        </div>

        {/* Stats — counter animation on scroll */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { value: '20+', num: 20, suffix: '+', label: 'Marcas potenciadas en Colombia y LATAM', accent: '#7C3AED' },
            { value: '9+',  num: 9,  suffix: '+', label: 'Años construyendo identidades que perduran', accent: '#41E575' },
            { value: '100%', num: 100, suffix: '%', label: 'De compromiso con cada cliente, sin importar el plan', accent: '#FFB0CD' },
          ].map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-8 text-center group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', transition: 'border-color .3s, background .3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${s.accent}40`; (e.currentTarget as HTMLElement).style.background = `${s.accent}08` }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)' }}
            >
              <p
                className="heading-display mb-2 stat-counter"
                data-num={s.num}
                data-suffix={s.suffix}
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', color: s.accent }}
              >
                {s.value}
              </p>
              <p className="text-white/45 text-sm leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Narrative block */}
        <div
          className="rounded-3xl p-10 md:p-14 mb-16 relative overflow-hidden"
          style={{ background: 'rgba(65,229,117,0.05)', border: '1px solid rgba(65,229,117,0.15)' }}
        >
          <span className="font-mono text-xs mb-4 block" style={{ color: '#41E575', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Lo que realmente mueve una marca</span>
          <h3
            className="heading-display text-white mb-5"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em', lineHeight: 1.3 }}
          >
            Una marca no crece por tener un logo bonito.<br />
            Crece cuando el mensaje correcto llega a la persona correcta, en el momento exacto.
          </h3>
          <p className="text-white/55 text-base leading-relaxed max-w-2xl">
            Diseñamos para que tu audiencia te recuerde. Estrategiamos para que te elija. Ejecutamos para que te recomiende.
            Eso es lo que construimos en Relevvo.
          </p>
        </div>

        {/* ── CAPÍTULO 4: NUESTRA FORMA DE TRABAJAR ── */}
        <ChapterLabel num="04" title="Nuestra forma de trabajar" />

        <div ref={ch4Ref} className="mb-8">
          <h3
            className="heading-display text-white mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            Como si la marca fuera nuestra.
          </h3>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">
            Trabajamos como si tu marca fuera nuestra. Con el mismo nivel de exigencia, atención al detalle
            y urgencia que tendría el dueño del negocio.
          </p>
        </div>

        {/* Manifiesto */}
        <div
          ref={manifestoRef}
          className="rounded-3xl p-10 md:p-14 mb-16"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h4 className="font-mono text-xs mb-8 text-white/25 uppercase" style={{ letterSpacing: '0.12em' }}>Así trabajamos</h4>
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
                <span className="text-white/20 font-mono text-sm flex-shrink-0 mt-0.5">—</span>
                <p className="text-white/65 text-base leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <BigQuote text="La IA cambia cómo trabajamos, no por qué diseñamos." accent="rgba(167,139,250,0.9)" />

        {/* Proyecto pequeño vs. corporativo */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-16"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <h4 className="font-mono text-xs mb-8 text-white/25 uppercase" style={{ letterSpacing: '0.12em' }}>Dónde ayuda la IA, y dónde no</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-6" style={{ background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}>
              <h5 className="font-mono text-xs mb-4 uppercase" style={{ color: '#60A5FA', letterSpacing: '0.1em' }}>Proyecto pequeño</h5>
              <p className="text-white/55 text-sm leading-relaxed">
                Piezas puntuales, prototipos rápidos, primeras versiones. Ahí la IA acelera muchísimo el proceso —
                y lo usamos sin pena, porque el objetivo es velocidad sin sacrificar criterio.
              </p>
            </div>
            <div className="rounded-2xl p-6" style={{ background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.25)' }}>
              <h5 className="font-mono text-xs mb-4 uppercase" style={{ color: '#A78BFA', letterSpacing: '0.1em' }}>Proyecto corporativo</h5>
              <p className="text-white/55 text-sm leading-relaxed">
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
            className="heading-display text-white mb-5"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
          >
            No somos para todo el mundo.
          </h3>
          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6">
            No somos para todo el mundo — y eso es intencional. Somos para quienes ya saben que el diseño
            es una inversión, no un gasto. Para quienes están cansados de los freelancers inconsistentes
            y las agencias que no responden.
          </p>
          <p className="text-white/50 text-base md:text-lg leading-relaxed">
            Si tu marca ya vende pero quiere crecer. Si estás lanzando y quieres hacerlo bien desde el principio.
            Si necesitas un equipo que entienda tu negocio tanto como tú — estás en el lugar correcto.
          </p>
        </div>

        {/* CLOSER */}
        <div
          ref={closerRef}
          className="rounded-3xl p-12 md:p-20 text-center mt-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(255,176,205,0.07) 100%)',
            border: '1px solid rgba(255,176,205,0.18)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)' }} />
          <h3
            className="heading-display text-white relative z-10 mx-auto mb-6"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1.2, maxWidth: 640 }}
          >
            No somos más rápidos porque hacemos menos.<br />
            Somos más rápidos porque sabemos exactamente qué hacer.
          </h3>
          <p className="text-white/45 text-base relative z-10">
            Eso es Relevvo.
          </p>
        </div>

      </div>
    </section>
  )
}
