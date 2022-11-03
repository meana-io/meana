import { ChangeEvent, useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import SearchInput from './SearchInput';
import ComponentsList from './ComponentsList';
import { COMPONENTS } from '../Components';

const MODAL_POSITION = 24;

const DashboardModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [filterdComponents, setFilterdComponents] = useState(COMPONENTS);

  const filterComponents = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterdComponents(
      Object.fromEntries(
        Object.entries(COMPONENTS).filter(([_, { title }]) =>
          title.toLowerCase().includes(event.target.value ?? '')
        )
      )
    );
  };

  return (
    <>
      <Fab
        color="primary"
        onClick={handleOpen}
        sx={{
          position: 'absolute',
          bottom: MODAL_POSITION,
          right: MODAL_POSITION,
        }}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle>
          <SearchInput onChange={filterComponents} />
        </DialogTitle>
        <DialogContent>
          <ComponentsList components={filterdComponents} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardModal;
