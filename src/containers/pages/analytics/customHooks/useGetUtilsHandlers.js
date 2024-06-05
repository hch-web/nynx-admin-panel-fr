// import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAnalyticsDetailsMutation } from 'services/private/analytics';

const useGetUtilsHandlers = () => {
  const [analytics, setAnalytics] = useState([]);

  const { id } = useParams();
  const [filters, { data, isFetching }] = useGetAnalyticsDetailsMutation();
  const getAnalytics = () => {
    filters({ month: {}, user: id });
  };
  useEffect(() => {
    if (!filters.value) {
      getAnalytics();
    }
  }, []);
  useEffect(() => {
    if (data?.length > 0) {
      setAnalytics(data);
    }
  }, [data]);

  const handleSetMonthFilters = useCallback(
    async value => {
      setAnalytics(null);
      await filters({ month: value, user: id });
    },
    [data]
  );
  const handleResetFilters = useCallback(() => {
    setAnalytics(data);
  }, [data]);
  const handleSearchChange = useCallback(
    value => {
      const res = data;
      const filteredUsers = res?.filter(user => {
        const { last_name: LastName, first_name: FirstName } = user;

        if (LastName?.toLowerCase()?.includes(value) || FirstName?.toLowerCase()?.includes(value)) {
          return user;
        }

        return null;
      });

      setAnalytics(filteredUsers);
    },
    [data]
  );
  return {
    handleSetMonthFilters,
    handleSearchChange,
    handleResetFilters,
    filters,
    analytics,
    isFetching,
  };
};

export default useGetUtilsHandlers;
