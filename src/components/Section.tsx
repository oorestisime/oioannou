import React, { ReactChild } from "react"
import { Box, Heading } from "grommet"

interface SectionType {
  title?: string
  children: ReactChild[]
  justify?: "start" | "end" | "center" | "around" | "between"
  direction?: "column" | "row-responsive"
}

export const Section: React.FC<SectionType> = ({
  title,
  children,
  justify,
  direction = "row-responsive",
  ...rest
}) => (
  <Box width={{ max: "xxlarge" }} margin="0 auto">
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
      direction={direction}
      alignContent="center"
      {...rest}
    >
      {children}
    </Box>
  </Box>
)
