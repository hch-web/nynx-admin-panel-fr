import * as yup from 'yup';

export const categoryInitValues = {
  name: '',
  image: '',
};

export const editSubCategoryValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
});

export const addSubCategoryValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required')
});
