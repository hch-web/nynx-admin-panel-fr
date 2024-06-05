import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import propTypes from 'prop-types';

// API HOOKS
import { useLazyGetAllReviewsQuery } from 'services/public/profile';

// COMPONENTS & UTILITIES
import Reviews from 'containers/pages/common/Reviews';
import { formatName } from 'utilities/helpers';
import { DEFAULT_REVIEW_LIMIT } from 'utilities/constants';

function ReviewsGridItem({ gigDetails }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // API HOOKS
  const [getReviews] = useLazyGetAllReviewsQuery();

  const [reviewResponseData, setReviewResponseData] = useState({
    reviews: [],
    reviewCount: null,
  });

  const profileId = gigDetails?.profile?.id;
  const gigId = gigDetails?.id;

  useEffect(() => {
    if (profileId) {
      getReviews({ id: profileId, limit: DEFAULT_REVIEW_LIMIT, gigId }).then(({ data }) => {
        setReviewResponseData({ reviews: data?.results, reviewCount: data?.count });
      });
    }
  }, [profileId]);

  // HANDLERS
  const handleLoadMoreReviews = () => {
    if (reviewResponseData?.reviewCount > reviewResponseData?.reviews?.length) {
      getReviews({
        id: profileId,
        offset: reviewResponseData?.reviews?.length,
        limit: DEFAULT_REVIEW_LIMIT,
        gigId,
      }).then(({ data }) => {
        const nextReviews = data?.results || [];
        setReviewResponseData({
          reviews: [...reviewResponseData.reviews, ...nextReviews],
          reviewCount: data?.count,
        });
      });
    }
  };

  // CONSTANTS
  const isShowLoadMore = reviewResponseData?.reviewCount > reviewResponseData?.reviews?.length;

  return (
    <Grid item md={6} xs={12}>
      <Box className="mb-3">
        <Typography variant="title" color={darkPurple} className="mt-1 " sx={{ fontWeight: '500' }}>
          Reviews
        </Typography>
      </Box>

      <Box>
        {reviewResponseData?.reviews?.length > 0 ? (
          reviewResponseData?.reviews?.map(item => (
            <Reviews
              image={item?.user_image}
              name={formatName(item?.user_first_name, item?.user_last_name, item?.user_name)}
              country={item?.user_country}
              rating={item?.rating}
              createdAt={item?.created_at}
              description={item?.description}
              gigImage={item?.gig_image_url}
              key={item?.id}
            />
          ))
        ) : (
          <Typography variant="caption" color={darkPurple}>
            No Reviews Yet
          </Typography>
        )}

        <Box className="mt-4 d-flex justify-content-center justify-content-lg-start">
          {isShowLoadMore && (
            <Button variant="outlined" className="px-5" onClick={handleLoadMoreReviews}>
              <Typography variant="caption" color={darkPurple}>
                Load More
              </Typography>
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

ReviewsGridItem.propTypes = {
  gigDetails: propTypes.object,
};

ReviewsGridItem.defaultProps = {
  gigDetails: {},
};

export default ReviewsGridItem;
