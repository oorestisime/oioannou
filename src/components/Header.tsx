import React, { useContext } from "react"
import { Box, Button, CheckBox, ResponsiveContext } from "grommet"
import { FormPreviousLink } from "grommet-icons"
import { InternalLink, BlogHeader } from "."

type HeaderProps = {
  article?: boolean
  dark?: boolean
  toggleTheme?: () => void
}

export const Header: React.SFC<HeaderProps> = ({
  article = false,
  dark,
  toggleTheme,
}) => {
  const size = useContext(ResponsiveContext)
  return (
    <Box align="center" justify="between" direction="row-responsive">
      <InternalLink key="blog" to="/blog">
        <Button as="span" plain icon={<FormPreviousLink />} />
      </InternalLink>
      {!article && <BlogHeader />}
      {size !== "small" && (
        <CheckBox checked={dark} toggle onChange={toggleTheme} />
      )}
    </Box>
  )
}
