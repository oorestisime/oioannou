import React, { useContext } from "react"
import { Box, Heading, Anchor } from "grommet"
import { Gremlin, Favorite } from "grommet-icons"
import SiteContext from "../context"

export const Footer = () => {
  const data = useContext(SiteContext)
  return (
    <Box background="dark-2">
      <Box
        animation="fadeIn"
        align="center"
        alignContent="center"
        margin={{ horizontal: "medium" }}
      >
        <Heading
          level="4"
          size="small"
          margin={{ top: "large", bottom: "none" }}
        >
          Made with <Favorite color="brand" />{" "}
          <Anchor
            icon={<Gremlin color="brand" />}
            href="//grommet.io"
            target="_blank"
          />{" "}
          and <Anchor label="Gatsby" href="//gatsbyjs.org" target="_blank" />.
        </Heading>
        {data.social.github && (
          <Anchor
            label="Get source from Github"
            href={data.social.github}
            target="_blank"
          />
        )}
      </Box>
    </Box>
  )
}
