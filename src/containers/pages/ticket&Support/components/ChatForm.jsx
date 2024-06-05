import React from 'react';
import { Box } from '@mui/material';
import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';

import FormikTextEditor from 'shared/FormikTextEditor';
import useGetUserData from 'customHooks/useGetUserData';
import { chatConfig } from 'shared/utilities/ckEditor';
import { useSendTicketMessageMutation } from 'services/private/ticketAndSupport';
import SubmitBtn from 'shared/SubmitBtn';
import FormikFileAttachments from 'shared/FormikFileAttachments';
import { useTicketSupportContext } from '../context/TicketSupportContext';
import { chatFormInitValues, chatFormSchema } from '../utilities/formUtils';

function ChatForm() {
  const { id: ticketId } = useParams();
  const { email } = useGetUserData();
  const { generatedBy } = useTicketSupportContext();
  const [sendMessage] = useSendTicketMessageMutation();

  return (
    <Box>
      <Formik
        initialValues={chatFormInitValues}
        validationSchema={chatFormSchema}
        onSubmit={async (values, { resetForm }) => {
          const payload = {
            ...values,
            file: values.file.map(item => item.url),
            ticket: ticketId,
            receiver: generatedBy,
            sender: email,
          };

          await sendMessage(payload);
          resetForm();
        }}
      >
        {({ submitForm }) => (
          <Form className="d-flex align-items-start flex-column gap-2">
            <FormikTextEditor
              onEnterPress={(evtData, cancel) => {
                cancel();
                submitForm();
              }}
              name="message"
              config={chatConfig}
            />

            <FormikFileAttachments name="file" isMultiple />

            <SubmitBtn label="Send" />
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default ChatForm;
