import React from 'react';
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
// import { Link } from 'react-router-dom';

// COMPONENTS
import DialogBox from 'containers/common/components/DialogBox';
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { sumArrayElement } from 'utilities/helpers';
import { Link } from 'react-router-dom';
import JobPostingTabPanelTableHead from './components/JobPostingTabPanelTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function JobPostingTabPanel() {
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,
    jobs,
    isFetching,
  } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to update the status of this Job?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />

      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Typography variant="h5">Jobs</Typography>
        <Stack direction="row" spacing={2}>
          <FilterField label="Search jobs" name="search" onChange={handleSearchChange} />

          <FilterResetBtn onClick={handleResetFilters} />
        </Stack>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <JobPostingTabPanelTableHead />

          {jobs?.length > 0 ? (
            <TableBody>
              {jobs?.map((val, index) => (
                <TableRow key={val.id} hover>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{val?.title ?? 'NA'}</TableCell>

                  {/* <TableCell>{val?.active_task ?? 'NA'}</TableCell> */}

                  <TableCell> ${sumArrayElement(jobs[index]?.job_skills, 'budget_amount')}</TableCell>

                  <TableCell>
                    {val.job_skills.map(item => (
                      <Tooltip title={`${item.budget_amount}`} key={item.id}>
                        <Chip
                          label={`${item.title}`}
                          variant="contained"
                          className="mt-2 me-2 p-2 align-self-start hover"
                          key={item.id}
                          sx={{ background: '#FFE3C5' }}
                        />
                      </Tooltip>
                    ))}
                  </TableCell>

                  <TableCell className="status">{val.status}</TableCell>

                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Link className="noWrap" style={{ color: '#422438' }} to={`/job/${val?.id}/`}>
                        <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                          View Detail
                        </Button>
                      </Link>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog({
                          id: val.id,
                          job_status: val.job_status === 'blocked' ? 'unblocked' : 'blocked',
                        })}
                      >
                        {val.job_status === 'blocked' ? 'Activate' : 'Deactivate'}
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

export default JobPostingTabPanel;
