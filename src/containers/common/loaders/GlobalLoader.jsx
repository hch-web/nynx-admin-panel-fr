import React from 'react';
import { Box } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';

function GlobalLoader() {
  return (
    <Box className="d-flex align-items-center justify-content-center vh-100">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#002E6D"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible
      />
    </Box>
  );
}

export default GlobalLoader;
