/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled, FormGroup, FormControlLabel, Switch } from '@mui/material';
import propTypes from 'prop-types';
import { switchStyles } from 'styles/mui/containers/switch-styles';

const IOSSwitch = styled(props => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(() => switchStyles);

function SwitchComponent({ label, labelPlacement, className, disabled, onChange, checked }) {
  return (
    <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} />}
        label={label}
        labelPlacement={labelPlacement}
        className={className}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
      />
    </FormGroup>
  );
}

SwitchComponent.propTypes = {
  label: propTypes.string,
  labelPlacement: propTypes.string,
  className: propTypes.string,
  disabled: propTypes.bool,
  checked: propTypes.bool,
  onChange: propTypes.func,
};

SwitchComponent.defaultProps = {
  label: '',
  labelPlacement: 'start',
  onChange: () => {},
  className: '',
  disabled: false,
  checked: false,
};

export default SwitchComponent;
