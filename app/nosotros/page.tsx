import Navbar from '@/components/Navbar'
import NosotrosHero from '@/components/nosotros/NosotrosHero'
import ComoProfesionales from '@/components/nosotros/ComoProfesionales'
import ComoPersonas from '@/components/nosotros/ComoPersonas'
import Footer from '@/components/Footer'

export default function NosotrosPage() {
  return (
    <main>
      <Navbar />
      <NosotrosHero />
      <ComoProfesionales />
      <ComoPersonas />
      <Footer />
    </main>
  )
}
