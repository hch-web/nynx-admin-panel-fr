import React from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// UTILITIES
import CountDownTimerCardDesign from './CountDownTimerCardDesign';

function CountDownTimer({ endDate }) {
  const currentDate = moment();

  const timezone = useSelector(state => state.auth.userInfo.timezone_label);

  const timeline = endDate && moment.tz(endDate, timezone).diff(currentDate, 'milliseconds');

  return (
    <Countdown
      date={moment() + timeline}
      overtime
      renderer={({ hours, days, minutes, seconds, completed }) => {
        if (completed) {
          return (
            <CountDownTimerCardDesign
              days={zeroPad(days || 0)}
              hours={zeroPad(hours || 0)}
              minutes={zeroPad(minutes || 0)}
              seconds={zeroPad(seconds || 0)}
              digitVaraint="overTimeTimer"
              isOvertime
            />
          );
        }

        return (
          <CountDownTimerCardDesign
            days={zeroPad(days || 0)}
            hours={zeroPad(hours || 0)}
            minutes={zeroPad(minutes || 0)}
            seconds={zeroPad(seconds || 0)}
            digitVaraint="countDownTimer"
          />
        );
      }}
    />
  );
}

CountDownTimer.propTypes = {
  endDate: PropTypes.string,
};

CountDownTimer.defaultProps = {
  endDate: '',
};

export default CountDownTimer;
