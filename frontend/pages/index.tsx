import type { NextPage } from 'next'

import { Box, Typography } from '@mui/material'

const Home: NextPage = () => {
  return (
    <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F2FEFF',
    }}
  >
    <Typography variant="h1" color="primary">
      Internet shop
    </Typography>
  </Box>
  );
};

export default Home
