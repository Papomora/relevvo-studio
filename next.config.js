/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
    // AVIF antes que WebP: pesa ~20-30% menos y lo soportan Chrome, Firefox
    // y Safari 16+. Next negocia por cabecera Accept y cae a WebP donde no.
    formats: ['image/avif', 'image/webp'],
  },
  // /referidos se dio de baja (ver ESTADO.md). La ruta estuvo viva en
  // producción, así que redirige en vez de dejarla en 404 — evita perder
  // el enlace que alguien ya tenga guardado y lo que Google indexó de ella.
  async redirects() {
    return [
      { source: '/referidos', destination: '/planes', permanent: true },
    ]
  },
}

module.exports = nextConfig
