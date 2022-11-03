import { createTheme } from '@mui/material/styles';
import { green, amber, grey } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: green,
    secondary: amber,
  },
});

export default lightTheme;
