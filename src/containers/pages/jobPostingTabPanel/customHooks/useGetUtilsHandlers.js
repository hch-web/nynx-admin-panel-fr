import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobByIdQuery, useDeleteJobMutation, useGetAllJobsQuery } from 'services/private/client';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const { id } = useParams();
  const { data, isFetching } = id ? useGetJobByIdQuery(id, { skip: !id }) : useGetAllJobsQuery();
  const [deleteJob, { error, isSuccess }] = useDeleteJobMutation();
  useHandleApiResponse(error, isSuccess, 'Status updated successfully!', false);

  useEffect(() => {
    if (id && data?.workspace_job?.length > 0) {
      setJobs(data?.workspace_job);
    } else if (data?.length > 0) {
      setJobs(data);
    }
  }, [id ? data?.workspace_job : data]);

  const handleOpenDialog = useCallback(body => {
    setSelectedId(body);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteJob(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setJobs(id ? data?.workspace_job : data);
  }, [id ? data?.workspace_job : data]);

  const handleSearchChange = useCallback(
    value => {
      const res = id ? data?.workspace_job : data;
      const filteredUsers = res?.filter(user => {
        const { title: Title, status: Status } = user;

        if (Title?.toLowerCase()?.includes(value) || Status?.toLowerCase()?.includes(value)) {
          return user;
        }

        return null;
      });

      setJobs(filteredUsers);
    },
    [id ? data?.workspace_job : data]
  );

  return {
    isDialogOpen,
    handleSearchChange,
    handleResetFilters,
    handleDelete,
    handleCloseDialog,
    handleOpenDialog,
    jobs,
    isFetching,
  };
};

export default useGetUtilsHandlers;
