import { Tabs, Tab } from '@mui/material';

import useTabs from '@/hooks/useTabs';

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

export interface Tab {
  label: string;
  icon: React.ReactElement;
}

interface TabsNavProps {
  tabs: Tab[];
}

const TabsNav: React.FC<TabsNavProps> = ({ tabs }) => {
  const { activeTab, onChangeActiveTab } = useTabs();

  return (
    <Tabs variant="scrollable" value={activeTab} onChange={onChangeActiveTab}>
      {tabs.map(({ label, icon }, index) => (
        <Tab key={index} label={label} icon={icon} {...a11yProps(index)} />
      ))}
    </Tabs>
  );
};

export default TabsNav;
