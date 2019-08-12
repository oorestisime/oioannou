import React from "react"
import { graphql } from "gatsby"
import { Box } from "grommet"

import {
  Layout,
  Post,
  Section,
  Header,
  Seo,
  BlogContainer,
} from "../components/"
import { useThemeToggle } from "../tools"

interface SkillsBoxProps {
  data: {
    allMarkdownRemark: {
      edges: Post[]
    }
  }
}

interface Post {
  node: {
    excerpt: string
    timeToRead: number
    frontmatter: {
      title: string
      path: string
      tags: string[]
      date: string
    }
  }
}

const BlogPage: React.SFC<SkillsBoxProps> = ({
  data: { allMarkdownRemark },
}) => {
  const [dark, toggleTheme] = useThemeToggle()
  return (
    <Layout>
      <Seo
        title="Blog"
        description="Personal blog, I blog about OS, python, react, gatsby, grommet, debian..."
        slug="blog"
      />
      <BlogContainer dark={dark}>
        <Header backHome toggleTheme={() => toggleTheme(!dark)} dark={dark} />
        <Section direction="column" align="center">
          {allMarkdownRemark.edges.map(post => (
            <Post
              dark={dark}
              key={post.node.frontmatter.path}
              post={post.node}
            />
          ))}
        </Section>
      </BlogContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt(pruneLength: 480)
          timeToRead
          frontmatter {
            title
            path
            tags
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`

export default BlogPage
