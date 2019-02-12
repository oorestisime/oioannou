import React from "react"
import { Box, ResponsiveContext, Grid } from "grommet"

import Layout from "../components/Layout"
import Header from "../components/Header"
import Post from "../components/Post"
import Seo from "../components/Seo"

type TagProps = {
  pageContext: {
    title: string
    posts: {
      excerpt: string
      timeToRead: number
      frontmatter: {
        title: string
        path: string
        tags: string[]
      }
    }[]
  }
}

const Tag: React.SFC<TagProps> = ({ pageContext: { title, posts } }) => (
  <Layout>
    <Seo
      title={title}
      description={`Articles tagged with ${title}`}
      slug={`/tag/${title.toLowerCase()}`}
    />
    <Header title={`Tag: ${title}`} />
    <Box margin={{ horizontal: "large" }}>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid align="start" columns={size || "medium"} gap="medium">
            {posts.map(post => (
              <Post key={post.frontmatter.path} post={post} />
            ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  </Layout>
)

export default Tag
