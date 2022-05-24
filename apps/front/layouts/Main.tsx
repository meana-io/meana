import { Box, Toolbar } from '@mui/material';

import TopNavbar from '@/components/TopNavbar';
import MainDrawer from '@/components/MainDrawer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopNavbar />
      <MainDrawer />
      <Box component="main" sx={{ pt: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
