import * as yup from 'yup';

export const chatFormInitValues = {
  message: '',
};
export const chatFormSchema = yup.object().shape({
  message: yup.string().required('required'),
});
export const ticketDialogFormInitValues = {
  title: '',
  reason: '',
  amount_for_freelancer: '',
  amount_for_client: '',
};

export const addTicketDialogFormValSchema = yup.object().shape({
  title: yup.string(),
  reason: yup.string().max(255, 'Only 255 characted allowed!').required('Required'),
  amount_for_freelancer: yup.number().nullable(),
  amount_for_client: yup.number().nullable(),
});
export const updateTicketDialogFormValSchema = yup.object().shape({
  title: yup.string(),
  reason: yup.string().max(255, 'Only 255 characted allowed!'),
  amount_for_freelancer: yup.number().nullable(),
  amount_for_client: yup.number().nullable(),
});
export const partialPaymentForminitvalues = {
  total_amount: '',
  refund_amount: '',
  full_refund: false,
};

export const partialPaymentFormValSchema = yup.object().shape({
  total_amount: yup.number(),
  refund_amount: yup.number().required('Required'),
});

export const PaymentToClientForminitvalues = {
  reason: '',
  amount_to_client: '',
};
export const PaymentToClientFormValSchema = yup.object().shape({
  reason: yup.string().required('Required'),
  amount_to_client: yup.number(),
});
