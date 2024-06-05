import React from 'react';
import {
  Box,
  List,
  IconButton,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Tooltip,
} from '@mui/material';
import {
  Diversity3,
  Dashboard,
  Work,
  Category,
  SupervisedUserCircle,
  RocketLaunch,
  Badge,
  MenuOpen,
  Analytics,
  ExpandLess,
  ExpandMore,
  Luggage,
  // EditAttributes,
  Share,
  Payment,
  // Help,
  Sell,
  Help,
  MailOutline,
  ManageAccounts,
  WorkHistory,
} from '@mui/icons-material';
import { sidebarItemStyles, sidebarContStyles, sidebarListStyles } from 'styles/mui/layoutStyles';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// COMPONENTS & STYLES
import logo from 'assets/nav-logo-dark_auth.png';

import SidebarItem from './SidebarItem';

function Sidebar({ handleToggleSidebar, isOpen }) {
  const isSuperUser = useSelector(state => state?.auth?.userInfo?.user?.is_superuser);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box sx={sidebarContStyles(isOpen)} className="overflow-auto">
      <Box className="d-flex flex-column align-items-center justify-content-center my-3">
        {!isOpen ? (
          <IconButton onClick={handleToggleSidebar}>
            <MenuOpen />
          </IconButton>
        ) : (
          <img className="img-fluid" width={100} src={logo} alt="Logo" />
        )}
      </Box>
      <List sx={sidebarListStyles(isOpen)}>
        <SidebarItem isOpen={isOpen} icon={<Dashboard />} text="Dashboard" path="/" />

        {isSuperUser && (
          <SidebarItem isOpen={isOpen} icon={<ManageAccounts />} text="Super Users" path="/super-users" />
        )}
        {isSuperUser && (
          <SidebarItem isOpen={isOpen} icon={<Diversity3 />} text="Freelancers" path="/freelancers" />
        )}
        {isSuperUser && (
          <SidebarItem isOpen={isOpen} icon={<SupervisedUserCircle />} text="Clients" path="/clients" />
        )}

        {isSuperUser && (
          <ListItemButton onClick={handleClick} selected={open} sx={sidebarItemStyles}>
            {isOpen ? (
              <>
                <ListItemIcon>
                  <Luggage />
                </ListItemIcon>
                <ListItemText primary={isOpen ? 'Assets' : ''} />
                {open ? <ExpandLess /> : <ExpandMore />}{' '}
              </>
            ) : (
              <ListItemIcon>
                <Tooltip title="Assets" placement="right">
                  <Luggage />
                </Tooltip>
              </ListItemIcon>
            )}
          </ListItemButton>
        )}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List>
            {isSuperUser && (
              <SidebarItem isOpen={isOpen} icon={<Category />} text="Category" path="/categories" />
            )}
            {/* {isSuperUser && <SidebarItem isOpen={isOpen} icon={<EditAttributes />} text="Attribute" path="/attributes" />} */}
            {isSuperUser && (
              <SidebarItem isOpen={isOpen} icon={<Payment />} text="Skillset extras" path="/features" />
            )}
            {isSuperUser && (
              <SidebarItem isOpen={isOpen} icon={<Share />} text="Social Media" path="/social-media" />
            )}
          </List>
        </Collapse>
        {isSuperUser && <SidebarItem isOpen={isOpen} icon={<Badge />} text="Skillsets" path="/gigs" />}
        {isSuperUser && (
          <SidebarItem isOpen={isOpen} icon={<RocketLaunch />} text="Workspaces" path="/workspaces" />
        )}
        {isSuperUser && <SidebarItem isOpen={isOpen} icon={<Work />} text="Jobs" path="/jobs" />}
        {isSuperUser && <SidebarItem isOpen={isOpen} icon={<Sell />} text="Skills" path="/skills" />}
        {isSuperUser && (
          <SidebarItem isOpen={isOpen} icon={<Analytics />} text="Analytics" path="/analytics" />
        )}
        {/* <SidebarItem isOpen={isOpen} icon={<SupportAgent />} text="Human Agent" path="/human-agent" /> */}

        {isSuperUser && (
          <SidebarItem isOpen={isOpen} icon={<Help />} text="Dispute Requests" path="/request" />
        )}
        {isSuperUser && (
          <SidebarItem
            isOpen={isOpen}
            icon={<WorkHistory />}
            text="Partial Payment History"
            path="/history"
          />
        )}
        {isSuperUser && (
          <SidebarItem
            isOpen={isOpen}
            icon={<WorkHistory />}
            text=" Full Refund History"
            path="/full-refund-history"
          />
        )}
        {isSuperUser && <SidebarItem isOpen={isOpen} icon={<MailOutline />} text="Inbox" path="/chat" />}
      </List>
    </Box>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleToggleSidebar: PropTypes.func,
};

Sidebar.defaultProps = {
  handleToggleSidebar: null,
};

export default Sidebar;
