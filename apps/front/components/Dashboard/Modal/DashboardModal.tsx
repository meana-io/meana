import { useState } from 'react';
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

import { RamPreview, RamForm, RamComponent } from '../Components/Ram';
import { CpuPreview, CpuForm, CpuComponent } from '../Components/Cpu';

export type Component = {
  title: string;
  key: string;
  previewComponent: React.ElementType;
  formComponent: React.ElementType;
  component: React.ElementType;
};

export const COMPONENTS = [
  {
    title: 'RAM',
    key: 'ram_component',
    previewComponent: RamPreview,
    formComponent: RamForm,
    component: RamComponent,
  },
  {
    title: 'CPU',
    key: 'cpu_component',
    previewComponent: CpuPreview,
    formComponent: CpuForm,
    component: CpuComponent,
  },
];

const MODAL_POSITION = 24;

const DashboardModal: React.FC = () => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [filterdComponents, setFilterdComponents] = useState(COMPONENTS);

  const filterComponents = (word: string) => {
    setFilterdComponents(
      COMPONENTS.filter(({ title }) => title.toLowerCase().includes(word))
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
