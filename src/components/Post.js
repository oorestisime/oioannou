import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'gatsby';
import {
  Box, Heading, Paragraph,
  Text, Anchor,
} from 'grommet';
import { Clock, Calendar } from 'grommet-icons';

import Tags from './Tags';

const Post = ({ post }) => (
  <Box align="start" fill pad="small">
    <Box fill="horizontal" elevation="small" round="xsmall" pad="small">
      <Heading
        level="3"
        margin="none"
        onClick={() => push(post.frontmatter.path)}
      >
        {post.frontmatter.title}
      </Heading>
      <Box direction="row" gap="xsmall" align="center" margin={{ top: "xsmall" }}>
        <Calendar size="small" />
        <Text size="small">{post.frontmatter.date}</Text>
        <Clock size="small" />
        <Text size="small">{post.timeToRead} min read</Text>
      </Box>
      <Paragraph size="small" margin={{ horizontal: 'medium' }}>
        {post.excerpt}
        <Anchor href={post.frontmatter.path} label="Read more" size="small" />
      </Paragraph>
      <Box gap="xsmall" direction="row" wrap align="center">
        <Tags tags={post.frontmatter.tags} />
      </Box>
    </Box>
  </Box>
);

Post.propTypes = {
  post: PropTypes.shape({

  }).isRequired,
};


export default Post;
