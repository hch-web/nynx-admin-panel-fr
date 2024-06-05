/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import {
  Backdrop,
  Button,
  CircularProgress,
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

import FormikCheckbox from 'shared/FormikkCheckBox';
import { useFullRefundToClientMutation } from 'services/private/ticketAndSupport';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { partialPaymentFormValSchema, partialPaymentForminitvalues } from '../utilities/formUtils';

function TransactionDetailDialog({ isOpen, handleClose, detail, setDisableButton }) {
  const [partialPatmentRefund, { isSuccess, error }] = useFullRefundToClientMutation();
  useHandleApiResponse(error, isSuccess, 'Request accepted successfully');
  setDisableButton(isSuccess);
  return (
    <Dialog PaperProps={{ sx: { width: '500px' } }} open={isOpen} onClose={handleClose}>
      <DialogTitle>Partial Payment Form</DialogTitle>
      <Formik
        enableReinitialize
        initialValues={partialPaymentForminitvalues}
        validationSchema={partialPaymentFormValSchema}
        onSubmit={async values => {
          const payload = {
            amount: values.refund_amount,
            paypal_transaction_id: detail.id,
            payment_type: 'partial_refund',
          };
          await partialPatmentRefund({ payload });
          handleClose();
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <DialogContent>
              <Typography variant="body1" className="fw-500">
                Total Amount
              </Typography>
              <FormikField
                variant="outlined"
                name="total_amount"
                className="mb-4"
                disabled
                innerValue={detail?.payment_amount}
              />

              <Typography variant="body1" className="fw-500">
                Refund Amount (USD)
              </Typography>
              <FormikField name="refund_amount" variant="outlined" type="number" className="mb-4" fullWidth />
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

TransactionDetailDialog.propTypes = {
  detail: propTypes.object.isRequired,
  isOpen: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  setDisableButton: propTypes.bool.isRequired
};

export default TransactionDetailDialog;
