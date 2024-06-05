import { useEffect, useRef } from 'react';

function useConnectWebSocket(url, chatRoomId) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (chatRoomId) {
      const socket = new WebSocket(url);
      socketRef.current = socket;
    }

    return () => socketRef.current?.close();
  }, [chatRoomId]);

  return socketRef.current && socketRef.current;
}

export default useConnectWebSocket;
