const token = localStorage.getItem('token');

// Constants
export const ALL_ROOM_SOCKET_URL = `${process.env.REACT_APP_SOCKET_URL}/chat/update/?token=${token}`;

export const webSocketUrl = roomId => `${process.env.REACT_APP_SOCKET_URL}/dashboard/chat/?token=${token}&room_id=${roomId}`;
// export const getWsActivityURL = workspaceId => `${process.env.REACT_APP_SOCKET_URL}/workspace/activity/chat/?token=${token}&workspace=${workspaceId}`;
