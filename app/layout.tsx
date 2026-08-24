import type { Metadata } from 'next'
import Script from 'next/script'
import { Bricolage_Grotesque, Instrument_Serif, Inter } from 'next/font/google'
import './globals.css'
import WhatsAppFAB from '@/components/WhatsAppFAB'
import { WebGLShader } from '@/components/ui/web-gl-shader'
import SchemaOrg from '@/components/SchemaOrg'
import SmoothScroll from '@/components/SmoothScroll'
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
    // Sin `images` a propósito: app/opengraph-image.tsx genera la imagen y
    // Next emite og:image y twitter:image por convención. Antes esto apuntaba
    // a /og-image.jpg, un archivo que no existía.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Estudio de Diseño y Branding en Colombia | Relevvo Studio',
    description:
      'Diseño gráfico, branding y marketing digital en Colombia. Planes mensuales sin sobrecostos.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bricolage.variable} ${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <SchemaOrg />
        {/* Precalienta DNS + TLS con el dominio de tags antes de que
            arranquen los scripts de analítica. */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WLR2HD8D" height="0" width="0" style={{display:'none',visibility:'hidden'}} /></noscript>

        {/* ⚠️ POSIBLE DOBLE CONTEO — REQUIERE VERIFICACIÓN MANUAL EN GTM
            Aquí se cargan DOS sistemas: el contenedor GTM-WLR2HD8D y, por
            separado, gtag.js para G-MRS41SRW33. Si el contenedor GTM ya
            tiene una etiqueta de GA4 con ese mismo ID, cada pageview se
            está contando dos veces y las sesiones/rebote de GA4 no son
            fiables.

            No se eliminó ninguno de los dos porque quitar el equivocado
            deja el sitio sin analítica. Comprobar en tagmanager.google.com
            si existe una etiqueta GA4 con G-MRS41SRW33:
              · SÍ existe  → borrar los dos <Script> de gtag de abajo.
              · NO existe  → borrar el <Script id="gtm"> y quedarse con gtag.
            Mientras tanto el comportamiento es idéntico al que ya había.

            Lo que sí cambió: antes eran <script> crudos en <head>, que
            compiten con el render inicial. Ahora van por next/script con
            strategy 'afterInteractive' y cargan tras la hidratación. */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WLR2HD8D');`}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-MRS41SRW33" strategy="afterInteractive" />
        <Script id="gtag-config" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-MRS41SRW33');`}
        </Script>

        <PageFade />
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
