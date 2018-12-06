import React from 'react'
import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet'
import { Star, Language } from 'grommet-icons'
type GithubRepoProps = {
  repo: {
    node: {
      nameWithOwner?: string
      name?: string
      description: string
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
    <Paragraph margin={{ horizontal: 'medium' }} size="small">
      {repo.node.description}
    </Paragraph>
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction={size === 'large' ? 'row' : 'column'} justify="between" fill="horizontal">
          <Box direction="row" gap="xsmall" pad="xsmall">
            <Star color="brand" />
            {repo.node.stargazers.totalCount}
          </Box>

          <Box direction="row" gap="xsmall" pad="xsmall">
            <Language color="brand" />
            {repo.node.primaryLanguage.name}
          </Box>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Box>
)
export default GithubRepo
