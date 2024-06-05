import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function ClientTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell>Total Jobs</TableCell>
        <TableCell>Total Completed Jobs</TableCell>
        <TableCell>Total Investment</TableCell>
        <TableCell>Rating</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default ClientTableHead;
