import { NextPage } from 'next';
import { Box } from '@mui/material';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/TabsContext';

const Index: NextPage = () => {
  return (
    <TabsProvider>
      <MainLayout>
        <Box>
          <Disks index={0} />
        </Box>
      </MainLayout>
    </TabsProvider>
  );
};

export default Index;
