import { useLoaderData } from "react-router"
import { type MetaFunction } from "react-router"
import { Hero } from "~/components/home/hero"
import { MainLayout } from "~/components/layout/main-layout"
import { Section } from "~/components/ui/section"
import { ProjectCard } from "~/components/home/project-card"
import { PostCard } from "~/components/blog/post-card"
import { getGithubRepos, type GithubRepo } from "~/lib/github"
import { getSortedPostsData, type PostMeta } from "~/lib/blog"
import meImage from "~/assets/me.png"
import type { Route } from "./+types/home"

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Orestis Ioannou - Software Engineer" },
    {
      name: "description",
      content:
        "Personal website and blog of Orestis Ioannou, Software Engineer",
    },
  ]
}

export async function loader() {
  const repos = await getGithubRepos("oorestisime")
  const recentPosts = getSortedPostsData().slice(0, 3)

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
