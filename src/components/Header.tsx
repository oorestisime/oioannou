import React from 'react'
import { push } from 'gatsby'
import { Box, Button, Heading } from 'grommet'
import { Home, Article } from 'grommet-icons'

type HeaderProps = {
  title: string
}

const Header: React.SFC<HeaderProps> = ({ title }) => (
  <Box tag="header" background="brand" animation="fadeIn" direction="row" justify="between">
    <Button icon={<Home color="white" />} hoverIndicator onClick={() => push('/')} />
    <Heading textAlign="center" color="white" margin="none" level="2">
      {title}
    </Heading>
    <Button icon={<Article color="white" />} hoverIndicator onClick={() => push('/blog')} />
  </Box>
)

export default Header
