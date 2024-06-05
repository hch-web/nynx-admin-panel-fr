import React from 'react';
import styles from 'styles/containers/userProfileSetting/profile.module.scss';
import PropTypes from 'prop-types';
import LocationIcon from 'assets/location.svg';
import badgeIcon from 'assets/badge.svg';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import ProfileImgBox from './components/ProfileImgBox';
import BasicInfo from './components/BasicInfo';

function FreelancerSettings({ settings }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  return (
    <>
      <Box className={`${styles.profileDetails} pt-5 pb-2`}>
        <Box className={`${styles.profileInfoContainer} d-flex px-3 px-lg-4 px-md-4 px-sm-4 gap-3`}>
          <ProfileImgBox image={settings?.image} />

          <Box
            className={`${styles.profileTitle} d-flex flex-column justify-content-between  my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0 h-100`}
          >
            <Box className="mb-4">
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} xs={12} className={`${styles.nameContainer}`}>
                  <Box className={`${styles.centerAlign} ${styles.titleLInk}`}>
                    <Box className={`${styles.contentFullWidth}`}>
                      <Typography variant="dashboardh4" color={darkPurple} className="weight-900">
                        {settings?.first_name} {settings?.last_name}
                      </Typography>
                      <img src={badgeIcon} alt="main" className="ps-2" />
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={12} md={12} xs={12} className={`${styles.centerAlign} py-0`}>
                  {settings?.country_label && (
                    <Box className={`${styles.locationCenterAlign}`}>
                      <img src={LocationIcon} alt="location-main" className="me-1" />
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        {settings?.country_label}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Box className=" mb-0 mb-lg-0 mb-sm-4 ">
              <Grid container spacing={2}>
                <Grid item xl={8} lg={12} md={12} xs={12} className={`${styles.infoBoxesContainer} py-0`}>
                  <Box className={`${styles.infoBoxesContainer} d-flex flex-wrap center-align`}>
                    <Box
                      className={`${styles.statsBox} d-flex flex-column  mt-1 py-1 ms-2 ms-lg-0  ms-md-0 `}
                    >
                      <Typography variant="dashboardh1" className="weight-900">
                        {settings?.total_job || 0}
                      </Typography>
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        Total Jobs
                      </Typography>
                    </Box>
                    <Box className={`${styles.statsBox} d-flex flex-column py-1 mt-1  ms-2  ms-lg-2 ms-md-2`}>
                      <Typography variant="dashboardh1" className="weight-900">
                        {settings?.total_hired || 0}
                      </Typography>
                      <Typography variant="dashboardBody" color="#a0919b" className="weight-500">
                        Total Hire
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          className={`${styles.profileResponsive} px-3 px-lg-4 px-md-4 px-sm-4`}
          sx={{ width: 'auto', margin: '0px' }}
        />
      </Box>
      <BasicInfo userInfo={settings} />

    </>
  );
}
FreelancerSettings.propTypes = {
  settings: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    country_label: PropTypes.string,
    image: PropTypes.string,

    total_hired: PropTypes.number,
    total_job: PropTypes.number,
  }),
};

FreelancerSettings.defaultProps = {
  settings: {
    first_name: '',
    last_name: '',
    country_label: '',
    total_hired: 0,
    total_job: 0,
  },
};
export default FreelancerSettings;
