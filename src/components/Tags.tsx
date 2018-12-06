import React from 'react'
import { push } from 'gatsby'
import { Box, Button, Text } from 'grommet'
type TagsProps = {
  tags: string[]
}
const Tags: React.SFC<TagsProps> = ({ tags }) => (
  <Box direction="row" gap="xsmall">
    {tags.map(tag => (
      <Button key={tag} onClick={() => push(`/tag/${tag.toLowerCase()}`)}>
        <Box margin={{ top: 'xsmall' }} background="brand" round="xsmall" pad={{ horizontal: 'xsmall' }}>
          <Text size="small">{tag}</Text>
        </Box>
      </Button>
    ))}
  </Box>
)
export default Tags
