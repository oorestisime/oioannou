import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'gatsby';
import {
  Box, Heading, Paragraph, Button,
} from 'grommet';
import { Down, Clock, History } from 'grommet-icons';

import Tags from './Tags';

const Post = ({ post }) => (
  <Box
    margin="small"
    pad="small"
    border="all"
    overflow="hidden"
    elevation="small"
  >
    <Box direction="row-responsive" gap="xsmall" justify="between">
      <Heading
        size="small"
        level="3"
        margin="none"
        onClick={() => push(post.frontmatter.path)}
      >
        {post.frontmatter.title}
      </Heading>
      <Box direction="row" gap="xsmall">
        <History />
        {`${post.frontmatter.date}`}
        <Clock />
        {`${post.timeToRead} min read`}
      </Box>
    </Box>
    <Paragraph margin={{ horizontal: 'medium' }}>{post.excerpt}</Paragraph>
    <Box direction="row" justify="between" fill="horizontal">
      <Tags tags={post.frontmatter.tags} />
      <Button icon={<Down />} onClick={() => push(post.frontmatter.path)} />
    </Box>
  </Box>
);

Post.propTypes = {
  post: PropTypes.shape({

  }).isRequired,
};


export default Post;
