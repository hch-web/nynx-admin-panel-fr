import React from 'react';
import { Box, Stack, Typography, Card } from '@mui/material';
import PropTypes from 'prop-types';
import style from 'styles/containers/count-down-timer/count-down-timer.module.scss';

function CountDownTimerCardDesign({ days, hours, minutes, seconds, isOvertime, digitVaraint }) {
  return (
    <Card className="mt-sm-0 ms-0 ms-xl-2 d-flex align-items-center justify-content-center">
      <Stack direction="row" spacing={1} className="align-items-start p-2">
        {isOvertime && <Box>-</Box>}
        {/* DAYS */}
        <Box className="d-flex flex-column align-items-center">
          <Box className={`${style.timerGap} d-flex align-items-center`}>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {days.charAt(0)}
            </Typography>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {days.charAt(1)}
            </Typography>
          </Box>

          <Typography variant="timerLabel">Days</Typography>
        </Box>

        {/* HOURS */}
        <Box className="d-flex flex-column align-items-center">
          <Box className={`${style.timerGap} d-flex align-items-center`}>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {hours.charAt(0)}
            </Typography>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {hours.charAt(1)}
            </Typography>
          </Box>

          <Typography variant="timerLabel">Hours</Typography>
        </Box>

        {/* MINUTES */}
        <Box className="d-flex flex-column align-items-center">
          <Box className={`${style.timerGap} d-flex align-items-center`}>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {minutes.charAt(0)}
            </Typography>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {minutes.charAt(1)}
            </Typography>
          </Box>
          <Typography variant="timerLabel">Minutes</Typography>
        </Box>

        {/* SECONDS */}
        <Box className="d-flex flex-column align-items-center">
          <Box className={`${style.timerGap} d-flex align-items-center`}>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {seconds.charAt(0)}
            </Typography>
            <Typography variant={digitVaraint} className={`${style.timerSize} fw-500`}>
              {seconds.charAt(1)}
            </Typography>
          </Box>

          <Typography variant="timerLabel">Seconds</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

CountDownTimerCardDesign.propTypes = {
  days: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hours: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minutes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  digitVaraint: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isOvertime: PropTypes.bool,
};

CountDownTimerCardDesign.defaultProps = {
  days: 0,
  minutes: 0,
  hours: 0,
  seconds: 0,
  isOvertime: false,
};

export default CountDownTimerCardDesign;
