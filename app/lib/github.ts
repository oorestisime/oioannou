export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  language: string
  fork: boolean
}

export async function getGithubRepos(
  username: string,
  limit = 3
): Promise<GithubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
    )

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const repos = await response.json()

    // Filter out forks and sort by stars
    // Exclude list
    const excludeList = ["RSA_ElGamal"]
    return repos
      .filter(
        (repo: GithubRepo) => !repo.fork && !excludeList.includes(repo.name)
      )
      .sort(
        (a: GithubRepo, b: GithubRepo) =>
          b.stargazers_count - a.stargazers_count
      )
      .slice(0, limit)
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return []
  }
}
