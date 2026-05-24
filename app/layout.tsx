import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Serif, Inter } from 'next/font/google'
import './globals.css'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import VideoBackground from '@/components/VideoBackground'
import SchemaOrg from '@/components/SchemaOrg'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import PageFade from '@/components/PageFade'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://relevvostudio.com'),
  title: {
    default: 'Agencia de Diseño y Marketing Digital en Colombia | Relevvo Studio',
    template: '%s | Relevvo Studio',
  },
  description:
    'Agencia de diseño gráfico con IA y marketing digital en Colombia. Creamos logos, branding, landing pages y estrategia digital con inteligencia artificial. Planes mensuales sin sobrecostos. ¡Resultados reales para tu marca!',
  keywords: [
    'agencia diseño Colombia',
    'agencia diseño con IA',
    'diseño gráfico con inteligencia artificial',
    'agencia branding Colombia',
    'marketing digital Colombia',
    'diseño gráfico Colombia',
    'agencia diseño gráfico Colombia',
    'branding con IA Colombia',
    'identidad de marca Colombia',
    'landing pages Colombia',
    'gestión redes sociales Colombia',
    'agencia creativa Colombia',
    'diseño y marketing digital Colombia',
    'agencia marketing digital Bogotá',
    'diseño publicitario con IA',
    'agencia de contenido digital Colombia',
    'estrategia digital con IA',
    'Relevvo Studio',
  ],
  authors: [{ name: 'Relevvo Studio', url: 'https://relevvostudio.com' }],
  creator: 'Relevvo Studio',
  publisher: 'Relevvo Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://relevvostudio.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://relevvostudio.com',
    siteName: 'Relevvo Studio',
    title: 'Agencia de Diseño y Marketing Digital en Colombia | Relevvo Studio',
    description:
      'Diseño gráfico, branding y marketing digital en Colombia. Planes mensuales claros, sin sobrecostos de agencia. Logos, landing pages, redes sociales y más.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Relevvo Studio — Agencia de Diseño y Marketing Digital en Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agencia de Diseño y Marketing Digital en Colombia | Relevvo Studio',
    description:
      'Diseño gráfico, branding y marketing digital en Colombia. Planes mensuales sin sobrecostos.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bricolage.variable} ${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <SchemaOrg />
      </head>
      <body>
        <PageFade />
        <CustomCursor />
        <VideoBackground />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <WhatsAppFAB />
      </body>
    </html>
  )
}
