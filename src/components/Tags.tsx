import React from "react"
import { Box, Text } from "grommet"
import { InternalLink } from "."
interface TagsProps {
  tags: string[]
}

export const Tags: React.SFC<TagsProps> = ({ tags }) => (
  <Box wrap direction="row" gap="xsmall">
    {tags.map(tag => (
      <InternalLink key={tag} to={`/tag/${tag.toLowerCase()}`}>
        <Box
          margin={{ top: "xsmall" }}
          background="brand"
          round="xsmall"
          pad={{ horizontal: "xsmall" }}
        >
          <Text size="small">{tag}</Text>
        </Box>
      </InternalLink>
    ))}
  </Box>
)
