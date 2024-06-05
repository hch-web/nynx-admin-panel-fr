import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ExitToApp, Face, KeyboardArrowDown, Menu as MenuIcon } from '@mui/icons-material';

import { navbarStyles, listItemButtonStyles } from 'styles/mui/layoutStyles';
import { onLoggedOut } from 'store/slices/authSlice';
import logo from 'assets/nav-logo-dark_auth.png';
import { Link } from 'react-router-dom';
import avatarImgURL from 'assets/profile-image-2.png';
import { formatName } from 'utilities/helpers';

function Navbar({ handleToggleSidebar, isOpen }) {
  const dispatch = useDispatch();
  const [profileMenu, setProfileMenu] = useState(false);
  const { userInfo } = useSelector(state => state?.auth) || {};
  const handleToggleMenu = e => {
    if (profileMenu) {
      setProfileMenu(null);
    } else {
      setProfileMenu(e.currentTarget);
    }
  };

  const handleLogout = () => {
    setProfileMenu(null);
    dispatch(onLoggedOut());
  };

  const handleCloseMenu = () => {
    setProfileMenu(null);
  };

  return (
    <Box p={2} sx={navbarStyles(isOpen)}>
      {!isOpen ? (
        <Box>
          <img width={100} src={logo} alt="Logo" />
        </Box>
      ) : (
        <IconButton className="p-0" onClick={handleToggleSidebar}>
          <MenuIcon />
        </IconButton>
      )}

      <Box className="d-flex">
        <Stack className="pointer" direction="row" alignItems="center" spacing={2} onClick={handleToggleMenu}>
          <Avatar src={avatarImgURL} />

          <Typography variant="body1">
            {formatName(userInfo?.first_name, userInfo?.last_name, userInfo?.user?.username)}
          </Typography>

          <KeyboardArrowDown />
        </Stack>

        <Menu
          key={profileMenu}
          open={!!profileMenu}
          anchorEl={profileMenu}
          onClose={handleToggleMenu}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem
            className="d-flex gap-2"
            sx={listItemButtonStyles}
            component={Link}
            to={`/profile/${userInfo?.id}`}
            onClick={handleCloseMenu}
          >
            <Face />
            <Typography>Profile</Typography>
          </MenuItem>

          <MenuItem sx={listItemButtonStyles} onClick={handleLogout} className="flex-d gap-2">
            <ExitToApp />
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Navbar;
