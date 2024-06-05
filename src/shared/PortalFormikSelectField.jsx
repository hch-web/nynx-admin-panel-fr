/* eslint-disable no-nested-ternary */
import React, { useMemo, useCallback } from 'react';
import { Typography, useTheme } from '@mui/material';
import Select from 'react-select';
import propTypes from 'prop-types';
import { useField } from 'formik';

// styles
import 'styles/containers/select-field.scss';

function FormikSelectField({
  onChange,
  options = [],
  placeholder,
  name,
  classNames,
  singleValueStyle,
  inputStyle,
  removeSelectOption,
  onBlur,
  formatOptionLabel,
  isDisabled,
  maxMenuHeight,
}) {
  const theme = useTheme();
  const colors = theme.palette;
  const paleOrange = colors.paleOrange.main;
  const yellow = colors.yellow.main;
  const darkBlue = colors.darkBlue.main;
  const red = colors.red.main;

  const [field, meta, helpers] = useField(name);
  const { value: selectedValue, name: selectedFieldName, onBlur: onFieldBlur } = field;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const modifiedData = useMemo(
    () => (removeSelectOption ? options : [{ label: placeholder, value: 0 }, ...options]),
    [options]
  );

  const selectedOption = useMemo(
    () => modifiedData.find(item => item.value === selectedValue),
    [selectedValue, modifiedData]
  );

  const handleSelectChange = useCallback(
    selectedOptionObject => {
      const newValue = selectedOptionObject.value;
      if (/* typeof newValue === 'string' && */ newValue) {
        setValue(newValue);
        if (onChange) onChange(newValue, name);
      }
    },
    [selectedValue, onChange]
  );

  const handleBlur = useCallback(
    event => {
      onFieldBlur(event);
      if (onBlur) onBlur(event.value, name);
    },
    [selectedValue]
  );

  return (
    <>
      <Select
        className={`formik-select-container ${classNames}`}
        classNamePrefix="formik-select-container"
        onChange={handleSelectChange}
        maxMenuHeight={maxMenuHeight}
        isDisabled={isDisabled}
        value={selectedOption || modifiedData[0]}
        onBlur={handleBlur}
        name={selectedFieldName}
        formatOptionLabel={formatOptionLabel}
        components={{ IndicatorSeparator: () => null }}
        styles={{
          dropdownIndicator: base => ({
            ...base,
            color: red,
          }),
          option: (provided, { data, isFocused, isSelected }) => ({
            ...provided,
            border: 'none',
            background: isSelected ? yellow : isFocused ? '#fff' : 'data.color',
            color: isSelected ? '#000' : data.color,
            textAlign: 'left',
            padding: '12px',
            fontFamily: 'Roboto Flex, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            ':active': {
              ...provided[':active'],
              backgroundColor: paleOrange,
              color: darkBlue,
            },
          }),
          control: base => ({
            ...base,
          }),
          singleValue: base => ({
            ...base,
            ...singleValueStyle,
          }),
          input: base => ({
            ...base,
            ...inputStyle,
          }),
        }}
        placeholder={placeholder || ''}
        options={options}
      />
      <Typography variant="body2" className="text-danger">{touched && error}</Typography>
    </>
  );
}

FormikSelectField.propTypes = {
  options: propTypes.array.isRequired,
  placeholder: propTypes.string,
  name: propTypes.string.isRequired,
  maxMenuHeight: propTypes.number,
  classNames: propTypes.string,
  singleValueStyle: propTypes.object,
  inputStyle: propTypes.object,
  removeSelectOption: propTypes.bool,
  isDisabled: propTypes.bool,
  onChange: propTypes.func,
  onBlur: propTypes.func,
  formatOptionLabel: propTypes.func,
};

FormikSelectField.defaultProps = {
  placeholder: '',
  maxMenuHeight: 150,
  singleValueStyle: {},
  inputStyle: {},
  classNames: '',
  isDisabled: false,
  removeSelectOption: false,
  onChange: () => {},
  onBlur: () => {},
  formatOptionLabel: null,
};
export default FormikSelectField;
