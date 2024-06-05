import React, { useState } from 'react';
import { Paper, Stack, Typography } from '@mui/material';

import TicketAndSupportTable from './components/TicketAndSupportTable';
import TicketDialog from './components/TicketDialog';

function TicketAndSupport() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleToggle = () => {
    setDialogOpen(prevState => !prevState);
  };

  return (
    <Paper className="p-3">
      <TicketDialog isOpen={isDialogOpen} handleClose={handleToggle} />

      <Stack
        direction="row"
        flexWrap={{ xs: 'wrap', md: 'nowrap' }}
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        gap={2}
      >
        <Typography variant="h5">Dispute Requests</Typography>
      </Stack>

      <TicketAndSupportTable />
    </Paper>
  );
}

export default TicketAndSupport;
