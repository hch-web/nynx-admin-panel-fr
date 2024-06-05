import React from 'react';
import { Box, Typography } from '@mui/material';
import propTypes from 'prop-types';

// SERVICES

// STYLES
import { ChatMessageBoxStyles, chatOfferContainerStyles } from 'styles/mui/containers/chat-box-styles';

// UTILITIES
import { setIconByFileType } from 'utilities/helpers';
import { saveAs } from 'file-saver';
import { formatDate } from 'utilities/utility-functions';

function DisputeMessage({ dispute }) {
  const handleSaveFile = file => {
    saveAs(file);
  };
  return (
    <Box className="d-flex flex-column" sx={chatOfferContainerStyles}>
      <Box className="mb-2">
        <Typography variant="body1">
          Dispute between {dispute?.freelancer?.name} and {dispute?.client?.name}
        </Typography>
      </Box>
      <Box
        className="py-2 px-3 w-100"
        sx={{
          background: '#D9E8FA',
          ...ChatMessageBoxStyles,
        }}
      >
        <Box>
          <Typography variant="body1">{dispute?.subject}</Typography>

          <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
            {dispute?.reason}
          </Typography>
        </Box>

        <Box className="d-flex flex-wrap gap-2 mt-2 pointer">
          {dispute?.dispute_attachments?.map(file => (
            <Box>
              <Box
                className="col col-sm-4 col-md d-flex align-items-start mb-3 pointer"
                key={file.id}
                onClick={() => handleSaveFile(file?.attachment)}
              >
                <img src={setIconByFileType(file.attachment)} alt="file" />
              </Box>
              <Typography variant="body2">
                Created at {formatDate(file.created_at)}
              </Typography>
            </Box>
          ))}
        </Box>

      </Box>
    </Box>
  );
}

DisputeMessage.propTypes = {
  dispute: propTypes.object,
};

DisputeMessage.defaultProps = {
  dispute: null,
};

export default DisputeMessage;
