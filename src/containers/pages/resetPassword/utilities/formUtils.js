import * as yup from 'yup';

export const resetPasswordInitValues = {
  password: '',
  confirmPassword: '',
};

export const resetPasswordValSchema = yup.object({
  password: yup.string().trim().required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Required'),
});
