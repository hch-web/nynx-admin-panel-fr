import React from 'react';
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function PageBackBtn() {
  return (
    <Stack direction="row" spacing={2} className="mb-3" justifyContent="flex-end" width={1}>
      <Button variant="contained" size="small" component={Link} to={-1}>
        Back
      </Button>
    </Stack>
  );
}

export default PageBackBtn;
