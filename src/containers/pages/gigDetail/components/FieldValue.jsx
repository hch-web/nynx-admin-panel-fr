import React from 'react';
import propTypes from 'prop-types';
import { Typography, useTheme } from '@mui/material';

// utilities
import {
  TEXT_FIELD,
  TEXT_AREA_FIELD,
  NUMBER_FIELD,
  SELECT_FIELD,
  CHECKBOX_FIELD,
  DEADLINE_SELECT_FIELD,
} from 'utilities/constants';

// components
import CheckBoxDetail from './CheckBoxDetail';
import TextFieldDetail from './TextFieldDetail';
import NumberFieldDetail from './NumberFieldDetail';

const textFieldTypes = [TEXT_FIELD, TEXT_AREA_FIELD,];
const checkBoxFieldTypes = [CHECKBOX_FIELD];
const numberField = [NUMBER_FIELD, SELECT_FIELD, DEADLINE_SELECT_FIELD];

function FieldValue({ fieldType, values, valueType }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;

  const isTextField = textFieldTypes.includes(fieldType);
  const isCheckBoxField = checkBoxFieldTypes.includes(fieldType);
  const isNumberField = numberField.includes(fieldType);

  return (
    <Typography variant="body1" color={darkPurple} className="mt-1">
      {isCheckBoxField && <CheckBoxDetail checkBoxValues={values} valueType={valueType} />}
      {isTextField && <TextFieldDetail textFieldValues={values} valueType={valueType} />}
      {isNumberField && <NumberFieldDetail textFieldValues={values} valueType={valueType} />}
    </Typography>
  );
}

FieldValue.propTypes = {
  fieldType: propTypes.string.isRequired,
  values: propTypes.object,
  valueType: propTypes.string,
};

FieldValue.defaultProps = {
  values: {},
  valueType: '',
};

export default FieldValue;
