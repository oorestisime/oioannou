import { useLoaderData } from "react-router"
import { type MetaFunction, type LoaderFunctionArgs } from "react-router"
import { MainLayout } from "~/components/layout/main-layout"
import { getPostData, type Post } from "~/lib/blog"
import { PostContent } from "~/components/blog/post-content"
import { generateBlogPostSchema, generateCanonicalUrl } from "~/lib/seo"
import type { Route } from "./+types/blog.$slug"

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: "Post Not Found" },
      {
        name: "description",
        content: "The requested blog post could not be found",
      },
    ]
  }

  // Generate canonical URL for this post
  const canonicalUrl = generateCanonicalUrl(`/blog${data.post.path}`)

  // Generate JSON-LD structured data
  const jsonLd = generateBlogPostSchema(data.post)

  return [
    { title: `${data.post.title} - Orestis Ioannou` },
    {
      name: "description",
      content: data.post.description || `${data.post.title} by Orestis Ioannou`,
    },
    // Canonical URL
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    // Open Graph tags
    { property: "og:title", content: data.post.title },
    {
      property: "og:description",
      content: data.post.description || `${data.post.title} by Orestis Ioannou`,
    },
    { property: "og:type", content: "article" },
    { property: "og:url", content: canonicalUrl },
    {
      property: "og:image",
      content: "https://oioannou.com/img/blog-by-orestis.jpg",
    },
    {
      property: "twitter:image",
      content: "https://oioannou.com/img/blog-by-orestis.jpg",
    },
    // Twitter tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@oorestisime" },
    { name: "twitter:title", content: data.post.title },
    {
      name: "twitter:description",
      content: data.post.description || `${data.post.title} by Orestis Ioannou`,
    },
    // JSON-LD structured data
    {
      tagName: "script",
      type: "application/ld+json",
      children: jsonLd,
    },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug

  if (!slug) {
    throw new Response("Post not found", { status: 404 })
  }

  try {
    // Log the slug to help debug
    const post = await getPostData(slug)
    return { post }
  } catch (error) {
    console.error("Error loading post:", error)
    throw new Response("Post not found", { status: 404 })
  }
}

export default function BlogPost() {
  const { post } = useLoaderData<{ post: Post }>()

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
        <PostContent
          title={post.title}
          date={post.date}
          content={post.content}
          tags={post.tags}
        />
      </div>
    </MainLayout>
  )
}
