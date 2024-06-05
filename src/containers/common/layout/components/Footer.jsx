import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import navLogoLight from 'assets/nav-logo.svg';

export default function Footer() {
  const dateObject = new Date();

  const currentYear = dateObject.getFullYear();

  return (
    <Card className="d-flex justify-content-center mt-3" sx={{ backgroundColor: '#011f42', color: 'white' }}>
      <Grid container justifyContent="space-between" px={2} py="20px" className="container-max-width">
        <Grid item className="d-flex gap-4 align-items-center">
          <img src={navLogoLight} alt="logo" style={{ width: 50 }} />
          <Typography variant="body2" color="white">
            © {currentYear} nynx creatives ltd
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}
