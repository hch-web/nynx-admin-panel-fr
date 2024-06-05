import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function WorkspacesDetailTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Title</TableCell>
        <TableCell className="noWrap">Active Tasks</TableCell>
        <TableCell>Total Tasks</TableCell>
        <TableCell>Budget</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default WorkspacesDetailTableHead;
