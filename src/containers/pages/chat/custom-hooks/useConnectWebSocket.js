import { useEffect, useRef } from 'react';

function useConnectWebSocket(url) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socketRef.current = socket;

    return () => socket.close();
  }, []);

  return socketRef.current;
}

export default useConnectWebSocket;
