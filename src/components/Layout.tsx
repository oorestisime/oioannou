import React, { ReactChild } from 'react'
import { Box, Grommet, Heading, Anchor } from 'grommet'
import { Gremlin, Favorite } from 'grommet-icons'
import { customTheme, GlobalTheme } from '../theme'

type LayoutProps = {
  children: ReactChild[]
}

const Layout: React.SFC<LayoutProps> = props => (
  <Grommet theme={customTheme}>
    <GlobalTheme />
    {props.children}
    <Box background="dark-2">
      <Box animation="fadeIn" align="center" alignContent="center" margin={{ horizontal: 'medium' }}>
        <Heading level="4" size="small" margin={{ top: 'large', bottom: 'none' }}>
          Made with <Favorite color="brand" /> <Anchor icon={<Gremlin color="brand" />} href="//grommet.io" target="_blank" /> and{' '}
          <Anchor label="Gatsby" href="//gatsbyjs.org" target="_blank" />.
        </Heading>
        <Anchor
          margin={{ bottom: 'small' }}
          label="Get source from Github"
          href="//github.com/oorestisime/oioannou/tree/next"
          target="_blank"
        />
      </Box>
    </Box>
  </Grommet>
)

export default Layout
