import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function SubCategoryTableHead() {
  return (
    <TableHead>
      <TableRow>
        {/* <TableCell>#</TableCell> */}
        <TableCell className="noWrap">ID#</TableCell>
        <TableCell className="noWrap">Category</TableCell>
        <TableCell>Sub category</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default SubCategoryTableHead;
