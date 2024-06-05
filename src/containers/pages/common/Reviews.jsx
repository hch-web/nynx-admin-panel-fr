import React from 'react';
import { useTheme, Box, Typography, Divider, Avatar } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import propTypes from 'prop-types';
import styles from 'styles/mui/containers/users-profile.module.scss';
import { reviewText, reviewImg, jobTitle, gigImageStyles } from 'styles/mui/containers/review-styles';
import moment from 'moment';

function Reviews({ image, name, country, rating, createdAt, description, gigImage, jobType }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const black = colors.black.main;

  return (
    <Box>
      <Box className="d-flex justify-content-between align-items-center mt-1 mb-3">
        <Box className="avatar-container d-flex">
          <Box className="h-100 d-flex align-items-start">
            <Avatar src={image || ''} alt={name} sx={{ height: '60px', width: '60px', cursor: 'pointer' }} />
          </Box>
          <Box className="px-2 d-flex flex-column mt-2 ">
            <Typography variant="caption" className="fw-bold weight-600 mb-0 pb-0" color={darkPurple}>
              {name}
            </Typography>

            <Typography variant="caption" color={darkPurple} className="mb-0 pb-0">
              {country}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box className="d-flex align-items-center">
            {jobType && (
              <Box sx={jobTitle} className="py-1 px-3">
                <Typography variant="caption" color={darkPurple}>
                  {jobType}
                </Typography>
              </Box>
            )}
            <StarIcon sx={{ color: '#FEA87E' }} className="ms-1" />
            <Typography variant="body2" className="ms-1" color={darkPurple}>
              {rating}
            </Typography>
          </Box>
          <Box className="text-end">
            <Typography variant="caption" className=" text-end" color={darkPurple}>
              {moment(createdAt)?.fromNow()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="d-flex justify-content-between mt-2 mb-3 px-2 px-lg-0 " sx={{ wordBreak: 'break-all' }}>
        <Box sx={reviewText} className="col-8 flex-wrap">
          <Typography variant="caption" color={black}>
            {description}
          </Typography>
        </Box>
        <Box className={`${styles.responsiveImg} ps-3`} sx={reviewImg}>
          {gigImage && (
            <Box sx={{ background: `url(${gigImage || ''}) center no-repeat`, ...gigImageStyles }} />
          )}
        </Box>
      </Box>
      <Divider className="mt-1 mb-4" />
    </Box>
  );
}

Reviews.propTypes = {
  image: propTypes.string,
  name: propTypes.string,
  country: propTypes.string,
  rating: propTypes.number,
  createdAt: propTypes.string,
  description: propTypes.string,
  gigImage: propTypes.string,
  jobType: propTypes.string,
};
Reviews.defaultProps = {
  image: '',
  name: '',
  country: '',
  rating: 0,
  createdAt: '',
  description: '',
  gigImage: '',
  jobType: '',
};

export default Reviews;
