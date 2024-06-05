import React from 'react';
import propTypes from 'prop-types';

function TextFieldDetail({ textFieldValues, valueType }) {
  const isLargeText = textFieldValues[valueType]?.length > 9;
  return (
    <span>
      {isLargeText ? textFieldValues[valueType].substring(0, 8) || '' : textFieldValues[valueType]}
      {isLargeText && <span className="pointer">...</span>}
    </span>
  );
}

TextFieldDetail.propTypes = {
  textFieldValues: propTypes.object,
  valueType: propTypes.string.isRequired,
};

TextFieldDetail.defaultProps = {
  textFieldValues: {},
};

export default TextFieldDetail;
