import React from 'react';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

// API HOOKS
import { useListDeliverablesQuery } from 'services/private/task-details';

// STYLES
import styles from 'styles/mui/containers/workspace-general.module.scss';

// UTILITIES & COMPONENTS
import Rating from 'containers/common/components/Rating';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import DeliverableList from './DeliverableList';

function DeliverableFeedback() {
  const theme = useTheme();
  const { taskVia, taskId } = useParams();

  // STATE HOOKS

  // API HOOKS
  const {
    data: taskDeliverables,
    isLoading,
    isFetching,
  } = useListDeliverablesQuery({ taskVia, taskId }, { skip: !(taskVia && taskId) });

  // COLORS
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // HANDLER FUNCTIONS

  // CONSTANTS
  const clientRating = taskDeliverables?.client_feedback?.rating;
  const clientDescription = taskDeliverables?.client_feedback?.description;
  const freelancerRating = taskDeliverables?.freelancer_feedback?.rating;
  const freelancerDescription = taskDeliverables?.freelancer_feedback?.description;

  return (
    <Box className="bg-white mt-2" sx={{ borderRadius: '10px' }}>
      <Box className="px-4 py-3 d-flex justify-content-between">
        <Typography variant="h6" color={darkPurple} className="fw-500">
          Delivery & Feedback
        </Typography>
      </Box>

      <Divider />

      <Box className={`py-3 ${styles.listItems}`}>
        {!(isLoading || isFetching) ? (
          <DeliverableList />
        ) : (
          <Box className="my-5 py-5">
            <GlobalLoader />
          </Box>
        )}

        <Divider />

        {/* FEEDBACK BOX WRAPPER */}
        <Box className="mt-2 px-4 d-flex flex-column gap-4">
          {/* CLIENT FEEDBACK BOX */}

          <Box className="col-12 col-md">
            <Typography variant="body1" className="fw-500">
              Feedback to Client
            </Typography>

            <Box className="d-flex align-items-center">
              <Rating readOnly value={clientRating || 0} />

              {clientRating && <Typography variant="h4">{parseFloat(clientRating).toFixed(1)}</Typography>}
            </Box>

            {clientDescription && <Typography variant="body2">{clientDescription}</Typography>}
          </Box>

          {/* FREELANCER FEEDBACK BOX */}
          <Divider />
          <Box className="col-12 col-md">
            <Typography variant="body1" className="fw-500">
              Feedback to Freelancer
            </Typography>

            <Box className="d-flex align-items-center">
              <Rating readOnly value={freelancerRating || 0} />

              {freelancerRating && (
                <Typography variant="h4">{parseFloat(freelancerRating).toFixed(1)}</Typography>
              )}
            </Box>

            {freelancerDescription && <Typography variant="body2">{freelancerDescription}</Typography>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DeliverableFeedback;
