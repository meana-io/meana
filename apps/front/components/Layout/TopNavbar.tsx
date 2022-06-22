import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ServerForm from '../AddServer/ServerForm';

const TopNavbar: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="p">
          Meana
        </Typography>
        <ServerForm/>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
