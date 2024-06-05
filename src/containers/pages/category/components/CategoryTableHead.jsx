import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function CategoryTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">ID#</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CategoryTableHead;
