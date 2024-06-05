import * as yup from 'yup';

export const attributeInitValues = {
  name: '',
  attribute_type: '',
};

export const editAttributeValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
  attribute_type: yup.string().required('Required'),

});

export const addAttributeValSchema = yup.object({
  name: yup.string().max(100, 'Field is too long').required('Required'),
  attribute_type: yup.string().required('Required'),

});
