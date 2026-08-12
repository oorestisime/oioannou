import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const dist = path.join(root, "dist")
const contentDirectory = path.join(root, "src/content/blog")
const baseUrl = process.argv.find((argument) => argument.startsWith("http"))

function fail(message) {
  throw new Error(message)
}

function parseFrontmatter(file) {
  const source = fs.readFileSync(file, "utf8")
  const match = source.match(/^---\n([\s\S]*?)\n---/)
  if (!match) fail(`Missing frontmatter: ${file}`)

  const get = (key) => match[1].match(new RegExp(`^${key}:\\s*["']?([^\\n"']+)["']?\\s*$`, "m"))?.[1]
  const tagsLine = match[1].match(/^tags:\s*(\[.*\])\s*$/m)?.[1]
  const tags = tagsLine ? JSON.parse(tagsLine.replaceAll("'", '"')) : []

  return {
    path: get("path"),
    title: get("title"),
    tags,
  }
}

function outputFile(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, "https://oioannou.com").pathname)
  if (pathname === "/") return path.join(dist, "index.html")

  const direct = path.join(dist, pathname.replace(/^\//, ""))
  if (path.extname(direct)) return direct
  return path.join(direct, "index.html")
}

function assertOutput(urlPath, context = urlPath) {
  if (!fs.existsSync(outputFile(urlPath))) {
    fail(`Missing output for ${context}: ${urlPath}`)
  }
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

if (!fs.existsSync(dist)) fail("Run the Astro build before verifying output")

const posts = fs
  .readdirSync(contentDirectory)
  .filter((file) => file.endsWith(".md"))
  .map((file) => parseFrontmatter(path.join(contentDirectory, file)))

if (posts.length < 26) fail(`Expected at least 26 articles, found ${posts.length}`)

const articlePaths = posts.map((post) => `/blog${post.path}`)
const uniqueArticlePaths = new Set(articlePaths.map((url) => new URL(url, "https://oioannou.com").pathname))
if (uniqueArticlePaths.size !== posts.length) fail("Article path collision detected")

const tagPaths = new Set(
  posts.flatMap((post) => post.tags.map((tag) => `/tags/${encodeURIComponent(tag.toLowerCase())}`))
)
if (tagPaths.size < 50) fail(`Expected at least 50 effective tag paths, found ${tagPaths.size}`)

const expectedPages = ["/", "/blog", "/projects", ...articlePaths, ...tagPaths]
for (const page of expectedPages) assertOutput(page)

const netlify = fs.readFileSync(path.join(root, "netlify.toml"), "utf8")
const redirects = [...netlify.matchAll(/\[\[redirects\]\]\s+from = "([^"]+)"\s+to = "([^"]+)"\s+status = (\d+)/g)].map(
  ([, from, to, status]) => ({ from, to, status: Number(status) })
)
const redirectsBySource = new Map(
  redirects.map((redirect) => [redirect.from.replace(/\/$/, ""), redirect])
)

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"))
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8")
  const relative = path.relative(dist, file)

  if (!/<title>[^<]+<\/title>/.test(html)) fail(`Missing title: ${relative}`)
  if (!/<meta name="description" content="[^"]+">/.test(html)) fail(`Missing description: ${relative}`)
  if (!/<link rel="canonical" href="https:\/\/oioannou\.com\/[^"]*">/.test(html)) {
    fail(`Missing canonical URL: ${relative}`)
  }
  if (!/<meta property="og:image" content="https:\/\/oioannou\.com\/[^"]+">/.test(html)) {
    fail(`Missing OpenGraph image: ${relative}`)
  }

  const executableScripts = [...html.matchAll(/<script([^>]*)>/g)].filter(([, attributes]) => {
    if (attributes.includes('type="application/ld+json"')) return false
    return !attributes.includes('src="https://assets.onedollarstats.com/stonks.js"')
  })
  if (executableScripts.length > 0) fail(`Unexpected client JavaScript: ${relative}`)

  for (const [, attribute, target] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    if (
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("mailto:") ||
      target.startsWith("#") ||
      target.startsWith("data:")
    ) {
      continue
    }

    const pathname = new URL(target, "https://oioannou.com").pathname
    if (attribute === "href" && pathname === new URL(`/${relative}`, "https://oioannou.com").pathname) continue
    if (redirectsBySource.has(pathname.replace(/\/$/, ""))) continue
    assertOutput(pathname, `${relative} -> ${target}`)
  }
}

const sitemapFile = path.join(dist, "sitemap.xml")
assertOutput("/sitemap.xml")
const sitemap = fs.readFileSync(sitemapFile, "utf8")
for (const page of expectedPages) {
  const canonical = new URL(page, "https://oioannou.com").href.replaceAll("&", "&amp;")
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) fail(`Sitemap missing ${page}`)
}

if (redirects.length !== 25) fail(`Expected 25 redirects, found ${redirects.length}`)
const redirectSources = new Set(redirects.map(({ from }) => from.replace(/\/$/, "")))
if (redirectSources.size !== redirects.length) fail("Duplicate redirect source detected")

for (const redirect of redirects) {
  if (redirect.status !== 301) fail(`Redirect is not permanent: ${redirect.from}`)
  assertOutput(redirect.to, `redirect ${redirect.from}`)
  if (redirectSources.has(redirect.to.replace(/\/$/, ""))) {
    fail(`Redirect chain detected: ${redirect.from} -> ${redirect.to}`)
  }
}

if (baseUrl) {
  for (const redirect of redirects) {
    const response = await fetch(new URL(redirect.from, baseUrl), {
      method: "HEAD",
      redirect: "manual",
    })
    if (response.status !== redirect.status) {
      fail(`Live redirect returned ${response.status}: ${redirect.from}`)
    }
    if (response.headers.get("location") !== redirect.to) {
      fail(
        `Live redirect target mismatch: ${redirect.from} -> ${response.headers.get("location")}`
      )
    }
  }
}

console.log(
  `Verified ${expectedPages.length} canonical pages, ${htmlFiles.length} HTML files, ${redirects.length} redirects${baseUrl ? " via Netlify" : ""}, internal links, metadata, sitemap, assets, and zero client JavaScript.`
)
