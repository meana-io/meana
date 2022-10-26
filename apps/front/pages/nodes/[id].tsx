import { NextPage } from 'next';

import TabPanel from '@/components/Tabs/TabPanel';
import ServerDetailsDrawer from '@/components/Layout/ServerDetailsDrawer';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/tabsContext';

import Ram from '@/components/Ram';
import Cpu from '@/components/Cpu';
import ErrorBoundry from '@/components/Error';

import DiscFullIcon from '@mui/icons-material/DiscFull';
import SdStorageIcon from '@mui/icons-material/SdStorage';
import MemoryIcon from '@mui/icons-material/Memory';

const TABS = [
  { label: 'disks', icon: <DiscFullIcon /> },
  { label: 'ram', icon: <SdStorageIcon /> },
  { label: 'processor', icon: <MemoryIcon /> },
];

const Index: NextPage = () => {
  return (
    <TabsProvider>
      <MainLayout>
        <ServerDetailsDrawer tabs={TABS} />
        <TabPanel index={0}>
          <ErrorBoundry>
            <Disks />
          </ErrorBoundry>
        </TabPanel>
        <TabPanel index={1}>
          <ErrorBoundry>
            <Ram />
          </ErrorBoundry>
        </TabPanel>
        <TabPanel index={2}>
          <ErrorBoundry>
            <Cpu />
          </ErrorBoundry>
        </TabPanel>
      </MainLayout>
    </TabsProvider>
  );
};

export default Index;
