import { privateAPI } from '.';

export const authApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    authorized: build.query({
      query: () => '/auth/user/detail/',
      providesTags: ['FetchUserDetails'],
    }),
    loginChangePassword: build.mutation({
      query: body => ({
        url: '/auth/change/password/',
        method: 'POST',
        body: {
          current_password: body.current_password,
          new_password: body.new_password,
        },
      }),
    }),
    deactivateAccount: build.mutation({
      query: body => ({
        url: '/auth/change/account/status/',
        method: 'PUT',
        body,
      }),
    }),
    updateLogoutStatus: build.mutation({
      query: () => ({
        url: '/chat/update/online/status/',
        method: 'PATCH',
        body: {
          is_online: false,
        },
      }),
    }),
  }),
});

export const {
  useAuthorizedQuery,
  useLoginChangePasswordMutation,
  useDeactivateAccountMutation,
  useUpdateLogoutStatusMutation,
  useLazyAuthorizedQuery,
} = authApi;
