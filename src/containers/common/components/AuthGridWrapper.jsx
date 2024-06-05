import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

// STYLES & ASSETS
import logoImg from 'assets/nav-logo-dark_auth.png';
import {
  authContainerWrapperStyles,
  cardStyles,
  gridRightPaneStyles,
} from 'styles/mui/containers/authStyles';

function AuthGridWrapper({ children, pageTitle, tagLine }) {
  return (
    <Box sx={authContainerWrapperStyles}>
      <Card elevation={8}>
        <CardContent className="p-0">
          <Grid container sx={cardStyles}>
            <Grid item xs={12} md={6} className="d-flex flex-column justify-content-center p-4">
              <Typography variant="h5" className="mb-4" fontWeight={400}>
                {pageTitle}
              </Typography>

              <Box className="w-100">{children}</Box>
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              sx={gridRightPaneStyles}
              className="d-flex flex-column align-items-center justify-content-center p-3"
            >
              <Box className="d-flex align-items-center justify-content-center flex-column flex-grow-1 text-center">
                <img src={logoImg} alt="Logo" width={100} />

                <Typography className="mt-4" variant="body1" fontWeight={600}>
                  {tagLine}
                </Typography>
              </Box>

              <Box className="text-center">
                <Typography variant="body2">For technical support</Typography>

                <Typography color="white" variant="body2" component={Link} to="mailto:info@erisinnovate.ai">
                  info@erisinnovate.ai
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

AuthGridWrapper.propTypes = {
  children: propTypes.node.isRequired,
  pageTitle: propTypes.string,
  tagLine: propTypes.string,
};

AuthGridWrapper.defaultProps = {
  pageTitle: 'Sign In',
  tagLine: 'We are excited to see how you work!',
};

export default AuthGridWrapper;
