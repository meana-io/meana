import { Add as AddIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Grid,
  IconButton,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { CreateNodeFormData, useCreateNode } from '@/api/nodes';
import { useState } from 'react';

const CreateNewNode: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync, isLoading, data: node } = useCreateNode();
  const { register, handleSubmit } = useForm();

  const onAdd = async ({ name }: CreateNodeFormData) => {
    await mutateAsync({
      name,
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <AddIcon />
      </IconButton>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Add Server
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onAdd)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              {...register('name')}
              label="Server Name"
              autoFocus
            />
            <Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  sx={{ mt: 5, mb: 2 }}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  disabled={isLoading}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
          {node?.uuid && (
            <Box>
              <Typography>Node UUID:</Typography>
              <TextField
                margin="normal"
                label="Node UUID"
                fullWidth
                value={node.uuid}
                autoFocus
              />
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CreateNewNode;
