import React, { useContext, useState } from "react"
import { Box, Button, Heading, ResponsiveContext, Layer, Anchor } from "grommet"
import { Down, Up } from "grommet-icons"

import { InternalLink } from "."
import SiteContext from "../context"

type HeaderProps = {
  title?: string
}

export const Header: React.FunctionComponent<HeaderProps> = ({ title }) => {
  const size = useContext(ResponsiveContext)
  const site = useContext(SiteContext)
  const [layer, setLayer] = useState(false)

  return (
    <Box tag="header" background="brand" elevation="small">
      <Box
        width="xlarge"
        alignSelf="center"
        pad={{ horizontal: "xsmall", vertical: "small" }}
        justify="between"
        direction="row"
      >
        <InternalLink to="/">
          <Anchor color="dark-1" as="span">
            <Heading level="3" margin={{ left: "small", vertical: "none" }}>
              {title || `@oorestisime`}
            </Heading>
          </Anchor>
        </InternalLink>

        {size === "small" ? (
          <Button icon={<Down />} onClick={() => setLayer(true)} />
        ) : (
          <Box
            margin={{ horizontal: "medium" }}
            direction="row"
            align="center"
            gap="medium"
          >
            {site.menu.map(item => (
              <InternalLink key={item.path} to={item.path}>
                <Button as="span" plain label={item.label} />
              </InternalLink>
            ))}
          </Box>
        )}

        {layer && (
          <Layer full>
            <Box fill background="light-1" align="start" pad="small">
              <Button plain icon={<Up />} onClick={() => setLayer(false)} />
              {site.menu.map(item => (
                <InternalLink to={item.path}>
                  <Anchor label={item.label} as="span" size="large" />
                </InternalLink>
              ))}
            </Box>
          </Layer>
        )}
      </Box>
    </Box>
  )
}
