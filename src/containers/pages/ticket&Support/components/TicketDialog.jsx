import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  // Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { usePaymentRequestMutation, useUpdatePaymentMutation } from 'services/private/ticketAndSupport';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useSelector } from 'react-redux';
import { addTicketDialogFormValSchema, updateTicketDialogFormValSchema } from '../utilities/formUtils';
import useGetPaymentData from '../customHooks/useGetPaymentData';

function TicketDialog({ isOpen, handleClose, detail, title }) {
  const [partialPayment, { error, isSuccess }] = usePaymentRequestMutation();
  const [updatePartialPayment, { error: isError, isSuccess: success }] = useUpdatePaymentMutation();
  const { initValues } = useGetPaymentData(detail);

  const { userInfo } = useSelector(state => state.auth);
  useHandleApiResponse(isError, success, 'Ticket U successfully');

  useHandleApiResponse(error, isSuccess, 'Request for Partial Payment place successfully');

  return (
    <Dialog PaperProps={{ sx: { width: '500px' } }} open={isOpen} onClose={handleClose}>
      <DialogTitle>Payment Form</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={
          title === 'Partial Refund' ? updateTicketDialogFormValSchema : addTicketDialogFormValSchema
        }
        onSubmit={async values => {
          const payload = {
            dispute: detail.id,
            job_offer: detail.job_offer,
            client_order: detail.client_order,
            reason: values.reason,
            amount_for_freelancer: values.amount_for_freelancer || 0,
            amount_for_client: values.amount_for_client || 0,
            offer_type: detail.job_offer ? 'job_offer' : 'direct_hire',
            requested_by: userInfo?.id,
          };
          if (title === 'Partial Refund') {
            await updatePartialPayment({ payload, id: detail.id });
            handleClose();
            return;
          }
          await partialPayment(payload);

          handleClose();
        }}
      >
        {() => (
          <Form>
            <DialogContent>
              <FormikField
                variant="outlined"
                name="title"
                label="Title"
                disabled
                innerValue={title}
                className="mb-4"
              />

              <FormikField variant="outlined" name="reason" label="Reason" multiline className="mb-4" />
              <Box className="d-flex align-items-center gap-3">
                <Box className="col">
                  <Typography variant="body1" className="fw-500">
                    Amount for freelancer (USD)
                  </Typography>
                  <FormikField
                    name="amount_for_freelancer"
                    variant="outlined"
                    type="number"
                    className="mb-4"
                    fullWidth
                  />
                </Box>

                <Box className="col">
                  <Typography variant="body1" className="fw-500 mb-4">
                    Amount for Client (USD)
                  </Typography>

                  <FormikField
                    variant="outlined"
                    name="amount_for_client"
                    type="number"
                    fullWidth
                    className="mb-4"
                  />
                </Box>
              </Box>
            </DialogContent>

            <DialogActions>
              <Stack direction="row" justifyContent="flex-end" gap={2}>
                <Button onClick={handleClose}>Cancel</Button>

                <SubmitBtn />
              </Stack>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}

TicketDialog.propTypes = {
  detail: propTypes.any,
  title: propTypes.any,
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};
TicketDialog.defaultProps = {
  detail: null,
  title: '',
};

export default TicketDialog;
