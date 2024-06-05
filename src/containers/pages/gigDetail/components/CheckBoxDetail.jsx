import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import propTypes from 'prop-types';

function CheckBoxDetail({ checkBoxValues, valueType }) {
  const isDimTick = checkBoxValues[valueType] || checkBoxValues.valuesType === null;

  return (
    <span>{isDimTick ? <DoneIcon sx={{ color: '#A23842' }} /> : <DoneIcon sx={{ color: '#ECC1AB' }} />}</span>
  );
}

CheckBoxDetail.propTypes = {
  checkBoxValues: propTypes.object,
  valueType: propTypes.string.isRequired,
};
CheckBoxDetail.defaultProps = {
  checkBoxValues: {},
};

export default CheckBoxDetail;
