import type { BlogPost } from "./content"
import { getPostExcerpt, getPostUrl } from "./content"

export const SITE_URL = "https://oioannou.com"

export function canonicalUrl(path: string) {
  return new URL(path, SITE_URL).href
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Orestis Ioannou",
    url: SITE_URL,
    image: canonicalUrl("/img/me.jpg"),
    jobTitle: "VP of Tech",
    worksFor: {
      "@type": "Organization",
      name: "Bold.org",
      url: "https://bold.org",
    },
    description:
      "Product and engineering leader building AI-native products, teams and systems.",
    homeLocation: {
      "@type": "Country",
      name: "Cyprus",
    },
    sameAs: [
      "https://linkedin.com/in/oorestisime",
      "https://github.com/oorestisime",
    ],
    knowsAbout: [
      "Product development",
      "Engineering leadership",
      "Artificial intelligence",
      "AI agents",
      "Software engineering",
    ],
  }
}

export function blogPostSchema(post: BlogPost) {
  const url = canonicalUrl(getPostUrl(post))
  const published = post.data.date.toISOString()

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.data.title,
    datePublished: published,
    dateModified: published,
    author: {
      "@type": "Person",
      name: "Orestis Ioannou",
      url: SITE_URL,
    },
    description: getPostExcerpt(post),
    image: canonicalUrl("/img/blog-by-orestis.jpg"),
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.data.tags.join(", "),
  }
}
