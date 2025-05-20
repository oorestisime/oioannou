import { getSortedPostsData } from "./blog"
import type { Post, PostMeta } from "./blog"

// Base URL of the website (from sitemap)
export const SITE_URL = "https://oioannou.com"

/**
 * Generate a canonical URL for a given path
 */
export function generateCanonicalUrl(path: string): string {
  const urlPath = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${urlPath}`
}

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateBlogPostSchema(post: Post): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      "@type": "Person",
      name: "Orestis Ioannou",
      url: SITE_URL,
    },
    description: post.description || post.excerpt,
    url: generateCanonicalUrl(`/blog${post.path}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": generateCanonicalUrl(`/blog${post.path}`),
    },
    keywords: post.tags?.join(", ") || "",
  }

  return JSON.stringify(schema)
}

/**
 * Generate JSON-LD structured data for blog list page
 */
export function generateBlogListSchema(): string {
  const posts = getSortedPostsData()

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    headline: "Orestis Ioannou's Blog",
    description: "Articles, tutorials and thoughts by Orestis Ioannou",
    url: generateCanonicalUrl("/blog"),
    author: {
      "@type": "Person",
      name: "Orestis Ioannou",
      url: SITE_URL,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: generateCanonicalUrl(`/blog${post.path}`),
      datePublished: new Date(post.date).toISOString(),
      author: {
        "@type": "Person",
        name: "Orestis Ioannou",
      },
    })),
  }

  return JSON.stringify(schema)
}

/**
 * Generate JSON-LD structured data for tag page
 */
export function generateTagPageSchema(tag: string, posts: PostMeta[]): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: `Posts tagged with ${tag}`,
    description: `Articles about ${tag}`,
    url: generateCanonicalUrl(`/tags/${tag}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": generateCanonicalUrl(`/tags/${tag}`),
    },
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: generateCanonicalUrl(`/blog${post.path}`),
      name: post.title,
    })),
  }

  return JSON.stringify(schema)
}

/**
 * Generate JSON-LD structured data for home page
 */
export function generateHomePageSchema(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Orestis Ioannou",
    url: SITE_URL,
    description: "Personal website and blog of Orestis Ioannou",
    author: {
      "@type": "Person",
      name: "Orestis Ioannou",
      url: SITE_URL,
    },
  }

  return JSON.stringify(schema)
}

/**
 * Generate JSON-LD structured data for projects page
 */
export function generateProjectsPageSchema(): string {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    headline: "Projects - Orestis Ioannou",
    description: "Open source projects",
    url: generateCanonicalUrl("/projects"),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": generateCanonicalUrl("/projects"),
    },
  }

  return JSON.stringify(schema)
}
