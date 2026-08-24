import Navbar from '@/components/Navbar'
import NosotrosHero from '@/components/nosotros/NosotrosHero'
import ComoProfesionales from '@/components/nosotros/ComoProfesionales'
import ComoPersonas from '@/components/nosotros/ComoPersonas'
import InstagramTeaser from '@/components/nosotros/InstagramTeaser'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

// Sin esto la página heredaba título y descripción del home, y las dos
// competían por la misma keyword en Google.
export const metadata: Metadata = {
  title: 'Quiénes somos — El equipo detrás del estudio',
  description:
    'Somos un estudio creativo colombiano que usa inteligencia artificial para producir más rápido, sin ceder el criterio humano. Conoce cómo trabajamos y quiénes lo hacemos.',
  alternates: { canonical: 'https://relevvostudio.com/nosotros' },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://relevvostudio.com/nosotros',
    title: 'Quiénes somos — Relevvo Studio',
    description:
      'Un estudio creativo colombiano que usa IA para producir más rápido, sin ceder el criterio humano.',
  },
}

export default function NosotrosPage() {
  return (
    <main>
      <Navbar />
      <NosotrosHero />
      <ComoProfesionales />
      <ComoPersonas />
      <InstagramTeaser />
      <Footer />
    </main>
  )
}
