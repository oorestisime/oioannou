import type { CollectionEntry } from "astro:content"

export type BlogPost = CollectionEntry<"blog">

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  )
}

export function getPostSlug(post: BlogPost) {
  return post.data.path.replace(/^\/+|\/+$/g, "")
}

export function getPostUrl(post: BlogPost) {
  return `/blog${post.data.path}`
}

export function getPostExcerpt(post: BlogPost) {
  if (post.data.description) return post.data.description

  const excerpt = (post.body ?? "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/[#*_`>|]/g, "")
    .replace(/\s+/g, " ")
    .trim()

  return excerpt.length > 200 ? `${excerpt.slice(0, 197)}...` : excerpt
}

export function getTagSlug(tag: string) {
  return tag.toLowerCase()
}

export function getTagUrl(tag: string) {
  return `/tags/${encodeURIComponent(getTagSlug(tag))}`
}

export type TagGroup = {
  name: string
  slug: string
  posts: BlogPost[]
}

export function getTagGroups(posts: BlogPost[]): TagGroup[] {
  const groups = new Map<string, TagGroup>()

  for (const post of sortPosts(posts)) {
    for (const tag of post.data.tags) {
      const slug = getTagSlug(tag)
      const group = groups.get(slug)

      if (group) {
        group.posts.push(post)
      } else {
        groups.set(slug, { name: tag, slug, posts: [post] })
      }
    }
  }

  return [...groups.values()].sort(
    (a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name)
  )
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date)
}
