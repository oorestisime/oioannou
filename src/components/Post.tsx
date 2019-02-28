import React, { useContext } from "react"
import {
  ResponsiveContext,
  Box,
  Heading,
  Paragraph,
  Text,
  Anchor,
} from "grommet"
import { Clock, Calendar } from "grommet-icons"

import { Tags, InternalLink } from "."

interface PostProps {
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

export const Post: React.SFC<PostProps> = ({ post }) => {
  const size = useContext(ResponsiveContext)
  return (
    <Box width="xlarge" align="start" pad="small">
      <Box elevation="xsmall" round="xsmall" pad="small">
        <Heading level="2" margin="none">
          {post.frontmatter.title}
        </Heading>
        <Box
          direction="row"
          gap="small"
          align="center"
          margin={{ left: "xsmall", top: "small" }}
        >
          <Calendar color="dark-4" size="small" />
          <Text color="dark-4" size="small">
            {post.frontmatter.date}
          </Text>
          <Clock color="dark-4" size="small" />
          <Text color="dark-4" size="small">
            {post.timeToRead} min read
          </Text>
        </Box>
        <Text size="medium" margin="medium">
          {post.excerpt}
          <InternalLink to={post.frontmatter.path}>
            <Anchor as="span" label=" Read more" size="small" />
          </InternalLink>
        </Text>
        {size !== "small" && (
          <Box gap="xsmall" direction="row" align="center">
            <Tags tags={post.frontmatter.tags} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
