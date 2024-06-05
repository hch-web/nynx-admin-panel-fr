import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { useDispatch } from 'react-redux';

// COMPONENTS & UTILS
import theme from 'styles/mui/theme';
import { useLazyGetUserDetailQuery } from 'services/private/user';
import { getUserDetail, onLoggedOut } from 'store/slices/authSlice';
import AppRoutes from './routes';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  const dispatch = useDispatch();
  const [getAuthorizedUser, { isSuccess, data, isError, isLoading }] = useLazyGetUserDetailQuery();

  useEffect(() => {
    (async () => {
      await getAuthorizedUser();
    })();
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(getUserDetail(data));
    } else if (isError) {
      dispatch(onLoggedOut());
    }
  }, [data, isSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider preventDuplicate anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        {!isLoading && <AppRoutes />}
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
