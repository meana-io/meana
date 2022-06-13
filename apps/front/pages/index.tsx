import { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';

import TabPanel from '@/components/Tabs/TabPanel';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/TabsContext';

import Disk from '@/types/disk';
import Partition from '@/types/partition';
import Node from '@/types/node';

import Ram from '@/components/Ram';

interface IndexPageProps {
  disks: Disk[];
  nodes: Node[];
  partitions: Partition[];
}

const Index: NextPage<IndexPageProps> = ({ nodes, disks, partitions }) => {
  return (
    <TabsProvider>
      <MainLayout nodes={nodes}>
        <TabPanel index={0}>
          <Disks disks={disks} partitions={partitions} />
        </TabPanel>
        <TabPanel index={1}>
          <Ram rams={disks} />
        </TabPanel>
      </MainLayout>
    </TabsProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const nodes_url = 'http://localhost:4000/nodes';
  // const disks_url = 'http://localhost:4000/disks';
  // const partitions_url = 'http://localhost:4000/partitions';

  // const [nodes, disks, partitions] = await Promise.all([
  //   axios.get(nodes_url),
  //   axios.get(disks_url),
  //   axios.get(partitions_url),
  // ]);


  return {
    props: {
      nodes: [],
      disks: [],
      partitions: [],
    },
  };
};
export default Index;
