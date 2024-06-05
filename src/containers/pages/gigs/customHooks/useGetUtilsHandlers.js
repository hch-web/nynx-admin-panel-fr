import useHandleApiResponse from 'customHooks/useHandleApiResponse';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useDeleteGigsMutation,
  useGetFreelancerByIdQuery,
  useLazyGetGigAllListQuery,
} from 'services/private/freelancer';

const useGetUtilsHandlers = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [gigs, setGigs] = useState([]);
  const { id } = useParams();
  const [getGigs, { data, isFetching }] = useLazyGetGigAllListQuery();
  const { data: gigData, isFetching: gigFetching } = useGetFreelancerByIdQuery(id, { skip: !id });

  const [deleteGig, { error, isSuccess }] = useDeleteGigsMutation();
  useHandleApiResponse(error, isSuccess, 'Status updated successfully!', false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [count, setCount] = useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getGigs({
      limit: rowsPerPage,
      offset: newPage * rowsPerPage,
    });
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    getGigs({
      limit: parseInt(event.target.value, 10),
      offset: 0,
    });
  };
  useEffect(() => {
    if (!id) {
      const getAsyncSingleServiceGigs = async () => {
        await getGigs({ limit: rowsPerPage, offset: page });
      };
      getAsyncSingleServiceGigs();
    }
  }, []);
  useEffect(() => {
    if (gigData?.profile_gig?.length > 0) {
      setGigs(gigData.profile_gig);
    }
    if (data?.results?.length > 0) {
      setGigs(data.results);
      setCount(data?.count);
    }
  }, [id ? gigData?.profile_gig : data?.results]);

  const handleOpenDialog = useCallback(body => {
    setSelectedId(body);
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleDelete = useCallback(async () => {
    await deleteGig(selectedId);
    setDialogOpen(false);
  }, [selectedId]);

  const handleResetFilters = useCallback(() => {
    setGigs(id ? data?.profile_gig : data?.results);
    setCount(!id && data?.count);
  }, [id ? gigData?.profile_gig : data?.results]);

  const handleSearchChange = useCallback(
    value => {
      const res = id ? gigData?.profile_gig : data?.results;
      const filteredUsers = res?.filter(user => {
        const { title: Title, status: Status, rating: Rating } = user;

        if (
          Title?.toLowerCase()?.includes(value) ||
          Status?.toLowerCase()?.includes(value) ||
          Rating?.toString()?.toLowerCase()?.includes(value)
        ) {
          return user;
        }

        return null;
      });

      setGigs(filteredUsers);
    },
    [id ? gigData?.profile_gig : data?.results]
  );

  return {
    isDialogOpen,
    handleSearchChange,
    handleResetFilters,
    handleDelete,
    handleCloseDialog,
    handleOpenDialog,
    gigs,
    page,
    count,
    handleChangePage,
    rowsPerPage,
    handleChangeRowsPerPage,
    isFetching,
    gigFetching,
  };
};

export default useGetUtilsHandlers;
