import React from 'react';
import { Box } from '@mui/material';

// COMPONENT
import { COMPLETED } from 'utilities/constants';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';
import CountDownTimer from './CountDownTimer';
import CompletedTaskTime from './CompletedTaskTime';

function TimerCard({ taskDetails }) {
  const currentDate = moment();
  const timezone = useSelector(state => state.auth.userInfo.timezone_label);

  const timeline = taskDetails?.delivery_date
    && moment(taskDetails?.delivery_date, timezone).diff(currentDate, 'milliseconds');
  const deliveryDate = taskDetails?.delivery_date;
  const completedDate = taskDetails?.completed_at;
  const isDeliverableCreated = taskDetails?.deliverable;
  const isTaskCompleted = taskDetails?.status === COMPLETED;
  const isMonthlyBased = taskDetails?.budget_type === 'monthly_based' && timeline?.toString().charAt(0) !== '-';
  return (isDeliverableCreated || isTaskCompleted) && !isMonthlyBased ? (
    <CompletedTaskTime deliveryDate={deliveryDate} completedDate={completedDate} />
  ) : (
    <Box className="mt-2 mt-sm-0 align-self-stretch">
      <CountDownTimer endDate={taskDetails?.delivery_date} />
    </Box>
  );
}
TimerCard.propTypes = {
  taskDetails: PropTypes.array,
};
TimerCard.defaultProps = {
  taskDetails: null,
};
export default TimerCard;
