import { Toolbar, Drawer as MuiDrawer } from '@mui/material';
import { styled } from '@mui/material/styles';

import TabsNav, { Tab } from '@/components/Tabs/TabsNav';

export const SERVER_DETAILS_DRAWER_WIDTH = 90 as const;

const TabsNavDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(() => ({
  width: SERVER_DETAILS_DRAWER_WIDTH,
}));

interface ServerDetailsDrawerProps {
  tabs: Tab[];
}

const ServerDetailsDrawer: React.FC<ServerDetailsDrawerProps> = ({ tabs }) => {
  return (
    <TabsNavDrawer variant="permanent" anchor="right">
      <Toolbar />
      <TabsNav tabs={tabs} />
    </TabsNavDrawer>
  );
};

export default ServerDetailsDrawer;
