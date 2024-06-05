import { privateAPI } from '.';

export const clientAPI = privateAPI.injectEndpoints({
  endpoints: build => ({
    clientsList: build.query({
      query: () => '/admin_dashboard/client-list/',
      providesTags: ['clientList'],
    }),
    deleteClient: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-user-status/${body.id}/`,
        method: 'PUT',
        body: {
          profile_status: body.profile_status,
        },
      }),
      invalidatesTags: ['clientList'],
    }),
    getClientById: build.query({
      query: id => `/admin_dashboard/client-detail/${id}/`,
      providesTags: ['workSpacesList'],
    }),
    deleteWorkSpace: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-workspace-status/${body.id}/`,
        method: 'PUT',
        body: {
          workspace_status: body.workspace_status,
        },
      }),
      invalidatesTags: ['workSpacesList', 'getAllWorkspacesList'],
    }),
    getJobById: build.query({
      query: id => `/admin_dashboard/workspace-detail/${id}/`,
      providesTags: ['jobList'],
    }),
    deleteJob: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-job/${body.id}/`,
        method: 'PUT',
        body: {
          job_status: body.job_status,
        },
      }),
      invalidatesTags: ['jobList', 'getAllJobsList'],
    }),
    getDeliverables: build.query({
      query: id => `/admin_dashboard/task-deliverable-list/?workspace=${id}`,
      // query: id => `/dashboard/freelancer/workspace/deliverable/list/?workspace=${id}`,
      providesTags: ['getTasksList'],
    }),
    deleteDeliverable: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-task-deliverable/${body.id}/`,
        method: 'PUT',
        body: {
          task_deliverable_status: body.task_deliverable_status,
        },
      }),
      invalidatesTags: ['getTasksList'],
    }),
    // / ////JOBS///////////

    workspaceList: build.query({
      query: () => '/admin_dashboard/workspace-list/',
      providesTags: ['getAllWorkspacesList'],
    }),
    getAllJobs: build.query({
      query: () => '/admin_dashboard/job-list/',
      providesTags: ['getAllJobsList'],
    }),
    getJobDetail: build.query({
      query: id => `/admin_dashboard/job-detail/${id}/`,
      providesTags: ['jobDetail'],
    }),

  }),
});

export const {
  useClientsListQuery,
  useDeleteClientMutation,
  useGetClientByIdQuery,
  useDeleteWorkSpaceMutation,
  useGetJobByIdQuery,
  useDeleteJobMutation,
  useGetDeliverablesQuery,
  useWorkspaceListQuery,
  useGetAllJobsQuery,
  useGetJobDetailQuery,
  useDeleteDeliverableMutation
} = clientAPI;
