import React from 'react';
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { tasksGigMainImgStyles } from 'styles/containers/workspace-styles';
// COMPONENTS
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { ADHOC, COMPLETED, IN_PROGRESS, MONTHLY, PROJECT_BASED } from 'utilities/constants';
import moment from 'moment';
import { conditionalBadgeOfExpert } from 'utilities/helpers';
import { formatStatus } from 'utilities/utility-functions';
import DialogBox from 'containers/common/components/DialogBox';
import TasksTabPanelTableHead from './components/TasksTabPanelTableHead';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';

function TasksTabPanel() {
  const { id } = useParams();
  const {
    handleCloseDialog,
    handleDelete,
    handleOpenDialog,
    handleResetFilters,
    handleSearchChange,
    isDialogOpen,

    tasks,
    isFetching,
  } = useGetUtilsHandlers();

  return (
    <Paper className="p-3" sx={{ minHeight: '80vh' }}>
      <DialogBox
        isOpen={isDialogOpen}
        title="Are you sure to update the status of this task?"
        handleConfirm={handleDelete}
        handleClose={handleCloseDialog}
      />
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <Stack direction="row" spacing={2}>
          <FilterField label="Search Task" name="search" onChange={handleSearchChange} />

          <FilterResetBtn onClick={handleResetFilters} />
        </Stack>
      </Stack>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table>
          <TasksTabPanelTableHead />

          {tasks?.length > 0 ? (
            <TableBody>
              {tasks?.map(val => (
                <TableRow key={val.id} hover>
                  <TableCell>
                    <Box className="d-flex align-items-start gap-4">
                      <Avatar className="me-2" src={val?.prof_img} alt="A" />
                      <Typography variant="body2" className="fw-600 d-flex flex-column text-center">
                        <span>{`${val?.first_name} ${val?.last_name[0]}`}</span>

                        <img
                          src={conditionalBadgeOfExpert(val?.seller_level)}
                          style={{ width: '70px' }}
                          alt="profile-level-badge"
                        />
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box className="d-flex flex-row gap-2">
                      <Box
                        sx={{
                          background: `#f3f3f3 url(${val?.gig_main_image}) no-repeat center`,
                          ...tasksGigMainImgStyles,
                        }}
                      />
                      <Typography variant="body2" className="fw-600 mb-2 align-self-center">
                        {val?.title}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>
                    {' '}
                    <>
                      <Typography variant="body2" className="fw-600 mb-2">
                        {`$${Math.floor(val?.rates)}`}
                      </Typography>

                      <Typography variant="body2" className="text-muted text-capitalize">
                        {val?.budget_type === PROJECT_BASED ? ADHOC : MONTHLY}
                      </Typography>
                    </>
                  </TableCell>
                  <TableCell>
                    <Box className="d-flex align-items-start gap-1">
                      <Box>
                        <Typography variant="body2" className="fw-600">
                          {val?.label}
                        </Typography>

                        <Typography variant="body2">{val?.value}</Typography>
                      </Box>

                      {val?.timer && <img src={val?.timer} alt="timer" />}
                    </Box>
                    <Typography variant="body2" className="text-muted">
                      {val !== COMPLETED &&
                        val !== IN_PROGRESS &&
                        `Started - ${moment(val?.hiring_date).format('D MMM, YYYY')}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {val?.status === COMPLETED && (
                      <Rating readOnly className="mb-2" size="small" value={val?.freelancer_rating} />
                    )}

                    <Button className="d-block" variant="success">
                      {formatStatus(val.status)}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                      <Link
                        className="noWrap"
                        style={{ color: '#422438' }}
                        to={`/workspace/${id}/task/${val.id}/${val?.task_via}/`}
                      >
                        <Button variant="outlined" color="info" style={{ color: '#422438' }}>
                          View Detail
                        </Button>
                      </Link>
                      {val.task_via === 'job_offer' ? (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDialog({
                            type: val.task_via,
                            id: val.id,
                            status: val.job_offer_status === 'blocked' ? 'unblocked' : 'blocked',
                          })}
                        >
                          {val.job_offer_status === 'blocked' ? 'Activate' : 'Deactivate'}
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleOpenDialog({
                            type: val.task_via,
                            id: val.id,
                            status: val.client_order_status === 'blocked' ? 'unblocked' : 'blocked',
                          })}
                        >
                          {val.client_order_status === 'blocked' ? 'Activate' : 'Deactivate'}
                        </Button>
                      )}
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

export default TasksTabPanel;
