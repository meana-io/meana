import { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useMutation } from 'react-query';

interface CreateNodeFormData {
  name: string;
}

const createNode = (data) => {
  return axios.post('http://135.125.190.40:3333/api/nodes', data);
};

const ServerForm: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useMutation(createNode);

  const onCreateNode = async (data: CreateNodeFormData) => {
    try {
      await mutate(data);
      // Todo was successfully created
    } catch (error) {
      // Uh oh, something went wrong
    }
  };

  return (
    <>
      <Button onClick={handleOpen} size="large">
        Add New Server
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
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
                  Reject
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ServerForm;
