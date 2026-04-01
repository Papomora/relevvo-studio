import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LogosStrip from '@/components/LogosStrip'
import Testimonial from '@/components/Testimonial'
import Proceso from '@/components/Proceso'
import Portfolio from '@/components/Portfolio'
import Benefits from '@/components/Benefits'
import Features from '@/components/Features'
import Solution from '@/components/Solution'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LogosStrip />
      <Testimonial />
      <Proceso />
      <Portfolio />
      <Benefits />
      <Features />
      <Solution />
      <Pricing />
      <Footer />
    </main>
  )
}
