import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetJobByIdQuery } from 'services/private/client';

const useGetUtilsHandlers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const { id } = useParams();
  const { data, isFetching } = useGetJobByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (data?.freelancers?.length > 0) {
      setFreelancers(data?.freelancers);
    }
  }, [data?.freelancers]);
  const handleResetFilters = useCallback(() => {
    setFreelancers(data?.freelancers);
  }, [data?.freelancers]);

  const handleSearchChange = useCallback(
    value => {
      const filteredUsers = data?.freelancers?.filter(user => {
        const { freelancer_first_name: firstName, freelancer_last_name: lastName, freelancer_username: userName } = user;

        if (
          firstName?.toLowerCase()?.includes(value) ||
          lastName?.toLowerCase()?.includes(value) ||
          userName?.toLowerCase()?.includes(value)
        ) {
          return user;
        }

        return null;
      });

      setFreelancers(filteredUsers);
    },
    [data?.freelancers]
  );

  return {
    handleSearchChange,
    handleResetFilters,
    freelancers,
    isFetching
  };
};

export default useGetUtilsHandlers;
