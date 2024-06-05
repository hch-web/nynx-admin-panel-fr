import React, { useMemo } from 'react';
import { Box, FormControl, FormHelperText, FormLabel, InputLabel, MenuItem, Select } from '@mui/material';
import propTypes from 'prop-types';
import { useField } from 'formik';

function FormikSelectField({ fieldLabel, options, name, disabled, variant, label, multiple }) {
  const [field, meta] = useField(name || '');
  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;

  const isError = useMemo(() => !!(error && touched), [error, touched]);

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl variant={variant} disabled={disabled} fullWidth>
        {label && <FormLabel className="mb-2">{label}</FormLabel>}

        {fieldLabel && <InputLabel>{fieldLabel}</InputLabel>}

        <Select
          multiple={multiple}
          label={fieldLabel}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={isError}
        >
          {options?.map(option => (
            <MenuItem key={option.value} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
        </Select>

        {isError && <FormHelperText error={isError}>{error}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

FormikSelectField.propTypes = {
  name: propTypes.string.isRequired,
  multiple: propTypes.bool,
  fieldLabel: propTypes.string,
  label: propTypes.string,
  variant: propTypes.string,
  disabled: propTypes.bool,
  options: propTypes.arrayOf(
    propTypes.shape({
      value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.bool]),
      label: propTypes.string,
    })
  ).isRequired,
};

FormikSelectField.defaultProps = {
  disabled: false,
  variant: 'contained',
  fieldLabel: '',
  label: '',
  multiple: false,
};

export default FormikSelectField;
