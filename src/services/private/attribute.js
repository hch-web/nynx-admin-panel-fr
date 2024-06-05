import { privateAPI } from '.';

export const attributeAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    attributeList: build.query({
      query: () => '/asset/attribute/',
      providesTags: ['attributeList']
    }),
    deleteAttribute: build.mutation({
      query: id => ({
        url: `/asset/attribute/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['attributeList'],
    }),
    getAttributeById: build.query({
      query: id => `/asset/attribute/${id}/`,
    }),
    addAttribute: build.mutation({
      query: body => ({
        url: '/asset/attribute/',
        method: 'POST',
        body: {
          ...body,
        },
      }),
      invalidatesTags: ['attributeList'],
    }),
    updateAttribute: build.mutation({
      query: body => ({
        url: `/asset/attribute/${body.id}/`,
        method: 'PUT',
        body: {
          ...body.payload,
        },
      }),
      invalidatesTags: ['attributeList'],
    }),

  }),
});

export const {
  useAttributeListQuery,
  useDeleteAttributeMutation,
  useGetAttributeByIdQuery,
  useAddAttributeMutation,
  useLazyAttributeListQuery,
  useUpdateAttributeMutation
} = attributeAPI;
