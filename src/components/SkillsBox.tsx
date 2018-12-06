import React, { ReactChild } from 'react'
import { Box, Heading } from 'grommet'

type SkillsBoxProps = {
  area: string
  children: ReactChild[]
}

const SkillsBox: React.SFC<SkillsBoxProps> = ({ area, children }) => (
  <Box
    margin={{ horizontal: 'medium', vertical: 'small' }}
    animation="fadeIn"
    elevation="xxsmall"
    gridArea={area}
    background="white"
    round="small"
    gap="small"
  >
    <Heading level="2" textAlign="center" size="small">
      {area}
    </Heading>
    {children}
  </Box>
)

export default SkillsBox
