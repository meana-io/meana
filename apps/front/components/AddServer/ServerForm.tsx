import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

import { useForm } from "react-hook-form";
import axios from "axios";


const style = {
  position: 'absolute' as 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



export default function ServerForm() {
  

  const { register, handleSubmit } = useForm();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  

  const onSubmit = data => {
    // axios
    //  .post('https://localhost:4000', data)
    //  .then(response => {console.log(response.data)})
    //  .catch(error => {console.log(error.data)});
    console.log(data)
 };

  return (
    <div>
      <Button onClick={handleOpen} size="large">Add New Server</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
            Add Server
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              {...register("serverName")}
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
    </div>
  );
}
