import React from 'react';
import { Box, Meter, Text } from 'grommet';


const Skill = ({ label, value }) => (
  <Box
    direction="row-responsive"
    gap="medium"
    margin={{ bottom: 'small', horizontal: 'medium' }}
  >
    <Text size="small" weight="bold">
      {label}
    </Text>
    <Meter
      round
      style={{ marginLeft: 'auto' }}
      margin={{ right: 'xsmall' }}
      values={[
        {
          color: '#89bdd3',
          label,
          value,
        },
        {
          color: 'light-3',
          label,
          value: 100 - value,
        },
      ]}
    />
  </Box>
);

export default Skill;
