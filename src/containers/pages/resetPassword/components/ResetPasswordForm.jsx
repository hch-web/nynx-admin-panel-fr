import React, { useMemo } from 'react';
import { Form, Formik } from 'formik';
import { Navigate, useSearchParams } from 'react-router-dom';

import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useResetPasswordMutation } from 'services/public/auth';
import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { resetPasswordInitValues, resetPasswordValSchema } from '../utilities/formUtils';

function ResetPasswordForm() {
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get('token'), [searchParams]);
  const uid = useMemo(() => searchParams.get('uid'), [searchParams]);

  const [resetPassword, { error, isSuccess }] = useResetPasswordMutation();
  useHandleApiResponse(error, isSuccess, 'Password reset successfully!', '/auth/login');

  if (!token || !uid) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <Formik
      initialValues={resetPasswordInitValues}
      validationSchema={resetPasswordValSchema}
      onSubmit={async values => {
        await resetPassword({ ...values, token, uid });
      }}
    >
      <Form className="form" autoComplete="off">
        <FormikField variant="outlined" name="password" fieldLabel="Password" />

        <FormikField variant="outlined" name="confirmPassword" fieldLabel="Confirm Password" />

        <SubmitBtn fullWidth label="Confirm" />
      </Form>
    </Formik>
  );
}

export default ResetPasswordForm;
