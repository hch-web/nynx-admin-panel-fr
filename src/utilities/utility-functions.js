import moment from 'moment';
import { COMPLETED, IN_PROGRESS, IN_REVISION } from 'utilities/constants';

export const getEmail = () => sessionStorage.getItem('email');

export const setEmail = payload => sessionStorage.setItem('email', payload);

export const removeEmail = () => sessionStorage.removeItem('email');

export const setToken = payload => localStorage.setItem('token', payload.token);

export const removeToken = () => localStorage.removeItem('token');

export const getToken = () => localStorage.getItem('token');

export const getSearchParamsObject = urlSearchParams => Object.fromEntries(urlSearchParams);
export const formatStatus = status => {
  if (status === IN_PROGRESS) return 'In Progress';
  if (status === COMPLETED) return 'Completed';
  if (status === IN_REVISION) return 'In Revision';

  return status;
};
export const checkTimeDifference = (deadlineTime, createdTime) => {
  const deliverydeadlineTime = moment(deadlineTime);
  const completedTime = moment(createdTime);
  const timeDifference = deliverydeadlineTime.diff(completedTime, 'milliseconds');
  return timeDifference;
};
export const formatDate = date => moment(date).format('DD MMM, YYYY');
export const formatTime = time => moment(time).format('HH:mm');
export const getUploadedImage = uploadedImage => (uploadedImage && URL.createObjectURL(uploadedImage));
