import type { Metadata } from 'next'

// /meta es el generador interno de reportes de redes, no contenido público.
// page.tsx es 'use client' y por eso no puede exportar metadata — este layout
// existe solo para sacarlo del índice de Google.
export const metadata: Metadata = {
  title: 'Generador de Reportes Meta',
  robots: { index: false, follow: false },
}

export default function MetaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
