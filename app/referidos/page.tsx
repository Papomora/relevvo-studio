import type { Metadata } from 'next'
import LandingReferidos from '@/components/LandingReferidos'

export const metadata: Metadata = {
  title: 'Programa de Referidos Diseño Colombia | Gana Comisión — Relevvo Studio',
  description: 'Referí clientes a Relevvo Studio y recibí comisión garantizada el mismo día que firman. BASIC $30.000 · MID $99.500 · FULL $399.000. Sin cuotas, sin MLM. Para agencias, freelancers y consultores en Colombia.',
  keywords: [
    'programa de referidos diseño Colombia',
    'ganar comisión agencia diseño',
    'referidos marketing digital Colombia',
    'comisión por referir clientes diseño',
    'programa afiliados agencia Colombia',
    'referir clientes branding Colombia',
    'Relevvo Studio referidos',
    'ganar dinero refiriendo clientes',
  ],
  alternates: {
    canonical: 'https://relevvostudio.com/referidos',
  },
  openGraph: {
    title: 'Gana comisión refiriendo clientes de diseño — Relevvo Studio',
    description: 'Referí un cliente a Relevvo y recibí hasta $399.000 el mismo día que firma. Sin cuotas, sin riesgo, pago instantáneo. Para agencias y freelancers en Colombia.',
    url: 'https://relevvostudio.com/referidos',
    siteName: 'Relevvo Studio',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Programa de Referidos | Relevvo Studio',
    description: 'Comisión garantizada el mismo día. BASIC $30k · MID $99.5k · FULL $399k. Sin cuotas.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://relevvostudio.com/referidos',
      url: 'https://relevvostudio.com/referidos',
      name: 'Programa de Referidos — Relevvo Studio',
      description: 'Referí clientes a Relevvo Studio y recibí comisión garantizada el mismo día que firman. Para agencias, freelancers y consultores en Colombia.',
      inLanguage: 'es-CO',
      isPartOf: { '@id': 'https://relevvostudio.com' },
    },
    {
      '@type': 'Service',
      '@id': 'https://relevvostudio.com/referidos#programa',
      name: 'Programa de Referidos Relevvo Studio',
      description: 'Programa de comisiones por referidos para agencias digitales, freelancers y consultores en Colombia. Comisión instantánea el mismo día que firma el cliente.',
      provider: {
        '@type': 'Organization',
        name: 'Relevvo Studio',
        url: 'https://relevvostudio.com',
        areaServed: { '@type': 'Country', name: 'Colombia' },
      },
      offers: [
        {
          '@type': 'Offer',
          name: 'Comisión Plan BASIC',
          description: 'Comisión por referir cliente al plan BASIC de Relevvo Studio',
          price: '30000',
          priceCurrency: 'COP',
        },
        {
          '@type': 'Offer',
          name: 'Comisión Plan MID',
          description: 'Comisión por referir cliente al plan MID de Relevvo Studio',
          price: '99500',
          priceCurrency: 'COP',
        },
        {
          '@type': 'Offer',
          name: 'Comisión Plan FULL',
          description: 'Comisión por referir cliente al plan FULL de Relevvo Studio',
          price: '399000',
          priceCurrency: 'COP',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuándo cobro la comisión por referir un cliente?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'El mismo día que el cliente firma el contrato. No hay esperas ni condiciones adicionales.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto gano por referir un cliente a Relevvo Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Depende del plan que contrate: BASIC $30.000 COP, MID $99.500 COP, FULL $399.000 COP. El pago es instantáneo el mismo día que firma.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Hay límite de referidos en el programa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Podés referir cuantos clientes quieras. Cada cliente que firma genera una comisión para vos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Necesito pagar algo para unirme al programa de referidos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. El programa es completamente gratuito. Sin cuotas, sin MLM, sin inversión inicial.',
          },
        },
      ],
    },
  ],
}

export default function ReferidosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingReferidos />
    </>
  )
}
