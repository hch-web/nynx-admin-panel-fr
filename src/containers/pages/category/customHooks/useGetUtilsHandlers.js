import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteCategoryMutation, useCategoriesListQuery } from 'services/private/category';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [category, setCategory] = useState([]);

  const { data, isFetching } = useCategoriesListQuery();
  const [deleteCategory, { error, isSuccess }] = useDeleteCategoryMutation();
  useHandleApiResponse(error, isSuccess, 'Category deleted successfully!', false);

  useEffect(() => {
    if (data?.categories.length > 0) {
      setCategory(data?.categories);
    }
  }, [data?.categories]);

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
    setCategory(data?.categories);
  }, [data?.categories]);

  const handleSearchChange = useCallback(
    value => {
      const filteredCategory = data?.categories?.filter(filterValues => {
        const { name: Name } = filterValues;

        if (
          Name?.toLowerCase()?.includes(value)
        ) {
          return filterValues;
        }

        return null;
      });

      setCategory(filteredCategory);
    },
    [data?.categories]
  );

  return {
    isDialogOpen,
    handleSearchChange,
    handleResetFilters,
    handleDelete,
    handleCloseDialog,
    handleOpenDialog,
    category,
    isFetching
  };
};

export default useGetUtilsHandlers;
