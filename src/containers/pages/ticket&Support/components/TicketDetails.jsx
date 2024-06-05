/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
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

import GridLabelValuePair from 'containers/common/components/GridLabelValuePair';
import {
  useGetTicketByIdQuery,
  usePaymentReleaseTOFreelancerMutation,
  useUpdateStatusMutation,
} from 'services/private/ticketAndSupport';
import SelectField from 'shared/SelectField';
import { ticketPaymentOptions, ticketStatusOptionss } from 'utilities/selectOptions';
import { ArrowBackIos } from '@mui/icons-material';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useSelector } from 'react-redux';
import { useCreateRoomMutation } from 'services/private/chat';
import useGetTicketDetails from '../customHooks/useGetTicketDetails';
import TicketDialog from './TicketDialog';
import FullRefundToClientDialog from './FullRefundToClientDialog';

function TicketDetails() {
  const theme = useTheme();
  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const [createRoom, { data: roomDetail, isSuccess: roomSuccess }] = useCreateRoomMutation();
  const [releasePaymentToFrelancer, { error, isSuccess }] = usePaymentReleaseTOFreelancerMutation();
  const [handleStatus] = useUpdateStatusMutation();

  const { id } = useParams();
  const disputeId = id;
  const { data, isFetching } = useGetTicketByIdQuery(id);
  const ticketDetails = useGetTicketDetails(data);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isRefundToClientDialogOpen, setRefundToClientDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const loggedUserId = userInfo?.id;
  useEffect(() => {
    if (roomSuccess) {
      navigate('/chat', {
        state: { data: roomDetail },
      });
    }
  }, [roomSuccess]);
  const handleToggleRefundtoClient = () => {
    setRefundToClientDialogOpen(prevState => !prevState);
    if (!isRefundToClientDialogOpen) {
      //
    }
  };

  const handleToggle = () => {
    setDialogOpen(prevState => !prevState);
  };
  const handlePayment = selectedOption => {
    setPaymentStatus(selectedOption);
    if (selectedOption.value === 'Release Payment to Freelancer') {
      const jobOffer = data?.job_offer ? 'job_offer' : 'direct_hire';
      const deleverable = data?.deliverable;
      releasePaymentToFrelancer({ offer_type: jobOffer, id: deleverable });
    } else if (selectedOption.value === 'Refund Payment to Client') {
      handleToggleRefundtoClient();
    } else {
      handleToggle();
    }
  };
  useHandleApiResponse(error, isSuccess, 'Request accepted successfully');
  const handleSetStatus = disputeStatus => {
    handleStatus(disputeStatus);
  };
  const backToPrevious = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (!isDialogOpen) {
      setPaymentStatus('');
    }
  }, [isDialogOpen]);
  const handleCreateRoom = async val => {
    await createRoom({ owner: loggedUserId, partner: val, dispute: data?.id });
  };
  return (
    <>
      <Backdrop open={isFetching} sx={{ zIndex: 7 }}>
        <CircularProgress size={80} color="yellow" />
      </Backdrop>
      <TicketDialog
        isOpen={isDialogOpen}
        handleClose={handleToggle}
        detail={data}
        title={paymentStatus.value}
      />
      <FullRefundToClientDialog
        isOpen={isRefundToClientDialogOpen}
        handleClose={handleToggleRefundtoClient}
        detail={data}
        title={paymentStatus.value}
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
            Dispute Detail
          </Typography>
          <Box className="d-flex gap-2">
            <SelectField
              name="status"
              // value={item?.dispute_status}
              onChange={value => handleSetStatus({ dispute_status: value, id: disputeId })}
              placeholder="Update status"
              options={ticketStatusOptionss}
            />
            <SelectField
              name="status"
              value={paymentStatus}
              onChange={value => handlePayment(value)}
              placeholder="Update Payment status"
              disable={data?.dispute_status === 'approved' || data?.dispute_status === 'rejected'}
              options={
                data?.deliverable
                  ? ticketPaymentOptions
                  : ticketPaymentOptions.filter(option => option.value !== 'Release Payment to Freelancer')
              }
            />
          </Box>
        </Stack>
        {ticketDetails?.map(item => (
          <GridLabelValuePair key={item?.label} label={item?.label} value={item?.value} type={item?.type} />
        ))}
        <Card>
          <CardContent>
            <Typography variant="h5" mb={2}>
              Help and Support chat
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="noWrap">ID#</TableCell>
                  <TableCell className="noWrap">Name</TableCell>
                  <TableCell className="noWrap">User Type</TableCell>
                  <TableCell className="noWrap">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow key={data?.client?.id}>
                  <TableCell>{data?.client?.id}</TableCell>
                  <TableCell>{data?.client?.name}</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleCreateRoom(data?.client.id)}
                    >
                      Start chat
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow key={data?.freelancer?.id}>
                  <TableCell>{data?.freelancer?.id}</TableCell>
                  <TableCell>{data?.freelancer?.name}</TableCell>
                  <TableCell>Freelancer</TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleCreateRoom(data?.freelancer.id)}
                    >
                      Start chat
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Paper>
    </>
  );
}

export default TicketDetails;
