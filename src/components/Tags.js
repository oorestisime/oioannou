import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'gatsby';
import { Box, Button, Text } from 'grommet';
import { Tag } from 'grommet-icons';


const Tags = ({ tags }) => (
  <Box direction="row-responsive" gap="xsmall">
    {tags.map(tag => (
      <Button icon={<Tag size="small" />} label={<Text size="medium" margin="none">{tag}</Text>} onClick={() => push(`/tag/${tag.toLowerCase()}`)} />
    ))}
  </Box>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
