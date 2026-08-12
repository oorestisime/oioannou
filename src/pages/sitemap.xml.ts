import { getCollection } from "astro:content"
import type { APIRoute } from "astro"
import { getPostUrl, getTagGroups, getTagUrl, sortPosts } from "../lib/content"
import { canonicalUrl } from "../lib/seo"

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection("blog"))
  const urls: Array<{
    path: string
    priority: string
    lastmod?: string
  }> = [
    { path: "/", priority: "1.0" },
    { path: "/blog", priority: "0.9" },
    { path: "/projects", priority: "0.6" },
    ...posts.map((post) => ({
      path: getPostUrl(post),
      priority: "0.7",
      lastmod: post.data.date.toISOString().slice(0, 10),
    })),
    ...getTagGroups(posts).map((tag) => ({ path: getTagUrl(tag.name), priority: "0.4" })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, priority, lastmod }) => `  <url>
    <loc>${escapeXml(canonicalUrl(path))}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>\n`

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  })
}
