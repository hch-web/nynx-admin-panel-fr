import * as yup from 'yup';

export const profileInitValues = {
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  is_superuser: '',
  password: '',
  confirmPassword: '',
};

export const editProfileValSchema = yup.object({
  first_name: yup.string().max(100, 'Field is too long').required('Required'),
  last_name: yup.string().max(100, 'Field is too long').required('Required'),
  username: yup.string().trim().required('Required'),
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().trim(),
  confirmPassword: yup.string().when('password', {
    is: val => val && val.length > 0,
    then: () => yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  }),
});

export const addProfileValSchema = yup.object({
  first_name: yup.string().max(100, 'Field is too long').required('Required'),
  last_name: yup.string().max(100, 'Field is too long').required('Required'),
  username: yup.string().trim().required('Required'),
  email: yup.string().email('Invalid Email').required('Required'),
  password: yup.string().trim().required('Required'),
  confirmPassword: yup.string().when('password', {
    is: val => val && val.length > 0,
    then: () => yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
    otherwise: () => yup.string().trim(),
  }),
});
