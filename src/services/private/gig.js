import { privateAPI } from '.';

export const gigApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    getGigDetails: build.query({
      query: id => `/admin_dashboard/gig-detail/${id}/`,
      providesTags: ['GetGigData'],
    }),
    getGigList: build.query({
      query: body => `/gig/user/gig/list/?id=${body.id}&status=${body?.status || ''}`,
      providesTags: ['GetGigList'],
    }),
    deleteGig: build.mutation({
      query: id => ({
        url: `/gig/overview/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['GetGigList'],
    }),
  }),
});

export const { useGetGigDetailsQuery, useGetGigListQuery, useDeleteGigMutation } = gigApi;
