import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteClientMutation, useClientsListQuery } from 'services/private/client';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [clients, setClient] = useState([]);

  const { data, isFetching } = useClientsListQuery();
  const [deleteClient, { error, isSuccess }] = useDeleteClientMutation();
  useHandleApiResponse(error, isSuccess, 'client Status Updated successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setClient(data);
    }
  }, [data]);

  const handleOpenDialog = useCallback(body => {
    setSelectedId(body);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteClient(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setClient(data);
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

      setClient(filteredUsers);
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
    clients,
    isFetching,
  };
};

export default useGetUtilsHandlers;
