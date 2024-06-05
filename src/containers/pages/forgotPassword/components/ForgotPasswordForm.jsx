import React from 'react';
import { Form, Formik } from 'formik';
import { Stack } from '@mui/material';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useForgotPasswordMutation } from 'services/public/auth';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import ResetBtn from 'shared/ResetBtn';
import { forgotPasswordInitValues, forgotPasswordValSchema } from '../utilities/formUtils';

function ForgotPasswordForm() {
  const [forgotPassword, { error, isSuccess }] = useForgotPasswordMutation();
  useHandleApiResponse(error, isSuccess, 'Please check your inbox to reset your password.');

  return (
    <Formik
      initialValues={forgotPasswordInitValues}
      validationSchema={forgotPasswordValSchema}
      onSubmit={async values => {
        await forgotPassword(values);
      }}
    >
      {() => (
        <Form className="form" autoComplete="off">
          <FormikField variant="outlined" name="email" fieldLabel="Email" />

          <Stack direction="row" spacing={2} className="mb-3" justifyContent="flex-end" width={1}>
            <ResetBtn color="secondary" label="Back to login!" backLink="/auth/login" fullWidth />

            <SubmitBtn label="Confirm" fullWidth />
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPasswordForm;
