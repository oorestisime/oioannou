import React from 'react';
import { Box, Heading } from 'grommet';

const SkillsBox = ({ area, children }) => (
  <Box
    margin={{ horizontal: 'medium', vertical: 'small' }}
    animation="fadeIn"
    elevation="xxsmall"
    gridArea={area}
    background="white"
    round="small"
    gap="small"
  >
    <Heading level="2" textAlign="center" size="small">{area}</Heading>
    {children}
  </Box>
);

export default SkillsBox;
