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
import styles from 'styles/mui/containers/users-profile.module.scss';

import Rating from 'containers/common/components/Rating';
import { formatName } from 'utilities/helpers';
// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import FreelancerTableHead from './components/FreelancerTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Freelancer() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    freelancers,
    isFetching,
  } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to update the status of this user?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Freelancers</Typography>
        <Stack direction="row" spacing={2}>
          <FilterField label="Search Freelancers" name="search" onChange={handleSearchChange} />

          <FilterResetBtn onClick={handleResetFilters} />
        </Stack>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <FreelancerTableHead />
          {freelancers?.length > 0 ? (
            <TableBody>
              {freelancers?.map((val, index) => (
                <TableRow key={val.id} hover>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{formatName(val?.first_name, val?.first_name, val?.user.username)}</TableCell>

                  <TableCell>{val?.total_completed_job ?? 'NA'}</TableCell>

                  <TableCell>${val?.total_earning ?? '00'}</TableCell>
                  <TableCell>
                    <Rating className={styles.ratingIcons} size="small" readOnly value={val?.rating} />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Link className="noWrap" style={{ color: '#422438' }} to={`/freelancer/${val?.id}/`}>
                        <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                          View Detail
                        </Button>
                      </Link>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog({
                          id: val.id,
                          status: val.profile_status === 'blocked' ? 'unblocked' : 'blocked',
                        })}
                      >
                        {val.profile_status === 'blocked' ? 'Activate' : 'Deactivate'}
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

export default Freelancer;
