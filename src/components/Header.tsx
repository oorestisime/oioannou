import React, { useContext } from "react"
import { Box, Button, CheckBox, ResponsiveContext } from "grommet"
import { FormPreviousLink, Home } from "grommet-icons"
import { InternalLink, BlogHeader } from "."

type HeaderProps = {
  article?: boolean
  dark?: boolean
  backHome?: boolean
  toggleTheme?: () => void
}

export const Header: React.SFC<HeaderProps> = ({
  article = false,
  backHome = false,
  dark,
  toggleTheme,
}) => {
  const size = useContext(ResponsiveContext)
  return (
    <Box align="center" justify="between" direction="row-responsive">
      {backHome ? (
        <InternalLink key="blog" to="/">
          <Button as="span" plain icon={<Home />} />
        </InternalLink>
      ) : (
        <InternalLink key="blog" to="/blog">
          <Button as="span" plain icon={<FormPreviousLink />} />
        </InternalLink>
      )}
      {!article && <BlogHeader />}
      {size !== "small" && (
        <CheckBox checked={dark} toggle onChange={toggleTheme} />
      )}
    </Box>
  )
}
