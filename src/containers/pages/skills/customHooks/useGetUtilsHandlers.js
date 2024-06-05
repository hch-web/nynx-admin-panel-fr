import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteSkillMutation, useSkillsListQuery } from 'services/private/skills';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [skills, setSkills] = useState([]);

  const { data, isFetching } = useSkillsListQuery();
  const [deleteSkills, { error, isSuccess }] = useDeleteSkillMutation();
  useHandleApiResponse(error, isSuccess, 'skill status updated successfully!', false);

  useEffect(() => {
    if (data?.length > 0) {
      setSkills(data);
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
    await deleteSkills(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setSkills(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredCategory = data?.filter(filterValues => {
        const { title: Name } = filterValues;

        if (
          Name?.toLowerCase()?.includes(value)
        ) {
          return filterValues;
        }

        return null;
      });

      setSkills(filteredCategory);
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
    skills,
    isFetching
  };
};

export default useGetUtilsHandlers;
