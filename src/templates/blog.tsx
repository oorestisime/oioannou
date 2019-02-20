import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Box, Anchor, Text, Heading } from "grommet"
import { History } from "grommet-icons"
import rehypeReact from "rehype-react"

import { Layout, Header, Tags, Seo } from "../components/"

const Quote = styled.blockquote`
  padding: 10px 80px 20px;
  position: relative;
  color: ${props => props.theme.global.colors["dark-3"]};
  p {
    font-size: 22px;
    text-align: center;
    line-height: 22px;
  }

  ::after {
    content: "";
    top: 0px;
    left: 50%;
    margin-left: -100px;
    position: absolute;
    border-bottom: 3px solid #89bdd3;
    width: 200px;
  }
`

// eslint-disable-next-line new-cap
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Anchor,
    h1: data => <Heading level={1} {...data} />,
    h2: data => <Heading level={2} {...data} />,
    h3: data => <Heading level={3} {...data} />,
    h4: data => <Heading level={4} {...data} />,
    h5: data => <Heading level={5} {...data} />,
    h6: data => <Heading level={6} {...data} />,
    blockquote: Quote,
  },
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
  data: {
    markdownRemark: { htmlAst, excerpt, frontmatter },
  },
}) => (
  <Layout>
    <Seo
      title={frontmatter.title}
      description={excerpt}
      slug={frontmatter.path}
    />
    <Header />
    <Box
      alignSelf="center"
      width="large"
      margin={{ horizontal: "medium", vertical: "small" }}
    >
      <Heading level="1">{frontmatter.title}</Heading>
      {renderAst(htmlAst)}
      <Box
        direction="row-responsive"
        justify="between"
        margin={{ top: "medium" }}
      >
        <Box align="center" direction="row" gap="xsmall">
          <History size="small" />
          <Text size="small">{frontmatter.date}</Text>
        </Box>
        <Tags tags={frontmatter.tags} />
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
