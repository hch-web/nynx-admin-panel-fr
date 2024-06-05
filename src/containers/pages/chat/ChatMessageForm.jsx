import React, { useRef, useState } from 'react';
import { Form, Formik } from 'formik';
import { Box, CircularProgress, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { AttachFile, Close, Send } from '@mui/icons-material';
// import EmojiPicker, { Theme as EmojiTheme, EmojiStyle } from 'emoji-picker-react';
import propTypes from 'prop-types';
import { v4 } from 'uuid';

// API HOOKS
import { useSendChatAttachmentsMutation } from 'services/private/chat';

// COMPONENTS & CUSTOM HOOKS & STYLES & UTILITIES
import FormikField from 'shared/FormikField';
import { setIconByFileType } from 'utilities/helpers';
import styles from 'styles/containers/create-workspace.module.scss';
// import { chatEmojiBoxStyles } from 'styles/mui/containers/chat-box-styles';
import { sendMessageInitialValue } from './utilities/initialValues';
import { sendMessageValidation } from './utilities/schemaValidation';
import useGetChatContext from './hooks/useGetChatContext';

function ChatMessageForm({ socket, disabled }) {
  const theme = useTheme();
  const colors = theme.palette;
  const darkPurple = colors.darkPurple.main;
  const uploadFileRef = useRef(null);

  const { chatRoomId, setPendingMessages } = useGetChatContext();

  const [isAttachFile, setIsAttachFile] = useState(false);
  // const [isEmojiBoxOpen, setIsEmojiBoxOpen] = useState(false);

  // API HOOKS
  const [sendChatAttachments, { isLoading }] = useSendChatAttachmentsMutation();

  // HANDLERS
  const handleUploadFileChange = async (e, setFieldValue) => {
    const imageFile = e.target.files[0];
    imageFile.imgSrc = URL.createObjectURL(imageFile);
    const uploadAttachResp = await sendChatAttachments({ file: imageFile });
    const imageFileObject = {
      file: imageFile,
      id: uploadAttachResp?.data?.id,
    };
    setIsAttachFile(true);
    setFieldValue('attachment', imageFileObject);
  };

  // const handleToggleEmojiBox = () => {
  //   setIsEmojiBoxOpen(!isEmojiBoxOpen);
  // };

  // const handleAddEmoji = (emojiData, _, values, setFieldValue) => {
  //   setFieldValue('message', values.message + emojiData.emoji);
  // };

  return (
    <Formik
      initialValues={sendMessageInitialValue}
      validationSchema={!isAttachFile && sendMessageValidation}
      onSubmit={(submittedValues, { resetForm }) => {
        if (submittedValues?.attachment) {
          const payload = {
            message: submittedValues?.message,
            file: submittedValues?.attachment?.id,
            is_file: true,
            room: chatRoomId,
          };
          const sendMessagePayload = JSON.stringify(payload);
          socket.send(sendMessagePayload);
        } else {
          const payload = {
            message: submittedValues?.message,
            room: chatRoomId,
          };

          const sendMessagePayload = JSON.stringify(payload);

          setPendingMessages(prevState => [...prevState, { id: v4(), ...payload }]);
          // if (submittedValues?.message.length > 0) {
          socket.send(sendMessagePayload);
          // }
        }
        resetForm();
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <Form>
          <Box className="d-flex align-items-center py-2 px-2">
            {/* EMOJI BOX WITH ICON */}
            {/* <Box className="px-2 position-relative">
              <IconButton onClick={handleToggleEmojiBox} disabled={!disabled}>
                <SentimentSatisfiedAlt />
              </IconButton>

              {isEmojiBoxOpen && (
                <Box sx={chatEmojiBoxStyles}>
                  <EmojiPicker
                    skinTonesDisabled
                    onEmojiClick={(data, e) => handleAddEmoji(data, e, values, setFieldValue)}
                    theme={EmojiTheme.AUTO}
                    emojiStyle={EmojiStyle.NATIVE}
                  />
                </Box>
              )}
            </Box> */}

            <Box className="col">
              <FormikField
                disabled={!disabled}
                placeholder="Start Typing..."
                name="message"
                fullWidth
                className="py-0 px-1 border-0 shadow-none"
              />
            </Box>

            <Stack direction="row" spacing={1}>
              {isLoading ? (
                <IconButton>
                  <CircularProgress size={20} />
                </IconButton>
              ) : (
                <IconButton disabled={!disabled} onClick={() => uploadFileRef.current?.click()}>
                  <AttachFile />
                </IconButton>
              )}
              <input
                type="file"
                ref={uploadFileRef}
                hidden
                onChange={e => handleUploadFileChange(e, setFieldValue)}
              />

              <IconButton disabled={!disabled} onClick={handleSubmit}>
                <Send />
              </IconButton>
            </Stack>
          </Box>

          {values?.attachment && (
            <Box className="bg-white p-2 d-flex">
              <Box key="sameer" className={`${styles.uploadedFile} p-2 me-2 mt-2`}>
                <Box className="d-flex justify-content-between">
                  <Box className="d-flex">
                    <img src={setIconByFileType(values?.attachment?.file?.type)} alt="file" />

                    <Box className="d-flex align-items-center">
                      <Typography variant="dashboardBody" className="weight-500 ms-2" color={darkPurple}>
                        {values?.attachment?.file?.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="d-flex align-items-center ms-3">
                    <IconButton
                      aria-label="delete"
                      className={styles.cancelButton}
                      onClick={() => setFieldValue('attachment', '')}
                    >
                      <Close className={styles.cancelBtnText} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Form>
      )}
    </Formik>
  );
}

ChatMessageForm.propTypes = {
  socket: propTypes.object,
  disabled: propTypes.bool.isRequired,
};

ChatMessageForm.defaultProps = {
  socket: null,
};

export default ChatMessageForm;
