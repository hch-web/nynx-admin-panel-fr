import * as yup from 'yup';

export const socialMediaInitValues = {
  // id: '',
  name: '',
  icon: '',
  is_connected: false,
  tag_line: ''
};

export const editSocialMediaValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
  // icon: yup.string().min(1, 'Field is required').required('Required'),
  is_connected: yup.bool(),
  tag_line: yup.string(),
});

export const addSocialMediaValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
  // icon: yup.string().min(1, 'Field is required').required('Required'),
  is_connected: yup.bool(),
  tag_line: yup.string(),
});
