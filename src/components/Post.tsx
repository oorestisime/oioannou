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
    <Box width="medium" align="start" pad="small">
      <Box elevation="small" round="xsmall" pad="small">
        <Heading level="3" margin="none">
          {post.frontmatter.title}
        </Heading>
        <Box
          direction="row"
          gap="xsmall"
          align="center"
          margin={{ left: "xsmall", top: "xsmall" }}
        >
          <Calendar size="small" />
          <Text size="small">{post.frontmatter.date}</Text>
          <Clock size="small" />
          <Text size="small">{post.timeToRead} min read</Text>
        </Box>
        <Paragraph size="small" margin={{ horizontal: "medium" }}>
          {post.excerpt}
          <InternalLink to={post.frontmatter.path}>
            <Anchor as="span" label=" Read more" size="small" />
          </InternalLink>
        </Paragraph>
        {size !== "small" && (
          <Box gap="xsmall" direction="row" align="center">
            <Tags tags={post.frontmatter.tags} />
          </Box>
        )}
      </Box>
    </Box>
  )
}
