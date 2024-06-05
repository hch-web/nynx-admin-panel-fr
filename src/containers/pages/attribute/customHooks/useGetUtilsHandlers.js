import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteAttributeMutation, useAttributeListQuery } from 'services/private/attribute';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [attribute, setAttribute] = useState([]);

  const { data, isFetching } = useAttributeListQuery();
  const [deleteAttribute, { error, isSuccess }] = useDeleteAttributeMutation();
  useHandleApiResponse(error, isSuccess, 'Category deleted successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setAttribute(data);
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
    await deleteAttribute(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setAttribute(data);
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

      setAttribute(filteredCategory);
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
    attribute,
    isFetching
  };
};

export default useGetUtilsHandlers;
