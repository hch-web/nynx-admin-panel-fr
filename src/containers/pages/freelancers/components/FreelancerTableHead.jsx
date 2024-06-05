import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function FreelancerTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell>Total Completed Jobs</TableCell>
        <TableCell>Total Earning</TableCell>
        <TableCell>Rating</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default FreelancerTableHead;
