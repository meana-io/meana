import { Tabs, Tab } from '@mui/material';

const a11yProps = (index: number) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
};

interface Tab {
  label: string;
  icon: React.ReactElement;
}

interface TabsNavProps {
  tabs: Tab[];
  activeTab: number;
  changeTab: (event: React.SyntheticEvent, newValue: number) => void;
}

const TabsNav: React.FC<TabsNavProps> = ({ activeTab, changeTab, tabs }) => {
  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={activeTab}
      onChange={changeTab}
    >
      {tabs.map(({ label, icon }, index) => (
        <Tab key={index} aria-label={label} icon={icon} {...a11yProps(index)} />
      ))}
    </Tabs>
  );
};

export default TabsNav;
