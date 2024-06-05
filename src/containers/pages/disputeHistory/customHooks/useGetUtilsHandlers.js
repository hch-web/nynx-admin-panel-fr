// import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useGetAllPaymentQuery } from 'services/private/ticketAndSupport';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const { data, isFetching, refetch } = useGetAllPaymentQuery();

  useEffect(() => {
    if (data?.length > 0) {
      setHistory(data);
    }
  }, [data]);

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    refetch();
    setDialogOpen(false);
  }, []);

  const handleResetFilters = useCallback(() => {
    setHistory(data);
  }, [data]);

  const handleSearchChange = useCallback(
    value => {
      const filteredCategory = data?.filter(filterValues => {
        const {
          client_order: clientOrder,
          job_offer: jobOffer,
        } = filterValues;

        if (
          clientOrder?.toString().toLowerCase()?.includes(value) ||
          jobOffer?.toString().toLowerCase()?.includes(value)
        ) {
          return filterValues;
        }

        return null;
      });

      setHistory(filteredCategory);
    },
    [data]
  );

  return {
    isDialogOpen,
    handleSearchChange,
    handleResetFilters,
    handleCloseDialog,
    handleOpenDialog,
    history,
    isFetching,
  };
};

export default useGetUtilsHandlers;
