import * as yup from 'yup';

export const loginFormInitValues = {
  username_or_email: '',
  password: '',
};

export const loginFormValSchema = yup.object({
  // username: yup.string(),
  // password: yup.string().trim(),
  username_or_email: yup.string().required('Required'),
  password: yup.string().trim().required('Required'),
});
