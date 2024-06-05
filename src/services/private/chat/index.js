import { privateAPI } from '..';

export const chatApi = privateAPI.injectEndpoints({
  endpoints: build => ({
    createRoom: build.mutation({
      query: body => ({
        url: '/chat/create/room/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetAllRooms'],
    }),
    listAllRoomUsers: build.query({
      query: body => `/chat/get/all/rooms/?search=${body?.search || ''}`,
      providesTags: ['GetAllRooms'],
    }),
    listChatMessages: build.query({
      query: body => `/chat/get/room/${body?.id}/previous/chat/?limit=${body?.limit}&offset=${body?.offset}`,
    }),
    blockUser: build.mutation({
      query: body => ({
        url: `/chat/block/room/${body}/`,
        method: 'PUT',
      }),
      invalidatesTags: ['GetAllRooms'],
    }),
    clearChat: build.mutation({
      query: body => ({
        url: `/chat/clear/room/${body}/chat/`,
        method: 'PUT',
      }),
      invalidatesTags: ['GetAllRooms'],
    }),
    sendChatAttachments: build.mutation({
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

export const {
  useCreateRoomMutation,
  useLazyListAllRoomUsersQuery,
  useLazyListChatMessagesQuery,
  useSendChatAttachmentsMutation,
  useBlockUserMutation,
  useClearChatMutation,
} = chatApi;
