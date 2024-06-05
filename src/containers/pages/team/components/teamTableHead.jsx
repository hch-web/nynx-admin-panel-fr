import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function FreelancerTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell>Profile</TableCell>
        <TableCell>Hiring Date</TableCell>
        <TableCell>Rating</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default FreelancerTableHead;
