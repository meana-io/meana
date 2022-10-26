import { useState } from 'react';
import {
  Fab,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import SearchInput from './SearchInput';

const MODAL_POSITION = 24;

const elems = [...Array(30).keys()];

const Cards: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      marginTop={4}
      maxHeight="50vh"
      height="100%"
      overflow={{ y: 'scroll' }}
    >
      {elems.map((v) => (
        <Grid item xs={6} key={v}>
          <Card sx={{ padding: '1rem' }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <b>{v}</b>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const DashboardModal: React.FC = () => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          <SearchInput />
        </DialogTitle>
        <DialogContent>
          <Cards />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DashboardModal;
