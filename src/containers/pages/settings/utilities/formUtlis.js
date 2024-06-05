import * as yup from 'yup';

export const basicInfoinitValues = {
  first_name: '',
  last_name: '',
  company: '',
  phone: '',
  company_site: '',
  country: '',
  time_zone: '',
};
export const basicInfoValidation = yup.object({
  first_name: yup.string().trim().max(10, 'Maximum 10 characters allowed!').required('Required'),
  last_name: yup.string().trim().required('Required'),
  country: yup.string().required('Required'),
  time_zone: yup.string().required('Required'),
});

export const addAccountValidation = yup.object({
  url: yup.string().url('Invalid Url').required('Required'),
});
export const addAccountInitialValues = {
  url: '',
};
export const setupPaypalValSchema = yup.object({
  paypal_email: yup.string().email('Please provide valid Email Account').trim().required('Required'),
});
export const setupPayoneerAccountInitValues = {
  payee_id: '',
  payee: {},
  lock_type: 'EMAIL'
};
