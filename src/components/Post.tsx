import React from 'react'
import { ResponsiveContext, Box, Heading, Paragraph, Text, Anchor } from 'grommet'
import { Clock, Calendar } from 'grommet-icons'

import Tags from './Tags'

type PostProps = {
  post: {
    timeToRead: number
    excerpt: string
    frontmatter: {
      title: string
      date: string
      tags: string[]
      path: string
    }
  }
}

const Post: React.SFC<PostProps> = ({ post }) => (
  <Box align="start" fill pad="small">
    <Box fill="horizontal" elevation="small" round="xsmall" pad="small">
      <Heading level="3" margin="none">
        {post.frontmatter.title}
      </Heading>
      <Box direction="row" gap="xsmall" align="center" margin={{ left: 'xsmall', top: 'xsmall' }}>
        <Calendar size="small" />
        <Text size="small">{post.frontmatter.date}</Text>
        <Clock size="small" />
        <Text size="small">{post.timeToRead} min read</Text>
      </Box>
      <Paragraph size="small" margin={{ horizontal: 'medium' }}>
        {post.excerpt}
        <Anchor href={post.frontmatter.path} label=" Read more" size="small" />
      </Paragraph>
      <ResponsiveContext.Consumer>
        {size =>
          size !== 'small' && (
            <Box gap="xsmall" direction="row" wrap align="center">
              <Tags tags={post.frontmatter.tags} />
            </Box>
          )
        }
      </ResponsiveContext.Consumer>
    </Box>
  </Box>
)

export default Post
