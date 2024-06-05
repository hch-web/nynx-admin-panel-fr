import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import propTypes from 'prop-types';

function DialogBox({ title, content, handleConfirm, isOpen, handleClose }) {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>

      {(content || title) && (
        <DialogContent>
          <DialogContentText>{title}</DialogContentText>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button onClick={handleConfirm} color="info" variant="outlined">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogBox.propTypes = {
  isOpen: propTypes.bool.isRequired,
  title: propTypes.string.isRequired,
  content: propTypes.string,
  handleConfirm: propTypes.func.isRequired,
  handleClose: propTypes.func,
};

DialogBox.defaultProps = {
  content: null,
  handleClose: () => {},
};

export default DialogBox;
