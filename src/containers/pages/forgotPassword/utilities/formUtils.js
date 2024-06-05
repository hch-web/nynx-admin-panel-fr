import * as yup from 'yup';

export const forgotPasswordInitValues = {
  email: '',
};

export const forgotPasswordValSchema = yup.object({
  email: yup.string().email('Invalid Email!').required('Required'),
});
