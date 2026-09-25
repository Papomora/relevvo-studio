import fs from 'node:fs'
import path from 'node:path'

// Fotos de trabajo para el loop del hero. Se leen en build desde
// public/work/<marca>/ (ver public/work/LEEME.md): subir una foto ahí la
// mete en la rotación sin tocar código. Los archivos que empiezan por
// "logo" se ignoran — un logo suelto no es una miniatura de trabajo.
//
// Solo servidor (usa fs). El Hero recibe el resultado por props.

export interface WorkThumb {
  src: string
  client: string
}

// Carpeta → nombre como se escribe la marca.
const BRANDS: Record<string, string> = {
  crusso: 'Crussó',
  versla: 'Verslä',
  limitelegal: 'LímiteLegal',
  osadi: 'Osadí',
  eretz: 'Eretz',
  alhambra: 'Alhambra',
  masbrownie: 'Más Brownie',
}

// Trabajo real que ya estaba en el repo antes de public/work. Siempre entra.
const EXISTING: WorkThumb[] = [
  { src: '/clientes/masbrownie/banner1.png', client: 'Más Brownie' },
  { src: '/images/nosotros/cliente-logo-word.png', client: 'Relevvo Studio' },
  { src: '/clientes/masbrownie/banner2.png', client: 'Más Brownie' },
  { src: '/clientes/masbrownie/banner3.png', client: 'Más Brownie' },
  { src: '/clientes/masbrownie/banner4.png', client: 'Más Brownie' },
]

const IMAGE = /\.(jpe?g|png|webp|avif)$/i

export function getWorkThumbs(): WorkThumb[] {
  const root = path.join(process.cwd(), 'public', 'work')
  const byClient = new Map<string, WorkThumb[]>()
  const add = (t: WorkThumb) => byClient.set(t.client, [...(byClient.get(t.client) ?? []), t])

  for (const [dir, client] of Object.entries(BRANDS)) {
    let files: string[] = []
    try {
      files = fs.readdirSync(path.join(root, dir))
    } catch {
      continue
    }
    files
      .filter((f) => IMAGE.test(f) && !/^logo/i.test(f))
      .sort()
      .forEach((f) => add({ src: `/work/${dir}/${encodeURIComponent(f)}`, client }))
  }
  EXISTING.forEach(add)

  // Intercala por marca (una de cada una por vuelta) para que dos
  // miniaturas seguidas sean, en lo posible, de clientes distintos.
  const queues = Array.from(byClient.values())
  const out: WorkThumb[] = []
  for (let i = 0; queues.some((q) => i < q.length); i++) {
    queues.forEach((q) => { if (q[i]) out.push(q[i]) })
  }
  return out
}
