import { Add as AddIcon } from '@mui/icons-material';
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
import * as yup from 'yup';
import { useCreateNode } from '@/api/nodes';
import { useState } from 'react';
import { Form, Formik } from 'formik';

const validationSchema = yup.object({
  name: yup.string().required('Node name is required'),
});

const CreateNewNode: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync, isLoading, data: node } = useCreateNode();

  const createNode = async (values) => {
    await mutateAsync(values);
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
      <Dialog
        sx={{ width: '700px', maxWidth: '80%', margin: 'auto' }}
        open={isModalOpen}
      >
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          onSubmit={createNode}
        >
          {({ values, touched, errors, handleChange }) => (
            <Form>
              <DialogTitle>Add Server</DialogTitle>
              <DialogContent>
                <TextField
                  margin="normal"
                  required
                  sx={{ width: '700px', maxWidth: '100%' }}
                  label="Server Name"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                  error={touched.name && Boolean(errors.name)}
                  autoFocus
                />
                {node?.uuid && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Node UUID"
                    value={node.uuid}
                    autoFocus
                  />
                )}
              </DialogContent>
              <DialogActions>
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  disabled={isLoading}
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};

export default CreateNewNode;
