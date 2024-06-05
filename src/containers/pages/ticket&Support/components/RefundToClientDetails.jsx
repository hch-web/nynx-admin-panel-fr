import React from 'react';
import { ArrowBackIos } from '@mui/icons-material';
import { useTheme } from '@emotion/react';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useFullRefundToClientMutation,
  useGetSingleRefundHistortQuery,
  useUpdateFullRefundStatusMutation,
} from 'services/private/ticketAndSupport';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import SelectField from 'shared/SelectField';
import { ticketStatusOptionss } from 'utilities/selectOptions';
import RefundToClientHistoryDetails from '../customHooks/useGetfullRefundDetails';

function RefundToClientDetails() {
  const theme = useTheme();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const fullRefund = 'full_refund';
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useGetSingleRefundHistortQuery({ id });
  const refundToClientData = RefundToClientHistoryDetails(data);
  const [partialPatmentRefund, { isSuccess, error }] = useFullRefundToClientMutation();
  useHandleApiResponse(error, isSuccess, 'Request accepted successfully');
  const [handleStatus] = useUpdateFullRefundStatusMutation();

  const handelPayment = transactionData => {
    const payload = {
      amount: transactionData.payment_amount,
      paypal_transaction_id: transactionData.id,
      payment_type: fullRefund,
    };
    partialPatmentRefund({ payload });
  };
  const handleSetStatus = statusData => {
    handleStatus(statusData);
  };
  const backToPrevious = () => {
    navigate(-1);
  };

  return (
    <>
      <Backdrop open={isFetching} sx={{ zIndex: 7 }}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <Box className="d-flex align-item-start" mb={2}>
        <Stack direction="row" spacing={1} alignItems="center" className="pointer" onClick={backToPrevious}>
          <ArrowBackIos sx={{ fontSize: '16px' }} />
          <Typography variant="body1" color={darkPurple}>
            Back to previous page
          </Typography>
        </Stack>
      </Box>
      <Paper className="p-3">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h5" className="noWrap">
            Full Refund History
          </Typography>

          <SelectField
            name="status"
          // value={item?.dispute_status}
            onChange={value => handleSetStatus({ dispute_status: value, id })}
            placeholder="Update status"
            disable={data?.status === 'approved' || data?.status === 'rejected'}
            options={ticketStatusOptionss}
          />
        </Stack>
        {refundToClientData?.map((val, index) => (
          <Grid container mb={3} key={index}>
            <Grid item xs={12} md={4} className="align-items-center">
              <Typography variant="body1" fontWeight={500}>
                {val.label}
              </Typography>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="body1">{val.value}</Typography>
            </Grid>
          </Grid>
        ))}
        <Card>
          <CardContent>
            <Typography variant="h5" mb={2}>
              Transaction History
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="noWrap">ID#</TableCell>
                  <TableCell className="noWrap">Payment Amount</TableCell>
                  <TableCell className="noWrap">Payment Status</TableCell>
                  <TableCell className="noWrap">Payment Currency</TableCell>
                  <TableCell className="noWrap">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data?.transaction?.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {transaction.client_order}
                      {transaction.job_offer}
                    </TableCell>
                    <TableCell>{transaction.payment_amount}</TableCell>
                    <TableCell>{transaction.payment_status}</TableCell>
                    <TableCell>{transaction.payment_currency}</TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        disable={isSuccess}
                        onClick={() => {
                          handelPayment(transaction);
                        }}
                      >
                        Refund
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}

export default RefundToClientDetails;
