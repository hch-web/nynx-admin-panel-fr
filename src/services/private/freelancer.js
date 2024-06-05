import { privateAPI } from '.';

export const clientAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    freelancerList: build.query({
      query: () => '/admin_dashboard/freelancer-list/',
      providesTags: ['freelancerList'],
    }),
    deleteFreelancer: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-user-status/${body.id}/`,
        method: 'PUT',
        body: {
          profile_status: body.status,
        },
      }),
      invalidatesTags: ['freelancerList'],
    }),
    getFreelancerById: build.query({
      query: id => `/admin_dashboard/freelancer-detail/${id}/`,
      providesTags: ['gigList'],
    }),
    deleteGigs: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-gig-status/${body.id}/`,
        method: 'PUT',
        body: {
          gig_status: body.status,
        },
      }),
      invalidatesTags: ['gigList', 'GetGigAllList'],
    }),
    getGigAllList: build.query({
      query: body => `admin_dashboard/user-gig-list/?offset=${body?.offset}&limit=${body?.limit}`,
      providesTags: ['GetGigAllList'],
    }),
    /// //Team//////
    // getTeam: build.query({
    //   query: id => `/dashboard/client/workspace/freelancers/list/?workspace=${id}&freelancer=`,
    //   providesTags: ['getTeamList'],
    // }),
    getSubmittedProposal: build.query({
      query: id => `/admin_dashboard/proposal-list/?budget_type=project_budget&workspace=${id}&job_offer_status&profile&gig&gig__profile__id`,
      providesTags: ['getProposalList'],
    }),
    getTasks: build.query({
      query: id => `/admin_dashboard/workspace-task-list/?workspace=${id}`,
      providesTags: ['getTasksList'],
    }),
    deleteJobOfferTask: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-job-offer/${body.id}/`,
        method: 'PUT',
        body: {
          job_offer_status: body.status,
        },
      }),
      invalidatesTags: ['getProposalList', 'getTasksList'],
    }),
    deleteClientOrderTask: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-client-order/${body.id}/`,
        method: 'PUT',
        body: {
          client_order_status: body.status,
        },
      }),
      invalidatesTags: ['getTasksList'],
    }),
  }),
});

export const {
  useFreelancerListQuery,
  useDeleteFreelancerMutation,
  useGetFreelancerByIdQuery,
  useDeleteGigsMutation,
  // useGetTeamQuery,
  useGetSubmittedProposalQuery, useGetTasksQuery, useLazyGetGigAllListQuery, useGetGigAllListQuery, useDeleteJobOfferTaskMutation, useDeleteClientOrderTaskMutation
} = clientAPI;
