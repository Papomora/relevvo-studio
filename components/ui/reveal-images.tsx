import { cn } from '@/lib/utils'

interface ImageSource { src: string; alt: string }
interface ServiceItem {
  text: string
  sub: string
  images: [ImageSource, ImageSource]
}

function RevealImageListItem({ text, sub, images }: ServiceItem) {
  const imgBase =
    'relative duration-500 delay-100 shadow-none group-hover:shadow-2xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-20 h-20 overflow-hidden transition-all rounded-xl'

  return (
    <div className="group relative w-full overflow-visible border-b border-white/[0.06] last:border-0">
      <div className="flex items-center justify-between py-6 md:py-8 cursor-default">

        {/* Headline */}
        <div className="flex items-baseline gap-5 md:gap-8">
          <h2
            className="heading-display text-white transition-all duration-500 group-hover:opacity-30"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.045em',
              fontWeight: 900,
            }}
          >
            {text}
          </h2>
          <span
            className="hidden md:block font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ color: 'rgba(124,58,237,0.7)' }}
          >
            {sub}
          </span>
        </div>

        {/* Arrow that shows on hover */}
        <span
          className="flex-shrink-0 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2 mr-4"
          style={{ color: 'rgba(167,139,250,0.8)' }}
        >
          →
        </span>
      </div>

      {/* Hover image stack — positioned to the right-center */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 z-40 w-24 h-24 pointer-events-none">
        {/* Image 1 — top, rotates */}
        <div
          className={cn(
            imgBase,
            'absolute transition-all duration-300 delay-150',
            'group-hover:translate-x-6 group-hover:translate-y-4 group-hover:rotate-12'
          )}
        >
          <img alt={images[0].alt} src={images[0].src} className="h-full w-full object-cover" />
        </div>
        {/* Image 2 — bottom */}
        <div className={cn(imgBase, 'absolute duration-500')}>
          <img alt={images[1].alt} src={images[1].src} className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  )
}

const services: ServiceItem[] = [
  {
    text: 'Branding',
    sub: 'Identidad visual',
    images: [
      { src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&auto=format&fit=crop&q=60', alt: 'Branding' },
      { src: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=300&auto=format&fit=crop&q=60', alt: 'Marca' },
    ],
  },
  {
    text: 'Contenido',
    sub: 'Redes & Digital',
    images: [
      { src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&auto=format&fit=crop&q=60', alt: 'Social' },
      { src: 'https://images.unsplash.com/photo-1611162616305-c69b3037d5f8?w=300&auto=format&fit=crop&q=60', alt: 'Contenido' },
    ],
  },
  {
    text: 'Publicidad',
    sub: 'Meta & Google Ads',
    images: [
      { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop&q=60', alt: 'Ads' },
      { src: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=300&auto=format&fit=crop&q=60', alt: 'Publicidad' },
    ],
  },
  {
    text: 'Ecommerce',
    sub: 'Shopify & ML',
    images: [
      { src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&auto=format&fit=crop&q=60', alt: 'Shop' },
      { src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&auto=format&fit=crop&q=60', alt: 'Ecommerce' },
    ],
  },
]

export function RevealServicesList() {
  return (
    <section className="w-full py-20 md:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10 md:mb-14">
          <div style={{ width: 28, height: 1, background: 'rgba(124,58,237,0.8)' }} />
          <span
            className="font-mono uppercase tracking-[0.18em]"
            style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(124,58,237,0.8)' }}
          >
            Lo que hacemos
          </span>
        </div>

        {/* Service rows */}
        <div className="flex flex-col">
          {services.map((item, i) => (
            <RevealImageListItem key={i} {...item} />
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="mt-10 font-mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.2)' }}
        >
          Todos los servicios incluyen estrategia
        </p>
      </div>
    </section>
  )
}
