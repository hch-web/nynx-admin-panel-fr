import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

function useGetChatContext() {
  const chatContext = useContext(ChatContext);

  return chatContext;
}

export default useGetChatContext;
