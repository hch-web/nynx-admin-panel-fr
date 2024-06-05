import { publicAPI } from '.';

export const publicProfileApi = publicAPI.injectEndpoints({
  endpoints: build => ({
    getSkillsEducation: build.query({
      query: id => `/profile/skill/education/${id}/`,
      providesTags: ['GetSkillsEducation'],
    }),
    getAllReviews: build.query({
      query: body => `/dashboard/get/feedback/?profile_id=${body?.id}&limit=${body?.limit}&offset=${body.offset}${
        body.gigId ? `&gig_id=${body.gigId}` : ''
      }`,
      providesTags: ['GetAllReviews'],
    }),
  }),
});

export const { useGetSkillsEducationQuery, useLazyGetAllReviewsQuery } = publicProfileApi;
