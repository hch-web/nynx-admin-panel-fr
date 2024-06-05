import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { privateAPI } from 'services/private';
import { publicAPI } from 'services/public';

function useApiServices() {
  const dispatch = useDispatch();

  const invalidatePrivateTags = useCallback(tags => {
    dispatch(privateAPI.util.invalidateTags(tags));
  }, []);

  const invalidatePublicTags = useCallback(tags => {
    dispatch(publicAPI.util.invalidateTags(tags));
  }, []);

  return {
    invalidatePrivateTags,
    invalidatePublicTags,
  };
}

export default useApiServices;
