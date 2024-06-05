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

// COMPONENTS

import { useGetFullRefundHostortQuery } from 'services/private/ticketAndSupport';
import { useNavigate } from 'react-router-dom';
import { formatDate } from 'utilities/utility-functions';
import HistoryTableHead from './components/HistoryTableHead';

function RefundToClientHistory() {
  const navigate = useNavigate();
  const { data, isFetching } = useGetFullRefundHostortQuery();
  const handelDetailPage = id => {
    navigate(`/refund-to-client-details/${id}`);
  };
  return (
    <>
      <Backdrop open={isFetching}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <Typography variant="h5" mb={2}>
        Full Refund History
      </Typography>
      <Paper className="p-3" sx={{ minHeight: '80vh' }}>
        <TableContainer component={Paper}>
          <Table>
            <HistoryTableHead />
            <TableBody>
              {data?.map(val => (
                <TableRow key={val.id}>

                  <TableCell>{val?.dispute}</TableCell>
                  <TableCell>{formatDate(val?.created_at)}</TableCell>
                  <TableCell>{formatDate(val?.updated_at)}</TableCell>
                  <TableCell>{val.amount}</TableCell>
                  <TableCell>
                    { val?.first_name && val?.last_name ? `${val?.first_name} ${val?.last_name}` : 'Name is Missing!'}
                  </TableCell>
                  <TableCell>{val.reason}</TableCell>
                  <TableCell>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
                      <Button
                        className="noWrap"
                        variant="outlined"
                        color="info"
                        style={{ color: '#422438' }}
                        onClick={() => {
                          handelDetailPage(val.id);
                        }}
                      >
                        View Detail
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export default RefundToClientHistory;
