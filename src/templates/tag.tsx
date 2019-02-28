import React from "react"
import { Box } from "grommet"

import {
  Section,
  Layout,
  Header,
  Post,
  Seo,
  BlogContainer,
} from "../components/"
import { useThemeToggle } from "../tools"

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

const Tag: React.SFC<TagProps> = ({ pageContext: { title, posts } }) => {
  const [dark, toggleTheme] = useThemeToggle()
  return (
    <Layout>
      <Seo
        title={title}
        description={`Articles tagged with ${title}`}
        slug={`/tag/${title.toLowerCase()}`}
      />
      <BlogContainer dark={dark}>
        <Header toggleTheme={() => toggleTheme(!dark)} dark={dark} />
        <Section direction="column">
          {posts.map(post => (
            <Post dark={dark} key={post.frontmatter.path} post={post} />
          ))}
        </Section>
      </BlogContainer>
    </Layout>
  )
}

export default Tag
