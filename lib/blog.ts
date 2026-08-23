import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  date: string
  author: string
  category: string
  keyword: string
  description: string
  image: string
  readTime: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(filename => {
      const slug = filename.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data } as PostMeta
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string) {
  const mdx = path.join(BLOG_DIR, `${slug}.mdx`)
  const md = path.join(BLOG_DIR, `${slug}.md`)
  const filePath = fs.existsSync(mdx) ? mdx : md
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, frontmatter: data as PostMeta, content }
}
