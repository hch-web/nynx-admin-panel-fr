import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function AnalyticsTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell className="noWrap">Total Income</TableCell>
        <TableCell className="noWrap">Average Tasks Price</TableCell>
        <TableCell>Completed Tasks</TableCell>
        <TableCell>Cancelled Tasks</TableCell>
        <TableCell className="noWrap">In Escrow</TableCell>
        <TableCell>Pending Clearance</TableCell>
        <TableCell>Average Task Price</TableCell>
        <TableCell>Available for Withdraw</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default AnalyticsTableHead;
