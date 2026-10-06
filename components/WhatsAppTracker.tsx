'use client'

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

// Mide TODOS los clics a WhatsApp del sitio con un solo listener, en vez de
// tocar los 15 componentes que tienen un enlace a wa.me. La ubicación sale
// de `data-cta` si el enlace lo trae, o de la <section> con id más cercana
// (hero, planes, arma-tu-plan, portafolio…); el texto del enlace va como
// etiqueta. Se monta una vez en app/layout.tsx y no pinta nada.

function locationOf(a: HTMLAnchorElement): string {
  if (a.dataset.cta) return a.dataset.cta
  if (a.closest('nav')) return 'navbar'
  if (a.closest('footer')) return 'footer'
  const section = a.closest<HTMLElement>('section[id], div[id], [data-section]')
  return section?.id || section?.dataset.section || window.location.pathname
}

export default function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href*="wa.me"]')
      if (!a) return
      track('whatsapp_click', {
        cta_location: locationOf(a),
        cta_label: (a.getAttribute('aria-label') || a.textContent || '').trim().slice(0, 80),
        page: window.location.pathname,
      })
    }
    // `capture` para que el evento se registre aunque el enlace abra otra
    // pestaña o algún handler detenga la propagación.
    document.addEventListener('click', onClick, { capture: true, passive: true })
    return () => document.removeEventListener('click', onClick, { capture: true })
  }, [])
  return null
}
