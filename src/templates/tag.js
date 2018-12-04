import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Grid } from 'grommet';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Post from '../components/Post';

const Tag = ({ pageContext: { title, posts } }) => (
  <Layout>
    <Header right title={`Tag: ${title}`} />
    <Box margin={{ horizontal: 'large' }}>
      <ResponsiveContext.Consumer>
        {size => (
          <Grid
            align="start"
            columns={size !== 'small' && { count: 'fill', size: 'large' }}
            gap="medium"
          >
            {posts.map(post => <Post key={post.frontmatter.path} post={post} />)}
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  </Layout>
);

Tag.propTypes = {
  pageContext: PropTypes.shape({
    title: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Tag;
