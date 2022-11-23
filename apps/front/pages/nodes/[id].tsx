import { NextPage } from 'next';

import { Grid, Paper } from '@mui/material';
import {
  Group as GroupIcon,
  Settings as SettingsIcon,
  Memory as MemoryIcon,
  SdStorage as SdStorageIcon,
  DiscFull as DiscFullIcon,
  FileCopy as FileCopyIcon,
} from '@mui/icons-material';

import NodesLayout from '@/layouts/Nodes/NodesLayout';
import TabsNav from '@/components/Tabs/TabsNav';

import TabPanel from '@/components/Tabs/TabPanel';
import Disk from 'sections/nodes/Disk/Disk';
import Ram from 'sections/nodes/Ram/Ram';
import Cpu from 'sections/nodes/Cpu/Cpu';
import Settings from 'sections/nodes/Settings/Settings';
import Logs from 'sections/nodes/Logs/Logs';
import Users from 'sections/nodes/Users/Users';

const TABS = [
  { label: 'disks', icon: <DiscFullIcon /> },
  { label: 'ram', icon: <SdStorageIcon /> },
  { label: 'processor', icon: <MemoryIcon /> },
  { label: 'Users', icon: <GroupIcon /> },
  { label: 'logs', icon: <FileCopyIcon /> },
  { label: 'settings', icon: <SettingsIcon /> },
];

const Node: NextPage = () => {
  return (
    <NodesLayout>
      <Grid container spacing={2}>
        <Grid item xs={11}>
          <TabPanel index={0}>
            <Disk />
          </TabPanel>
          <TabPanel index={1}>
            <Ram />
          </TabPanel>
          <TabPanel index={2}>
            <Cpu />
          </TabPanel>
          <TabPanel index={3}>
            <Users />
          </TabPanel>
          <TabPanel index={4}>
            <Logs />
          </TabPanel>
          <TabPanel index={5}>
            <Settings />
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

export default Node;
