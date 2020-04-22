import React from "react"
import { Box, Heading, Paragraph, Anchor, Text } from "grommet"
import { Star, Language } from "grommet-icons"
import { GoGitPullRequest } from "react-icons/go"

interface GithubRepoProps {
  repo: {
    nameWithOwner?: string
    name?: string
    description: string
    homepageUrl: string
    primaryLanguage: {
      name?: string
    }
    stargazers: {
      totalCount?: number
    }
    count?: number
    url: string
  }
}

export const GithubRepo: React.SFC<GithubRepoProps> = ({ repo }) => (
  <Box
    width="medium"
    margin="xsmall"
    animation="fadeIn"
    pad="xsmall"
    elevation="xsmall"
    height="small"
    justify="between"
  >
    <Anchor rel="noopener noreferrer" target="_blank" href={repo.url}>
      <Heading level="3" margin="xsmall">
        {repo.nameWithOwner || repo.name}
      </Heading>
    </Anchor>
    <Box margin={{ horizontal: "medium" }}>
      <Text css={["word-break: break-all;"]} size="medium">
        {repo.description}
      </Text>
    </Box>
    <Box
      margin={{ top: "small" }}
      direction="row"
      justify="between"
      fill="horizontal"
    >
      <Box direction="row" gap="xsmall" pad="xsmall">
        <Star color="brand" />
        {repo.stargazers.totalCount}
      </Box>

      {repo.count && (
        <Box direction="row" gap="xsmall" pad="xsmall" align="center">
          <GoGitPullRequest style={{ color: "#89bdd3" }} />
          {repo.count}
        </Box>
      )}

      <Box direction="row" gap="xsmall" pad="xsmall">
        <Language color="brand" />
        {repo.primaryLanguage.name}
      </Box>
    </Box>
  </Box>
)
