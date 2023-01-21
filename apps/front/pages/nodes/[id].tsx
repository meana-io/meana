import { NextPage } from 'next';

import { Card, Grid, Paper } from '@mui/material';
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
  { label: 'Disks', icon: <DiscFullIcon />, children: <Disk /> },
  { label: 'Ram', icon: <SdStorageIcon />, children: <Ram /> },
  { label: 'Processor', icon: <MemoryIcon />, children: <Cpu /> },
  { label: 'Users', icon: <GroupIcon />, children: <Users /> },
  { label: 'Packages', icon: <NewReleasesIcon />, children: <Packages /> },
  { label: 'Logs', icon: <FileCopyIcon />, children: <Logs /> },
  { label: 'Network cards', icon: <RouterIcon />, children: <NetworkCards /> },
  { label: 'Devices', icon: <HomeMaxIcon />, children: <Devices /> },
  { label: 'Settings', icon: <SettingsIcon />, children: <Settings /> },
];

const Node: NextPage = () => {
  return (
    <NodesLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card variant="outlined">
            <TabsNav tabs={TABS} />
          </Card>
        </Grid>
        <Grid item xs={12}>
          {TABS.map(({ children }, index) => (
            <TabPanel key={index} index={index}>
              {children}
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </NodesLayout>
  );
};

export default Node;
