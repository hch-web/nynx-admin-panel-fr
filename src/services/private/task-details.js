import { privateAPI } from '.';

export const taskDetailsApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    taskDetails: build.query({
      query: body => `/dashboard/freelancer/workspace/get/task/${body.id}/?task_via=${body.taskVia}`,
      providesTags: ['GetSingleTaskDetails'],
    }),
    listDeliverables: build.query({
      query: body => `/dashboard/list/task/delivery/requests/?task_via=${body.taskVia}&task_id=${body.taskId}`,
      providesTags: ['ListDeliverables'],
    }),
    deleteWorkspaceDeliverable: build.mutation({
      query: body => ({
        url: `/admin_dashboard/update-task-deliverable/${body.id}/`,
        method: 'PUT',
        body: {
          task_deliverable_status: body.task_deliverable_status,
        },
      }),
      invalidatesTags: ['ListDeliverables'],
    }),
    releasePayment: build.mutation({
      query: body => ({
        url: `/admin_dashboard/release-payment-for-freelancer/${body.id}/?offer_type=${body.offer_type}`,
        method: 'PUT',
        body: {
          task_deliverable_status: body.task_deliverable_status,
        },
      }),
      invalidatesTags: ['ListDeliverables'],
    }),
    listTaskDetails: build.query({
      query: body => `/dashboard/workspace/task/details/?task_via=${body.taskVia}&task_id=${body.taskId}`,
      providesTags: 'ListTaskDetails',
    }),
  }),
});

export const {
  useTaskDetailsQuery,
  useListDeliverablesQuery,
  useListTaskDetailsQuery,
  useDeleteWorkspaceDeliverableMutation,
  useReleasePaymentMutation
} = taskDetailsApi;
