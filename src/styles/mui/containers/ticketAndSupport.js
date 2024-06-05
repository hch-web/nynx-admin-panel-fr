export const chatMessageWrapperStyles = {
  height: '400px',
  overflowY: 'auto',
  background: '#f5f5f5',
  mb: 2,
  border: '1px solid lightgray',
  p: 2.5,

  '&::-webkit-scrollbar': {
    width: '5px',
  },

  '&::-webkit-scrollbar-track': {
    background: '#dbdbdb',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '#afafaf',
  },
};

export const chatMessagesContainerStyles = {
  display: 'flex',
  alignItems: 'end',
  flexDirection: 'column',
  height: 'auto',
  gap: '10px',
};

export const getMessageBoxStyles = isSender => ({
  background: theme => (isSender ? 'white' : theme.palette.primary.main),
  padding: '7px 12px',
  '& *': { mb: 0 },
  borderRadius: isSender ? '10px 10px 0px 10px' : '10px 10px 10px 0px',
  alignSelf: isSender ? 'flex-end' : 'flex-start',
});
