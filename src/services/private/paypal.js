import { privateAPI } from '.';

export const paypalApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    setupPaypalAccount: build.mutation({
      query: body => ({
        url: '/payments/paypal/user/details/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetPaypalAccount'],
    }),
    getPaypalAccountInfo: build.query({
      query: () => ({
        url: '/payments/paypal/user/details/',
      }),
      providesTags: ['GetPaypalAccount'],
    }),
    updatePaypalAccountInfo: build.mutation({
      query: body => ({
        url: `/payments/paypal/user/details/${body.id}/`,
        method: 'PATCH',
        body: {
          paypal_email: body.paypal_email,
        },
      }),
      invalidatesTags: ['GetPaypalAccount'],
    }),
    withdrawAmount: build.mutation({
      query: body => ({
        url: '/payments/paypal/payout/method/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetAnalyticsDetails'],
    }),
  }),
});

export const {
  useSetupPaypalAccountMutation,
  useGetPaypalAccountInfoQuery,
  useUpdatePaypalAccountInfoMutation,
  useWithdrawAmountMutation,
} = paypalApi;
