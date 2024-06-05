import React from 'react';
import { Box, Modal, Typography, Stack, Button } from '@mui/material';
import PropTypes from 'prop-types';

// Styles
import { imageCropperModalStyles } from 'styles/containers/profile';

// Components
import ImageCropper from 'containers/common/components/ImageCropper';

function ImageCropperModal({
  isOpenImageCropperModal,
  toggleImageCroperModal,
  imageToCrop,
  setCroppedImage,
}) {
  const handleOnImageCropped = cropedImage => {
    setCroppedImage(cropedImage?.imgSrc);
  };

  const handleCancelCroppingImage = () => {
    toggleImageCroperModal();
    setCroppedImage(null);
  };

  return (
    <Modal open={isOpenImageCropperModal} onClose={toggleImageCroperModal}>
      <Box sx={imageCropperModalStyles}>
        <Box className="modal-box-header px-3 py-2 d-flex justify-content-between align-items-center border-bottom">
          <Typography variant="h6">Profile</Typography>
          <Stack direction="row" spacing={{ xs: 1, sm: 1, md: 2 }}>
            <Button sx={{ borderRadius: '25px' }} className="px-3 py-2" onClick={handleCancelCroppingImage}>
              Cancel
            </Button>
            <Button
              color="secondary"
              variant="contained"
              className="px-4 py-2"
              onClick={toggleImageCroperModal}
            >
              Save
            </Button>
          </Stack>
        </Box>
        <Box className="d-flex align-items-center justify-content-center">
          <ImageCropper imageToCrop={imageToCrop} onImageCropped={handleOnImageCropped} />
        </Box>
      </Box>
    </Modal>
  );
}

ImageCropperModal.propTypes = {
  isOpenImageCropperModal: PropTypes.bool,
  toggleImageCroperModal: PropTypes.func,
  setCroppedImage: PropTypes.func,
  imageToCrop: PropTypes.string,
};

ImageCropperModal.defaultProps = {
  isOpenImageCropperModal: false,
  imageToCrop: '',
  setCroppedImage: () => {},
  toggleImageCroperModal: () => {},
};

export default ImageCropperModal;
