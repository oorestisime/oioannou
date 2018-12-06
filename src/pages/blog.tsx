import React from 'react'
import { graphql } from 'gatsby'
import { Box, ResponsiveContext, Grid } from 'grommet'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Post from '../components/Post'

type SkillsBoxProps = {
  data: {
    allMarkdownRemark: {
      edges: Post[]
    }
  }
}

type Post = {
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

const BlogPage: React.SFC<SkillsBoxProps> = ({ data: { allMarkdownRemark } }) => (
  <Layout>
    <Header title="Blog" />
    <Box margin={{ horizontal: 'large' }}>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid align="start" columns={size || 'medium'} gap="medium">
            {allMarkdownRemark.edges.map(post => (
              <Post key={post.node.frontmatter.path} post={post.node} />
            ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  </Layout>
)

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
      edges {
        node {
          excerpt
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
