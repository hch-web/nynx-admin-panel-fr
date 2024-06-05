import { privateAPI } from '.';

export const categoryAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    categoriesList: build.query({
      query: () => '/asset/categories/list/',
      providesTags: ['categoriesList'],
    }),
    deleteCategory: build.mutation({
      query: id => ({
        url: `/asset/category/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categoriesList'],
    }),
    getCategoryById: build.query({
      query: id => `/asset/category/${id}/`,
    }),
    addCategory: build.mutation({
      query: body => ({
        url: '/asset/category/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['categoriesList'],
    }),
    updateCategory: build.mutation({
      query: body => ({
        url: `/asset/category/${body.id}/`,
        method: 'PUT',
        body: body.payload,
      }),
      invalidatesTags: ['categoriesList'],
    }),
    getSubCategory: build.query({
      query: () => '/asset/subcategory/',
      providesTags: ['subCategoryLists'],
    }),
    getSubCategoryById: build.query({
      query: id => `/asset/subcategory?id=${id}`,
      providesTags: ['subCategoryList'],
    }),
    getSubCategoryDetailById: build.query({
      query: id => `/asset/subcategory/${id}/`,
    }),
    addSubCategory: build.mutation({
      query: body => ({
        url: '/asset/subcategory/',
        method: 'POST',
        body
      }),
      invalidatesTags: ['subCategoryList', 'subCategoryLists'],
    }),
    updateSubCategory: build.mutation({
      query: body => ({
        url: `/asset/subcategory/${body.id}/`,
        method: 'PUT',
        body: body.payload,
      }),
      invalidatesTags: ['subCategoryList', 'subCategoryLists'],
    }),
    deleteSubCategory: build.mutation({
      query: id => ({
        url: `/asset/subcategory/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subCategoryList'],
    }),
  }),
});

export const {
  useCategoriesListQuery,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useGetSubCategoryByIdQuery,
  useDeleteSubCategoryMutation,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useAddSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useGetSubCategoryDetailByIdQuery,
  useGetSubCategoryQuery
} = categoryAPI;
