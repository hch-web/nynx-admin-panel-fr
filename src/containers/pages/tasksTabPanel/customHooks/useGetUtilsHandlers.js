import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetTasksQuery,
  useDeleteJobOfferTaskMutation,
  useDeleteClientOrderTaskMutation,
} from 'services/private/freelancer';

const useGetUtilsHandlers = () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { id } = useParams();
  const { data, isFetching } = useGetTasksQuery(id, { skip: !id });
  const [deleteJobOffer, { error, isSuccess }] = useDeleteJobOfferTaskMutation();
  const [deleteClientOrder, { errors, isSuccesss }] = useDeleteClientOrderTaskMutation();

  useHandleApiResponse(error, isSuccess, 'Status updated successfully!', false);
  useHandleApiResponse(errors, isSuccesss, 'Status updated successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setTasks(data);
    }
  }, [data]);
  const handleResetFilters = useCallback(() => {
    setTasks(data);
  }, [data]);
  const handleOpenDialog = useCallback(body => {
    setSelectedId(body);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    if (selectedId.type === 'job_offer') {
      await deleteJobOffer(selectedId);
    } else {
      await deleteClientOrder(selectedId);
    }
    setDialogOpen(false);
  }, [selectedId]);

  const handleSearchChange = useCallback(
    value => {
      const filteredUsers = data?.filter(user => {
        const { title: Title, status: Status, first_name: firstName, last_name: lastName } = user;

        if (Title?.toLowerCase()?.includes(value) || Status?.toLowerCase()?.includes(value) || firstName?.toLowerCase()?.includes(value) || lastName?.toLowerCase()?.includes(value)) {
          return user;
        }

        return null;
      });

      setTasks(filteredUsers);
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
    tasks,
    isFetching,
  };
};

export default useGetUtilsHandlers;
