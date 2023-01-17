import { NextPage } from 'next';

import { Grid, Paper } from '@mui/material';
import {
  NewReleases as NewReleasesIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Memory as MemoryIcon,
  SdStorage as SdStorageIcon,
  DiscFull as DiscFullIcon,
  FileCopy as FileCopyIcon,
  HomeMax as HomeMaxIcon,
} from '@mui/icons-material';
import RouterIcon from '@mui/icons-material/Router';

import NodesLayout from '@/layouts/Nodes/NodesLayout';
import TabsNav from '@/components/Tabs/TabsNav';

import TabPanel from '@/components/Tabs/TabPanel';
import Disk from 'sections/nodes/Disk/Disk';
import Ram from 'sections/nodes/Ram/Ram';
import Cpu from 'sections/nodes/Cpu/Cpu';
import Settings from 'sections/nodes/Settings/Settings';
import Logs from 'sections/nodes/Logs/Logs';
import Packages from 'sections/nodes/Packages/Packages';
import Users from 'sections/nodes/Users/Users';
import NetworkCards from 'sections/nodes/NetworkCards/NetworkCards';
import Devices from 'sections/nodes/Devices/Devices';

const TABS = [
  { label: 'Disks', icon: <DiscFullIcon /> },
  { label: 'Ram', icon: <SdStorageIcon /> },
  { label: 'Processor', icon: <MemoryIcon /> },
  { label: 'Users', icon: <GroupIcon /> },
  { label: 'Packages', icon: <NewReleasesIcon /> },
  { label: 'Logs', icon: <FileCopyIcon /> },
  { label: 'Settings', icon: <SettingsIcon /> },
  { label: 'Network cards', icon: <RouterIcon /> },
  { label: 'Devices', icon: <HomeMaxIcon /> },
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
            <Packages />
          </TabPanel>
          <TabPanel index={5}>
            <Logs />
          </TabPanel>
          <TabPanel index={6}>
            <Settings />
          </TabPanel>
          <TabPanel index={7}>
            <NetworkCards />
          </TabPanel>
          <TabPanel index={8}>
            <Devices />
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
