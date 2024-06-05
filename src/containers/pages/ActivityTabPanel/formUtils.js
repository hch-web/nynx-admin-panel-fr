import * as yup from 'yup';

export const activityTabValSchema = yup.object({
  message: yup.string().trim().required(''),
});
export const test = {};
