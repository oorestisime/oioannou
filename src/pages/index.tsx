import React from 'react'
import { Box, Paragraph, Grid, Anchor, Text } from 'grommet'
import { Github } from 'grommet-icons'
import { graphql } from 'gatsby'

import { skills } from '../data'

import Layout from '../components/Layout'
import Skills from '../components/Skills'
import GithubRepo from '../components/GithubRepo'
import Post from '../components/Post'
import IndexSection from '../components/IndexSection'
import Hero from '../components/Hero'

type IndexData = {
  data: {
    avatar: {
      childImageSharp: {
        fluid: {
          src: string
        }
      }
    }
    github: {
      viewer: {
        repositoriesContributedTo: {
          edges: object[]
        }
      }
    }
    allMarkdownRemark: {
      edges: object[]
    }
  }
}

const IndexPage: React.SFC<IndexData> = ({ data }) => (
  <Layout>
    <Hero
      title="Hi, I'm Orestis"
      subtitle={[
        <Paragraph key="dev" margin={{ bottom: 'small' }}>
          Full Stack developper & avid traveler.
        </Paragraph>,
        <Paragraph key="like" margin={{ bottom: 'small', top: 'none' }}>
          I enjoy working with Python, ReactJS, Flask, Gatsby
        </Paragraph>
      ]}
      image={data.avatar.childImageSharp.fixed}
      anchor={<Anchor color="brand" label="Follow me on Github" icon={<Github />} href="//github.com/oorestisime" target="_blank" />}
    />
    <Box background="brand">
      <Grid
        rows={['auto', 'auto']}
        columns={['1/4', '1/4', '1/4', '1/4']}
        areas={[
          { name: 'header', start: [0, 0], end: [3, 0] },
          { name: 'back', start: [0, 1], end: [0, 1] },
          { name: 'front', start: [1, 1], end: [1, 1] },
          { name: 'ops', start: [2, 1], end: [2, 1] },
          { name: 'misc', start: [3, 1], end: [3, 1] }
        ]}
      >
        <Box align="center" alignSelf="stretch" gridArea="header">
          <Paragraph color="white" size="large" textAlign="center">
            {`My journey in life started ${new Date().getFullYear() -
              1992} years ago in a little but beautiful island in the Mediterranean , Cyprus.`}
          </Paragraph>
          <Paragraph margin={{ top: 'none' }} color="white" size="large" textAlign="center">
            I am now living in Paris and working as a Full Stack dev. I curious learning new concepts and stacks so my daily life includes a
            lot of scrolling and reading on Medium and Pocket*, testing and contributing to Open Source.
          </Paragraph>
          <Text size="small" color="white">
            * Ok fine, I also admit that commuting in Paris takes a lot of time
          </Text>
        </Box>
        <Skills skills={skills} />
      </Grid>
    </Box>
    <IndexSection title="Open source contributions">
      {data.github.viewer.repositoriesContributedTo.edges.map(repo => (
        <GithubRepo key={repo.node.name} repo={repo} />
      ))}
    </IndexSection>
    <IndexSection title="Public repositories">
      {data.github.viewer.repositories.edges
        .filter(node => !node.node.isArchived)
        .slice(0, 4)
        .map(repo => (
          <GithubRepo key={repo.node.name} repo={repo} />
        ))}
    </IndexSection>
    <IndexSection title="I sometimes blog">
      {data.allMarkdownRemark.edges.map(post => (
        <Post key={post.node.frontmatter.path} post={post.node} />
      ))}
    </IndexSection>
  </Layout>
)

export const pageQuery = graphql`
  query IndexQuery {
    avatar: file(relativePath: { eq: "me.png" }) {
      childImageSharp {
        fixed(width: 190, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(limit: 4, sort: { order: DESC, fields: frontmatter___date }) {
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
        repositoriesContributedTo(first: 4, orderBy: { field: STARGAZERS, direction: DESC }) {
          edges {
            node {
              stargazers {
                totalCount
              }
              forkCount
              name
              description
              nameWithOwner
              primaryLanguage {
                name
              }
              url
            }
          }
        }
        repositories(first: 10, isFork: false, orderBy: { direction: DESC, field: STARGAZERS }) {
          edges {
            node {
              isArchived
              stargazers {
                totalCount
              }
              forkCount
              name
              description
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
