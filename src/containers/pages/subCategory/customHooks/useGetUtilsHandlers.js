import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteSubCategoryMutation, useGetSubCategoryByIdQuery } from 'services/private/category';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [subCategory, setSubCategory] = useState([]);
  const { id } = useParams();
  const {
    data = [],
    isFetching,
  } = useGetSubCategoryByIdQuery(id, { skip: !id });
  const [deleteSubCategory, { error, isSuccess }] = useDeleteSubCategoryMutation();
  useHandleApiResponse(error, isSuccess, 'Sub category deleted successfully!', false);
  useEffect(() => {
    if (data?.length > 0) {
      setSubCategory(data);
    }
    if (data?.length === 0) {
      setSubCategory([]);
    }
  }, [data]);

  const handleOpenDialog = useCallback(val => {
    setSelectedId(val);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteSubCategory(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setSubCategory(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredUsers = data?.filter(user => {
        const { name: Name } = user;

        if (Name?.toLowerCase()?.includes(value)) {
          return user;
        }

        return null;
      });

      setSubCategory(filteredUsers);
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
    subCategory,
    isFetching,
  };
};

export default useGetUtilsHandlers;
