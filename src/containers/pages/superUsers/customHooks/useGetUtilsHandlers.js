import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteUserMutation, useGetUsersListQuery } from 'services/private/user';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [users, setUsers] = useState([]);

  const { data, isFetching } = useGetUsersListQuery();
  const [deleteUser, { error, isSuccess }] = useDeleteUserMutation();
  useHandleApiResponse(error, isSuccess, 'User deleted successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setUsers(data);
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
    await deleteUser(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setUsers(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredUsers = data?.filter(user => {
        const { first_name: firstName, last_name: lastName, username } = user;

        if (
          firstName?.toLowerCase()?.includes(value) ||
          lastName?.toLowerCase()?.includes(value) ||
          username?.toLowerCase()?.includes(value)
        ) {
          return user;
        }

        return null;
      });

      setUsers(filteredUsers);
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
    isFetching,
    users,
  };
};

export default useGetUtilsHandlers;
