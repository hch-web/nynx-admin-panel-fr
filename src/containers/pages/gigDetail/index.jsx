import React from 'react';
import { Box, Grid, Typography, useTheme, Avatar, Paper } from '@mui/material';
import { useGetGigDetailsQuery } from 'services/private/gig';
import styles from 'styles/mui/containers/gig-details.module.scss';
import { formatName, conditionalBadgeOfExpert } from 'utilities/helpers';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from 'containers/common/components/Rating';
import { ArrowBackIos } from '@mui/icons-material';
import GlobalLoader from 'containers/common/loaders/GlobalLoader';
import ImageSlider from './components/ImageSlider';
import PackageDetail from './components/PackageDetail';
import Info from './components/Info';

export default function GigDetail() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { gigId } = useParams();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const { data: gigDetails, isFetching } = useGetGigDetailsQuery(gigId, { skip: !gigId });
  const backToPage = () => {
    navigate(-1);
  };
  // Constants
  const firstName = gigDetails?.profile?.first_name;
  const lastName = gigDetails?.profile?.last_name;
  const userName = gigDetails?.profile?.username;
  //   const isBuyer = userInfo?.is_buyer;
  const reviewCount = gigDetails?.review_count;
  const rating = gigDetails?.rating;
  const profileLevelBadge = conditionalBadgeOfExpert(gigDetails?.seller_level);
  return (
    <Box>
      {isFetching ? (
        <Box align="center" colSpan={12}>
          <Box>
            <GlobalLoader />
          </Box>
        </Box>
      ) : (
        <Box>
          <Box className="d-flex align-items-center" onClick={backToPage} sx={{ cursor: 'pointer' }} mb={1}>
            <ArrowBackIos sx={{ fontSize: '16px' }} />
            <Typography variant="body1" color={darkPurple}>
              Go to Previous Page
            </Typography>
          </Box>
          <Paper className="p-2 px-4">
            <Grid container spacing={2} className={`${styles.gigDetail} pt-0`}>
              <Grid item md={6} xs={12}>
                <Typography variant="caption" className="pointer" color={darkPurple} sx={{ lineHeight: 0 }}>
                  {gigDetails?.category_label} {'>'} {gigDetails?.subcategory_label}
                </Typography>

                <Typography variant="h5" color={darkPurple} className="mt-2">
                  {gigDetails?.title || ''}
                </Typography>

                <Box className="d-flex flex-wrap align-items-center mt-3">
                  <Rating name="rating-value" value={rating} className={`${styles.ratingIcons}`} />

                  <Typography variant="caption" color={darkPurple} className="mt-1">
                    {rating} ({reviewCount} Reviews)
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={6} xs={12} className="d-flex justify-content-end">
                <Box className={`${styles.infoContainer}`}>
                  <Box
                    className={`${styles.freelancerInfo} px-3 py-2 d-flex flex-wrap justify-content-between`}
                  >
                    <Box className="avatar-container d-flex align-items-center justify-content-start">
                      <Link to={`/freelancer/${gigDetails?.profile?.id}`} className="text-decoration-none">
                        <Avatar src={gigDetails?.profile?.image} alt={firstName} sx={{ cursor: 'pointer' }} />
                      </Link>

                      <Link to={`/freelancer/${gigDetails?.profile?.id}`} className="text-decoration-none">
                        <Box className="d-flex flex-column ms-2 my-1">
                          <Typography variant="caption" className="fw-bold weight-600" color={darkPurple}>
                            {formatName(firstName, lastName, userName)}
                          </Typography>

                          <img src={profileLevelBadge} alt="profile-level-badge" />
                        </Box>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item md={12} xs={12}>
                <ImageSlider gigDetails={gigDetails} />
              </Grid>
            </Grid>

            <PackageDetail gigDetails={gigDetails} />

            <Info gigDetails={gigDetails} mb={3} />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
