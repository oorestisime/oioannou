import React from 'react'
import { push } from 'gatsby'
import { Box, Button, Heading, ResponsiveContext, Layer, RoutedAnchor, Text } from 'grommet'
import { Down, Up } from 'grommet-icons'

import SiteContext from '../context'

type HeaderProps = {
  title?: string
  toggleLayer: any
}

class Header extends React.Component<HeaderProps, {}> {
  state = {
    showLayer: false
  }

  render() {
    const { title } = this.props
    return (
      <SiteContext.Consumer>
        {site => (
          <Box pad="small" tag="header" direction="row" background="white" align="center" elevation="medium" justify="between">
            <Button>
              <Box flex={false} direction="row" align="center" margin={{ left: 'small' }}>
                <Heading level="2" margin={{ left: 'small', vertical: 'none' }}>
                  {title}
                </Heading>
              </Box>
            </Button>

            <ResponsiveContext.Consumer>
              {size =>
                size === 'small' ? (
                  <Button icon={<Down />} onClick={() => this.setState({ showLayer: true })} />
                ) : (
                  <Box direction="row" align="center" gap="small">
                    {site.menu.map(item => (
                      <Button onClick={() => push(item.path)} label={item.label} />
                    ))}
                  </Box>
                )
              }
            </ResponsiveContext.Consumer>

            {this.state.showLayer && (
              <Layer full>
                <Box fill background="light-1" align="start" pad="small">
                  <Button icon={<Up />} onClick={() => this.setState({ showLayer: false })} />
                  {site.menu.map(item => (
                    <RoutedAnchor method={push} path={item.path}>
                      <Text size="large">{item.label}</Text>
                    </RoutedAnchor>
                  ))}
                </Box>
              </Layer>
            )}
          </Box>
        )}
      </SiteContext.Consumer>
    )
  }
}

Header.defaultProps = {
  title: 'Blog'
}

export default Header
