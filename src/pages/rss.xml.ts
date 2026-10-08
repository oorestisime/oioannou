import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import type { APIRoute } from "astro"
import { getPostExcerpt, getPostUrl, sortPosts, type BlogPost } from "../lib/content"
import { SITE_URL, canonicalUrl } from "../lib/seo"

// Netlify serves posts at /blog/<slug>/ and 301s the slashless form, so link
// straight to the final URL to avoid a redirect for every feed reader click.
function feedLink(post: BlogPost) {
  return canonicalUrl(getPostUrl(post).replace(/\/?$/, "/"))
}

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection("blog"))

  return rss({
    title: "Orestis Ioannou",
    description: "Articles, tutorials and thoughts by Orestis Ioannou on engineering, products and AI.",
    site: SITE_URL,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      link: feedLink(post),
      pubDate: post.data.date,
      description: getPostExcerpt(post),
      categories: post.data.tags,
      author: "oorestisime@gmail.com (Orestis Ioannou)",
    })),
    customData: "<language>en</language>",
  })
}
