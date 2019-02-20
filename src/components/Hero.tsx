import React, { ReactChild, useContext } from "react"
import Img from "gatsby-image"
import { Box, Heading, ResponsiveContext, Text } from "grommet"

interface HeightType {
  [key: string]: string
}

const HEIGHT: HeightType = {
  small: `100vh`,
  medium: `100vh`,
  large: `40vh`,
}
interface HeroType {
  image: object
  title: string
  subtitle: ReactChild[]
  anchor: ReactChild[]
  background?: string
}

export const Hero: React.SFC<HeroType> = ({
  image,
  title,
  subtitle,
  anchor,
  background = "dark-2",
}) => {
  const size = useContext(ResponsiveContext)
  return (
    <Box
      height={HEIGHT[size]}
      background={background}
      align="center"
      justify="center"
    >
      <Box
        margin="medium"
        direction={size === "small" ? "column" : "row"}
        gap="medium"
      >
        <Box
          margin={{ vertical: `${size === "small" ? "none" : size}` }}
          alignSelf="center"
        >
          <Img alt="avatar" fixed={image} />
        </Box>
        <Box alignSelf="center">
          <Heading>
            <strong>{title}</strong>
          </Heading>
          {subtitle}
          <Box direction="row" gap="xsmall" align="center">
            <Text>Follow me on</Text>
            {anchor.map(link => link)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
