import { useDeleteNode } from '@/api/nodes';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { pageRoutes } from 'routes';

const DeleteNodeModal: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync } = useDeleteNode();

  const deleteNode = async () => {
    await mutateAsync(nodeId);
    setIsModalOpen(false);
    router.push(pageRoutes.dashboard);
  };

  return (
    <>
      <Button
        color="error"
        variant="contained"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Delete Node
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <DialogTitle>Are you sure you want to delete this node?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            if you delete this node there will be no way to recover previously
            collected data
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            autoFocus
            onClick={() => setIsModalOpen(false)}
          >
            Leave
          </Button>
          <Button variant="contained" color="error" onClick={deleteNode}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteNodeModal;
