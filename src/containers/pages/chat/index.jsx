import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

// components
import ChatBox from './ChatBox';

function Chat() {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  return (
    <Box>
      <Typography variant="h4" className="mb-3" color={darkPurple}>
        Inbox
      </Typography>
      <Box className="bg-white common-border">
        <ChatBox />
      </Box>
    </Box>
  );
}

export default Chat;
