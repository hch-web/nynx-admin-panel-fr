import { privateAPI } from '.';

export const attributeTypeAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    attributeTypeList: build.query({
      query: () => '/asset/attribute_type',
      providesTags: ['attributeTypeList']
    }),
  }),
});

export const {
  useAttributeTypeListQuery
} = attributeTypeAPI;
