import React from 'react';
import { TableCell, TableHead, TableRow } from '@mui/material';

function TicketAndSupportTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">Dispute ID</TableCell>
        <TableCell className="noWrap">Subject</TableCell>
        <TableCell className="noWrap">Reason</TableCell>
        <TableCell className="noWrap">Requested By</TableCell>
        <TableCell className="noWrap">Client</TableCell>
        <TableCell className="noWrap">Freelancer</TableCell>
        <TableCell className="noWrap">Status</TableCell>
        <TableCell className="noWrap">Created At</TableCell>
        <TableCell className="noWrap">Action</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TicketAndSupportTableHead;
