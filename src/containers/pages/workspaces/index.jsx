import React from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { formatStatus } from 'utilities/utility-functions';
import WorkspacesDetailTableHead from './components/workspacesTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Workspaces() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    workspace,
    isFetching,
  } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to update the status of this workspace?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Workspaces</Typography>
        <Stack direction="row" spacing={2}>
          <FilterField label="Search workspaces" name="search" onChange={handleSearchChange} />

          <FilterResetBtn onClick={handleResetFilters} />
        </Stack>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <WorkspacesDetailTableHead />

          {workspace?.length > 0 ? (
            <TableBody>
              {workspace?.map((val, index) => (
                <TableRow key={val.id} hover>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{val?.title ?? 'NA'}</TableCell>

                  <TableCell>{val?.active_task ?? 'NA'}</TableCell>

                  <TableCell>{val?.total_task ?? 'NA'}</TableCell>

                  <TableCell>{val?.total_task_budget ?? 'NA'}$</TableCell>

                  <TableCell>{formatStatus(val?.status)}</TableCell>

                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Link className="noWrap" style={{ color: '#422438' }} to={`/workspace/${val?.id}/`}>
                        <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                          View Detail
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog({
                          id: val.id,
                          workspace_status: val.workspace_status === 'blocked' ? 'unblocked' : 'blocked',
                        })}
                      >
                        {val.workspace_status === 'blocked' ? 'Activate' : 'Deactivate'}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  No Record Found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Workspaces;
