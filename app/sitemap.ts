import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE = 'https://relevvostudio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Rutas reales. Nunca URLs con '#': un ancla no es una página y Google la
  // trata como duplicado de '/'. Las secciones del home no se listan aparte.
  const routes: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${BASE}/nosotros`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/papo`,      lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/contacto`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/planes`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    // /referidos se eliminó (ver ESTADO.md) — redirige 301 a /planes en
    // next.config.js. No listar acá una ruta que ya no existe.
  ]

  // Posts del blog. '/meta' queda fuera a propósito: es una herramienta
  // interna y va con noindex (ver app/meta/layout.tsx).
  const posts: MetadataRoute.Sitemap = getAllPosts().map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...routes, ...posts]
}
