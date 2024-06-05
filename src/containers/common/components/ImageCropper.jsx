import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import PropTypes from 'prop-types';
import 'react-image-crop/dist/ReactCrop.css';

function ImageCropper({ imageToCrop, onImageCropped }) {
  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: '%',
      width: 10,
      height: 10,
      // aspect: 2,
    }
  );

  const [imageRef, setImageRef] = useState();

  function getCroppedImage(sourceImage, crop) {
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas');
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      sourceImage,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        // returning an error
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        resolve({ blob, imgSrc: window.URL.createObjectURL(blob) });
      }, 'image/jpeg');
    });
  }

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(imageRef, crop);

      // calling the props function to expose
      // croppedImage to the parent component
      onImageCropped(croppedImage);
    }
  }

  return (
    <ReactCrop
      src={imageToCrop}
      crop={cropConfig}
      ruleOfThirds
      onImageLoaded={imageRefProp => setImageRef(imageRefProp)}
      onComplete={cropConfigProp => cropImage(cropConfigProp)}
      onChange={cropConfigProp => setCropConfig(cropConfigProp)}
      crossorigin="anonymous" // to avoid CORS-related problems
    />
  );
}

ImageCropper.propTypes = {
  onImageCropped: PropTypes.func,
  imageToCrop: PropTypes.string,
};

ImageCropper.defaultProps = {
  imageToCrop: '',
  onImageCropped: () => {},
};

export default ImageCropper;
