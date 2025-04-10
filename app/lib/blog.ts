import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import prism from "remark-prism"

const postsDirectory = path.join(process.cwd(), "app/content/blog")

export type PostMeta = {
  slug: string
  path: string
  url: string
  fullPath: string
  title: string
  date: string
  tags?: string[]
  description?: string
}

export type Post = PostMeta & {
  content: string
}

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "")

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")

      // Use gray-matter to parse the post metadata
      const { data } = matter(fileContents)

      // Extract custom path from frontmatter or use slug-based path
      const customPath = data.path || `/blog/${slug}`

      // Combine the data with the slug
      return {
        slug,
        path: customPath,
        url: data.path?.replaceAll("/", "") || slug,
        fullPath,
        ...(data as {
          title: string
          date: string
          tags?: string[]
          description?: string
        }),
      }
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostData(postSlug: string) {
  try {
    // First get all posts data
    const allPosts = getSortedPostsData()
    // Find the post by slug or path
    const post = allPosts.find((p) => p.url === postSlug)

    if (!post) {
      console.error(`No post found for slug: ${postSlug}`)
      throw new Error(`Post not found: ${postSlug}`)
    }

    const fileContents = fs.readFileSync(post.fullPath, "utf8")

    // Use gray-matter to parse the post metadata
    const { content } = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .use(prism)
      .process(content)

    const contentHtml = processedContent.toString()

    // Combine the data with the content
    return {
      ...post,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error getting post data for ${postSlug}:`, error)
    throw error
  }
}

export function getAllPostSlugs() {
  const posts = getSortedPostsData()
  return posts.map((post) => {
    const pathSegments = post.path.split("/")
    const pathSlug = pathSegments[pathSegments.length - 1]
    return {
      slug: pathSlug,
    }
  })
}

export function getAllTags(): { name: string; count: number }[] {
  const posts = getSortedPostsData()
  const tagCounts: Record<string, number> = {}

  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string) {
  const posts = getSortedPostsData()
  return posts.filter((post) => {
    if (!post.tags) return false
    return post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  })
}
