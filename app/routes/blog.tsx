import { useLoaderData } from "react-router"
import { type MetaFunction } from "react-router"
import { MainLayout } from "~/components/layout/main-layout"
import { Section } from "~/components/ui/section"
import { PostCard } from "~/components/blog/post-card"
import { getAllTags, getSortedPostsData, type PostMeta } from "~/lib/blog"
import { Tag } from "~/components/blog/tag"
import { useState } from "react"
import { generateBlogListSchema, generateCanonicalUrl } from "~/lib/seo"
import type { Route } from "./+types/blog"

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  }
}

export const meta: MetaFunction = () => {
  // Generate canonical URL
  const canonicalUrl = generateCanonicalUrl("/blog")
  
  // Generate JSON-LD structured data
  const jsonLd = generateBlogListSchema()

  return [
    { title: "Blog - Orestis Ioannou" },
    {
      name: "description",
      content: "Articles, tutorials and thoughts by Orestis Ioannou",
    },
    // Canonical URL
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    // Open Graph tags
    { property: "og:title", content: "Blog - Orestis Ioannou" },
    { property: "og:description", content: "Articles, tutorials and thoughts by Orestis Ioannou" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    // JSON-LD structured data
    {
      tagName: "script",
      type: "application/ld+json",
      children: jsonLd,
    },
  ]
}

export function loader() {
  const posts = getSortedPostsData()
  const tags = getAllTags()

  return { posts, tags }
}

export default function Blog() {
  const { posts, tags } = useLoaderData<{
    posts: PostMeta[]
    tags: Array<{ name: string; count: number }>
  }>()

  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts

  return (
    <MainLayout>
      <Section title="Blog" subtitle="Articles, tutorials and thoughts">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium
                ${
                  !selectedTag
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              onClick={() => setSelectedTag(null)}
            >
              All Posts
            </button>
            {tags.map((tag) => (
              <Tag
                key={tag.name}
                name={tag.name}
                count={tag.count}
                isActive={selectedTag === tag.name}
                onClick={() =>
                  setSelectedTag(tag.name === selectedTag ? null : tag.name)
                }
              />
            ))}
          </div>
        </div>

        <div className="terminal mb-8 mx-auto max-w-md">
          <div className="terminal-header">
            $ find-posts {selectedTag ? `--tag="${selectedTag}"` : ""}
          </div>
          <div className="command-output">
            Found {filteredPosts.length} post
            {filteredPosts.length !== 1 ? "s" : ""}
            {selectedTag ? ` tagged with "${selectedTag}"` : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={post.date}
              description={post.description}
              excerpt={post.excerpt}
              tags={post.tags}
              path={post.path}
            />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No posts found with the selected tag.
            </p>
          </div>
        )}
      </Section>
    </MainLayout>
  )
}
