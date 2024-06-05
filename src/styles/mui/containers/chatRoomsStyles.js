const mobileSmallCardHeight = '37vh';
const pageEmptySpace = '200px';

const customScrollDesign = {
  '::-webkit-scrollbar': {
    width: '5px',
  },

  '::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },

  '::-webkit-scrollbar-thumb': {
    background: '#cfcfcf',
    borderRadius: '5px',
  },
};

export const chatRoomPaperStyles = selectedChatId => ({
  height: `calc(100vh - ${pageEmptySpace})`,

  '@media screen and (max-width: 991px)': {
    height: !selectedChatId ? '80vh' : mobileSmallCardHeight,
  },
});

export const chatRoomTabsWrapperStyles = {
  '& .MuiTabs-flexContainer, & button': { minHeight: 56 },
};

export const chatRoomTabStyles = {
  width: '50%',
  maxWidth: 'none',

  '@media screen and (max-width: 570px)': { padding: '12px' },
};

export const chatRoomsTabPanelWrapperStyles = selectedChatId => ({
  height: `calc(100vh - ${pageEmptySpace} - 56px)`,
  overflowY: 'auto',
  overflowX: 'hidden',

  '@media screen and (max-width: 991px)': {
    height: !selectedChatId ? '70vh' : `calc(${mobileSmallCardHeight} - 56px)`,
  },

  ...customScrollDesign,
});

export const chatBoxHeaderStyles = { minHeight: '56px' };

export const chatRoomCardListItemBtnStyles = {
  // position: 'relative',
  '@media screen and (max-width: 768px)': { padding: '4px 8px' },
};

export const chatArchiveBtnStyles = isHovered => ({
  position: 'absolute',
  top: 1,
  right: 0,
  bottom: 1,
  width: isHovered ? '70px' : '0',
  transform: isHovered ? 'translate(0, 0)' : 'translate(70px, 0)',
  background: 'rgba(255,255,255,.7)',
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(1px)',

  '@media screen and (max-width: 768px)': { right: '8px' },
});

export const chatRoomCardDateStyles = {
  '@media screen and (max-width: 768px)': { fontSize: '10px' },
};

export const chatBoxBodyWrapperStyles = {
  height: `calc(100vh - ${pageEmptySpace} - 56px)`,
  overflow: 'auto',

  '@media screen and (max-width: 991px)': {
    height: `calc(100vh - ${mobileSmallCardHeight} - ${pageEmptySpace} - 56px)`,
  },
};

export const feedbackPaperWrapperStyles = {
  maxHeight: `calc(100vh - ${pageEmptySpace})`,

  '@media screen and (max-width: 991px)': { maxHeight: '37vh' },
};

export const feedbackHeaderStyles = { minHeight: '56px' };

export const feedbackBodyWrapperStyles = {
  maxHeight: `calc(100vh - 56px - ${pageEmptySpace})`,
  overflowY: 'auto',

  '@media screen and (max-width: 991px)': {
    maxHeight: 'calc(37vh - 56px)',
  },

  ...customScrollDesign,
};

export const feedbackChipStyles = {
  '@media screen and (max-width: 570px)': {
    '& .MuiChip-label': {
      fontSize: '11px',
    },
  },
};

export const messageBoxStyles = isBot => ({
  background: theme => (isBot ? theme.palette.primary.main : '#efefef'),
  color: isBot ? 'white' : 'black',
  maxWidth: '70%',
  padding: 1,
  borderRadius: isBot ? '0 10px 10px 10px' : '10px 0 10px 10px',
});
