import React from "react"
import { graphql } from "gatsby"
import { Box } from "grommet"
import { Layout, Post, Section, Header } from "../components/"

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
  return (
    <Layout>
      <Header />
      <Box margin={{ vertical: "medium", horizontal: "large" }}>
        <Section direction="column" align="center">
          {allMarkdownRemark.edges.map(post => (
            <Post key={post.node.frontmatter.path} post={post.node} />
          ))}
        </Section>
      </Box>
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
