import React, { useState } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import propTypes from 'prop-types';
import { Link, useMatch } from 'react-router-dom';
import { sidebarItemStyles } from 'styles/mui/layoutStyles';

// import styles from 'styles/common/layout.module.scss';

function SidebarItem({ icon, text, path, isOpen }) {
  const isActive = useMatch(path);
  const [isHover, setIsHover] = useState(false);
  return (
    <ListItemButton component={Link} to={path} selected={!!isActive} sx={sidebarItemStyles}>
      <Tooltip title={text} placement="right" open={!isOpen && isHover}>
        <ListItemIcon onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
          {icon}
        </ListItemIcon>
      </Tooltip>

      <ListItemText className="sidebarText" primary={text} />
    </ListItemButton>
  );
}

SidebarItem.propTypes = {
  icon: propTypes.element.isRequired,
  text: propTypes.string.isRequired,
  path: propTypes.string,
  isOpen: propTypes.bool,
};
SidebarItem.defaultProps = {
  path: '',
  isOpen: true,
};
export default SidebarItem;
