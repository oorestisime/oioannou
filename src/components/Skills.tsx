import React from 'react'
import { ResponsiveContext, Box, Heading } from 'grommet'
import Skill from './Skill'

type SkillsType = {
  skills: Topic[]
}

type Topic = {
  area: string
  label: string
  values: {
    label: string
    value: number
  }[]
}

const Skills: React.SFC<SkillsType> = ({ skills }) => (
  <ResponsiveContext.Consumer>
    {size =>
      size !== 'small' &&
      skills.map(skill => (
        <Box
          margin={{ horizontal: 'medium', vertical: 'small' }}
          animation="fadeIn"
          elevation="xxsmall"
          gridArea={skill.area}
          background="white"
          round="small"
          gap="small"
          key={skill.area}
        >
          <Heading level="2" textAlign="center" size="small">
            {skill.label}
          </Heading>
          {skill.values.map(skill => (
            <Skill label={skill.label} value={skill.value} />
          ))}
        </Box>
      ))
    }
  </ResponsiveContext.Consumer>
)

export default Skills
