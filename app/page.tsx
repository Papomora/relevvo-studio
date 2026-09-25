import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogosStrip from '@/components/LogosStrip'
import VideoParallaxSection from '@/components/VideoParallaxSection'
import Problema from '@/components/Problema'
import Proceso from '@/components/Proceso'
import Features from '@/components/Features'
import Portfolio from '@/components/Portfolio'
import Pricing from '@/components/Pricing'
import PlanBuilder from '@/components/PlanBuilder'
import Founder from '@/components/Founder'
import FAQ from '@/components/FAQ'
import Testimonial from '@/components/Testimonial'
import Footer from '@/components/Footer'

// Narrativa del home (recortada de 21 bloques a 11 secciones):
//   Hero → prueba (logos) → problema → trabajo (portafolio) → cómo trabajamos
//   (proceso + por qué/servicios) → planes → equipo → testimonio → FAQ → CTA final.
//
// Fuera del home (los componentes siguen existiendo):
//   - AIStory → vive en /nosotros (es la historia larga del estudio).
//   - MovingBullets y Solution → ambos eran marquesinas de servicios sin enlaces,
//     duplicadas por la lista de servicios con enlace que ya tiene Features.
//   - WhatIncluded → repetía el checklist de Pricing/Features, traía un
//     testimonio duplicado y escasez inventada ("solo 3 cupos").
//   - 2 de los 3 VideoParallaxSection de eslogan (solo queda el CTA final).
//
// Anclas que otros sitios usan: #clientes (LogosStrip), #portafolio (Portfolio),
// #planes (Pricing), #solucion (wrapper de Features, lo usa SchemaOrg),
// #inicio (wrapper del Hero, lo observa WhatsAppFAB).
export default function Home() {
  return (
    <main>
      <Navbar />
      {/* #inicio: WhatsAppFAB lo observa para aparecer solo después del hero */}
      <div id="inicio">
        <Hero />
      </div>
      <LogosStrip />
      <Problema />
      <Portfolio />
      <Proceso />
      <div id="solucion">
        <Features />
      </div>
      <PlanBuilder />
      <Pricing compact />
      <Founder />
      <Testimonial />
      <FAQ />

      {/* ── CTA final ── */}
      <VideoParallaxSection
        variant="cta"
        eyebrow="¿Listo para crecer?"
        headline="Construyamos tu marca juntos."
        subtext="Un equipo dedicado. Una estrategia real. Resultados medibles desde el primer mes."
        showCta={true}
        minHeight="65vh"
        overlayOpacity={0.5}
      />

      {/* El CTA grande del footer duplicaría el de arriba en el home */}
      <Footer showCta={false} />
    </main>
  )
}
