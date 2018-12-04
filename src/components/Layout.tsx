import React from 'react'
import { Box, Grommet, Heading } from 'grommet'
import { customTheme, GlobalTheme } from '../theme'

const Layout = props => (
  <Grommet theme={customTheme}>
    <GlobalTheme />
    {props.children}
    <Box background="brand">
      <Box animation="fadeIn" align="center" alignContent="center" margin={{ horizontal: 'medium' }}>
        <Heading color="white" level="4" size="small" margin={{ top: 'large' }}>
          Made with excitement, Grommet and Gatsby
        </Heading>
      </Box>
    </Box>
  </Grommet>
)

export default Layout
