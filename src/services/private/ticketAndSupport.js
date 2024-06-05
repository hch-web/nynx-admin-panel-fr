import { privateAPI } from '.';

export const ticketAndSupport = privateAPI.injectEndpoints({
  endpoints: build => ({
    getTickets: build.query({
      query: () => ({
        url: '/help-and-support/dispute/',
        method: 'GET',
      }),
      providesTags: ['GetDisputes'],
    }),
    updateStatus: build.mutation({
      query: body => ({
        url: `/help-and-support/dispute/${body.id}/`,
        method: 'PUT',
        body: { dispute_status: body.dispute_status.value },
      }),
      invalidatesTags: ['GetDisputes', 'getTicketById'],
    }),
    updatePartialPaymentStatus: build.mutation({
      query: body => ({
        url: `/payments/partial-refund/${body.id}/`,
        method: 'PUT',
        body: { status: body.dispute_status.value },
      }),
      invalidatesTags: ['GetTransections'],
    }),
    PaymentRequest: build.mutation({
      query: body => ({
        url: '/payments/partial-refund/',
        method: 'POST',
        body,
      }),
    }),

    getTicketById: build.query({
      query: ticketId => `/help-and-support/dispute/${ticketId}/`,
      providesTags: ['getTicketById']
    }),

    getAllPayment: build.query({
      query: () => ({
        url: '/payments/partial-refund/',
        method: 'GET',
      }),
      providesTags: ['GetTransections'],
    }),
    getSinglePayment: build.query({
      query: body => ({
        url: `/payments/partial-refund/${body.id}`,
      }),
      providesTags: ['GetTransections'],
    }),
    getPayment: build.query({
      query: id => ({
        url: `/payments/partial-refund/${id}/`,
        method: 'GET',
      }),
      providesTags: ['GetTransectionDetail'],
    }),
    getTransactionHistory: build.query({
      query: params => ({
        url: '/payments/paypal-payment-list/',
        params,
      }),
    }),
    getRetrieveTransaction: build.query({
      query: body => ({
        url: `/payments/paypal-payment-retrieve/${body.transactionId}/`,
      }),
    }),
    pastialPaymentRefund: build.mutation({
      query: body => ({
        url: '/payments/partial-refund-payment/',
        method: 'POST',
        body: body.payload,
      }),
    }),
    updatePayment: build.mutation({
      query: body => ({
        url: `/payments/partial-refund/${body.id}/`,
        method: 'PUT',
        body: body.payload,
      }),
      invalidatesTags: ['GetTransections'],
    }),
    PaymentReleaseTOFreelancer: build.mutation({
      query: body => ({
        url: `/admin_dashboard/release-payment-for-freelancer/${body.id}/`,
        method: 'PUT',
        body,
      }),
    }),
    updateApproveStatus: build.mutation({
      query: body => ({
        url: `/payments/partial-refund/${body}/`,
        method: 'PUT',
        body: { status: 'approved' },
      }),
      invalidatesTags: ['GetTransections'],
    }),
    fullRefundToClient: build.mutation({
      query: body => ({
        url: '/admin_dashboard/release-payment-for-client/',
        method: 'POST',
        body: body.payload,
      }),
    }),
    partialPayment: build.mutation({
      query: body => ({
        url: '/payments/full-refund/',
        method: 'POST',
        body: body.payload,
      }),
    }),
    getFullRefundHostort: build.query({
      query: () => ({
        url: '/payments/full-refund/',
        method: 'GET',
      }),
    }),
    getSingleRefundHistort: build.query({
      query: body => ({
        url: `/payments/full-refund/${body.id}`,
        method: 'GET',
      }),
      providesTags: ['singleRefundHistort']
    }),
    updateFullRefundStatus: build.mutation({
      query: body => ({
        url: `/payments/full-refund/${body.id}/`,
        method: 'PUT',
        body: { status: body.dispute_status.value },
      }),
      invalidatesTags: ['singleRefundHistort']
    }),
  }),
});

export const {
  useGetSingleRefundHistortQuery,
  useGetFullRefundHostortQuery,
  usePartialPaymentMutation,
  useFullRefundToClientMutation,
  usePaymentReleaseTOFreelancerMutation,
  useGetTransactionHistoryQuery,
  useGetRetrieveTransactionQuery,
  usePastialPaymentRefundMutation,
  usePaymentRequestMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateStatusMutation,
  useGetAllPaymentQuery,
  useGetSinglePaymentQuery,
  useGetPaymentQuery,
  useUpdatePaymentMutation,
  useUpdateApproveStatusMutation,
  useUpdatePartialPaymentStatusMutation,
  useUpdateFullRefundStatusMutation,
} = ticketAndSupport;
