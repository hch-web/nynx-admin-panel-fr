import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { zeroPad } from 'react-countdown';

function DeliveryDelayTime({ days, hours, minutes, }) {
  const deliveryDay = days > 0 ? `${zeroPad(days)} days` : '';
  const deliveryHours = hours > 0 ? `${zeroPad(hours)} hours` : '';
  const deliveryMinutes = minutes > 0 ? `${zeroPad(minutes)} minutes` : '';

  return (
    <Typography variant="body1" className="me-2 text-danger">
      - {`${deliveryDay} ${deliveryHours}  ${deliveryMinutes}`}
    </Typography>
  );
}

DeliveryDelayTime.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
};

DeliveryDelayTime.defaultProps = {
  days: 0,
  hours: 0,
  minutes: 0,
};

export default DeliveryDelayTime;
