import React, { ReactChild } from "react"
import { Grommet } from "grommet"
import { createGlobalStyle } from "styled-components"

import data from "../data"
import SiteContext from "../context"
import { customTheme } from "../theme"
import { Footer } from "."

interface LayoutProps {
  children: ReactChild[]
}

const FullGlobalStyle = createGlobalStyle`
  body { margin: 0; }
`

export const Layout: React.SFC<LayoutProps> = props => (
  <SiteContext.Provider value={data}>
    <FullGlobalStyle />
    <Grommet theme={customTheme}>
      {props.children}
      <Footer />
    </Grommet>
  </SiteContext.Provider>
)
