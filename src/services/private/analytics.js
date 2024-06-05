import { privateAPI } from '.';

export const analyticsApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    getAnalyticsDetails: build.mutation({
      query: body => ({
        url: '/admin_dashboard/total-earning/',
        params: {
          month: body?.month?.value || undefined,
          user: body?.user || undefined
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAnalyticsDetailsMutation } = analyticsApi;
