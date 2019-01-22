import React from 'react'
import { ResponsiveContext, Box, Heading } from 'grommet'
import Skill from './Skill'

type SkillsType = {
  skills: Topic[]
}

type Topic = {
  label: string
  value: number
  color: string
}

const Skills: React.SFC<SkillsType> = ({ skills }) => (
  <ResponsiveContext.Consumer>
    {size => size !== 'small' && (
      <Box
        margin={{ horizontal: 'medium', vertical: 'small' }}
        pad={{ vertical: 'small' }}
        animation="fadeIn"
        elevation="xxsmall"
        background="white"
        round="small"
        gap="small"
      >
        {skills.map(skill => (
          <Skill color={skill.color} label={skill.label} value={skill.value} />
        ))}
      </Box>
    )}
  </ResponsiveContext.Consumer>
)

export default Skills
