import React from 'react';
import { Box } from '@mui/material';
import propTypes from 'prop-types';
import { Circle } from '@mui/icons-material';

// STYLES
import styles from 'styles/containers/userProfileSetting/profile.module.scss';
import { prfileImageBoxStyle } from 'styles/containers/userProfileSetting/settings';

// IMAGES
import profileDummyImg from 'assets/dummy-profile.png';

function ProfileImgBox({ image }) {
  return (
    <Box className="position-relative mx-auto mx-md-0">
      <Box
        sx={{
          background: `url(${image || profileDummyImg}) no-repeat center`,
          ...prfileImageBoxStyle,
        }}
      />

      <Circle className={styles.onlineIcon} />
    </Box>
  );
}

ProfileImgBox.propTypes = {
  image: propTypes.string,
};

ProfileImgBox.defaultProps = {
  image: '',
};

export default ProfileImgBox;
