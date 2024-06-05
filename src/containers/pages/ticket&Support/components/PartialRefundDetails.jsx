/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
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
  useTheme,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetSinglePaymentQuery, useUpdatePartialPaymentStatusMutation } from 'services/private/ticketAndSupport';

import { ArrowBackIos } from '@mui/icons-material';

import SelectField from 'shared/SelectField';
import { ticketStatusOptionss } from 'utilities/selectOptions';
import useGetPartialPaymentDetails from '../customHooks/useGetPartialPaymentDetails';
import TransactionDetailDialog from './TransactionDetailDialog';

function TicketDetails() {
  const theme = useTheme();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const navigate = useNavigate();

  const { id } = useParams();

  const [paymentStatus, setpartialPaymentdata] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data, isFetching } = useGetSinglePaymentQuery({ id });
  const singlePartialPayment = useGetPartialPaymentDetails(data);
  const [handleStatus] = useUpdatePartialPaymentStatusMutation();
  const [disableButton, setDisableButton] = useState();

  const handleToggle = datas => {
    setDialogOpen(prevState => !prevState);
    setpartialPaymentdata(datas);
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
      <TransactionDetailDialog
        isOpen={isDialogOpen}
        handleClose={handleToggle}
        detail={paymentStatus}
        id={id}
        setDisableButton={setDisableButton}
      />

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
            Partial Payment History
          </Typography>
          <SelectField
            name="status"
            // value={item?.dispute_status}
            onChange={value => handleSetStatus({ dispute_status: value, id })}
            placeholder="Update status"
            options={ticketStatusOptionss}
            disable={data?.status === 'approved' || data?.status === 'rejected'}
          />
        </Stack>
        {singlePartialPayment?.map((val, index) => (
          <Grid container key={index} mb={3}>
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
                  <TableCell className="noWrap">Amount</TableCell>
                  <TableCell className="noWrap">Status</TableCell>
                  <TableCell className="noWrap">Action</TableCell>
                </TableRow>
              </TableHead>
              {data?.transactions?.length > 0 ? (
                <TableBody>
                  {data?.transactions?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.payment_amount}</TableCell>
                      <TableCell>{item.payment_status}</TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          variant="contained"
                          disabled={disableButton}
                          onClick={() => {
                            handleToggle(item);
                          }}
                        >
                          Refund
                        </Button>
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
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}

export default TicketDetails;
