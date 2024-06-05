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
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import Rating from 'containers/common/components/Rating';
import styles from 'styles/mui/containers/users-profile.module.scss';
import GigTableHead from './components/GigTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Gigs() {
  const { id } = useParams();
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    gigs,
    page,
    count,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    isFetching,
  } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to update the status of this gig?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Skillsets</Typography>
        <Stack direction="row" spacing={2}>
          <FilterField label="Search skillset" name="search" onChange={handleSearchChange} />

          <FilterResetBtn onClick={handleResetFilters} />
        </Stack>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <GigTableHead />

          {gigs?.length > 0 ? (
            <TableBody>
              {gigs?.map((val, index) => (
                <TableRow key={val.id} hover>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{val?.title ?? 'NA'}</TableCell>
                  <TableCell>{val?.username ?? 'NA'}</TableCell>
                  <TableCell>
                    {(val?.gig_adhoc_price_basic ? 'Fixed' : '') ||
                      (val?.gig_monthly_price_basic ? 'Monthly' : '')}
                  </TableCell>

                  <TableCell>
                    {(val?.gig_adhoc_price_basic ? val?.gig_adhoc_price_basic : '') ||
                      (val?.gig_monthly_price_basic ? val?.gig_monthly_price_basic : '')}
                  </TableCell>

                  <TableCell>
                    <Rating className={styles.ratingIcons} size="small" readOnly value={val?.rating} />
                  </TableCell>
                  <TableCell className="status">{val?.status ?? 'NA'}</TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Link
                        style={{ color: '#422438' }}
                        to={
                          id
                            ? `/freelancer/${id}/gig/${val?.id}/`
                            : `/freelancer/${val?.profile_id}/gig/${val?.id}/`
                        }
                        className="noWrap"
                      >
                        <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                          View Detail
                        </Button>
                      </Link>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog({
                          id: val.id,
                          status: val.gig_status === 'blocked' ? 'unblocked' : 'blocked',
                        })}
                      >
                        {val.gig_status === 'blocked' ? 'Activate' : 'Deactivate'}
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
        {gigs?.length > 0 && !id && (
          <Stack alignItems="end" className="mt-4">
            <TablePagination
              sx={{ '& p': { margin: 0 } }}
              rowsPerPageOptions={[8, 16, 24]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        )}
      </TableContainer>
    </Paper>
  );
}

export default Gigs;
