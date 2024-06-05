import React from 'react';

// COMPONENTS
import AuthGridWrapper from 'containers/common/components/AuthGridWrapper';
import LoginForm from './components/LoginForm';

function LoginPage() {
  return (
    <AuthGridWrapper>
      <LoginForm />
    </AuthGridWrapper>
  );
}

export default LoginPage;
