import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function AttributeTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">Attribute Type</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default AttributeTableHead;
