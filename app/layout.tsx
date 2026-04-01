import type { Metadata } from 'next'
import { Bricolage_Grotesque, Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Relevvo Studio — Diseño y Marketing Digital',
  description: 'Dí adiós a los sobrecostos por gestión de diseño y marketing digital. Planes mensuales claros, sin sobrecostos de agencia.',
  keywords: 'diseño, marketing digital, branding, landing pages, agencia diseño Colombia',
  openGraph: {
    title: 'Relevvo Studio',
    description: 'Hazlo Simple. Diseño y marketing digital sin fricción.',
    url: 'https://relevvostudio.com',
    siteName: 'Relevvo Studio',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bricolage.variable} ${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
