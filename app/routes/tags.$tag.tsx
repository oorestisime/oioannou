import { useLoaderData } from "react-router"
import { type MetaFunction, type LoaderFunctionArgs } from "react-router"
import { MainLayout } from "~/components/layout/main-layout"
import { Section } from "~/components/ui/section"
import { PostCard } from "~/components/blog/post-card"
import { getPostsByTag, type PostMeta } from "~/lib/blog"
import { Tag } from "~/components/blog/tag"
import { Link } from "react-router"
import type { Route } from "./+types/tags.$tag"

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Tag Not Found" },
      { name: "description", content: "The requested tag could not be found" },
    ]
  }

  return [
    { title: `Posts tagged with "${data.tag}" - Orestis Ioannou` },
    {
      name: "description",
      content: `Explore blog posts tagged with "${data.tag}" by Orestis Ioannou`,
    },
  ]
}

export function loader({ params }: LoaderFunctionArgs) {
  const tag = params.tag

  if (!tag) {
    throw new Response("Tag not found", { status: 404 })
  }

  // Find posts with this tag (case insensitive)
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    throw new Response("Tag not found", { status: 404 })
  }

  // Get the actual tag with correct case from the first post
  const actualTag =
    posts[0].tags?.find((t) => t.toLowerCase() === tag.toLowerCase()) || tag

  return { tag: actualTag, posts }
}

export default function TagPage() {
  const { tag, posts } = useLoaderData<{
    tag: string
    posts: PostMeta[]
  }>()

  return (
    <MainLayout>
      <Section>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Posts tagged with <Tag name={tag} className="ml-2 text-base" />
          </h1>
          <p className="mt-4 text-muted-foreground">
            Found {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
          <div className="mt-4">
            <Link to="/blog" className="text-primary hover:underline">
              ← Back to all posts
            </Link>
          </div>
        </div>

        <div className="terminal mb-8 mx-auto max-w-md">
          <div className="terminal-header">$ filter-by-tag '{tag}'</div>
          <div className="command-output">
            Displaying {posts.length} result{posts.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              date={post.date}
              description={post.description}
              tags={post.tags}
              path={post.path}
              slug={post.slug}
            />
          ))}
        </div>
      </Section>
    </MainLayout>
  )
}
