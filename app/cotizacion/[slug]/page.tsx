import { getPropuesta, getAllPropuestaSlugs } from '@/lib/propuestas'
import { notFound } from 'next/navigation'
import PropuestaView from '@/components/PropuestaView'

export async function generateStaticParams() {
  return getAllPropuestaSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPropuesta(params.slug)
  if (!p) return { title: 'Propuesta no encontrada' }
  return {
    title: `Propuesta para ${p.cliente} | Relevvo Studio`,
    description: p.resumen,
    robots: { index: false, follow: false },
  }
}

export default function CotizacionPage({ params }: { params: { slug: string } }) {
  const propuesta = getPropuesta(params.slug)
  if (!propuesta) notFound()
  return <PropuestaView propuesta={propuesta} />
}
