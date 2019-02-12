import React from "react"
import { Box, Meter, Text } from "grommet"

interface SkillProps {
  label: string
  value: number
  color?: string
}

const Skill: React.SFC<SkillProps> = ({ label, value, color }) => (
  <Box
    justify="end"
    key={label}
    direction="row-responsive"
    gap="medium"
    margin={{ bottom: "small", horizontal: "medium" }}
  >
    <Text size="small" weight="bold">
      {label}
    </Text>
    <Meter
      round
      margin={{ right: "xsmall" }}
      values={[
        {
          label,
          value,
          color: color || "#89bdd3",
        },
        {
          label,
          color: "light-3",
          value: 100 - value,
        },
      ]}
    />
  </Box>
)

export default Skill
