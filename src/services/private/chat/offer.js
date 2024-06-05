import { privateAPI } from '..';

export const offerApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    createOffer: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('profile', body.profile);
        formData.append('budget_type', body.budget_type);
        formData.append('gig', body.gig);
        formData.append('description', body.description);
        formData.append('rates', body.rates);
        formData.append('timeline', body.timeline);
        formData.append('receiver_id', body.recieverId);
        formData.append('is_custom_offer', true);

        for (let i = 0; i < body.job_offer_attachments.length; i += 1) {
          formData.append(`job_offer_attachments[${i}]file`, body.job_offer_attachments[i]);
        }

        return {
          url: '/dashboard/freelancer/job/offer/create/',
          method: 'POST',
          body: formData,
        };
      },
    }),
    acceptChatOffer: build.mutation({
      query: body => ({
        url: `/dashboard/client/workspace/custom/job/offer/${body.offerId}/status/`,
        method: 'PATCH',
        body: { workspace: body.workspace, status: body.status },
      }),
    }),
  }),
});

export const { useCreateOfferMutation, useAcceptChatOfferMutation } = offerApi;
