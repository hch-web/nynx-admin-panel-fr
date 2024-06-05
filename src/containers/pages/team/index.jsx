import React from 'react';
import {
  Avatar,
  Backdrop,
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
import styles from 'styles/mui/containers/users-profile.module.scss';

import Rating from 'containers/common/components/Rating';
import { formatName } from 'utilities/helpers';
// COMPONENTS
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import moment from 'moment';
import FreelancerTableHead from './components/teamTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Team() {
  const { handleResetFilters, handleSearchChange, freelancers, isFetching } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
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

                  <TableCell>{formatName(val?.freelancer_first_name, val?.freelancer_last_name)}</TableCell>

                  <TableCell className="d-flex justify-content-center">
                    <Avatar className="me-2" src={val?.freelancer_image} alt="A" />
                  </TableCell>

                  <TableCell>{moment(val?.hiring_date).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Rating className={styles.ratingIcons} size="small" readOnly value={val?.rating} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  No Record Found!
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default Team;
