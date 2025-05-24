import { useLoaderData } from "react-router"
import { type MetaFunction } from "react-router"
import { MainLayout } from "~/components/layout/main-layout"
import { Section } from "~/components/ui/section"
import { ProjectCard } from "~/components/home/project-card"
import { getGithubRepos, type GithubRepo } from "~/lib/github"
import { generateCanonicalUrl, generateProjectsPageSchema } from "~/lib/seo"
import type { Route } from "./+types/projects"

export function headers(_: Route.HeadersArgs) {
  return {
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  }
}

export const meta: MetaFunction = () => {
  // Generate canonical URL
  const canonicalUrl = generateCanonicalUrl("/projects")

  // Generate JSON-LD structured data
  const jsonLd = generateProjectsPageSchema()

  return [
    { title: "Projects - Orestis Ioannou" },
    {
      name: "description",
      content: "Open source projects and personal work by Orestis Ioannou",
    },
    // Canonical URL
    { tagName: "link", rel: "canonical", href: canonicalUrl },
    // Open Graph tags
    { property: "og:title", content: "Projects - Orestis Ioannou" },
    {
      property: "og:description",
      content: "Open source projects and personal work by Orestis Ioannou",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: canonicalUrl },
    {
      property: "og:image",
      content: "https://oioannou.com/img/me.jpg",
    },
    {
      property: "twitter:image",
      content: "https://oioannou.com/img/me.jpg",
    },
    // JSON-LD structured data
    {
      tagName: "script",
      type: "application/ld+json",
      children: jsonLd,
    },
  ]
}

export async function loader() {
  const repos = await getGithubRepos("oorestisime", 6)
  return { repos }
}

export default function Projects() {
  const { repos } = useLoaderData<{ repos: GithubRepo[] }>()

  return (
    <MainLayout>
      <Section
        title="Projects"
        subtitle="Open source projects and personal work"
      >
        <div className="terminal mb-8 mx-auto max-w-md">
          <div className="terminal-header">$ ls -la projects/</div>
          <div className="command-output">
            total {repos.length}
            <br />
            {repos.map((repo, index) => (
              <div key={repo.id}>
                {`${index + 1}. ${repo.name} - ${repo.language || "Unknown"}`}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </Section>
    </MainLayout>
  )
}
