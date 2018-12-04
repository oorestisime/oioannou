import React from 'react';
import PropTypes from 'prop-types';
import { push } from 'gatsby';
import { Box, Heading, Button } from 'grommet';
import { Home, Catalog } from 'grommet-icons';


const Header = ({ title, right }) => (
  <Box
    tag="header"
    background="brand"
    pad="small"
    animation="fadeIn"
    direction="row"
    justify="between"
  >
    <Box align="center">
      <Heading margin="none" alignSelf="center" level="1" color="white" size="small">{title}</Heading>
    </Box>
    <Box margin="none" alignSelf="end" direction="row-responsive">
      {right && [
        <Button icon={<Home color="white" />} onClick={() => push('/')} />,
        <Button icon={<Catalog color="white" />} onClick={() => push('/blog')} />,
      ]}
    </Box>
  </Box>
);

Header.defaultProps = {
  right: false,
};


Header.propTypes = {
  title: PropTypes.string.isRequired,
  right: PropTypes.bool,
};


export default Header;
