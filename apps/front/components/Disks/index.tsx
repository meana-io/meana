import TabPanel from '../Tabs/TabPanel';

interface DisksProps {
  activeTab: number;
  index: number;
}

const Disks: React.FC<DisksProps> = ({ activeTab, index }) => {
  return (
    <TabPanel value={activeTab} index={index}>
      <p>DisksDetails</p>
    </TabPanel>
  );
};

export default Disks;
