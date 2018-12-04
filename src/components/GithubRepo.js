import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Paragraph,
} from 'grommet';
import { Star, Language } from 'grommet-icons';

const GithubRepo = ({ repo }) => (
  <Box
    margin="xsmall"
    animation="slideUp"
    pad="xsmall"
    elevation="small"
  >
    <Heading
      size="small"
      level="3"
      margin="xsmall"
    >
      {repo.node.nameWithOwner || repo.node.name}
    </Heading>
    <Paragraph margin={{ horizontal: 'medium' }} size="small">{repo.node.description}</Paragraph>
    <Box direction="row" justify="between" fill="horizontal">
      <Box direction="row" gap="xsmall" pad="xsmall">
        <Star color="brand" />
        {repo.node.stargazers.totalCount}
      </Box>

      <Box direction="row" gap="xsmall" pad="xsmall">
        <Language color="brand" />
        {repo.node.primaryLanguage.name}
      </Box>
    </Box>
  </Box>
);

GithubRepo.propTypes = {
  repo: PropTypes.shape({
    node: PropTypes.shape({
      nameWithOwner: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string.isRequired,
      primaryLanguage: PropTypes.shape({
        name: PropTypes.string,
      }).isRequired,
      stargazers: PropTypes.shape({
        totalCount: PropTypes.number,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};


export default GithubRepo;
