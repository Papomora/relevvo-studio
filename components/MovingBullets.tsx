'use client'

import {
  PenTool, Smartphone, Target, Search, ShoppingBag, Camera,
  Compass, Palette, Film, BarChart3, Lightbulb, Sparkles,
  TrendingUp, Globe, MessageCircle, Rocket,
} from 'lucide-react'
import { ReactNode } from 'react'

const ICON_PROPS = { size: 18, strokeWidth: 1.5, color: 'currentColor' } as const

const ROW1: { icon: ReactNode; label: string }[] = [
  { icon: <PenTool {...ICON_PROPS} />,    label: 'Diseño de Marca' },
  { icon: <Smartphone {...ICON_PROPS} />, label: 'Contenido Digital' },
  { icon: <Target {...ICON_PROPS} />,     label: 'Meta Ads' },
  { icon: <Search {...ICON_PROPS} />,     label: 'Google Ads' },
  { icon: <ShoppingBag {...ICON_PROPS} />,label: 'Ecommerce' },
  { icon: <Camera {...ICON_PROPS} />,     label: 'Fotografía' },
  { icon: <Compass {...ICON_PROPS} />,    label: 'Estrategia' },
  { icon: <Palette {...ICON_PROPS} />,    label: 'Branding' },
]

const ROW2: { icon: ReactNode; label: string }[] = [
  { icon: <Film {...ICON_PROPS} />,          label: 'Video & Reels' },
  { icon: <BarChart3 {...ICON_PROPS} />,     label: 'Analytics' },
  { icon: <Lightbulb {...ICON_PROPS} />,     label: 'Consultoría' },
  { icon: <Sparkles {...ICON_PROPS} />,      label: 'IA Creativa' },
  { icon: <TrendingUp {...ICON_PROPS} />,    label: 'Campañas' },
  { icon: <Globe {...ICON_PROPS} />,         label: 'Sitio Web' },
  { icon: <MessageCircle {...ICON_PROPS} />, label: 'Community' },
  { icon: <Rocket {...ICON_PROPS} />,        label: 'Lanzamientos' },
]

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 9,
        padding: '10px 22px',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.09)',
        background: 'rgba(255,255,255,0.03)',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'rgba(255,255,255,0.7)',
        whiteSpace: 'nowrap',
        flexShrink: 0,
        transition: 'border-color .25s, color .25s, background .25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(124,58,237,0.5)'
        el.style.color = '#fff'
        el.style.background = 'rgba(124,58,237,0.07)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'rgba(255,255,255,0.09)'
        el.style.color = 'rgba(255,255,255,0.7)'
        el.style.background = 'rgba(255,255,255,0.03)'
      }}
    >
      <span style={{ lineHeight: 1, display: 'flex' }}>{icon}</span>
      {label}
    </div>
  )
}

function Row({
  items,
  direction,
  duration,
}: {
  items: typeof ROW1
  direction: 'left' | 'right'
  duration: number
}) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div style={{ display: 'flex', gap: 12, width: 'max-content' }}>
      <style>{`
        @keyframes bLeft  { from { transform: translateX(0); }    to { transform: translateX(-50%); } }
        @keyframes bRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
      <div
        style={{
          display: 'flex',
          gap: 12,
          width: 'max-content',
          animation: `${direction === 'left' ? 'bLeft' : 'bRight'} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <Pill key={i} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  )
}

export default function MovingBullets() {
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '28px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.012)',
        maskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <Row items={ROW1} direction="left"  duration={32} />
      <Row items={ROW2} direction="right" duration={28} />
    </div>
  )
}
