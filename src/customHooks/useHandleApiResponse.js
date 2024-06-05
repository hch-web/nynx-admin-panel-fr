import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

const useHandleApiResponse = (error, isSuccess, message = 'Operation Successfull!', successLink = false) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess && message) {
      enqueueSnackbar(message, { variant: 'success' });

      if (successLink) {
        navigate(successLink);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error && error?.status === 400 && 'data' in error) {
      enqueueSnackbar(error?.data?.error || error?.data?.message || error?.data?.non_field_errors?.[0] || 'Something went wrong!', {
        variant: 'error',
      });
    }
  }, [error]);

  return null;
};

export default useHandleApiResponse;
