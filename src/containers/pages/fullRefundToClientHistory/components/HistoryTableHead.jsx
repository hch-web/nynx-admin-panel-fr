import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function HistoryTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">Dispute ID</TableCell>
        <TableCell className="noWrap">Created at</TableCell>
        <TableCell className="noWrap">Updated at</TableCell>
        <TableCell className="noWrap">Amount</TableCell>
        <TableCell className="noWrap">Client</TableCell>
        <TableCell className="noWrap">Reason</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default HistoryTableHead;
