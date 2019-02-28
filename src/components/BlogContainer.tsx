import React, { ReactChild } from "react"
import { Box } from "grommet"

type BlogContainerType = {
  dark: boolean
  children: ReactChild[]
}

export const BlogContainer: React.SFC<BlogContainerType> = ({
  dark,
  children,
}) => (
  <Box background={dark ? "dark-1" : "light-1"}>
    <Box
      alignSelf="center"
      width="xlarge"
      pad={{ horizontal: "medium", vertical: "small" }}
    >
      {children}
    </Box>
  </Box>
)
