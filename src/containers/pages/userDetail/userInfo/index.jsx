import React, { useMemo } from 'react';
import { Grid, Box, Typography, Card, Stack, Chip, Tooltip, useTheme } from '@mui/material';
import profileDummyImg from 'assets/dummy-profile.png';
import { formatName, conditionalBadgeOfExpert } from 'utilities/helpers';
import Rating from 'containers/common/components/Rating';

// SERVICES HOOKS
import { useGetClientByIdQuery } from 'services/private/client';
import { useGetFreelancerByIdQuery } from 'services/private/freelancer';
import { useLocation, useParams } from 'react-router-dom';
// STYLES
import styles from 'styles/mui/containers/users-profile.module.scss';
import { aboutProfileImgBoxStyles, aboutShowTemplateImgItemStyles } from 'styles/containers/profile';

function UserDetail() {
  const theme = useTheme();
  // THEME COLORS
  const colors = theme.palette;
  const primary = colors.primary.main;
  const darkPurple = colors.darkPurple.main;
  const { pathname } = useLocation();
  const { id } = useParams();
  const isClient = useMemo(() => pathname.includes('client'), [pathname]);
  const { data: userInfo } = !isClient
    ? useGetFreelancerByIdQuery(id, { skip: !id })
    : useGetClientByIdQuery(id, { skip: !id });

  const fullName = formatName(userInfo?.first_name, userInfo?.last_name, userInfo?.username);
  const profileImageUrl = userInfo?.image || profileDummyImg;
  const profileLevelBadge = conditionalBadgeOfExpert(userInfo?.seller_level);
  const userRating = userInfo?.rating;
  const userReviews = userInfo?.review;
  const isBuyer = userInfo?.isBuyer;
  const clientTotalJobs = userInfo?.total_workspaces || 0;
  const clientTotalHires = userInfo?.total_completed_workspaces || 0;
  const totalInvestment = userInfo?.total_investments || 0;
  const timezoneLabel = userInfo?.timezone_label || 'NA';
  const freelancerTotalJobs = userInfo?.total_job;
  const freelancerCompletedJobs = userInfo?.total_completed_job || 0;
  const freelancerTotalEarning = userInfo?.total_earning || 0;
  const isAboutInfoNull = userInfo?.tag_line === null && userInfo?.description === null;
  const userSlicedEducation = !isClient && userInfo?.eduction?.slice(0, 2);

  return (
    <>
      <Box className={styles.freelancerProfile}>
        <Grid container spacing={2} className="d-flex flex-wrap justify-content-between">
          {/* USER BASIC PROFILE COLUMN */}
          <Grid item xs={12} md={12} lg={6} xl={4}>
            <Card className="p-5 bg-white">
              <Box className="d-flex align-items-start">
                <Box className="position-relative">
                  <Box
                    sx={{
                      background: `#dbdbdb url(${profileImageUrl}) no-repeat center`,
                      ...aboutProfileImgBoxStyles,
                    }}
                  />
                </Box>

                <Box className="col ps-3 pt-2">
                  <Typography variant="h5" color={darkPurple}>
                    {fullName}
                  </Typography>

                  <img src={profileLevelBadge} alt="profile-level-badge" />

                  <Box
                    className={`${styles.profileText} d-flex justify-content-start align-items-center mt-1`}
                  >
                    <Box className="d-flex">
                      <Rating
                        name="rating-value"
                        value={userRating}
                        className={styles.ratingIcons}
                        size="small"
                      />
                    </Box>

                    <Box>
                      <Typography variant="caption" color={darkPurple}>
                        {userRating}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="caption" color={darkPurple}>
                    {userReviews} Reviews
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          {/* USER PROFILE INFO COLUMN */}

          <Grid item xs={12} md={12} lg={6} xl={!isClient ? 4 : 8}>
            <Card className="p-3 h-100 w-100 bg-white">
              <Typography variant="h5" color={primary} className="mb-1">
                General Info
              </Typography>
              <Box className="d-flex justify-content-between ">
                <Typography variant="body1" color={primary}>
                  From
                </Typography>

                <Typography variant="body1" color={primary} className="weight-500">
                  pakistan
                </Typography>
              </Box>

              <Box className="d-flex justify-content-between mt-2">
                <Typography variant="body1" color={primary}>
                  Member
                </Typography>

                <Typography variant="body1" color={primary} className="weight-500">
                  {/* {moment(userInfo?.created_at).format('MMM YYYY')} */}
                  2/2/2222
                </Typography>
              </Box>

              {isBuyer ? (
                <>
                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Total Workspaces
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {clientTotalJobs}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Completed Workspaces
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {clientTotalHires}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      All Time Investment
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {totalInvestment}
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Total Jobs
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {freelancerTotalJobs}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2">
                    <Typography variant="body1" color={primary}>
                      Completed Jobs
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      {freelancerCompletedJobs}
                    </Typography>
                  </Box>

                  <Box className="d-flex justify-content-between mt-2 ">
                    <Typography variant="p" color={primary}>
                      All-Time Earnings
                    </Typography>

                    <Typography variant="body1" color={primary} className="weight-500">
                      ${freelancerTotalEarning}
                    </Typography>
                  </Box>
                </>
              )}
              <Box className="d-flex justify-content-between mt-2">
                <Typography variant="body1" color={primary}>
                  Time Zone
                </Typography>

                <Typography variant="body1" color={primary} className="weight-500">
                  {timezoneLabel}
                </Typography>
              </Box>
            </Card>
          </Grid>

          {/* USER SKILLS COLUMN */}
          {!isClient && (
            <Grid item xs={12} md={12} lg={12} xl={4}>
              <Card className="mx-auto p-3 w-100 h-100 bg-white">
                <Typography variant="h5" color={primary}>
                  Skills
                </Typography>

                <Stack direction="row" className="flex-wrap align-items-center">
                  {userInfo?.skills?.length > 0 ? (
                    <>
                      {userInfo.skills.map(item => (
                        <Tooltip
                          key={item.id}
                          title={
                            (item.level === 'E' && 'Expert') ||
                            (item.level === 'B' && 'Beginner') ||
                            (item.level === 'I' && 'Intermediate')
                          }
                        >
                          <Chip
                            label={`${item.name}`}
                            variant="contained"
                            className="mt-2 me-2 p-2 align-self-start hover"
                            key={item.id}
                            sx={{ background: '#FFE3C5' }}
                          />
                        </Tooltip>
                      ))}
                    </>
                  ) : (
                    <Box className="flex-grow-1 text-center mt-1 mt-sm-1 mt-md-2 mt-lg-4">
                      <Typography variant="body1">No skill found!</Typography>
                    </Box>
                  )}
                </Stack>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
      {/* ABOUT INFO COLUMN */}
      {!isClient && (
        <Grid container spacing={2} className={`${styles.freelancerAbout} mt-3`}>
          <Grid item lg={9} md={12} sm={12} xs={12} className="d-flex">
            <Box className={`${styles.descriptionContainer} flex-grow-1 d-flex flex-column`}>
              <Box className="px-2 px-lg-4 px-md-1 pb-3 pt-2 pt-md-0 flex-grow-1 d-flex">
                <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <Box className="d-flex flex-column align-items-start justify-content-start">
                    <Box>
                      <Typography variant="h3" color={primary}>
                        {userInfo?.tag_line}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body1"
                        color={primary}
                        className={`${styles.newLineBreak} mt-3 breakAll`}
                      >
                        {userInfo?.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                {userInfo && isAboutInfoNull && (
                  <Box className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
                    <Typography variant="h3" color={primary}>
                      No Record Found!
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>

          {/* EDUCATION & TEMPLATE GRID ITEM */}
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <Box className={`${styles.eductationContainer} p-4 p-md-3`}>
              <Typography variant="h5" color={primary}>
                Education & Experience
              </Typography>

              {/* EDUCATION LIST CONTAINER */}
              <Box>
                {!isClient && userInfo?.eduction.length > 0 ? (
                  userSlicedEducation?.map(item => (
                    <Box className="mt-3 d-flex flex-column align-items-start" key={item.id}>
                      <Box className="d-flex align-items-center justify-content-between w-100">
                        <Typography variant="body1" color={primary} className="flex-grow-1">
                          {item.title}
                        </Typography>
                      </Box>

                      <Typography variant="caption2" color="#A08D92">
                        {item.institute}, Graduated {item.year}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" className="my-2 mt-3">
                    No Record Found
                  </Typography>
                )}
              </Box>
            </Box>

            {/* TEMPLATE BOX */}
            <Box className={`${styles.templateContainer} p-4 p-md-3 mt-2`}>
              <Box className="d-flex justify-content-between align-items-center">
                <Typography variant="h5" color={primary}>
                  Portfolio
                </Typography>
              </Box>

              <Box className="mt-3 d-flex align-items-center flex-wrap" sx={{ gap: '0.2rem' }}>
                {Array.isArray(userInfo?.user_template) &&
                  userInfo?.user_template?.map(template => template?.template_image?.map(item => (
                    <Box
                      sx={{
                        background: `url(${item?.image}) center no-repeat`,
                        ...aboutShowTemplateImgItemStyles,
                      }}
                      key={item.id}
                    />
                  )))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
export default UserDetail;
