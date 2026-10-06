// Eventos de medición. Un solo punto de salida: se empujan a dataLayer
// (GTM) y, si gtag está cargado, también directo a GA4. Así los eventos
// llegan sea cual sea el sistema que quede tras resolver el posible doble
// conteo señalado en app/layout.tsx.
//
// Eventos que emite el sitio:
//   whatsapp_click     { cta_location, cta_label }   — ver WhatsAppTracker
//   plan_option_toggle { option_id, option_label, selected, recommended_plan }
//   plan_recommended   { plan, options }             — cuando cambia la recomendación
//   plan_view          { plan, recommended_plan }    — selector BASIC/MID/FULL
//
// En GA4 hay que marcar `whatsapp_click` como conversión. Lo demás sirve
// para saber qué pide la gente antes de escribir.

type Params = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
  if (typeof window.gtag === 'function') window.gtag('event', event, params)
}
