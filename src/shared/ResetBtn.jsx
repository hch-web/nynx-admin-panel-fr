import React from 'react';
import { Box, Button } from '@mui/material';
import propTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';

function ResetBtn({ label, variant, color, fullWidth, btnSize, backLink }) {
  const navigate = useNavigate();
  const { handleReset } = useFormikContext();

  const handleClick = () => {
    handleReset();
    navigate(backLink, { replace: false });
  };

  return (
    <Box className={fullWidth ? 'w-100' : ''}>
      <Button
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        type="button"
        size={btnSize}
        onClick={handleClick}
      >
        {label}
      </Button>
    </Box>
  );
}

ResetBtn.propTypes = {
  label: propTypes.string,
  variant: propTypes.string,
  color: propTypes.string,
  fullWidth: propTypes.bool,
  btnSize: propTypes.string,
  backLink: propTypes.oneOfType([propTypes.string, propTypes.number]),
};

ResetBtn.defaultProps = {
  label: 'Cancel',
  variant: 'outlined',
  color: 'secondary',
  fullWidth: false,
  btnSize: 'medium',
  backLink: -1,
};

export default ResetBtn;
