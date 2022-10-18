import { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import Node from '@/types/node';

interface CreateNodeFormData {
  name: string;
}

const ServerForm: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const [newNode, setNewNode] = useState<Node>(undefined);
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  const onCreateNode = async (data: CreateNodeFormData) => {
    const { data: node } = await axios.post('/api/create-node', data);
    setNewNode(node);
  };

  return (
    <>
      <Modal
        open={true}
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
            onSubmit={handleSubmit(onCreateNode)}
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
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
          {newNode && (
            <Typography>
              Node UUID:
              <TextField
                margin="normal"
                label="Node UUID"
                fullWidth
                value={newNode?.uuid}
                autoFocus
              />
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ServerForm;
