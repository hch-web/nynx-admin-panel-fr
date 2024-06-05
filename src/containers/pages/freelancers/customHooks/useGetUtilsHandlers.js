import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteFreelancerMutation, useFreelancerListQuery } from 'services/private/freelancer';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [freelancers, setFreelancers] = useState([]);

  const { data, isFetching } = useFreelancerListQuery();
  const [deleteFreelancer, { error, isSuccess }] = useDeleteFreelancerMutation();
  useHandleApiResponse(error, isSuccess, 'Status Updated successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setFreelancers(data);
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
    await deleteFreelancer(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setFreelancers(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredUsers = data?.filter(user => {
        const { first_name: firstName, last_name: lastName, username, rating: Rating } = user;

        if (
          firstName?.toLowerCase()?.includes(value) ||
          lastName?.toLowerCase()?.includes(value) ||
          username?.toLowerCase()?.includes(value) ||
          Rating?.toString()?.toLowerCase()?.includes(value)
        ) {
          return user;
        }

        return null;
      });

      setFreelancers(filteredUsers);
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
    freelancers,
    isFetching
  };
};

export default useGetUtilsHandlers;
