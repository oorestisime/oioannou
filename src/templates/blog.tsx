import React from 'react'
import { graphql } from 'gatsby'
import { Box, Anchor, Text, Heading } from 'grommet'
import { Clock, History } from 'grommet-icons'
import rehypeReact from 'rehype-react'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Tags from '../components/Tags'

// eslint-disable-next-line new-cap
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Anchor
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
    <Header title={props.data.markdownRemark.frontmatter.title} />
    <Box direction="row-responsive" justify="center">
      <Box width="xlarge" pad={{ horizontal: 'xlarge', vertical: 'small' }}>
        {renderAst(props.data.markdownRemark.htmlAst)}
        <Box direction="row" justify="between" margin={{ top: 'medium' }}>
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
