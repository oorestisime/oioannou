import React, { ReactChild } from "react"
import { Box, Heading } from "grommet"

interface SectionType {
  title?: string
  children: ReactChild[]
  justify?: "start" | "end" | "center" | "around" | "between"
}

export const Section: React.FC<SectionType> = ({
  title,
  children,
  justify,
}) => (
  <Box>
    {title && (
      <Box align="center" alignContent="center">
        <Heading textAlign="center" size="medium">
          {title}
        </Heading>
      </Box>
    )}

    <Box
      wrap
      margin={{ horizontal: "medium" }}
      justify={justify || "center"}
      direction="row-responsive"
      gap="small"
    >
      {children}
    </Box>
  </Box>
)
