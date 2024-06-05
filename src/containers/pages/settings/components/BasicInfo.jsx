/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, Divider } from '@mui/material';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

// styles
import styles from 'styles/containers/userProfileSetting/profile.module.scss';

import FormikkField from 'shared/FormikkField';

import { basicInfoValidation, basicInfoinitValues } from '../utilities/formUtlis';

function BasicInfo({ userInfo }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [initialValues, setInitialValues] = useState(basicInfoinitValues);

  useEffect(() => {
    setInitialValues({
      first_name: userInfo?.first_name || '',
      last_name: userInfo?.last_name || '',
      company: userInfo?.company || '',
      phone: userInfo?.phone || '',
      company_site: userInfo?.company_site || '',
      country: userInfo?.country_label || '',
      time_zone: userInfo?.time_zone || '',
      username: userInfo?.user?.username || '',
      email: userInfo?.user?.email || '',
    });
  });

  return (
    <>
      <Box className={`${styles.basicInfo} mt-5`}>
        <Grid container spacing={2} className="px-3 px-lg-4 px-md-4 px-sm-4">
          <Grid item lg={12} md={12} sm={12} className="pt-0 w-100 ">
            <Box className={`${styles.infoHeader} d-flex justify-content-between align-items-center`}>
              <Box>
                <Typography variant="dashboardh2" className="weight-700">
                  Basic Info
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ color: '#ece9eb' }} />

      <Box className={styles.basicInfoForm}>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={() => {
            setIsDisabled(true);
          }}
          validationSchema={basicInfoValidation}
        >
          <Form>
            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoFirstForm} px-3 px-lg-4 px-md-4 px-sm-4`}
              sx={{ width: 'auto', margin: '0px' }}
            >
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
              >
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Email
                  </Typography>
                </label>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0"
              >
                <FormikkField
                  type="text"
                  name="email"
                  placeholder=" Missing"
                  className={`${styles.inputDesign} ${styles.pinkBackground}`}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
              sx={{ width: 'auto', margin: '0px' }}
            >
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
              >
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Username
                  </Typography>
                </label>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0"
              >
                <FormikkField
                  type="text"
                  name="username"
                  placeholder=" Missing"
                  className={`${styles.inputDesign} ${styles.pinkBackground}`}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
              sx={{ width: 'auto', margin: '0px' }}
            >
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
              >
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Full Name
                  </Typography>
                </label>
              </Grid>

              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0"
              >
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={12} className="w-100">
                    <FormikkField
                      type="text"
                      name="first_name"
                      placeholder="Missing"
                      className={`${styles.inputDesign} ${styles.pinkBackground}`}
                      disabled
                      fullWidth
                    />
                  </Grid>

                  <Grid item lg={6} md={6} sm={12} className="w-100">
                    <FormikkField
                      type="text"
                      name="last_name"
                      placeholder=" Missing"
                      className={`${styles.inputDesign} ${styles.pinkBackground}`}
                      fullWidth
                      disabled={isDisabled}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              className={`${styles.basicInfoForm} px-3 px-lg-4 px-md-4 px-sm-4`}
              sx={{ width: 'auto', margin: '0px' }}
            >
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
              >
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Country
                  </Typography>
                </label>
              </Grid>

              <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                <FormikkField
                  type="text"
                  name="country"
                  placeholder=" Missing"
                  className={`${styles.inputDesign} ${styles.pinkBackground}`}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 pt-0 d-flex align-items-center"
              >
                <label htmlFor="firstName" className="pb-2 pb-lg-0 pb-md-0">
                  <Typography variant="dashboardh6" className="weight-500">
                    Phone Number
                  </Typography>
                </label>
              </Grid>

              <Grid item lg={6} md={12} sm={12} className="my-0 my-lg-1 my-md-1 my-sm-0 px-0 w-100 pt-0">
                <FormikkField
                  type="number"
                  name="phone"
                  placeholder=" Missing"
                  className={`${styles.inputDesign} ${styles.pinkBackground}`}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </>
  );
}
BasicInfo.propTypes = {
  userInfo: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    company: PropTypes.string,
    phone: PropTypes.string,
    company_site: PropTypes.string,
    country: PropTypes.string,
    time_zone: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};
BasicInfo.defaultProps = {
  userInfo: {
    first_name: '',
    last_name: '',
    company: '',
    phone: '',
    company_site: '',
    country: '',
    time_zone: '',
    username: '',
    email: '',
  },
};
export default BasicInfo;
