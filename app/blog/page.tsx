import { getAllPosts } from '@/lib/blog'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Blog',
  description: 'Artículos sobre branding, diseño e identidad de marca en Colombia. Consejos, tendencias y estrategia digital por Relevvo Studio.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main>
      <Navbar />

      <section style={{
        padding: '140px 24px 80px',
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        <p style={{
          fontSize: '.7rem',
          fontWeight: 700,
          letterSpacing: '.18em',
          textTransform: 'uppercase' as const,
          color: '#7C3AED',
          marginBottom: 12,
        }}>Blog</p>

        <h1 style={{
          fontFamily: 'var(--font-bricolage), sans-serif',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 900,
          letterSpacing: '-.03em',
          color: '#F2F2F2',
          lineHeight: 1.08,
          marginBottom: 12,
        }}>
          Ideas, estrategia<br />y diseño <span style={{ fontFamily: 'var(--font-instrument), serif', fontStyle: 'italic', color: '#A78BFA' }}>sin filtro.</span>
        </h1>

        <p style={{
          fontSize: '.9rem',
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 48,
        }}>
          Lo que aprendemos construyendo marcas cada día. Branding, IA, contenido y lo que nadie te cuenta.
        </p>

        {posts.length === 0 ? (
          <div style={{
            padding: '60px 32px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
              Próximamente
            </p>
            <p style={{ fontSize: '.82rem', color: 'rgba(255,255,255,0.25)' }}>
              Estamos preparando contenido que vale la pena leer. Vuelve pronto.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {posts.map(post => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                style={{
                  display: 'block',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textDecoration: 'none',
                  transition: 'transform .2s, border-color .2s',
                }}
              >
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={520}
                    height={200}
                    sizes="(max-width: 768px) 100vw, 360px"
                    style={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: 22 }}>
                  <span style={{
                    fontSize: '.65rem',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase' as const,
                    color: '#7C3AED',
                  }}>{post.category}</span>
                  <h2 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#F2F2F2',
                    margin: '8px 0',
                    lineHeight: 1.3,
                  }}>{post.title}</h2>
                  <p style={{
                    fontSize: '.8rem',
                    color: 'rgba(255,255,255,0.4)',
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}>{post.description}</p>
                  <span style={{
                    fontSize: '.72rem',
                    color: 'rgba(255,255,255,0.25)',
                  }}>{post.date} · {post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
