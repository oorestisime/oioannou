import fs from "fs"
import path from "path"
import { getSortedPostsData } from "./blog"

// Base URL of the website
const SITE_URL = "https://oioannou.com"

/**
 * Generate XML sitemap for the website
 */
export function generateSitemap() {
  // Get all blog posts
  const posts = getSortedPostsData()

  // Start XML content
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url>
    <loc>${SITE_URL}</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/blog</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/projects</loc>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog posts -->
`

  // Add each blog post to the sitemap
  posts.forEach((post) => {
    const postPath = post.path.startsWith("/") ? post.path : `/${post.path}`
    sitemap += `  <url>
    <loc>${SITE_URL}/blog${postPath}</loc>
    <lastmod>${new Date(post.date).toISOString().split("T")[0]}</lastmod>
    <priority>0.7</priority>
  </url>
`
  })

  // Close XML content
  sitemap += `</urlset>`

  // Write sitemap to public directory
  const sitemapPath = path.join(process.cwd(), "public/sitemap.xml")
  fs.writeFileSync(sitemapPath, sitemap)

  console.log(`Sitemap generated at ${sitemapPath}`)
}
