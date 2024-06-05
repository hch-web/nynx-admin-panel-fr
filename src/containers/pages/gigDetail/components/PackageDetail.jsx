import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';

// styles
import myStyles from 'styles/mui/containers/gig-details.module.scss';

// components
import Features from './Features';

// utilities
import {
  filterAdhocFields,
  filterMonthlyFields,
  findAdhocFeaturePrice,
  findMonthlyFeaturePrice,
  findAdhocDeadlineFeatureField,
  findAdhocFeatureDescription,
  findMonthlyFeatureDescription,
} from '../utilities/helper';
import ReviewsGridItem from './ReviewsGridItem';

function PackageDetail({ gigDetails }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // constants
  const isFeatures = gigDetails?.gig_feature?.length > 0;

  return (

    <Grid container spacing={2} className={`${myStyles.packageDetails}`}>
      <Grid item xs={12} md={12} className="mt-5">
        <Typography variant="title" color={darkPurple} className="mt-1" sx={{ fontWeight: '500' }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          What's included
        </Typography>
      </Grid>
      {isFeatures ? (
        <>
          {gigDetails?.is_adhoc && (
            <Grid item xs={12} md={6}>
              <Features
                isAdhoc
                features={filterAdhocFields(gigDetails?.gig_feature)}
                featureDescription={findAdhocFeatureDescription(gigDetails?.gig_feature)}
                featurePrice={findAdhocFeaturePrice(gigDetails?.gig_feature)}
                isAdhocThreeTier={gigDetails?.is_adhoc_three_tire}
                isMonthlyTier={gigDetails?.is_monthly_three_tire}
                deadline={findAdhocDeadlineFeatureField(gigDetails?.gig_feature)}
                gigDetails={gigDetails}
              />
            </Grid>
          )}
          {gigDetails?.is_monthly ? (
            <Grid item xs={12} md={6}>
              <Features
                features={filterMonthlyFields(gigDetails?.gig_feature)}
                featurePrice={findMonthlyFeaturePrice(gigDetails?.gig_feature)}
                featureDescription={findMonthlyFeatureDescription(gigDetails?.gig_feature)}
                isAdhocThreeTier={gigDetails?.is_adhoc_three_tire}
                isMonthlyTier={gigDetails?.is_monthly_three_tire}
                gigDetails={gigDetails}
              />
            </Grid>
          ) : (
            <ReviewsGridItem gigDetails={gigDetails} />
          )}
        </>
      ) : (
        <Grid item xs={12} md={6}>
          <Typography
            variant="caption"
            color={darkPurple}
            className="mt-1"
            sx={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}
          >
            No Features Added
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

PackageDetail.propTypes = {
  gigDetails: propTypes.object,
};

PackageDetail.defaultProps = {
  gigDetails: {},
};

export default PackageDetail;
