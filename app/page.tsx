import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WordReveal from '@/components/WordReveal'
import LogosStrip from '@/components/LogosStrip'
import AIStory from '@/components/AIStory'
import Proceso from '@/components/Proceso'
import Features from '@/components/Features'
import Solution from '@/components/Solution'
import Founder from '@/components/Founder'
import Testimonial from '@/components/Testimonial'
import InstagramClients from '@/components/InstagramClients'
import Pricing from '@/components/Pricing'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WordReveal />
      <LogosStrip />
      <AIStory />
      <Proceso />
      <Features />
      <Solution />
      <Founder />
      <Testimonial />
      <InstagramClients />
      <Pricing />
      <Footer />
    </main>
  )
}
