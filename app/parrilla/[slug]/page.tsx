import { getParrilla, getAllParrillaSlugs } from '@/lib/parrillas'
import { notFound } from 'next/navigation'
import ParrillaView from '@/components/ParrillaView'

export async function generateStaticParams() {
  return getAllParrillaSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getParrilla(params.slug)
  if (!p) return { title: 'Parrilla no encontrada' }
  return {
    title: `Parrilla ${p.mes} — ${p.cliente} | Relevvo Studio`,
    description: `Piezas de contenido para ${p.cliente} (${p.handle}) — ${p.mes}`,
    robots: { index: false, follow: false },
  }
}

export default function ParrillaPage({ params }: { params: { slug: string } }) {
  const parrilla = getParrilla(params.slug)
  if (!parrilla) notFound()
  return <ParrillaView parrilla={parrilla} />
}
