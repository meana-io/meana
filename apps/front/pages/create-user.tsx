import * as React from 'react';
import {Stack, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Button} from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';


interface State {
    name: string;
    lastName: string;
    login: string;
    password: string;
    email: string;
    showPassword: boolean;
  }


export const CreateUser: React.FC = () => {

    const [values, setValues] = React.useState<State>({
        name: '',
        lastName: '',
        login: '',
        password: '',
        email: '',
        showPassword: false,
      });



    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const sendData = () => {
        console.log(values.name, values.lastName, values.login, values.password, values.email)
    }



    return ( 
    <Stack spacing={2}>
      <div>
        <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-login">Name</InputLabel>
          <OutlinedInput
            id="outlined-name"
            type="String"
            value={values.name}
            onChange={handleChange('name')}
            label="Name"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-lastName">Last Name</InputLabel>
          <OutlinedInput
            id="outlined-lastName"
            type="String"
            value={values.lastName}
            onChange={handleChange('lastName')}
            label="Last Name"
          />
        </FormControl>
        </div>
        <div>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-login">Login</InputLabel>
          <OutlinedInput
            id="outlined-adornment-login"
            type="String"
            value={values.login}
            onChange={handleChange('login')}
            label="Login"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>
        <FormControl sx={{ m: 1, width: '52ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-email"
            type="String"
            value={values.email}
            onChange={handleChange('email')}
            label="Email"
          />
        </FormControl>
      </div>
      <div>
    <Button sx={{ ml: 16.5, width: '25ch' }} variant="contained" onClick={sendData}>Create user</Button>
    </div>
    </Stack>
     );
}
 
export default CreateUser;

