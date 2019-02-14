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
  const contributions = data.github.viewer.pullRequests.edges.reduce((p, c) => {
    const name = c.node.repository.name
    if (!p.hasOwnProperty(name)) {
      p[name] = {
        ...c.node.repository,
        count: 0,
      }
    }
    p[name].count++
    return p
  }, {})

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
            color="brand"
            icon={<Github />}
            href="//github.com/oorestisime"
            target="_blank"
            rel="noopener noreferrer"
          />,
          <Anchor
            color="brand"
            icon={<Twitter />}
            href="//twitter.com/oorestisime"
            target="_blank"
            rel="noopener noreferrer"
          />,
        ]}
      />
      <Box pad="small" align="center" background="brand">
        <Box gap="medium" width="large">
          <Text textAlign="center" color="white" size="large">
            {`My journey in life started ${new Date().getFullYear() -
              1992} years ago in a little but beautiful island in the Mediterranean , Cyprus.`}
          </Text>
          <Text textAlign="center" color="white" size="large">
            I wear a Full stack dev hat by day in Paris and spending most of the
            nights contributing to Open Source projects such as{" "}
            <Anchor
              color="white"
              href="https://v2.grommet.io/"
              label="Grommet "
            />
            and{" "}
            <Anchor
              color="white"
              href="https://gatsbyjs.org/"
              label=" Gatsby"
            />
            . I am always open to discuss exciting projects around these
            technologies.
          </Text>
        </Box>
      </Box>
      <Section title="Recent OS contributions">
        {Object.values(contributions)
          .sort((a, b) => a.count < b.count)
          .slice(0, 6)
          .map(repo => (
            <GithubRepo key={repo.name} repo={repo} />
          ))}
      </Section>
      <Section title="Public repositories">
        {data.github.viewer.repositories.edges
          .filter(
            node =>
              !node.node.isArchived && node.node.owner.login === "oorestisime"
          )
          .slice(0, 6)
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
      limit: 6
      sort: { order: DESC, fields: frontmatter___date }
    ) {
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
    github {
      viewer {
        pullRequests(states: MERGED, first: 100) {
          edges {
            node {
              merged
              repository {
                name
                stargazers {
                  totalCount
                }
                forkCount
                description
                nameWithOwner
                primaryLanguage {
                  name
                }
                url
              }
            }
          }
        }
        repositories(
          first: 10
          isFork: false
          orderBy: { direction: DESC, field: STARGAZERS }
        ) {
          edges {
            node {
              isArchived
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
