import React from 'react'
import { Box, Heading, Paragraph, Anchor, Text } from 'grommet'
import { Star, Language } from 'grommet-icons'

type GithubRepoProps = {
  repo: {
    node: {
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
    }
  }
}

const GithubRepo: React.SFC<GithubRepoProps> = ({ repo }) => (
  <Box margin="xsmall" animation="fadeIn" pad="xsmall" elevation="small">
    <Heading level="3" margin="xsmall">
      {repo.node.nameWithOwner || repo.node.name}
    </Heading>
    <Box margin={{ horizontal: 'medium' }}>
      <Paragraph size="small">
        {repo.node.description}
      </Paragraph>
      {repo.node.homepageUrl && (
        <Anchor href={repo.node.homepageUrl}>
          <Text size="small">{repo.node.homepageUrl}</Text>
        </Anchor>
      )}
    </Box>
    <Box margin={{ top: 'small' }} direction="row-responsive" justify="between" fill="horizontal">
      <Box direction="row" gap="xsmall" pad="xsmall">
        <Star color="brand" />
        {repo.node.stargazers.totalCount}
      </Box>

      <Box direction="row" gap="xsmall" pad="xsmall">
        <Language color="brand" />
        {repo.node.primaryLanguage.name}
      </Box>
    </Box>
  </Box>
)
export default GithubRepo
