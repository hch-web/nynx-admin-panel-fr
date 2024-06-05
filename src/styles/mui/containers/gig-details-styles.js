export const sectionLoaderStyles = {
  minHeight: '90vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const sliderImageStyles = {
  backgroundSize: 'contain',
  width: '170px',
  height: '351px',
  maxWidth: '100%',

  '@media screen and (max-width: 1200px) and (min-width: 991px)': {
    height: '450px',
  },

  '@media screen and (max-width: 570px)': {
    height: '350px',
  }
};

export const featureTitleStyles = { width: '40%' };

export const featureValuesContainerStyles = { width: '60%' };

export const featureValueStyles = {
  width: '33%',
  textAlign: 'center',
  padding: '10px',
};

export const tableFeatureTitleStyles = { width: '40%' };

export const tableFeatureValueStyles = {
  width: '20%',
  textAlign: 'center',
  padding: '10px',
};

export const singleFeatureStyles = { width: '100%', textAlign: 'center' };

export const tableSingleFeatureStyles = { width: '100%', textAlign: 'center' };

export const DirectHireBoxStyles = {
  width: '600px',
  maxWidth: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  border: 'none',
  borderRadius: '20px',
  outline: 'none',
  '&:hover': {
    border: 'none',
    outline: 'none',
  },
};

export const directHireTitleStyles = { color: '#FEA87E' };

export const gigImageStyles = {
  backgroundSize: 'cover',
  width: '100%',
  height: '100px',
  borderRadius: '10px',
};

export const createWorkSpaceButtonStyles = { background: 'none', border: 'none', color: '#FEA87E' };

export const featureBodyStyles = { borderRadius: '15px 15px 0px 0px' };

export const featureContainerWrapper = {
  overflowX: 'auto',
  width: '100%',
  overflowY: 'hidden'
};

export const featureTableStyles = {
  '@media only screen and (max-width: 570px)': {
    width: '600px',
  },
};
