import { NextPage } from 'next';

import TabPanel from '@/components/Tabs/TabPanel';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/tabsContext';

import Ram from '@/components/Ram';
import Cpu from '@/components/Cpu';
import ErrorBoundry from '@/components/Error';

const Index: NextPage = () => {
  return (
    <TabsProvider>
      <MainLayout>
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
