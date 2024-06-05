const { publicAPI } = require('.');

export const authApi = publicAPI.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: body => ({
        url: '/auth/login/',
        method: 'POST',
        body,
      }),
    }),

    forgotPassword: build.mutation({
      query: body => ({
        url: '/auth/forgot/password/',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: build.mutation({
      query: body => ({
        url: '/auth/reset/password/',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
