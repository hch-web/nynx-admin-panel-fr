import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function FeaturesTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">ID#</TableCell>
        <TableCell className="noWrap">Field Name</TableCell>
        <TableCell className="noWrap">Field Type</TableCell>
        <TableCell className="noWrap">Is Required</TableCell>
        <TableCell className="noWrap">SubCategory</TableCell>
        <TableCell className="noWrap">Text Limitation</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default FeaturesTableHead;
