import React from 'react'
import { graphql } from 'gatsby'
import { Box, Anchor, Text, Heading } from 'grommet'
import { History } from 'grommet-icons'
import rehypeReact from 'rehype-react'

import Layout from 'gatsby-theme-grommet/src/components/Layout'
import Header from 'gatsby-theme-grommet/src/components/Header'
import Tags from 'gatsby-theme-grommet/src/components/Tags'
import Grid from 'gatsby-theme-grommet/src/components/Grid'
import Photo from 'gatsby-theme-grommet/src/components/Photo'

// eslint-disable-next-line new-cap
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Anchor,
    'rehype-image': Photo,
    grid: Grid
  }
}).Compiler

type BlogPageType = {
  data: {
    markdownRemark: {
      timeToRead: string
      frontmatter: {
        title: string
        date: string
        tags: string[]
      }
      htmlAst: object[]
    }
  }
}

const BlogPage: React.SFC<BlogPageType> = props => (
  <Layout>
    <Header />
    <Box direction="row" justify="center">
      <Box width="xlarge" margin={{ horizontal: 'medium', vertical: 'small' }}>
        <Heading alignSelf="center" level="3">
          {props.data.markdownRemark.frontmatter.title}
        </Heading>
        {renderAst(props.data.markdownRemark.htmlAst)}
        <Box direction="row-responsive" justify="between" margin={{ top: 'medium' }}>
          <Box align="center" direction="row" gap="xsmall">
            <History size="small" />
            <Text size="small">{props.data.markdownRemark.frontmatter.date}</Text>
          </Box>
          <Tags tags={props.data.markdownRemark.frontmatter.tags} />
        </Box>
      </Box>
    </Box>
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      timeToRead
      frontmatter {
        tags
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
