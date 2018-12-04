import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'gatsby';
import { Box, Button, Text } from 'grommet';


const Tags = ({ tags }) => (
  <Box direction="row-responsive" gap="xsmall">
    {tags.map(tag => (
      <Button onClick={() => push(`/tag/${tag.toLowerCase()}`)}>
        <Box
          margin={{ top: "xsmall" }}
          background="brand"
          round="xsmall"
          pad={{ horizontal: "xsmall" }}
        >
          <Text size="small">{tag}</Text>
        </Box>
      </Button>
    ))}
  </Box>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
