import * as yup from 'yup';

export const securityValidation = yup.object({
  current_password: yup.string().required('Required'),
  new_password: yup
    .string()
    .required('Required')
    .min(8, 'Password must contain 8 character')
    .test(
      'isValidPass',
      'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number or special',
      value => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumberSymbole = /[0-9]/.test(value) || /[!@#%&]/.test(value);
        let validConditions = 0;
        const numberOfMustBeValidConditions = 3;
        const conditions = [hasLowerCase, hasUpperCase, hasNumberSymbole];
        // eslint-disable-next-line no-plusplus
        conditions.forEach(condition => (condition ? validConditions++ : null));
        if (validConditions >= numberOfMustBeValidConditions) {
          return true;
        }
        return false;
      }
    ),
  confirmPassword: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
});

export const basicInfoValidation = yup.object({
  first_name: yup.string().trim().max(10, 'Maximum 10 characters allowed!').required('Required'),
  last_name: yup.string().trim().required('Required'),
  country: yup.string().required('Required'),
  time_zone: yup.string().required('Required'),
});

export const billingAddressValidation = yup.object({
  address: yup.string().trim().required('Required'),
});

export const deactivateValidation = yup.object().shape({
  status: yup.bool().required().oneOf([true], 'Please Confirm'),
});

export const addAccountValidation = yup.object({
  url: yup.string().url('Invalid Url').required('Required'),
});

export const createOfferFormValidationSchema = yup.object({
  gig: yup.number().required('Required'),
  description: yup.string().trim().required('Required'),
  budget_type: yup.string().required('Required'),
  rates: yup.number().required('Required'),
  timeline: yup.number().required('Required'),
  job_offer_attachments: yup.array().min(0, ''),
});

export const createWorkspaceValidation = yup.object({
  title: yup.string().trim().required('Required'),
});

export const acceptOfferValiadtion = yup.object({
  workspace: yup.string().required(),
});

export const activityTabValSchema = yup.object({
  message: yup.string().trim().required(''),
});

export const sendMessageValidation = yup.object({
  message: yup.string().trim().required(''),
});

export const setupPaypalValSchema = yup.object({
  paypal_email: yup.string().email('Please provide valid Email Account').trim().required('Required'),
});
