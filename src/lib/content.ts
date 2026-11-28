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

// Netlify serves pages at their trailing-slash URL and 301s the slashless
// form, so every internal URL uses the slash form directly.
export function getPostUrl(post: BlogPost) {
  return `/blog/${getPostSlug(post)}/`
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

// Search results cut descriptions around 160 characters, so cut at a word
// boundary before that instead.
export function truncateText(text: string) {
  const max = 160
  if (text.length <= max) return text
  const cut = text
    .slice(0, max - 1)
    .replace(/\s+\S*$/, "")
    .replace(/[\s.,;:!?…-]+$/, "")
  return `${cut}…`
}

export function getPostMetaDescription(post: BlogPost) {
  return post.data.seoDescription ?? truncateText(getPostExcerpt(post))
}

const TITLE_SUFFIX = " - Orestis Ioannou"

// Keep <title> within ~60 characters: drop the site suffix when it does not fit.
export function getPostMetaTitle(post: BlogPost) {
  const title = post.data.seoTitle ?? post.data.title
  return title.length + TITLE_SUFFIX.length <= 60
    ? `${title}${TITLE_SUFFIX}`
    : title
}

export function getTagSlug(tag: string) {
  return tag.toLowerCase()
}

export function getTagUrl(tag: string) {
  return `/tags/${encodeURIComponent(getTagSlug(tag))}/`
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
