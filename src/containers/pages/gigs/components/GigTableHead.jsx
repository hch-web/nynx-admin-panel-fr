import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function GigTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Title</TableCell>
        <TableCell className="noWrap">Username</TableCell>
        <TableCell className="noWrap">Fixed/Monthly</TableCell>
        <TableCell>Price</TableCell>
        <TableCell>Rating</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default GigTableHead;
