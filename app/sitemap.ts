import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { SERVICIOS } from '@/lib/servicios'

const BASE = 'https://relevvostudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Rutas reales. Nunca URLs con '#': un ancla no es una página y Google la
  // trata como duplicado de '/'. Las secciones del home no se listan aparte.
  // /portafolio NO va acá — no existe todavía (fase 4 aplazada, ver ESTADO.md).
  const routes: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/nosotros`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/papo`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contacto`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/planes`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/servicios`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // /referidos se eliminó (ver ESTADO.md) — redirige 301 a /planes en
    // next.config.js. No listar acá una ruta que ya no existe.
  ]

  const servicios: MetadataRoute.Sitemap = SERVICIOS.map(s => ({
    url: `${BASE}/servicios/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // Posts del blog. '/meta' queda fuera a propósito: es una herramienta
  // interna y va con noindex (ver app/meta/layout.tsx).
  const posts: MetadataRoute.Sitemap = getAllPosts().map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...routes, ...servicios, ...posts]
}
