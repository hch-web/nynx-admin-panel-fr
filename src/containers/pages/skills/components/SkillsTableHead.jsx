import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function SkillsTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">ID#</TableCell>
        <TableCell className="noWrap">Title</TableCell>
        <TableCell className="noWrap">Budget Type</TableCell>
        <TableCell className="noWrap">Budget Amount</TableCell>
        <TableCell className="noWrap">Category</TableCell>
        <TableCell className="noWrap">SubCategory</TableCell>
        <TableCell className="noWrap">Is Hired</TableCell>
        <TableCell className="noWrap">Is Closed</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default SkillsTableHead;
