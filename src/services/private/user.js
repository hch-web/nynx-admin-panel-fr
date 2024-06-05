import { privateAPI } from '.';

export const userAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    getUserDetail: build.query({
      query: () => 'auth/user/detail/',
      providesTags: ['GetUserDetails'],
    }),

    updateProfile: build.mutation({
      query: body => ({
        url: '/profile/update/',
        method: 'PUT',
        body: {
          ...body.payload,
          username: undefined,
          id: undefined,
          password: body.payload.password || undefined,
          confirmPassword: undefined,
        },
      }),
      invalidatesTags: ['GetUserDetails', 'GetUsersList'],
    }),

    getUserById: build.query({
      query: id => `/auth/user/detail/${id}/`,
    }),

    getUsersList: build.query({
      query: () => '/admin_dashboard/all-admin-user/',
      providesTags: ['GetUsersList'],
    }),

    addUser: build.mutation({
      query: body => ({
        url: '/admin_dashboard/register-admin/',
        method: 'POST',
        body: {
          ...body,
          confirmPassword: undefined,
        },
      }),
      invalidatesTags: ['GetUsersList'],
    }),

    deleteUser: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-user-status/${body.id}/`,
        body: {
          profile_status: body.status,
        },
        method: 'PUT',
      }),
      invalidatesTags: ['GetUsersList'],
    }),
    disconnectSocialMedia: build.mutation({
      query: id => ({
        url: `/profile/social/media/${id}`,
        method: 'DELETE',
      }),
    }),
    listSocialMedia: build.query({
      query: () => '/asset/media/',
      providesTags: ['UserConnectedSocialMedia'],
    }),
    addSocialMedia: build.mutation({
      query: body => ({
        url: '/profile/social/media/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserConnectedSocialMedia', 'UserConnectedSocialMediaURL'],
    }),
    getSocialMediaUrl: build.query({
      query: () => '/profile/social/media/',
      providesTags: ['UserConnectedSocialMediaURL'],
    }),
  }),
});

export const {
  useGetSocialMediaUrlQuery,
  useAddSocialMediaMutation,
  useListSocialMediaQuery,
  useGetUserDetailQuery,
  useLazyGetUserDetailQuery,
  useUpdateProfileMutation,
  useGetUserByIdQuery,
  useGetUsersListQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useDisconnectSocialMediaMutation,
} = userAPI;
