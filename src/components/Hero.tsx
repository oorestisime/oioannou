import React, { ReactChild } from 'react'
import Img from 'gatsby-image'
import { Box, Heading, ResponsiveContext } from 'grommet'

interface HeroType {
  image: object
  title: string
  subtitle: ReactChild[]
  anchor: ReactChild
  background?: string
}

const Hero: React.SFC<HeroType> = ({ image, title, subtitle, anchor, background = 'dark-2' }) => {
  return (
    <Box height="100vh" background={background} align="center" justify="center">
      <ResponsiveContext.Consumer>
        {size => (
          <Box margin="medium" direction={size === 'small' ? 'column' : 'row'} gap="medium">
            <Box margin={{ vertical: `${size === 'small' ? 'none' : size}` }} alignSelf="center">
              <Img alt="avatar" fixed={image} />
            </Box>
            <Box alignSelf="center">
              <Heading>
                <strong>{title}</strong>
              </Heading>
              {subtitle}
              {anchor}
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Box>
  )
}

export default Hero
