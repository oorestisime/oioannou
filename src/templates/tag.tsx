import React from "react"
import { Box } from "grommet"

import { Section, Layout, Header, Post, Seo } from "../components/"

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
      <Section>
        {posts.map(post => (
          <Post key={post.frontmatter.path} post={post} />
        ))}
      </Section>
    </Box>
  </Layout>
)

export default Tag
