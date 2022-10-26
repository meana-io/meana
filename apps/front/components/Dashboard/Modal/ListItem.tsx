import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';

import { Component } from './DashboardModal';

interface ListItemProps {
  component: Component;
}

const ListItem: React.FC<ListItemProps> = ({ component }) => {
  const [open, setOpen] = useState(false);

  const { previewComponent: PreviewComponent, formComponent: FormComponent } =
    component;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <PreviewComponent onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <FormComponent />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ListItem;
