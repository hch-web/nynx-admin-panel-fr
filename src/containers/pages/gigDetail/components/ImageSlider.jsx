import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Slider from 'react-slick';
import propTypes from 'prop-types';

// styles
import { sliderImageStyles } from 'styles/mui/containers/gig-details-styles';

// utilities
import { gigImagesSlider, gigImageSlider } from '../utilities/helper';

function ImageSlider({ gigDetails }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  // constants
  const isImages = gigDetails?.gig_image?.length > 0;
  const isSingleImage = gigDetails?.gig_image?.length < 2;
  const sliderProperties = isSingleImage ? gigImageSlider : gigImagesSlider;

  return isImages ? (
    <div style={{ zIndex: 0 }}>
      <Slider {...sliderProperties}>
        {gigDetails?.gig_image?.map(item => (
          <Box
            key={item.id}
            sx={{
              background: `#f5f5f5 url(${item?.image}) center no-repeat`,
              ...sliderImageStyles,
            }}
          />
        ))}
      </Slider>
    </div>
  ) : (
    <Box className="d-flex justify-content-center align-items-center" sx={{ height: '200px' }}>
      <Typography variant="caption" color={darkPurple} className="mt-1">
        No Images Added
      </Typography>
    </Box>
  );
}

ImageSlider.propTypes = {
  gigDetails: propTypes.object,
};

ImageSlider.defaultProps = {
  gigDetails: {},
};

export default ImageSlider;
