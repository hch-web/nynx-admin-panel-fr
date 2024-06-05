import { privateAPI } from '.';

export const skillsAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    skillsList: build.query({
      query: () => '/admin_dashboard/job-skill-list/',
      providesTags: ['skillsList']
    }),
    deleteSkill: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-job-skill/${body.id}/`,
        body: {
          skill_status: body.status,
        },
        method: 'PUT',
      }),
      invalidatesTags: ['skillsList'],
    }),
    getSkillById: build.query({
      query: id => `/admin_dashboard/job-skill-detail/${id}/`,
    }),

  }),
});

export const {
  useLazySkillsListQuery,
  useSkillsListQuery,
  useDeleteSkillMutation,
  useGetSkillByIdQuery
} = skillsAPI;
