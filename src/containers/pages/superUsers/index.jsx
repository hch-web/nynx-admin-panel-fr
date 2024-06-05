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
import UsersTableHead from './components/UsersTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function SuperUsers() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    isFetching,
    users,
  } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to delete this user?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />
      <Stack direction="row" spacing={2} mb={2}>
        <Typography variant="h5">Super User</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Stack direction="row" spacing={2}>
          <FilterField label="Search Super Users" name="search" onChange={handleSearchChange} />

          <FilterResetBtn onClick={handleResetFilters} />
        </Stack>

        <Link to="/super-user/add">
          <Button color="primary" variant="contained">
            Add User
          </Button>
        </Link>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <UsersTableHead />

          {users?.length > 0 ? (
            <TableBody>
              {users?.map((user, index) => (
                <TableRow key={user.id} hover>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{user?.first_name ?? 'NA'}</TableCell>

                  <TableCell>{user?.last_name ?? 'NA'}</TableCell>

                  <TableCell>{user?.email ?? 'NA'}</TableCell>

                  <TableCell>{user?.role === 'S' ? 'Super Admin' : user?.role}</TableCell>

                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Link className="noWrap" style={{ color: '#422438' }} to={`/profile/${user?.id}/`}>
                        <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                          View Detail
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog({
                          id: user.id,
                          status: user.profile_status === 'blocked' ? 'unblocked' : 'blocked',
                        })}
                      >
                        {user.profile_status === 'blocked' ? 'Activate' : 'Deactivate'}
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

export default SuperUsers;
