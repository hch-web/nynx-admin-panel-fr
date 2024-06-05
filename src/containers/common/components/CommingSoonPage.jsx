import { Paper, Typography } from '@mui/material';
import React from 'react';

function CommingSoonPage() {
  return (
    <Paper
      className="d-flex align-items-center justify-content-center p-4"
      sx={{ height: '80vh' }}
    >
      <Typography variant="h6">
        This feature is not available will be live soon!
      </Typography>
    </Paper>
  );
}

export default CommingSoonPage;
