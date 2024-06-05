import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function SocialMediaTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">ID#</TableCell>
        <TableCell className="noWrap">Name</TableCell>
        <TableCell className="noWrap">Icon</TableCell>
        <TableCell className="noWrap">Tag line</TableCell>
        <TableCell className="noWrap">Connected Accounts</TableCell>
        <TableCell align="noWrap">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default SocialMediaTableHead;
