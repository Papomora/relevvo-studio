import fs from 'fs'
import path from 'path'

export interface PropuestaItem {
  concepto: string
  descripcion: string
  cantidad?: string
}

export interface PropuestaFase {
  numero: string
  titulo: string
  descripcion: string
  duracion?: string
}

export interface Propuesta {
  slug: string
  cliente: string
  proyecto: string
  fecha: string
  vigenciaDias: number
  resumen: string
  objetivos: string[]
  alcance: PropuestaItem[]
  fases?: PropuestaFase[]
  porQue?: { titulo: string; texto: string }
  demoProducto?: {
    titulo: string
    intro: string
    antes: { imagen: string; nombre: string; descripcion: string }
    despues: {
      imagen: string
      nombre: string
      descripcion: string
      bullets: string[]
      pills?: string[]
      precio?: number
      precioAntes?: number
      stockTexto?: string
      trustBadges?: string[]
    }
  }
  inversion: {
    moneda: string
    items: { concepto: string; valor: number; tipo?: 'unico' | 'mensual' }[]
    descuentoPct?: number
    notaPago?: string
  }
  condiciones?: string[]
  whatsappMensaje: string
}

const DIR = path.join(process.cwd(), 'content/propuestas')

export function getAllPropuestaSlugs(): string[] {
  if (!fs.existsSync(DIR)) return []
  return fs.readdirSync(DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace(/\.json$/, ''))
}

export function getPropuesta(slug: string): Propuesta | null {
  const filePath = path.join(DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(raw) as Propuesta
}
