import fs from 'fs'
import path from 'path'

export interface ParrillaPieza {
  numero: number
  semana: number
  tipo: string
  categoria: string
  protagonista?: string
  hook?: string
  guion?: string[]
  slides?: string[]
  copy?: string
  caption?: string
  cta?: string
  prioridad?: boolean
  fueraDeCalendario?: boolean
}

export interface ParrillaHistoria {
  semana: number
  items: string[]
}

export interface Parrilla {
  slug: string
  cliente: string
  handle: string
  mes: string
  protagonistas: string
  pilar: string
  formato: string
  whatsappNumero: string
  cupoPlan?: number
  piezas: ParrillaPieza[]
  historias?: ParrillaHistoria[]
}

const DIR = path.join(process.cwd(), 'content/parrillas')

export function getAllParrillaSlugs(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, ''))
}

export function getParrilla(slug: string): Parrilla | null {
  const filePath = path.join(DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as Parrilla
}
