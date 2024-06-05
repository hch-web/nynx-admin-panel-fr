export const userContainerStyles = { '@media screen and (max-width: 990px)': { display: 'none' } };

export const userArrowStyles = {
  display: 'none',
  '@media screen and (max-width: 990px)': { display: 'block' },
};

export const chatTitleStyles = {
  borderBottom: '1px solid #E5E5EA',
};

export const userListContainerStyles = {
  borderRight: '1px solid #E5E5EA',
  '@media screen and (max-width: 990px)': { borderRight: 'none' },
};

export const messageListMenuStyles = { boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' };

export const messageListMenuItemStyles = {
  width: '200px',
  fontSize: '20px',
  '&:hover': { bgcolor: '#ece9eb' },
};
export const postion = {
  '& .css-6hp17o-MuiList-root-MuiMenu-list': { border: '1px solid 1px solid darkgray', borderRadius: '5px;' }
};
export const MessagesWrapperStyles = { overflowY: 'auto', height: '60vh' };

export const ChatMessageBoxStyles = { borderRadius: '0 20px 20px 20px' };

export const chatEmojiBoxStyles = { position: 'absolute', top: 0, transform: 'translateY(-100%)' };

export const createOfferModalStyles = {
  width: '600px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  translate: '-50% -50%',
  outline: 'none',
  border: 'none',
  borderRadius: '10px',
  height: '80vh',
  overflow: 'hidden',
  '@media screen and (max-width: 991px)': {
    width: '100vw',
  },
};

export const userProfileImageStyles = { height: '60px', width: '60px' };

export const userInfoContainerStyles = {
  '&:hover': {
    background: '#FFE3C5',
  },
};

export const activeUserContainerStyles = {
  background: '#FFE3C5',
};

export const chatDisableButtonStyles = {
  background: '#E0E0E0',
  color: '#B5C6D9 ',
};

export const chatOfferContainerStyles = {
  width: '400px',
};

export const chatOfferBorderStyles = { borderLeft: '3px solid #fff', paddingLeft: '5px' };
