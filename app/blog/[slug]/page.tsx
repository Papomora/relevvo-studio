import { getPostBySlug, getAllPosts } from '@/lib/blog'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { frontmatter } = getPostBySlug(params.slug)
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        images: frontmatter.image ? [frontmatter.image] : [],
      },
    }
  } catch {
    return { title: 'Artículo no encontrado' }
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  let post
  try {
    post = getPostBySlug(params.slug)
  } catch {
    notFound()
  }

  const { frontmatter, content } = post
  const paragraphs = content.split('\n').filter(l => l.trim())

  return (
    <main>
      <Navbar />

      <article style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '140px 24px 60px',
      }}>
        <header>
          <Link href="/blog" style={{
            fontSize: '.7rem',
            fontWeight: 600,
            letterSpacing: '.1em',
            textTransform: 'uppercase' as const,
            color: 'rgba(255,255,255,0.35)',
            textDecoration: 'none',
            marginBottom: 24,
            display: 'inline-block',
          }}>← Volver al blog</Link>

          <span style={{
            display: 'block',
            fontSize: '.65rem',
            fontWeight: 700,
            letterSpacing: '.14em',
            textTransform: 'uppercase' as const,
            color: '#7C3AED',
            marginBottom: 12,
          }}>{frontmatter.category}</span>

          <h1 style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
            fontWeight: 900,
            letterSpacing: '-.02em',
            color: '#F2F2F2',
            lineHeight: 1.12,
            marginBottom: 16,
          }}>{frontmatter.title}</h1>

          <p style={{
            fontSize: '.8rem',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: 28,
          }}>
            {frontmatter.date} · {frontmatter.readTime} · Por {frontmatter.author}
          </p>

          {frontmatter.image && (
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              style={{
                width: '100%',
                borderRadius: 12,
                marginBottom: 36,
                maxHeight: 400,
                objectFit: 'cover',
              }}
            />
          )}
        </header>

        <div style={{
          fontSize: '1.05rem',
          lineHeight: 1.75,
          color: 'rgba(255,255,255,0.7)',
        }}>
          {paragraphs.map((line, i) => {
            const trimmed = line.trim()
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={i} style={{
                  fontFamily: 'var(--font-bricolage), sans-serif',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: '#A78BFA',
                  marginTop: 36,
                  marginBottom: 12,
                }}>{trimmed.replace('## ', '')}</h2>
              )
            }
            if (trimmed.startsWith('# ')) return null
            if (trimmed.startsWith('---')) return <hr key={i} style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '32px 0' }} />
            return <p key={i} style={{ marginBottom: 18 }}>{trimmed}</p>
          })}
        </div>

        <div style={{
          marginTop: 48,
          padding: 32,
          background: '#7C3AED',
          borderRadius: 12,
          textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-bricolage), sans-serif',
            fontSize: '1.3rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 8,
          }}>¿Necesitas ayuda con tu marca?</h3>
          <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>
            Hacemos diagnósticos gratis. 30 minutos para entender tu marca.
          </p>
          <a
            href="https://wa.me/573223094005?text=Hola,%20vi%20el%20blog%20y%20quiero%20un%20diagnóstico%20gratis"
            target="_blank"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              background: '#fff',
              color: '#7C3AED',
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '.85rem',
              textDecoration: 'none',
            }}
          >Reservar diagnóstico gratis</a>
        </div>
      </article>

      <Footer />
    </main>
  )
}
