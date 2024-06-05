import { HOVER_PEACH_COLOR } from 'utilities/constants';

export const toggleButtonStyles = {
  border: '1px solid #fac751',
  '@media screen and (min-width: 490px) and (max-width: 600px)': { padding: '3px 10px', fontSize: '13px' },
  '@media screen and (max-width: 490px)': { padding: '2px 7px', fontSize: '12px' },
  '@media screen and (max-width: 430px)': { padding: '2px 5px', fontSize: '10px' },
};

export const freelanceToggleButtonStyles = {
  border: '1px solid #fac751',
  '@media screen and (min-width: 600px) and (max-width: 800px)': { padding: '3px 15px', fontSize: '13px' },
  '@media screen and (min-width: 490px) and (max-width: 600px)': { padding: '3px 10px', fontSize: '13px' },
  '@media screen and (max-width: 490px)': { padding: '2px 7px', fontSize: '12px' },
  '@media screen and (max-width: 430px)': { padding: '2px 5px', fontSize: '10px' },
};

export const tHeaderBoxStyles = {
  background: 'white',
  borderRadius: '20px 20px 0 0',
};

export const clienttHeaderBoxStyles = {
  background: 'white',
  borderRadius: '20px 20px 0 0',
};

export const freelancertHeaderBoxStyles = {
  background: 'white',
};

export const activeHeaderStyles = { fontSize: '1rem', fontWeight: '500', opacity: '1', textTransform: 'capitalize' };

export const nonActiveHeaderStyles = { fontSize: '1rem', fontWeight: '500', opacity: '0.8', textTransform: 'capitalize' };
export const activeActionHeaderStyles = { fontSize: '1rem', fontWeight: '500', opacity: '0.8', textTransform: 'capitalize', textAlign: 'end', paddingRight: '0rem!important' };

export const firstAvatarStyles = { width: '30px', height: '30px' };

export const avatarStyles = { width: '30px', height: '30px', marginLeft: '-13px !important' };

export const workspaceMainTableWrapperStyles = {
  width: '100%',
  overflowX: 'auto',
};

export const workspaceMainTableBodyStyles = {
  width: '100%',
  '@media screen and (max-width: 1300px)': { width: '911px' },
};

export const freelancerWorkspaceMainTableBodyStyles = {
  width: '100%',
  '@media screen and (max-width: 1500px)': { width: '1300px' },
};

export const workspaceTableHeadStyles = { background: '#f6f4f5', borderRadius: '0 0 20px 20px' };

export const workspaceListItemActionButtonStyles = {
  background: 'white',
  borderRadius: '5px',
  padding: '15px',
  userSelect: 'none',
  '&:hover': { background: '#fff6f2' },
  zIndex: 5,
};

export const workspaceHeaderCardTitleStyles = { fontWeight: '600' };

export const workspaceHeaderCardSubTitleStyles = { opacity: '0.5' };

export const workspaceResponsiveWidth = {
  '@media screen and (max-width: 991px)': { width: '100%' },
};

export const workspaceCardStyles = {
  width: '134px',
  maxWidth: '100%',
  alignSelf: 'stretch',
  '@media screen and (max-width: 570px)': { width: '100%' },
};

export const workspaceTotalBudgetCardStyle = {
  background: '#FFF2D0',
  ...workspaceCardStyles,
};

export const freelancerInvitedTabPanelCardImgStyles = {
  width: 180,
  height: 180,
  borderRadius: '10px',
  '@media screen and (max-width: 768px)': { width: '300px', maxWidth: '100%' },
};

export const proposalGigImageStyles = {
  backgroundSize: 'cover',
  width: '180px',
  height: '120px',
  borderRadius: '10px',
};

export const freelancerInvitedTabAvatarStyles = { width: '40px', height: '40px' };

export const freelancerTeamOnlineIconStyles = {
  width: '12px',
  height: '12px',
  background: '#50CD89',
  borderRadius: '50%',
  position: 'absolute',
  bottom: '0',
  right: '0',
};

export const freelancerTeamOfflineIconStyles = {
  width: '12px',
  height: '12px',
  background: '#e3dee1',
  borderRadius: '50%',
  position: 'absolute',
  bottom: '0',
  right: '0',
};

export const freelancerInvitedTabCardButtonStyles = { borderRadius: '20px' };

export const taskDetailsTableContainerWrapperStyles = {
  '@media screen and (max-width: 991px)': { overflowX: 'auto' },
};

export const taskDetailsTableContainerStyles = {
  '@media screen and (max-width: 991px)': { width: '1300px' },
};

export const tasksDetailsTableRowStyles = {
  background: 'white',
  '&:hover': {
    background: HOVER_PEACH_COLOR,
    color: 'initial',
  },
  color: 'initial',
  borderRadius: '0px 0px 10px 10px',
};

export const tasksGigMainImgStyles = {
  backgroundSize: 'contain',
  width: '70px',
  height: '60px',
};

export const taskDetailsHeaderGigImg = {
  backgroundSize: 'cover !important',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '80px',
  height: '60px',
  borderRadius: '10px',
  '@media screen and (max-width: 580px)': { width: '300px', height: '150px', maxWidth: '100%' },
};

export const taskDetailsHeaderGigTitle = {
  width: '220px',
  '@media screen and (max-width: 580px)': { width: '100%' },
};

export const workspaceContainerStyles = { background: 'white', borderRadius: '10px', padding: '20px' };

export const jobPostingAddSkillToggleButtonStyles = {
  borderRadius: '10px !important',
  borderColor: 'rgb(204, 207, 205) !important',
  background: '#fbf9fa',
  '&:hover': { background: '#fbf9fa' },
  '&.Mui-selected': {
    background: '#fff6f2',
    borderColor: '#FEA87E !important',
    '&:hover': { background: '#fff6f2', borderColor: '#FEA87E !important' },
  },
};

export const jobPostingSkillModalBoxStyles = {
  width: '600px',
  maxWidth: '100%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'white',
  border: 'none',
  borderRadius: '20px',
};

export const jobPostingFormAddSkillButtonStyles = {
  background: '#fbf9fa',
  border: '1px dashed',
  borderRadius: '5px',
};

export const activityEmojiBoxStyles = { position: 'absolute', top: 0, transform: 'translateY(-100%)' };

export const activityChatMessagesWrapperStyles = { height: '60vh', overflowY: 'auto' };

export const activityChatMessageBoxStyles = { borderRadius: '0 20px 20px 20px' };

export const jobStatusBtnStyles = { borderRadius: '20px' };

export const workspaceTitleModalStyles = {
  width: '500px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  translate: '-50%',
  background: 'white',
  borderRadius: '20px',
};

export const taskDetailsCardStyles = {
  background: '#fbf9fa',
  border: '1px solid #ece9eb',
  padding: '30px 0',
  textAlign: 'center',
};

export const newBoxSuccessCardLabelStyles = {
  position: 'absolute',
  left: '50%',
  top: '0',
  transform: 'translate(-50%, -50%)',
  borderRadius: '5px',
  background: '#32C850',
};

export const newBoxDangerCardLabelStyles = {
  position: 'absolute',
  left: '50%',
  top: '0',
  transform: 'translate(-50%, -50%)',
  borderRadius: '5px',
  background: '#F7625A',
};

export const taskDetailsGeneralModalStyles = {
  background: 'white',
  width: '600px',
  maxWidth: '100%',
  position: 'absolute',
  left: '50%',
  top: '50%',
  translate: '-50% -50%',
  borderRadius: '20px',
  outline: 'none',
  border: 'none',
};
export const freelancerTaskGigImageStyles = {
  width: '90px',
  height: '50px',
  backgroundSize: 'cover',
  borderRadius: '5px',
};

export const listItemBtnStyles = {
  background: 'white',
  ':focus': {
    background: 'white',
  },
  ':hover': {
    background: HOVER_PEACH_COLOR,
  },
};

export const jobPostingLinearProgressStyles = { backgroundColor: '#A23842', borderRadius: '10px' };

export const tastDetailsBudgetNotifiBox = {
  '@media screen and (min-width: 991px)': {
    borderRight: '1px solid #dee2e6',
  },

  '@media screen and (max-width: 991px)': {
    borderRight: '1px solid transparent',
  },
};

export const refundBudgetHeadBox = {
  '@media screen and (min-width: 570px)': {
    borderRight: '1px solid #dee2e6',
  },

  '@media screen and (max-width: 570px)': {
    borderRight: '1px solid transparent',
  },
};

export const refundBudgetAmountBox = {
  '@media screen and (max-width: 768px)': { borderRight: '1px solid transparent' },
  '@media screen and (min-width: 768px)': { borderRight: '1px solid #dee2e6' },
};

export const taskDetailsNotifiNewBox = {
  '@media screen and (max-width: 768px)': { borderRight: '1px solid transparent' },
  '@media screen and (min-width: 768px)': { borderRight: '1px solid #dee2e6' },
};

export const taskDetailsChangeTermsNewBoxStyles = { background: '#32C850', borderRadius: '5px' };

export const taskDetailsChangeTermsPrevBoxStyles = { background: '#F7625A', borderRadius: '5px' };

export const taskDetailsDeliverFilesModalStyles = {
  width: '600px',
  background: 'white',
  borderRadius: '10px',
  position: 'absolute',
  left: '50%',
  top: '50%',
  translate: '-50% -50%',
  outline: 'none',
  border: 'none',
};

export const taskDetailsTabPanelTableBodyStyles = {
  width: '100%',
  '@media screen and (max-width: 991px)': { width: '900px' },
};

export const backButtonIconStyles = { fontSize: '16px' };

export const backButtonContainerStyles = { cursor: 'pointer' };

export const analyticsBorderStyles = { borderRight: '1px solid #ece1da' };

export const worskpaceListContainerLoader = {
  height: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const changeTermRejectButtonStyles = {
  borderRadius: '20px',
};
