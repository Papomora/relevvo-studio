import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WordReveal from '@/components/WordReveal'
import LogosStrip from '@/components/LogosStrip'
import AIStory from '@/components/AIStory'
import VideoParallaxSection from '@/components/VideoParallaxSection'
import Proceso from '@/components/Proceso'
import Features from '@/components/Features'
import Solution from '@/components/Solution'
import Founder from '@/components/Founder'
import Testimonial from '@/components/Testimonial'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WordReveal />
      <LogosStrip />

      {/* ── Parallax divider 1: after logos, before agency story ── */}
      <VideoParallaxSection
        eyebrow="Agencia 360°"
        headline="Branding.<br/>Diseño.<br/>Impacto."
        subtext="No solo creamos piezas gráficas — construimos marcas completas que se reconocen, se recuerdan y se eligen."
        minHeight="85vh"
        overlayOpacity={0.3}
      />

      <AIStory />

      {/* ── Parallax divider 2: after agency story, before process ── */}
      <VideoParallaxSection
        variant="split"
        eyebrow="Diseño gráfico que vende"
        headline="Tu marca merece<br/>ser inolvidable."
        subtext="Desde el logo hasta la estrategia de contenido — todo con una visión coherente, intencional y orientada a resultados."
        minHeight="70vh"
        overlayOpacity={0.4}
      />

      <Proceso />
      <Features />
      <Solution />
      <Founder />
      <Testimonial />

      {/* ── Parallax divider 3: before pricing — final CTA ── */}
      <VideoParallaxSection
        variant="cta"
        eyebrow="¿Listo para crecer?"
        headline="Construyamos tu marca juntos."
        subtext="Un equipo dedicado. Una estrategia real. Resultados medibles desde el primer mes."
        showCta={true}
        minHeight="65vh"
        overlayOpacity={0.5}
      />

      <Pricing />
      <Footer />
    </main>
  )
}
