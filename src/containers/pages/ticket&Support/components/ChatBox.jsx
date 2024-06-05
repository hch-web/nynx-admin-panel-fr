import React, { useMemo } from 'react';
import { Box } from '@mui/material';

import { CLOSED, PENDING } from 'utilities/constants';
import ChatMessages from './ChatMessages';
import ChatForm from './ChatForm';
import { useTicketSupportContext } from '../context/TicketSupportContext';

function ChatBox() {
  const { ticketDetails } = useTicketSupportContext();

  const allowSendMessage = useMemo(() => {
    const status = ticketDetails?.ticket_status;
    if (status === PENDING) return false;

    return status !== CLOSED;
  }, [ticketDetails]);

  return (
    <Box>
      <ChatMessages />

      {allowSendMessage && <ChatForm />}
    </Box>
  );
}

export default ChatBox;
