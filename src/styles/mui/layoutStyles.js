import bgImage from 'assets/gradient-background.jpg';

const navbarHeight = '72px';
const sidebarWidth = '250px';
const smallSidebarWidth = '58px';

export const mainContainerStyles = isOpen => ({
  height: `calc(100vh - ${navbarHeight})`,
  marginLeft: sidebarWidth,
  width: `calc(100% - ${sidebarWidth})`,
  padding: '20px',
  transition: '0.1s ease-in-out',

  ...(!isOpen && {
    marginLeft: smallSidebarWidth,
    width: `calc(100% - ${smallSidebarWidth})`,
    padding: '16px',
  }),
});

export const elderVirtualAssistantContStyles = {
  height: `calc(100vh - ${navbarHeight})`,
  width: '100%',
  padding: '20px',
  transition: '0.1s ease-in-out',
  background: `url(${bgImage}) center/cover no-repeat`,
};
export const listItemButtonStyles = { background: 'white', ':hover': { background: '#fff1e2' } };

export const navbarStyles = isOpen => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'white',
  boxShadow: '0 0 10px rgba(187, 187, 187, 0.5)',
  marginLeft: sidebarWidth,
  transition: '0.1s ease-in-out',
  zIndex: 10,
  position: 'relative',

  '& .navLogo': {
    width: '211px',
  },

  ...(!isOpen && {
    marginLeft: smallSidebarWidth,
    // marginleft: '300px!important',
    '& .listItemIcon': {
      minWidth: 'auto',
    },
  }),
});

export const virtualAssistNavbarStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'white',
  boxShadow: '0 0 10px rgba(187, 187, 187, 0.5)',
  transition: '0.1s ease-in-out',
  zIndex: 10,
  position: 'relative',

  '& .navLogo': {
    width: '211px',
  },
};

export const sidebarContStyles = isOpen => ({
  background: 'white',
  width: sidebarWidth,
  maxWidth: sidebarWidth,
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  marginTop: 0,
  paddingTop: 0,
  boxShadow: '0 6px 10px rgba(187, 187, 187, 0.5)',
  transition: '0.1s ease-in-out',
  zIndex: 10,

  ...(!isOpen && {
    width: smallSidebarWidth,
    maxWidth: smallSidebarWidth,

    '& .listItemIcon': {
      minWidth: 'auto',
    },
  }),
});

export const languageFlagStyles = image => ({
  background: `url(${image}) center/contain no-repeat`,
  width: '25px',
  height: '25px',
});

export const sidebarItemStyles = {
  '&.Mui-selected': {
    background: '#fff1e2',

    // '& .sidebarText': {
    //   color: 'white',
    // },

    // '& .MuiListItemIcon-root': {
    //   color: 'white',
    // },

    '&:hover': {
      background: '#fff1e2',
    },
  },
  ':hover': { background: '#fff1e2' },
};

export const sidebarListStyles = isOpen => ({
  '& .sidebarText': { display: isOpen ? 'block' : 'none' },
  // '& .tooltip': {  },
});
