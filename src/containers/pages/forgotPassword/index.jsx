import React from 'react';

import AuthGridWrapper from 'containers/common/components/AuthGridWrapper';
import ForgotPasswordForm from './components/ForgotPasswordForm';

function ForgotPassword() {
  return (
    <AuthGridWrapper pageTitle="Forgot Password">
      <ForgotPasswordForm />
    </AuthGridWrapper>
  );
}

export default ForgotPassword;
