import React from "react"
import { Box, Paragraph, Anchor, Button, Text } from "grommet"
import { Github, Twitter } from "grommet-icons"
import { graphql } from "gatsby"

import {
  Layout,
  GithubRepo,
  Post,
  Section,
  Hero,
  Seo,
  InternalLink,
} from "../components/"

type pullRequest = {
  merged: boolean
  repository: {
    name: string
    stargazers: {
      totalCount: number
    }
    forkCount: number
    description: string
    nameWithOwner: string
    primaryLanguage: {
      name: string
    }
    url: string
  }
}

type IndexData = {
  data: {
    avatar: {
      childImageSharp: {
        fixed: {
          src: string
        }
      }
    }
    github: {
      viewer: {
        pullRequests: {
          edges: {
            node: pullRequest
          }[]
        }
        repositories: {
          edges: {
            node: {
              isArchived: boolean
              stargazers: {
                totalCount: number
              }
              owner: {
                login: string
              }
              forkCount: number
              name: string
              description: string
              homepageUrl: string
              primaryLanguage: {
                name: string
              }
              url: string
            }
          }[]
        }
      }
    }
    allMarkdownRemark: {
      edges: {
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
      }[]
    }
  }
}
const IndexPage: React.SFC<IndexData> = ({ data }) => {
  return (
    <Layout>
      <Seo />
      <Hero
        title="Hi, I'm Orestis"
        subtitle={[
          <Paragraph key="dev" margin={{ bottom: "small" }}>
            Full Stack developper & avid traveler.
          </Paragraph>,
          <Paragraph key="like" margin={{ bottom: "small", top: "none" }}>
            I enjoy working with Python, ReactJS, Flask, Gatsby and Grommet
          </Paragraph>,
        ]}
        image={data.avatar.childImageSharp.fixed}
        anchor={[
          <Anchor
            key="github"
            color="brand"
            icon={<Github />}
            href="//github.com/oorestisime"
            target="_blank"
            rel="noopener noreferrer"
          />,
          <Anchor
            key="twitter"
            color="brand"
            icon={<Twitter />}
            href="//twitter.com/oorestisime"
            target="_blank"
            rel="noopener noreferrer"
          />,
        ]}
      />
      <Section title="Public repositories">
        {data.github.viewer.repositories.edges
          .filter(
            node =>
              !node.node.isArchived && node.node.owner.login === "oorestisime"
          )
          .slice(0, 5)
          .map(repo => (
            <GithubRepo key={repo.node.name} repo={repo.node} />
          ))}
      </Section>
      <Section title="I sometimes blog">
        {data.allMarkdownRemark.edges.map(post => (
          <Post key={post.node.frontmatter.path} post={post.node} />
        ))}
      </Section>
      <Box align="center" justify="center" margin={{ vertical: "small" }}>
        <InternalLink to="/blog">
          <Button as="span" label="Load more" />
        </InternalLink>
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    avatar: file(relativePath: { eq: "me.png" }) {
      childImageSharp {
        fixed(width: 190, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(
      limit: 4
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          excerpt(pruneLength: 280)
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
    github {
      viewer {
        repositories(
          first: 10
          isFork: false
          orderBy: { direction: DESC, field: STARGAZERS }
        ) {
          edges {
            node {
              isArchived
              isPrivate
              stargazers {
                totalCount
              }
              owner {
                login
              }
              forkCount
              name
              description
              homepageUrl
              primaryLanguage {
                name
              }
              url
            }
          }
        }
      }
    }
  }
`
export default IndexPage
