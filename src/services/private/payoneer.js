import { privateAPI } from '.';

export const payoneerApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    setupAndGetPayoneerAccount: build.mutation({
      query: body => ({
        url: '/payments/create-payoneer-account-detail/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SetupAndGetPayoneerAccount'],
    }),

    getPayoneerAccountDetails: build.query({
      query: () => ({
        url: '/payments/create-payoneer-account-detail/',
        method: 'POST',
      }),
      providesTags: ['SetupAndGetPayoneerAccount'],
    }),

    registerPayoneerAccount: build.mutation({
      query: body => ({
        url: '/payments/registration-payoneer/',
        method: 'POST',
        body,
      }),
    }),

    withdrawEarnings: build.mutation({
      query: body => ({
        url: '/payments/paypal/payout/method/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetAnalyticsDetails', 'GetWalletDetails'],
    }),
  }),
});

export const {
  useSetupAndGetPayoneerAccountMutation,
  useGetPayoneerAccountDetailsQuery,
  useRegisterPayoneerAccountMutation,
  useWithdrawEarningsMutation,
} = payoneerApi;
