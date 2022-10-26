import { Box, Button, Typography, TextField, Grid } from '@mui/material';
import { useForm} from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';


interface State {
    firstName: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
}


const CreateUser: React.FC = () => { 

  // const [values, setValues] = React.useState<State>({
  //   firstName: '',
  //   lastName: '',
  //   login: '',
  //   password: '',
  //   email: '',
  // });

  const { register, handleSubmit} = useForm();
  const router = useRouter();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  // const createUser = async (data: State) => {
  //   console.log(data.firstName, data.lastName, data.login, data.password, data.email)
  // };

  const createUser = (data) => {
    console.log(data)
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  
  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleClose = () => {
    router.push('/');
  };


    return (

        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}>
            <Box
          sx={{
            position: 'absolute' as const,
            top: '45%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 510,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="user-form-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Add User
          </Typography>
          
          <Box
            component="form"
            onSubmit={handleSubmit(createUser)}
            noValidate
            sx={{ mt: 1 }}
          >
            <div className="firstname-lastname">

            <TextField
              margin="normal"
              required
              sx={{mr: 1,width: '48%' }}
              {...register('firstName')}
              label="First Name"
              autoFocus
              onChange={handleFirstNameChange}
              value={firstName}
            />
            <TextField
              margin="normal"
              required
              sx={{ml: 1,width: '48%' }}
              {...register('lastName')}
              label="Last Name"
              autoFocus
              onChange={handleLastNameChange}
              value={lastName}
            />
            </div>
            <div className="login-pass">
            <TextField
              margin="normal"
              required
              sx={{mr: 1,width: '48%' }}
              {...register('login')}
              label="Login"
              autoFocus
              onChange={handleLoginChange}
              value={login}
            />
            <TextField
              margin="normal"
              required
              sx={{ml: 1,width: '48%' }}
              {...register('password')}
              label="Password"
              autoFocus
              onChange={handlePasswordChange}
              value={password}
            />
            </div>
            <div className="email">
            <TextField
              margin="normal"
              required
              fullWidth
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                },
            })} 
              label="Email"
              autoFocus
              onChange={handleEmailChange}
              value={email}
              
            />
            </div>
            <Grid>
            <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  disabled={!firstName || !lastName || !login || !password || !email}
                >
                  Update
                </Button>
              </Grid>
              
            </Grid>
          </Box>
            </Box>
        </Grid>
)};

export default CreateUser;