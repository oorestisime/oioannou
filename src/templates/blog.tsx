import React from 'react'
import { graphql } from 'gatsby'
import { Box, Anchor, Text, Heading } from 'grommet'
import { History } from 'grommet-icons'
import rehypeReact from 'rehype-react'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Tags from '../components/Tags'
import Seo from '../components/Seo'

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
      excerpt: string
      frontmatter: {
        title: string
        date: string
        path: string
        tags: string[]
      }
      htmlAst: object[]
    }
  }
}

const BlogPage: React.SFC<BlogPageType> = ({
  data: { markdownRemark: { htmlAst, excerpt, frontmatter } }
}) => (
  <Layout>
    <Seo
      title={frontmatter.title}
      description={excerpt}
      slug={frontmatter.path}
    />
    <Header />
    <Box direction="row" justify="center">
      <Box width="xlarge" margin={{ horizontal: 'medium', vertical: 'small' }}>
        <Heading alignSelf="center" level="3">
          {frontmatter.title}
        </Heading>
        {renderAst(htmlAst)}
        <Box direction="row-responsive" justify="between" margin={{ top: 'medium' }}>
          <Box align="center" direction="row" gap="xsmall">
            <History size="small" />
            <Text size="small">{frontmatter.date}</Text>
          </Box>
          <Tags tags={frontmatter.tags} />
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
      excerpt(pruneLength: 250)
      frontmatter {
        tags
        path
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`
