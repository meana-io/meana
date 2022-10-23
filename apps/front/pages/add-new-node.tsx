import { NextPage } from 'next';
import { Box, Button, Typography, Modal, TextField, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Node from '@/types/node';
import instance from '@/utility/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateNodeFormData {
  name: string;
}

const createNode = async (data: CreateNodeFormData): Promise<Node> => {
  const { data: node } = await instance.post('/nodes', data);
  return node;
};

const AddNewNode: NextPage = () => {
  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm();

  const { mutate, isLoading } = useMutation(createNode, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: () => {
      alert('there was an error');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['getNodes']);
    },
  });

  const onSubmit = (data: CreateNodeFormData) => {
    const node = {
      ...data,
    };
    mutate(node);
  };
  // const [newNode, setNewNode] = useState<Node>(undefined);
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
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
            onSubmit={handleSubmit(onSubmit)}
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
          {/* {newNode && (
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
          )} */}
        </Box>
      </Modal>
    </>
  );
};

export default AddNewNode;
