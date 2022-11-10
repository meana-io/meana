import { NextPage } from 'next';

import { Grid, Paper } from '@mui/material';
import DiscFullIcon from '@mui/icons-material/DiscFull';
import SdStorageIcon from '@mui/icons-material/SdStorage';
import MemoryIcon from '@mui/icons-material/Memory';

import NodesLayout from '@/layouts/Nodes/NodesLayout';

import TabPanel from '@/components/Tabs/TabPanel';
import Disks from '@/components/Disks';
import Ram from '@/components/Ram';
import Cpu from '@/components/Cpu';
import TabsNav from '@/components/Tabs/TabsNav';

const TABS = [
  { label: 'disks', icon: <DiscFullIcon /> },
  { label: 'ram', icon: <SdStorageIcon /> },
  { label: 'processor', icon: <MemoryIcon /> },
];

const Index: NextPage = () => {
  return (
    <NodesLayout>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TabPanel index={0}>
            <Disks />
          </TabPanel>
          <TabPanel index={1}>
            <Ram />
          </TabPanel>
          <TabPanel index={2}>
            <Cpu />
          </TabPanel>
        </Grid>
        <Grid item xs={1}>
          <Paper sx={{ height: '100%' }}>
            <TabsNav tabs={TABS} />
          </Paper>
        </Grid>
      </Grid>
    </NodesLayout>
  );
};

export default Index;
