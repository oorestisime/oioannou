import React from "react";
import { push } from "gatsby";
import { Box, Button, Text } from "grommet";
import { Tag } from "grommet-icons";
type TagsProps = {
  tags: string[]
};
const Tags: React.SFC<TagsProps> = ({ tags }) => (
  <Box direction="row-responsive" gap="xsmall">
    {tags.map(tag => (
      <Button
        icon={<Tag size="small" />}
        label={
          <Text size="medium" margin="none">
            {tag}
          </Text>
        }
        onClick={() => push(`/tag/${tag.toLowerCase()}`)}
      />
    ))}
  </Box>
);
export default Tags;
