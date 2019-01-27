import React, { ReactChild } from 'react'
import { ResponsiveContext, Grid, Box, Heading } from 'grommet'

interface SectionType {
  title: string
  children: ReactChild[]
}

const IndexSection: React.SFC<SectionType> = ({ title, children }) => (
  <Box margin={{ horizontal: 'xlarge' }}>
    <Box align="center" alignContent="center">
      <Heading textAlign="center" size="medium">
        {title}
      </Heading>
    </Box>
    <ResponsiveContext.Consumer>
      {size => (
        <Grid columns={size || 'small'} gap="small">
          {children}
        </Grid>
      )}
    </ResponsiveContext.Consumer>
  </Box>
)

export default IndexSection
