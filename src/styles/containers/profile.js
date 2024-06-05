// eslint-disable-next-line import/prefer-default-export
export const basicInfoModalAvatarStyles = {
  width: 150,
  height: 150,
  cursor: 'pointer',
  fontSize: '25px',
  borderRadius: '10px',
  backgroundSize: 'contain',
};
export const aboutProfileImgBoxStyles = {
  width: '190px',
  height: '190px',
  maxWidth: '100%',
  backgroundSize: 'contain',
  borderRadius: '10px',

  '@media screen and (min-width: 1200px) and (max-width: 1400px)': {
    width: '150px',
    height: '150px',
    maxWidth: '100%',
  },

  '@media screen and (max-width: 540px)': {
    width: '140px',
    height: '110px',
    maxWidth: '100%',
  },
};
export const aboutShowTemplateImgItemStyles = {
  backgroundSize: 'cover',
  width: '32%',
  height: '70px',
  flex: '0 0 auto',
  borderRadius: '10px',
  '@media screen and (max-width: 991px)': {
    height: '150px',
    backgroundPosition: 'center 20%',
  },
  '@media screen and (max-width: 540px)': {
    height: '100px',
    backgroundPosition: 'center 20%',
  },
};
export const imageCropperModalStyles = {
  background: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  borderRadius: '20px',
  maxWidth: '100%',
};
