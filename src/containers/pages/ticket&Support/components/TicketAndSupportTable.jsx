import React, { useState } from 'react';
import { Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  useGetTicketsQuery,
  usePaymentReleaseTOFreelancerMutation,
  useUpdateStatusMutation,
} from 'services/private/ticketAndSupport';
import { ticketPaymentOptions, ticketStatusOptions } from 'utilities/selectOptions';
import SelectField from 'shared/SelectField';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import TicketAndSupportTableHead from './TicketAndSupportTableHead';
import TicketDialog from './TicketDialog';
import FullRefundToClientDialog from './FullRefundToClientDialog';

function TicketAndSupportTable() {
  // const navigate = useNavigate();

  const { data } = useGetTicketsQuery();
  const [handleStatus] = useUpdateStatusMutation();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isRefundToClientDialogOpen, setRefundToClientDialogOpen] = useState(false);
  const [disputeDetail, setDisputeDetail] = useState();
  const [releasePaymentToFrelancer, { error, isSuccess }] = usePaymentReleaseTOFreelancerMutation();
  useHandleApiResponse(error, isSuccess, 'Request accepted successfully');
  const handleSetStatus = selectedStatus => {
    handleStatus(selectedStatus);
  };

  const handleToggle = () => {
    setDialogOpen(prevState => !prevState);
    if (!isDialogOpen) {
      //
    }
  };
  const handleToggleRefundtoClient = () => {
    setRefundToClientDialogOpen(prevState => !prevState);
    if (!isRefundToClientDialogOpen) {
      //
    }
  };
  const handleSetPaymentStatus = body => {
    setDisputeDetail(body?.item);
    setPaymentStatus(body.value);
    if (body.value.value === 'Release Payment to Freelancer') {
      const jobOffer = data?.job_offer ? 'job_offer' : 'direct_hire';
      const deleverable = data?.deliverable;
      releasePaymentToFrelancer({ offer_type: jobOffer, id: deleverable });
    } else if (body.value.value === 'Refund Payment to Client') {
      handleToggleRefundtoClient();
    } else {
      handleToggle();
    }
  };
  return (
    <TableContainer component={Paper} sx={{ minHeight: '800px' }}>
      <FullRefundToClientDialog
        isOpen={isRefundToClientDialogOpen}
        handleClose={handleToggleRefundtoClient}
        detail={disputeDetail}
        title={paymentStatus.value}
      />
      <TicketDialog
        isOpen={isDialogOpen}
        handleClose={handleToggle}
        detail={disputeDetail}
        title={paymentStatus.value}
      />
      <Table>
        <TicketAndSupportTableHead />
        {data?.length > 0 ? (
          <TableBody>
            {data?.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <Link to={`/request/${item.id}`}>{item?.id}</Link>
                </TableCell>

                <TableCell>{item?.subject}</TableCell>

                <TableCell>
                  <Tooltip title={item?.reason}>{item?.reason?.slice(0, 10)}...</Tooltip>
                </TableCell>
                <TableCell className="noWrap">
                  {item?.created_by_first_name} {item?.created_by_last_name}
                </TableCell>
                <TableCell className="noWrap">{item?.client.name}</TableCell>
                <TableCell className="noWrap">{item?.freelancer.name}</TableCell>
                <TableCell>{item?.dispute_status}</TableCell>

                <TableCell className="noWrap">{moment(item?.created_at).format('YYYY-MM-DD')}</TableCell>
                <TableCell className="noWrap">
                  <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <SelectField
                      name="status"
                      disable={item.dispute_status === 'closed'}
                      value={paymentStatus}
                      onChange={value => handleSetPaymentStatus({ value, item })}
                      placeholder="Update Payment status"
                      options={
                        data?.deliverable
                          ? ticketPaymentOptions
                          : ticketPaymentOptions.filter(option => option.value !== 'Release Payment to Freelancer')
                      }
                    />
                    <SelectField
                      name="status"
                      value={item?.dispute_status}
                      onChange={value => handleSetStatus({ dispute_status: value, id: item.id })}
                      placeholder="Update status"
                      options={ticketStatusOptions}
                    />
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
  );
}

export default TicketAndSupportTable;
