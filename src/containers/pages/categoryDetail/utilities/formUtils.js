import * as yup from 'yup';

export const categoryInitValues = {
  image: '',
  name: '',
  number_of_freelancers: '',
};

export const editCategoryValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
  number_of_freelancers: yup.number().required('Required'),
});

export const addCategoryValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
  number_of_freelancers: yup.number().required('Required'),
});
