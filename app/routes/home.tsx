import { useLoaderData } from "react-router"
import { type MetaFunction } from "react-router"
import { Hero } from "~/components/home/hero"
import { MainLayout } from "~/components/layout/main-layout"
import { Section } from "~/components/ui/section"
import { ProjectCard } from "~/components/home/project-card"
import { PostCard } from "~/components/blog/post-card"
import { getGithubRepos, type GithubRepo } from "~/lib/github"
import { getSortedPostsData, type PostMeta } from "~/lib/blog"
import { generateCanonicalUrl, generateHomePageSchema } from "~/lib/seo"
import meImage from "~/assets/me.png"
import type { Route } from "./+types/home"

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  }
}

export const meta: MetaFunction = () => {
  // Generate canonical URL
  const canonicalUrl = generateCanonicalUrl("/")

  // Generate JSON-LD structured data
  const jsonLd = generateHomePageSchema()

  return [
    { title: "Orestis Ioannou" },
    {
      name: "description",
      content: "Personal website and blog of Orestis Ioannou",
    },
    // Canonical URL
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    // Open Graph tags
    { property: "og:title", content: "Orestis Ioannou" },
    {
      property: "og:description",
      content: "Personal website and blog of Orestis Ioannou",
    },
    {
      property: "og:image",
      content: "https://oioannou.com/img/me.jpg",
    },
    {
      property: "twitter:image",
      content: "https://oioannou.com/img/me.jpg",
    },
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

export async function loader() {
  const repos = await getGithubRepos("oorestisime")
  const recentPosts = getSortedPostsData().slice(0, 6)

  return { repos, recentPosts }
}

export default function Home() {
  const { repos, recentPosts } = useLoaderData<{
    repos: GithubRepo[]
    recentPosts: PostMeta[]
  }>()

  return (
    <MainLayout>
      <Hero image={meImage} />

      <Section
        title="Latest Articles"
        subtitle="Technical writings, tutorials and thoughts"
        contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {recentPosts.map((post) => (
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
      </Section>

      <Section
        title="Featured Projects"
        subtitle="Some of my open source work and personal projects. ngl not much time for this."
        contentClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {repos.map((repo) => (
          <ProjectCard
            key={repo.id}
            name={repo.name}
            url={repo.html_url}
            description={repo.description}
            language={repo.language}
            stars={repo.stargazers_count}
            homepage={repo.homepage}
          />
        ))}
      </Section>
    </MainLayout>
  )
}
