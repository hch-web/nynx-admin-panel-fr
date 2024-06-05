import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import propTypes from 'prop-types';
import { useFormikContext } from 'formik';

function SubmitBtn({ label, variant, color, fullWidth, btnSize }) {
  const { isSubmitting } = useFormikContext();

  return (
    <Box className="w-100">
      <Button
        variant={variant}
        color={color}
        startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
        fullWidth={fullWidth}
        disabled={isSubmitting}
        type="submit"
        size={btnSize}
      >
        {isSubmitting ? 'Loading...' : label}
      </Button>
    </Box>
  );
}

SubmitBtn.propTypes = {
  label: propTypes.string,
  variant: propTypes.string,
  color: propTypes.string,
  fullWidth: propTypes.bool,
  btnSize: propTypes.string,
};

SubmitBtn.defaultProps = {
  label: 'Submit',
  variant: 'contained',
  color: 'primary',
  fullWidth: false,
  btnSize: 'medium',
};

export default SubmitBtn;
