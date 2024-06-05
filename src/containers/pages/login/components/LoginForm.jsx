import React from 'react';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLazyAuthorizedQuery } from 'services/private/auth';
// import { privateAPI } from 'services/private';

// COMPONENTS & UTILITIES
import FormikField from 'shared/FormikField';
import SubmitBtn from 'shared/SubmitBtn';
import { useLoginMutation } from 'services/public/auth';
import { onLoggedIn, getUserDetail } from 'store/slices/authSlice';
import { loginFormInitValues, loginFormValSchema } from '../utilities/formUtils';

function LoginForm() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [authorizeUser, { isLoading: isAuthorizing }] = useLazyAuthorizedQuery();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={loginFormInitValues}
      validationSchema={loginFormValSchema}
      onSubmit={async values => {
        const loginResp = await login(values);

        if (loginResp.data) {
          // dispatch(privateAPI.util.resetApiState());
          dispatch(onLoggedIn(loginResp.data));
          authorizeUser().then(res => {
            dispatch(getUserDetail(res.data));
          });
          enqueueSnackbar('Login successful!', { variant: 'success' });
          return;
        }

        enqueueSnackbar('Incorrect Credentials!', { variant: 'error' });
      }}
    >
      {() => (
        <Form className="form" autoComplete="off">
          <FormikField variant="outlined" name="username_or_email" fieldLabel="Username" />

          <FormikField variant="outlined" name="password" fieldLabel="Password" type="password" />

          <Box className="text-end w-100">
            <SubmitBtn label="Login" fullWidth isLoading={isAuthorizing} />

            <Link to="/auth/forgot-password">
              <Typography color="primary" fontSize={12} mt={1.5} variant="body2">
                Forgot Password?
              </Typography>
            </Link>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
