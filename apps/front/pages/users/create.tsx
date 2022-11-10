import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Button, Grid, Box, TextField, Typography} from '@mui/material';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last Name is required'),
  login: yup.string().required('Login is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const CreateUser: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      login: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
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
            <div className="first-last">
              <TextField
                sx={{ mr: 1, width: '48%' }}
                margin="normal"
                id="firstName"
                name="firstName"
                label="First Name"
                {...register('firstName')}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                sx={{ ml: 1, width: '48%' }}
                margin="normal"
                id="lastName"
                name="lastName"
                label="Last Name"
                {...register('lastName')}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </div>
            <div className="log-ap">
              <TextField
                sx={{ mr: 1, width: '48%' }}
                margin="normal"
                id="login"
                name="login"
                label="Login"
                {...register('login')}
                value={formik.values.login}
                onChange={formik.handleChange}
                error={formik.touched.login && Boolean(formik.errors.login)}
                helperText={formik.touched.login && formik.errors.login}
              />
              <TextField
                sx={{ ml: 1, width: '48%' }}
                margin="normal"
                id="password"
                name="password"
                label="Password"
                type="password"
                {...register('password')}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div className="email">
              <TextField
                fullWidth
                margin="normal"
                id="email"
                name="email"
                label="Email"
                {...register('email')}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <Grid>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                sx={{ mt: 1, mb: 2 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid>
              <Button
                disabled={!formik.isValid || !formik.dirty}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ mt: 1, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Box>
        </Grid>
      </form>
    </div>
  );
};

export default CreateUser;
