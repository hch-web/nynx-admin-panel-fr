import { privateAPI } from '.';

export const featureAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    featureList: build.query({
      query: () => '/asset/feature/',
      providesTags: ['featuresList']
    }),
    getFeatureBySubId: build.query({
      query: id => `/asset/feature/?subcategory=${id}`,
      providesTags: ['featuresList']
    }),
    deleteFeature: build.mutation({
      query: id => ({
        url: `/asset/feature/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['featuresList'],
    }),
    getFeatureById: build.query({
      query: id => `/asset/feature/${id}/`,
    }),
    addFeatures: build.mutation({
      query: body => ({
        url: '/asset/feature/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['featuresList'],
    }),
    updateFeatures: build.mutation({
      query: body => ({
        url: `/asset/feature/${body.id}/`,
        method: 'PATCH',
        body: body.payload,
      }),
      invalidatesTags: ['featuresList'],
    }),

  }),
});

export const {
  useDeleteFeatureMutation,
  useFeatureListQuery,
  useGetFeatureByIdQuery,
  useAddFeaturesMutation,
  useUpdateFeaturesMutation,
  useGetFeatureBySubIdQuery
} = featureAPI;
