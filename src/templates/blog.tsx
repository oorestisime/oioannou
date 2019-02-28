import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Box, Anchor, Text, Heading } from "grommet"
import { History } from "grommet-icons"
import rehypeReact from "rehype-react"

import { useThemeToggle } from "../tools"
import { Layout, Tags, Seo, Header, BlogContainer } from "../components/"

const Quote = styled.blockquote`
  position: relative;
  margin: 40px auto;
  width: 300px;
  font-size: 48px;
  line-height: 56px;
  padding-left: 40px;
  border-left: 2px solid #89bdd3;

  span {
    display: block;
    font-size: 18px;
    line-height: 24px;
    margin-top: 10px;
  }
`

// eslint-disable-next-line new-cap
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Anchor,
    p: data => <Text style={{ lineHeight: "150%" }} {...data} />,
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
}) => {
  const [dark, toggleTheme] = useThemeToggle()
  return (
    <Layout>
      <Seo
        title={frontmatter.title}
        description={excerpt}
        slug={frontmatter.path}
      />
      <BlogContainer dark={dark}>
        <Header article toggleTheme={() => toggleTheme(!dark)} dark={dark} />
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
      </BlogContainer>
    </Layout>
  )
}
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
