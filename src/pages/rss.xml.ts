import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIRoute } from "astro"
import { getPostExcerpt, getPostUrl, sortPosts } from "../lib/content"
import { SITE_URL, canonicalUrl } from "../lib/seo"

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection("blog"))

  return rss({
    title: "Orestis Ioannou",
    description: "Articles, tutorials and thoughts by Orestis Ioannou on engineering, products and AI.",
    site: SITE_URL,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      link: canonicalUrl(getPostUrl(post)),
      pubDate: post.data.date,
      description: getPostExcerpt(post),
      categories: post.data.tags,
      author: "oorestisime@gmail.com (Orestis Ioannou)",
    })),
    customData: "<language>en</language>",
  })
}
