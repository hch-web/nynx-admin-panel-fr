import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

function TasksTabPanelTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="noWrap">Expert</TableCell>
        <TableCell className="noWrap">Task</TableCell>
        <TableCell>Budget</TableCell>
        <TableCell>Time</TableCell>
        <TableCell>Status</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}

export default TasksTabPanelTableHead;
