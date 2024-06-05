import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteFeatureMutation, useFeatureListQuery, useGetFeatureBySubIdQuery } from 'services/private/features';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [feature, setFeature] = useState([]);
  const { subId } = useParams();
  const { data, isFetching } = subId ? useGetFeatureBySubIdQuery(subId) : useFeatureListQuery();
  const [deleteCategory, { error, isSuccess }] = useDeleteFeatureMutation();
  useHandleApiResponse(error, isSuccess, 'Feature deleted successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setFeature(data);
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
    await deleteCategory(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setFeature(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredCategory = data?.filter(filterValues => {
        const { field_name: Name } = filterValues;

        if (
          Name?.toLowerCase()?.includes(value)
        ) {
          return filterValues;
        }

        return null;
      });

      setFeature(filteredCategory);
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
    feature,
    isFetching
  };
};

export default useGetUtilsHandlers;
