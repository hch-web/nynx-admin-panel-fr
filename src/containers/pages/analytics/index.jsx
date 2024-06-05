import React from 'react';
import {
  Backdrop,
  Box,
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
import { formatName, getMonthListTillCurrentMonth } from 'utilities/helpers';

import SelectField from 'shared/SelectField';
// import FormikField from 'shared/FormikField';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import AnalyticsTableHead from './components/AnalyticsTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function Analytics() {
  // Current Month
  const date = new Date();
  const currentMonth = date.getMonth();
  const monthFilterOptions = [
    { label: 'All', value: null },
    { label: 'This Month', value: currentMonth + 1 },
    ...getMonthListTillCurrentMonth(),
  ];
  const { handleSetMonthFilters, filters, analytics, isFetching, handleSearchChange, handleResetFilters } =
    useGetUtilsHandlers();
  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Analytics</Typography>
        <Box className="d-flex gap-4">
          <SelectField
            classNames="col-5"
            options={monthFilterOptions}
            value={filters?.month}
            onChange={handleSetMonthFilters}
            placeholder="Select Filter"
          />
          <Stack direction="row" spacing={2}>
            <FilterField label="Search Freelancer" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>
        </Box>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <AnalyticsTableHead />

          {analytics?.length > 0 ? (
            <TableBody>
              {analytics?.map((val, index) => (
                <TableRow key={val.id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="noWrap">{formatName(val?.first_name, val?.last_name)}</TableCell>
                  <TableCell>{val?.total_earning || 0}</TableCell>
                  <TableCell>{val?.average_task_price || 0}</TableCell>

                  <TableCell>{val?.total_completed_task || 0}</TableCell>
                  <TableCell>{val?.total_canceled_task || 0}</TableCell>
                  <TableCell>{val?.panding_balance || 0}</TableCell>
                  <TableCell>{val?.panding_balance_for_escrow || 0}</TableCell>
                  <TableCell>{val?.available_balance || 0}</TableCell>
                  <TableCell>{val?.total_task || 0}</TableCell>
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

export default Analytics;
