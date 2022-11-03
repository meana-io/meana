import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import { Box } from '@mui/system';
import { Component } from '../Components';

interface ListItemProps {
  component: Component;
}

const ListItem: React.FC<ListItemProps> = ({ component }) => {
  const [open, setOpen] = useState(false);

  const {
    previewComponent: PreviewComponent,
    formComponent: FormComponent,
    title,
  } = component;

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
        <DialogTitle>{title} Component</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Set the component to be displayed on the dashboard.
          </DialogContentText>
          <Box mt={2}>
            <FormComponent />
          </Box>
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
