import { useState } from 'react';
import { Box } from '@mui/material';

import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';

import TabsNav from './TabsNav';
import TabPanel from './TabPanel';

const TABS = [
  { label: 'processor', icon: <AccessAlarmIcon /> },
  { label: 'disks', icon: <ThreeDRotation /> },
];

const Disks: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      <TabsNav tabs={TABS} activeTab={value} changeTab={handleChange} />
    </Box>
  );
};

export default Disks;
