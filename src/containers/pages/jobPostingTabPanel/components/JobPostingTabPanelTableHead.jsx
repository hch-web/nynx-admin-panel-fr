import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function JobPostingTabPanelTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>ID#</TableCell>
        <TableCell className="noWrap">Title</TableCell>
        <TableCell className="noWrap">Estimated Budget</TableCell>
        <TableCell>Job Skills</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default JobPostingTabPanelTableHead;
