import useTabs from '@/hooks/useTabs';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, index, ...other }) => {
  const { activeTab } = useTabs();

  return (
    <Box
      role="tabpanel"
      hidden={activeTab !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {activeTab === index && children}
    </Box>
  );
};

export default TabPanel;
