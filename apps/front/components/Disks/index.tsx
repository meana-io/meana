import TabPanel from '../Tabs/TabPanel';

interface DisksProps {
  index: number;
}

const Disks: React.FC<DisksProps> = ({ index }) => {
  return (
    <TabPanel index={index}>
      <div>DisksDetails</div>
    </TabPanel>
  );
};

export default Disks;
