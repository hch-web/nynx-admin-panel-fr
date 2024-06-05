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
  Tooltip,
  Typography,
} from '@mui/material';

// COMPONENTS
import FilterField from 'shared/FilterField';
import FilterResetBtn from 'shared/FilterResetBtn';
import { formatDate } from 'utilities/utility-functions';
// import { useUpdateApproveStatusMutation } from 'services/private/ticketAndSupport';
import { useNavigate } from 'react-router-dom';
// import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import useGetUtilsHandlers from './customHooks/useGetUtilsHandlers';
import HistoryTableHead from './components/HistoryTableHead';
import TicketDialog from '../ticket&Support/components/TicketDialog';

function DisputeHistory() {
  // const [handleApprovedStatus, { isError, isSuccess }] = useUpdateApproveStatusMutation();
  // useHandleApiResponse(isError, isSuccess, 'Status updated successfully!', '/history');
  const navigate = useNavigate();
  // const [disputeDetail, setDisputeDetail] = useState();
  // const handleSetPaymentStatus = body => {
  //   setDisputeDetail(body);
  // };
  const handelShowTransactions = id => {
    navigate(`/transaction-details/${id}`);
  };
  // const handleApprove = item => {
  //   handleApprovedStatus(item.id);
  // };
  const { handleCloseDialog, handleResetFilters, handleSearchChange, isDialogOpen, history, isFetching } =
    useGetUtilsHandlers();
  return (
    <>
      <Typography variant="h5" mb={2}>
        Partial Payment History
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <TicketDialog
          isOpen={isDialogOpen}
          handleClose={handleCloseDialog}
          // detail={disputeDetail}
          title="Partial Refund"
        />
        <Stack direction="row" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={2}>
            <FilterField label="Search" name="search" onChange={handleSearchChange} />

            <FilterResetBtn onClick={handleResetFilters} />
          </Stack>
        </Stack>
        <Backdrop open={isFetching}>
          <CircularProgress size={80} color="yellow" />
        </Backdrop>
        <TableContainer component={Paper}>
          <Table>
            <HistoryTableHead />

            {history?.length > 0 ? (
              <TableBody>
                {history?.map(val => (
                  <TableRow key={val.id} hover>
                    <TableCell>{val?.dispute}</TableCell>

                    <TableCell>{formatDate(val?.created_at)}</TableCell>
                    <TableCell>{formatDate(val?.updated_at)}</TableCell>
                    <TableCell>${val?.amount_for_client}</TableCell>
                    <TableCell>${val?.amount_for_freelancer}</TableCell>
                    <TableCell>
                      <Tooltip title={val?.reason} key={val?.client_order ?? val?.job_offer}>
                        {val?.reason?.slice(0, 10)}...
                      </Tooltip>
                    </TableCell>
                    <TableCell>{val?.status}</TableCell>

                    <TableCell>
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                        <Button
                          className="noWrap"
                          variant="outlined"
                          color="info"
                          style={{ color: '#422438' }}
                          onClick={() => {
                            handelShowTransactions(val.id);
                          }}
                        >
                          View Detail
                        </Button>
                        {/* <Button
                          className="noWrap"
                          variant="outlined"
                          color="info"
                          disabled={val.status !== 'pending'}
                          style={{ color: '#422438' }}
                          onClick={() => handleApprove(val)}
                        >
                          {val.status === 'pending' ? 'Approve' : 'Pending'}
                        </Button> */}
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
    </>
  );
}

export default DisputeHistory;
