import { privateAPI } from '.';

export const activityApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    getPrevMessages: build.query({
      query: id => `/chat/get/workspace/activity/previous/chat/?workspace_id=${id}`,
      providesTags: ['GetPrevMessages'],
    }),
    getActivityMessages: build.query({
      query: body => `/chat/get/workspace/activity/previous/chat/?workspace_id=${body.id}&limit=1000&offset=${body.offset}`,
      providesTags: ['GetActivityMessages'],
    }),
    sendAttachments: build.mutation({
      query: body => {
        const formData = new FormData();
        formData.append('file', body.file);

        return {
          url: '/chat/create/attachment/',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useGetPrevMessagesQuery, useGetActivityMessagesQuery, useSendAttachmentsMutation } =
  activityApi;
