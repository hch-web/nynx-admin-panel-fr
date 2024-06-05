import React from 'react';
import { Tooltip, tooltipClasses, styled } from '@mui/material';
import PropTypes from 'prop-types';

const LinkTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#fff',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FFFFFF',
    color: theme.palette.darkPurple.main,
    fontSize: 12,
    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600'

  },
}));

function TooltipComponent({ title, placement, children }) {
  return (
    <LinkTooltip title={title} placement={placement}>{children}</LinkTooltip>
  );
}

TooltipComponent.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.string,
  children: PropTypes.element.isRequired,
};

TooltipComponent.defaultProps = {
  title: '',
  placement: '',
};

export default TooltipComponent;
