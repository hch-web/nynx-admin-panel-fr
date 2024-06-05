import React from 'react';

import AuthGridWrapper from 'containers/common/components/AuthGridWrapper';
import ResetPasswordForm from './components/ResetPasswordForm';

function ResetPassword() {
  return (
    <AuthGridWrapper pageTitle="Reset Password">
      <ResetPasswordForm />
    </AuthGridWrapper>
  );
}

export default ResetPassword;
