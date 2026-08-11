import type { Metadata } from 'next'
import { Bricolage_Grotesque, Instrument_Serif, Inter } from 'next/font/google'
import './globals.css'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import SchemaOrg from '@/components/SchemaOrg'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import PageFade from '@/components/PageFade'
import ScrollTriggerRefresh from '@/components/ScrollTriggerRefresh'

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
    default: 'Estudio de Diseño y Branding en Colombia | Relevvo Studio',
    template: '%s | Relevvo Studio',
  },
  description:
    'Estudio de diseño gráfico y marketing digital en Colombia. Creamos logos, branding, landing pages y estrategia digital con criterio humano. Planes mensuales sin sobrecostos. ¡Resultados reales para tu marca!',
  keywords: [
    'estudio de diseño Colombia',
    'estudio de branding Colombia',
    'diseño gráfico Colombia',
    'agencia branding Colombia',
    'marketing digital Colombia',
    'estudio creativo Colombia',
    'branding Colombia',
    'identidad de marca Colombia',
    'landing pages Colombia',
    'gestión redes sociales Colombia',
    'estudio de diseño gráfico Colombia',
    'diseño y marketing digital Colombia',
    'estudio de diseño Bogotá',
    'diseño publicitario Colombia',
    'agencia de contenido digital Colombia',
    'estrategia digital Colombia',
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
    title: 'Estudio de Diseño y Branding en Colombia | Relevvo Studio',
    description:
      'Diseño gráfico, branding y marketing digital en Colombia. Planes mensuales claros, sin sobrecostos. Logos, landing pages, redes sociales y más.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Relevvo Studio — Estudio de Diseño y Branding en Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estudio de Diseño y Branding en Colombia | Relevvo Studio',
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
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WLR2HD8D');` }} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MRS41SRW33" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MRS41SRW33');` }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLR2HD8D" height="0" width="0" style={{display:'none',visibility:'hidden'}} /></noscript>
        <PageFade />
        <CustomCursor />
        <ScrollTriggerRefresh />
        <WebGLShader />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <WhatsAppFAB />
      </body>
    </html>
  )
}
