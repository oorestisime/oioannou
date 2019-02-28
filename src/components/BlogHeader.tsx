import React from "react"
import { Box, Anchor, Heading, Text } from "grommet"
import { InternalLink } from "."

export const BlogHeader = () => (
  <Box pad="small" align="center">
    <Box direction="row-responsive" gap="xsmall">
      <Heading level="1">Thoughts of</Heading>
      <InternalLink to="/">
        <Anchor
          as="span"
          label={<Heading level="1">Orestis Ioannou</Heading>}
          size="small"
        />
      </InternalLink>
    </Box>
    <Text size="small">
      I blog about OS, python, react, gatsby, grommet, debian...
    </Text>
  </Box>
)
