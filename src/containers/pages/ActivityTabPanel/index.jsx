import React from 'react';
import { Box, Typography, Divider, Avatar, Tooltip } from '@mui/material';

import { useParams } from 'react-router-dom';
import { saveAs } from 'file-saver';

// CUSTOM HOOKS

// STYLES
import {
  activityChatMessagesWrapperStyles,
  activityChatMessageBoxStyles,
} from 'styles/mui/containers/workPlaceActivityTab';
import { formatFileSize, formatName, setIconByFileType } from 'utilities/helpers';
import { useGetActivityMessagesQuery } from 'services/private/workSpacesActivity';

// UTILITIES

function ActivityTabPanel() {
  const { id } = useParams();
  const { data: chatMessages } = useGetActivityMessagesQuery({ id, limit: 6, offset: 0 });
  const user = true;
  return (
    <Box className="bg-white" sx={{ borderRadius: '10px' }}>
      {/* HEADER */}
      <Box className="py-3 px-4">
        <Typography variant="h6" className="fw-600">
          Activity
        </Typography>
      </Box>

      <Divider light />

      {/* BODY */}
      <Box className="px-0 py-2">
        <Box sx={activityChatMessagesWrapperStyles} id="cont">
          <Box sx={{ height: 'auto' }} className="d-flex flex-column-reverse justify-content-end px-3">
            {chatMessages?.results?.length === 0 ? ( // Check if chatMessages array is empty
              <Typography variant="body1" className="text-muted text-center mt-3">
                No messages yet
              </Typography>
            ) : (
              chatMessages?.results?.map(item => {
                const isSentByMe = user === item?.is_buyer;
                const fileName = `${item?.attachment?.file_name?.split('/')[1].slice(0, 15)}...`;
                const attachment = item?.attachment;

                return (
                  <Box
                    id={`message-${item?.id}`}
                    key={item?.id}
                    className={`d-flex ${
                      isSentByMe ? 'flex-row-reverse ms-auto' : 'flex-row me-auto'
                    } align-items-center gap-2 my-2 mw-75`}
                  >
                    <Tooltip title={formatName(item?.first_name, item?.last_name, item?.username)}>
                      <Avatar src={item?.image || ''} alt={item?.first_name} />
                    </Tooltip>

                    <Box
                      className="py-2 px-3"
                      sx={{
                        background: isSentByMe ? '#f6f4f5' : '#ffe3c5',
                        ...activityChatMessageBoxStyles,
                      }}
                    >
                      {attachment ? (
                        <Box
                          className="pointer d-flex align-items-center gap-2"
                          onClick={() => saveAs(attachment?.file)}
                        >
                          <img src={setIconByFileType(attachment?.file)} alt="file-icon" />

                          <Box>
                            <Typography sx={{ fontSize: '11px' }}>{fileName}</Typography>
                            <Typography className="text-muted" sx={{ fontSize: '11px' }}>
                              {formatFileSize(attachment?.file_size)}
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography variant="body1">{item?.message}</Typography>
                      )}
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Box>

      <Divider light />
    </Box>
  );
}

export default ActivityTabPanel;
