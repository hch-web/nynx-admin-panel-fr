import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import propTypes from 'prop-types';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useSelector } from 'react-redux';
import { usePartialPaymentMutation } from 'services/private/ticketAndSupport';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { PaymentToClientFormValSchema, PaymentToClientForminitvalues } from '../utilities/formUtils';

function FullRefundToClientDialog({ isOpen, handleClose, detail, title }) {
  const { userInfo } = useSelector(state => state.auth);
  const [fullrefund, error, isSuccess] = usePartialPaymentMutation();
  useHandleApiResponse(error, isSuccess, 'Request accepted successfully');

  return (
    <Dialog PaperProps={{ sx: { width: '500px' } }} open={isOpen} onClose={handleClose}>
      <DialogTitle>Payment Form</DialogTitle>

      <Formik
        enableReinitialize
        initialValues={PaymentToClientForminitvalues}
        validationSchema={PaymentToClientFormValSchema}
        onSubmit={async values => {
          const payload = {
            dispute: detail.id,
            job_offer: detail.job_offer,
            client_order: detail.client_order,
            reason: values.reason,
            amount: detail?.offer_rate,
            offer_type: detail.job_offer ? 'job_offer' : 'direct_hire',
            requested_by: userInfo?.id,
          };
          await fullrefund({ payload });
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

              <Typography variant="body1" className="fw-500 mb-4">
                Amount for Client (USD)
              </Typography>

              <FormikField
                variant="outlined"
                name="amount_to_client"
                type="number"
                fullWidth
                disabled
                innerValue={detail?.offer_rate || 0}
                className="mb-4"
              />
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

FullRefundToClientDialog.propTypes = {
  detail: propTypes.any,
  title: propTypes.any,
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
};
FullRefundToClientDialog.defaultProps = {
  detail: null,
  title: '',
};

export default FullRefundToClientDialog;
