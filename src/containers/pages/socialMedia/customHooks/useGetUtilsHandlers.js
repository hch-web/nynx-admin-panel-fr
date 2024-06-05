import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteSocialMediaMutation, useSocialMediaListQuery } from 'services/private/socialMedial';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [socialMedia, setSocialMedia] = useState([]);

  const { data, isFetching } = useSocialMediaListQuery();
  const [deleteSocialMedia, { error, isSuccess }] = useDeleteSocialMediaMutation();
  useHandleApiResponse(error, isSuccess, 'Social Media deleted successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setSocialMedia(data);
    }
  }, [data]);

  const handleOpenDialog = useCallback(id => {
    setSelectedId(id);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteSocialMedia(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setSocialMedia(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredCategory = data?.filter(filterValues => {
        const { name: Name } = filterValues;

        if (
          Name?.toLowerCase()?.includes(value)
        ) {
          return filterValues;
        }

        return null;
      });

      setSocialMedia(filteredCategory);
    },
    [data]
  );

  return {
    isDialogOpen,
    handleSearchChange,
    handleResetFilters,
    handleDelete,
    handleCloseDialog,
    handleOpenDialog,
    socialMedia,
    isFetching
  };
};

export default useGetUtilsHandlers;
