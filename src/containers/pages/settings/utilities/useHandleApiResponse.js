import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { isBadRequest, isUnexpectedError } from 'shared/helpers/utility-functions';

function useHandleApiResponse(error, isSuccess, successMessage) {
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isSuccess && successMessage) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }
  }, [isSuccess, enqueueSnackbar, successMessage]);

  useEffect(() => {
    if (error && isBadRequest(error)) {
      enqueueSnackbar(
        error.data?.error
          || error.data?.message
          || error?.data?.non_field_errors?.[0]
          || 'Something went wrong!',
        {
          variant: 'error',
        }
      );
    }

    if (isUnexpectedError(error)) {
      enqueueSnackbar('An unexpected error occured. Please try again later.', { variant: 'error' });
    }
  }, [enqueueSnackbar, error]);

  return null;
}

export default useHandleApiResponse;
