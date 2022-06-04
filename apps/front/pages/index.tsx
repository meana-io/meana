import { NextPage } from 'next';
import { Box, Toolbar } from '@mui/material';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';
import useTabs from '@/hooks/useTabs';

const Index: NextPage = () => {
  const { activeTab } = useTabs();

  return (
    <MainLayout>
      <Toolbar />
      <Box>
        <Disks activeTab={activeTab} index={0} />
      </Box>
    </MainLayout>
  );
};

export default Index;
