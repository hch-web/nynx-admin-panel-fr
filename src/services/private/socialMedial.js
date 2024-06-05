import { privateAPI } from '.';

export const socialMediaAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    socialMediaList: build.query({
      query: () => '/asset/media/',
      providesTags: ['socialMediaList']
    }),
    deleteSocialMedia: build.mutation({
      query: id => ({
        url: `/asset/media/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['socialMediaList'],
    }),
    getSocialMediaById: build.query({
      query: id => `/asset/media/${id}/`,
    }),
    addSocialMedia: build.mutation({
      query: body => ({
        url: '/asset/media/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['socialMediaList'],
    }),
    updateSocialMedia: build.mutation({
      query: body => ({
        url: `/asset/media/${body.id}/`,
        method: 'PUT',
        body: body.payload,
      }),
      invalidatesTags: ['socialMediaList'],
    }),

  }),
});

export const {
  useAddSocialMediaMutation,
  useDeleteSocialMediaMutation,
  useGetSocialMediaByIdQuery,
  useSocialMediaListQuery,
  useUpdateSocialMediaMutation,
} = socialMediaAPI;
