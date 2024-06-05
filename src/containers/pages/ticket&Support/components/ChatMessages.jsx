import React, { useEffect, useRef } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { saveAs } from 'file-saver';
import { v4 } from 'uuid';

// COMPONENTS & UTILITIES
import { getFilenameFromUrl, getIconByExtension, isMyMessage } from 'utilities/helpers';
import {
  chatMessageWrapperStyles,
  chatMessagesContainerStyles,
  getMessageBoxStyles,
} from 'styles/mui/containers/ticketAndSupport';
import { useGetTicketChatQuery } from 'services/private/ticketAndSupport';
import { useTicketSupportContext } from '../context/TicketSupportContext';

function ChatMessages() {
  const lastMessageRef = useRef(null);

  const { ticketId } = useTicketSupportContext();
  const { data: messages } = useGetTicketChatQuery(ticketId, { skip: !ticketId });
  const { email } = useSelector(state => state.auth?.userInfo);

  useEffect(() => {
    if (messages) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // HANDLERS
  const handleSaveFile = url => {
    saveAs(url, 'Attachment');
  };

  return (
    <Box sx={chatMessageWrapperStyles}>
      <Box sx={chatMessagesContainerStyles}>
        {messages?.results?.map(item => {
          const isSentByMe = isMyMessage(item?.sender, email);

          return (
            <Box key={item?.id} sx={getMessageBoxStyles(isSentByMe)}>
              <Box
                color={isSentByMe ? 'black' : 'white'}
                className="breakAnywhere"
                dangerouslySetInnerHTML={{ __html: item?.message }}
              />

              <Box className="text-end">
                {item?.file?.map(entry => (
                  <IconButton
                    size="small"
                    key={v4()}
                    title={getFilenameFromUrl(entry)}
                    onClick={() => handleSaveFile(entry)}
                  >
                    <img
                      src={getIconByExtension(entry)}
                      height="30px"
                      width="30px"
                      alt="file"
                    />
                  </IconButton>
                ))}
              </Box>

              <Typography
                className={isSentByMe ? 'text-end' : 'text-start'}
                variant="subtitle2"
                color={isSentByMe ? '#838383' : '#fafafa'}
                fontSize={12}
              >
                {moment(item?.created_at).format('DD-MM-YY hh:mm A')}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Box ref={lastMessageRef} />
    </Box>
  );
}

export default ChatMessages;
