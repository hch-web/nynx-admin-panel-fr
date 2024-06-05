import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetClientByIdQuery,
  useDeleteWorkSpaceMutation,
  useWorkspaceListQuery,
} from 'services/private/client';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [workspace, setWorkspace] = useState([]);
  const { id } = useParams();
  const { data, isFetching } = id ? useGetClientByIdQuery(id, { skip: !id }) : useWorkspaceListQuery();
  const [deleteWorkSpace, { error, isSuccess }] = useDeleteWorkSpaceMutation();
  useHandleApiResponse(error, isSuccess, 'Status updated successfully!', false);

  useEffect(() => {
    if (id && data?.user_workspace?.length > 0) {
      setWorkspace(id ? data?.user_workspace : data);
    } else {
      setWorkspace(id ? data?.user_workspace : data);
    }
  }, [id ? data?.user_workspace : data]);

  const handleOpenDialog = useCallback(body => {
    setSelectedId(body);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteWorkSpace(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setWorkspace(id ? data?.user_workspace : data);
  }, [id ? data?.user_workspace : data]);

  const handleSearchChange = useCallback(
    value => {
      const res = id ? data?.user_workspace : data;
      const filteredUsers = res?.filter(user => {
        const { title: Title, status: Status } = user;

        if (Title?.toLowerCase()?.includes(value) || Status?.toLowerCase()?.includes(value)) {
          return user;
        }

        return null;
      });

      setWorkspace(filteredUsers);
    },
    [id ? data?.user_workspace : data]
  );

  return {
    isDialogOpen,
    handleSearchChange,
    handleResetFilters,
    handleDelete,
    handleCloseDialog,
    handleOpenDialog,
    workspace,
    isFetching
  };
};

export default useGetUtilsHandlers;
