/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTheme } from '@mui/material';
import Select from 'react-select';
import propTypes from 'prop-types';

function SelectField({
  options,
  placeholder,
  classNames,
  control,
  onChange,
  disable,
  isOptionListBorderBottom,
  value,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkBlue = colors.darkBlue.main;

  const selectValue = Object.keys(value).length === 0 ? placeholder : value;
  return (
    <Select
      className={`formik-select-container ${classNames} p-0`}
      classNamePrefix="formik-select-container"
      onChange={onChange}
      components={{ IndicatorSeparator: () => null }}
      styles={{
        option: (provided, { data, isSelected }) => ({
          ...provided,
          border: 'none',
          background: isSelected ? 'white' : 'white',
          color: isSelected ? '#F1416C' : data.color,
          borderBottom: isOptionListBorderBottom ? '1px solid #ece9eb' : '',
          // textAlign: 'center',
          fontFamily: 'Poppins, sans-serif',
          ':active': {
            ...provided[':active'],
            backgroundColor: '#F1416C',
            color: darkBlue,
          },
          '&:hover': {
            background: '#fff1e2',
          },
        }),
        singleValue: base => ({
          ...base,
          fontFamily: 'Poppins, sans-serif',
          padding: '0px',
        }),
        control: base => ({
          ...base,
          ...control,
        }),
      }}
      placeholder={placeholder || ''}
      options={options}
      isSearchable={false}
      isDisabled={disable}
      value={selectValue}
    />
  );
}

SelectField.propTypes = {
  onChange: propTypes.func,
  options: propTypes.array.isRequired,
  value: propTypes.object,
  placeholder: propTypes.string,
  isOptionListBorderBottom: propTypes.bool,
  disable: propTypes.bool,
  classNames: propTypes.string,
  control: propTypes.object,
};

SelectField.defaultProps = {
  onChange: propTypes.func,
  disable: false,
  value: {},
  isOptionListBorderBottom: false,
  placeholder: '',
  classNames: '',
  control: {},
};

export default SelectField;
