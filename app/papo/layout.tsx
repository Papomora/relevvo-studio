import type { Metadata } from 'next'

// page.tsx es 'use client' y no puede exportar metadata. Sin esto la página
// heredaba el título y la descripción del home, y ambas competían por la
// misma keyword en Google.
export const metadata: Metadata = {
  title: 'Juan Camilo León — Director Creativo y Fotógrafo en Bogotá',
  description:
    'Director creativo y fotógrafo en Bogotá. Branding estratégico, dirección de arte y producción visual asistida por IA. Fundador de Relevvo Studio.',
  alternates: { canonical: 'https://relevvostudio.com/papo' },
  openGraph: {
    type: 'profile',
    locale: 'es_CO',
    url: 'https://relevvostudio.com/papo',
    title: 'Juan Camilo León — Director Creativo y Fotógrafo en Bogotá',
    description:
      'Branding estratégico, dirección de arte y producción visual asistida por IA. Fundador de Relevvo Studio.',
  },
}

export default function PapoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
