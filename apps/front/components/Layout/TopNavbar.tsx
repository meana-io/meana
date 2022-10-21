import Link from 'next/link';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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
        <Link href="/add-new-node" passHref>
          <Button size="large">Add New Server</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
