import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { Box, Anchor } from 'grommet';
import { Clock, History } from 'grommet-icons';
import rehypeReact from 'rehype-react';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Tags from '../components/Tags';

// eslint-disable-next-line new-cap
const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    a: Anchor,
  },
}).Compiler;

const BlogPage = props => (
  <Layout>
    <Header right title={props.data.markdownRemark.frontmatter.title} />
    <Box direction="row-responsive" justify="center" pad={{ vertical: 'xsmall' }}>
      <Box direction="row-responsive" gap="xlarge">
        <Box direction="row-responsive" gap="xsmall">
          <History />
          {`${props.data.markdownRemark.frontmatter.date}`}
          <Clock />
          {`${props.data.markdownRemark.timeToRead} min read`}
        </Box>
        <Tags tags={props.data.markdownRemark.frontmatter.tags} />
      </Box>
    </Box>
    <Box direction="row-responsive" justify="center">
      <Box width="xlarge" pad={{ horizontal: 'xlarge', vertical: 'small' }}>
        {renderAst(props.data.markdownRemark.htmlAst)}
      </Box>
    </Box>
  </Layout>
);

BlogPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      timeToRead: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      }),
      htmlAst: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
};

export default BlogPage;

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(
      frontmatter: {
        path: { eq: $path },
      }
    ) {
      htmlAst
      timeToRead
      frontmatter {
        tags
        date(formatString:  "MMMM DD, YYYY")
        title
      }
    }
  }
`;
