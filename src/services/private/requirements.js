import { privateAPI } from '.';

export const requirementsApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    clientRequirementsList: build.query({
      query: body => ({
        // url: `/gig/requirement/answer/?id=${body.gigId}`,
        url: `/gig/requirement-answer/?gig_id=${body.gigId}&task_via=${body.orderVia}&job_offer_id=${body.taskId}`,
      }),
      providesTags: ['GetClientRequirements'],
    }),
    getSingleRequirement: build.query({
      query: id => `/gig/requirment/answer/${id}/`,
    }),
  }),
});

export const {
  useClientRequirementsListQuery,
  useGetSingleRequirementQuery,
} = requirementsApi;
