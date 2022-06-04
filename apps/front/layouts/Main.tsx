import { Box, Toolbar, Drawer } from '@mui/material';

import TopNavbar from '@/components/TopNavbar';
import MainDrawer from '@/components/MainDrawer';
import TabsNav from '@/components/Tabs/TabsNav';
import TabsProvider from '@/contexts/tabsContext';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

const TABS = [
  { label: 'processor', icon: <AccessAlarmIcon /> },
  { label: 'disks', icon: <ThreeDRotation /> },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <TopNavbar />
      <MainDrawer />
      <Box component="main" sx={{ pt: 3 }}>
        <TabsProvider>
          <Drawer variant="permanent" anchor="right">
            <Toolbar />
            <TabsNav tabs={TABS} />
          </Drawer>
          {children}
        </TabsProvider>
      </Box>
    </Box>
  );
};

export default MainLayout;
