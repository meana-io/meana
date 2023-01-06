import * as yup from 'yup';
import {
  Button,
  TextField,
  CardHeader,
  CardContent,
  Card,
  CardActions,
  Grid,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import BaseLayout from '@/layouts/Base/BaseLayout';
import { CreateUserData, useCreateUser } from '@/api/user';
import { pageRoutes } from 'routes';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';

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
  const router = useRouter();
  const { mutateAsync, isLoading: isCreatingUser } = useCreateUser();

  const createUser = async ({
    firstName,
    lastName,
    login,
    email,
    password,
  }: CreateUserData) => {
    try {
      await mutateAsync({
        firstName,
        lastName,
        login,
        email,
        password,
      }).then(backToUsersList);
    } catch (e) {
      alert(`Cannot Create User the data`);
    }
  };

  const backToUsersList = () => {
    router.push(pageRoutes.users);
  };

  return (
    <BaseLayout>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          login: '',
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={createUser}
      >
        {({ values, touched, errors, handleChange, isValid, dirty }) => (
          <Form>
            <Card>
              <CardHeader title="Create User" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      data-cy="FirstName"
                      value={values.firstName}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      data-cy="LastName"
                      value={values.lastName}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="login"
                      name="login"
                      label="Login"
                      data-cy="Login"
                      value={values.login}
                      onChange={handleChange}
                      error={touched.login && Boolean(errors.login)}
                      helperText={touched.login && errors.login}
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      data-cy="Password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item sm={12} md={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email"
                      data-cy="Email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                </Grid>
                <CardActions
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Button
                    color="error"
                    variant="outlined"
                    size="large"
                    onClick={backToUsersList}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={isCreatingUser}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </CardActions>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </BaseLayout>
  );
};

export default CreateUser;
