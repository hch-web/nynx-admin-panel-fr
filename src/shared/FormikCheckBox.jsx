/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Checkbox, FormControl, styled } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useField } from 'formik';
import propTypes from 'prop-types';

const BpIcon = styled('span')(() => ({
  borderRadius: 3,
  width: '22px',
  height: '22px',
  backgroundColor: '#f6f4f5',
}));

const CheckedIcon = styled(CheckBoxIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '22px',
}));

function FormikCheckBox(props) {
  const [field] = useField(props);
  const { value: selectedValue } = field;

  return (
    <FormControl>
      <Checkbox
        sx={{
          '&:hover': { bgcolor: 'black' },
        }}
        disableRipple
        color="default"
        icon={<BpIcon />}
        checkedIcon={<CheckedIcon />}
        inputProps={{ 'aria-label': 'Checkbox demo' }}
        checked={selectedValue || false}
        {...props}
        {...field}
      />
    </FormControl>
  );
}

FormikCheckBox.propTypes = {
  name: propTypes.string.isRequired,
};

export default FormikCheckBox;
