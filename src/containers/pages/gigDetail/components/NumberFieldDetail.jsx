import React from 'react';
import propTypes from 'prop-types';

function NumberFieldDetail({ textFieldValues, valueType }) {
  return <span>{textFieldValues[valueType]}</span>;
}

NumberFieldDetail.propTypes = {
  textFieldValues: propTypes.object,
  valueType: propTypes.string.isRequired,
};

NumberFieldDetail.defaultProps = {
  textFieldValues: {},
};

export default NumberFieldDetail;
