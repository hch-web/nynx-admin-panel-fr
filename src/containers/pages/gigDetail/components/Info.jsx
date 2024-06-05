import React from 'react';
import { Grid, Typography, useTheme, Box } from '@mui/material';
import propTypes from 'prop-types';

// common
import Accordion from 'containers/common/components/Accordion';
import ReviewsGridItem from './ReviewsGridItem';

function Info({ gigDetails }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // constants
  const isDescription = gigDetails?.description || 'No Description Added';
  const isFaqs = gigDetails?.gig_faq?.length > 0;

  return (
    <Grid container spacing={2} className="mt-4 mb-4">
      <Grid item md={6} xs={12}>
        <Box>
          <Box className="mb-3">
            <Typography variant="title" color={darkPurple} className="mt-1" sx={{ fontWeight: '500' }}>
              Description
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="caption"
              color={darkPurple}
              className="mt-1"
              sx={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
            >
              {isDescription}
            </Typography>
          </Box>
        </Box>

        <Box className="mt-3">
          <Box>
            <Typography variant="title" color={darkPurple} className="mt-1" sx={{ fontWeight: '500' }}>
              FAQ
            </Typography>
          </Box>

          {isFaqs ? (
            <Box>
              {gigDetails?.gig_faq?.map(item => (
                <Accordion key={item?.id} question={item?.question} answer={item?.answer} />
              ))}
            </Box>
          ) : (
            <Box className="mt-2">
              <Typography
                variant="caption"
                color={darkPurple}
                sx={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
              >
                No Freqeuntly Asked Question added
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>

      {gigDetails?.is_monthly && <ReviewsGridItem gigDetails={gigDetails} />}
    </Grid>
  );
}

Info.propTypes = {
  gigDetails: propTypes.object,
};

Info.defaultProps = {
  gigDetails: {},
};

export default Info;
