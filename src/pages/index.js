import React from 'react';
import {
  ResponsiveContext, Box, Heading, Image, Paragraph, Grid,
} from 'grommet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SkillsBox from '../components/SkillsBox';
import Skill from '../components/Skill';
import GithubRepo from '../components/GithubRepo';
import Post from '../components/Post';
import WorkSvg from '../components/WorkSvg';

const IndexPage = ({ data }) => (
  <Layout>
    <Box
      animation="fadeIn"
      align="center"
      alignContent="center"
      margin={{ horizontal: 'medium' }}
      height="100vh"
    >
      <Heading margin={{ top: 'xlarge' }} level="1">Full Stack developper & avid traveler</Heading>
      <Paragraph margin={{ verticla: 'large' }} size="large">I enjoy working with Python, ReactJS, Flask, Gatsby</Paragraph>
      <Image margin={{ vertical: 'medium' }} src={data.avatar.childImageSharp.fluid.src} />
      <WorkSvg />
    </Box>
    <Box background="brand">
      <Grid
        rows={['auto', 'auto']}
        columns={['1/4', '1/4', '1/4', '1/4']}
        areas={[
          { name: 'header', start: [0, 0], end: [3, 0] },
          { name: 'Back', start: [0, 1], end: [0, 1] },
          { name: 'Front', start: [1, 1], end: [1, 1] },
          { name: 'Ops', start: [2, 1], end: [2, 1] },
          { name: 'Misc', start: [3, 1], end: [3, 1] },
        ]}
      >
        <Box align="center" alignSelf="stretch" gridArea="header">
          <Heading color="white" size="medium">Hi I am Orestis</Heading>
          <Paragraph color="white" size="large" textAlign="center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Paragraph>
        </Box>
        <ResponsiveContext.Consumer>
          {size => size !== 'small' && [
            <SkillsBox key="backend" area="Back">
              <Skill label="Python" value={80} />
              <Skill label="Flask" value={90} />
              <Skill label="Django" value={30} />
              <Skill label="SQLalchemy" value={70} />
              <Skill label="Symfony" value={50} />
              <Skill label="Java" value={20} />
            </SkillsBox>,
            <SkillsBox key="frontend" area="Front">
              <Skill label="Javascript" value={85} />
              <Skill label="React" value={80} />
              <Skill label="Gatsby" value={75} />
              <Skill label="Grommet" value={70} />
              <Skill label="Material-UI" value={70} />
            </SkillsBox>,
            <SkillsBox key="operations" area="Ops">
              <Skill label="Docker" value={80} />
              <Skill label="pyVmomi" value={80} />
              <Skill label="MySQL" value={70} />
              <Skill label="Postgres" value={60} />
              <Skill label="Vagrant" value={40} />
              <Skill label="Ansible" value={20} />
            </SkillsBox>,
            <SkillsBox key="misc" area="Misc">
              <Skill label="LaTeX" value={80} />
              <Skill label="Git" value={80} />
              <Skill label="Mercurial" value={30} />
            </SkillsBox>,
          ]}
        </ResponsiveContext.Consumer>
      </Grid>
    </Box>
    <Box margin={{ horizontal: 'xlarge' }}>
      <Box align="center" alignContent="center">
        <Heading textAlign="center" size="medium">Open source contributions</Heading>
      </Box>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid columns={size || 'medium'} gap='small'>
            {data.github.viewer.repositoriesContributedTo.edges.map(repo => (
              <GithubRepo key={repo.node.name} repo={repo} />
            ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
    <Box margin={{ horizontal: 'xlarge' }}>
      <Box align="center" alignContent="center">
        <Heading textAlign="center" size="medium">Public repositories</Heading>
      </Box>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid columns={size || 'medium'} gap='small'>
            {data.github.viewer.repositories.edges
              .filter(node => !node.node.isArchived)
              .slice(0, 6)
              .map(repo => (
                <GithubRepo key={repo.node.name} repo={repo} />
              ))}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
    <Box margin={{ horizontal: 'xlarge' }}>
      <Box align="center" alignContent="center">
        <Heading textAlign="center" size="medium">I sometimes blog</Heading>
      </Box>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid columns={size || 'medium'} gap='small'>
            {data.allMarkdownRemark.edges.map(post => <Post key={post.node.frontmatter.path} post={post.node} />)}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  </Layout>
);

export const pageQuery = graphql`
query IndexQuery {
  avatar: file(relativePath: { eq: "me.png" }) {
    childImageSharp {
      fluid(maxWidth: 250, quality: 100) {
        src
      }
    }
  }
  allMarkdownRemark (limit: 4, sort: { order: DESC, fields: frontmatter___date}){
    edges {
      node {
        excerpt
        timeToRead
        frontmatter {
          title
          path
          tags
          date(formatString:  "MMMM DD, YYYY")
        }
      }
    }
  }
  github {
    viewer {
      repositoriesContributedTo(first: 4, orderBy: {field: STARGAZERS, direction: DESC}) {
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
      repositories(
        first: 20
        isFork: false
        orderBy: { direction: DESC, field: STARGAZERS}
      ) {
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
}`;

export default IndexPage;
