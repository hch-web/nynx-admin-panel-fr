/* eslint-disable react/jsx-wrap-multilines */
import React, { useMemo } from 'react';
import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';
import propTypes from 'prop-types';
import { useField } from 'formik';

function FormikCheckbox({
  name,
  disabled,
  classes,
  muiSize,
  label,
  labelVariant,
  onValueChange,
  disableRipple,
  // isRequired,
  isRow,
}) {
  const [field, meta] = useField({ name, type: 'checkbox' });
  const { value, onChange } = field;
  const { touched, error } = meta;
  const isError = useMemo(() => error && touched, [error, touched]);
  return (
    <Box>
      <Grid spacing={2} container>
        {/* {
       (label && isRow) && (
       <Grid item className="d-flex align-items-center" xl={isRow ? 3 : 12} lg={isRow ? 3 : 12} md={isRow ? 4 : 12} sm={12}>
          <Typography variant="body2" className={isRequired && 'required'}>{label}</Typography>
       </Grid>
       )
      } */}
        <Grid item xl={isRow ? 9 : 12} lg={isRow ? 9 : 12} md={isRow ? 8 : 12} sm={12}>
          <FormControlLabel
            name={name}
            label={label}
            control={
              <Checkbox
                className={classes}
                size={muiSize}
                checked={value}
                sx={{ color: isError ? 'red' : 'currentcolor' }}
                disableRipple={disableRipple}
              />
            }
            value={value}
            onChange={(e, checked) => {
              onChange(e);
              onValueChange(checked);
            }}
            componentsProps={{ typography: { variant: labelVariant } }}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
FormikCheckbox.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string,
  labelVariant: propTypes.string,
  disabled: propTypes.bool,
  disableRipple: propTypes.bool,
  classes: propTypes.string,
  muiSize: propTypes.string,
  onValueChange: propTypes.func,
  // isRequired: propTypes.bool,
  isRow: propTypes.bool,
};
FormikCheckbox.defaultProps = {
  label: '',
  labelVariant: 'body2',
  disabled: false,
  disableRipple: false,
  classes: '',
  muiSize: 'medium',
  onValueChange: () => {},
  // isRequired: false,
  isRow: false,
};
export default FormikCheckbox;
