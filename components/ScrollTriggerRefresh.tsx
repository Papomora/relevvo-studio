'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Site-wide fix for a real mobile bug: every section uses
// gsap.fromTo(el, {x:-50/+50 or y:...}, {..., scrollTrigger:{start:'top 75%'}})
// to slide/fade content in on scroll. ScrollTrigger calculates each
// trigger's pixel position once, at mount — but images below the fold
// (portrait photos, the vertical video poster, etc.) often finish loading
// *after* that calculation, shifting document height. The trigger position
// goes stale, the animation never fires, and the section's content stays
// permanently stuck at its pre-animation offset (visibly clipped/shifted).
// This was reproducible on mobile viewport where the effect is most visible.
//
// Fix: recompute every ScrollTrigger's position once everything (images,
// fonts, video poster) has actually loaded, and again after a short delay
// as a safety net for anything that loads asynchronously later.
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)

    const refresh = () => ScrollTrigger.refresh()

    if (document.readyState === 'complete') {
      refresh()
    } else {
      window.addEventListener('load', refresh)
    }

    // Safety net for late-loading images/fonts that don't block 'load'
    const t1 = setTimeout(refresh, 800)
    const t2 = setTimeout(refresh, 2000)

    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return null
}
