import * as yup from 'yup';
import {
  Button,
  TextField,
  CardHeader,
  CardContent,
  Card,
  CardActions,
  Grid,
  Box,
} from '@mui/material';
import { Formik, Form } from 'formik';
import { NextPage } from 'next';
import useAuth from '@/hooks/useAuth';

const validationSchema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const Login: NextPage = () => {
  const { login } = useAuth();

  const onLogin = async (credentials) => {
    await login(credentials);
  };

  return (
    <Box
      sx={{
        marginTop: 12,
        marginX: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onLogin}
      >
        {({ values, touched, errors, handleChange }) => (
          <Form>
            <Card variant="outlined">
              <CardHeader title="Sgin in" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="login"
                      name="login"
                      label="Login"
                      value={values.login}
                      onChange={handleChange}
                      error={touched.login && Boolean(errors.login)}
                      helperText={(touched.login && errors.login) as string}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={
                        (touched.password && errors.password) as string
                      }
                    />
                  </Grid>
                </Grid>
                <CardActions>
                  <Button
                    sx={{ marginTop: 2 }}
                    fullWidth
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Login
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
