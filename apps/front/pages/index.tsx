import { NextPage, GetServerSideProps } from 'next';
// import api from '@/utility/axios';
import axios from 'axios';

import TabPanel from '@/components/Tabs/TabPanel';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/tabsContext';

import Disk from '@/types/disk';
import Partition from '@/types/partition';
import Node from '@/types/node';
import NodeRam from '@/types/ram';

import Ram from '@/components/Ram';

interface IndexPageProps {
  disks: Disk[];
  nodes: Node[];
  partitions: Partition[];
  ram: NodeRam;
}

const Index: NextPage<IndexPageProps> = ({ nodes, disks, partitions, ram }) => {
  return (
    <TabsProvider>
      <MainLayout nodes={nodes}>
        <TabPanel index={0}>
          <Disks disks={disks} partitions={partitions} />
        </TabPanel>
        <TabPanel index={1}>
          <Ram ram={ram} />
        </TabPanel>
      </MainLayout>
    </TabsProvider>
  );
};

const arrayUniqueByKey = (arr, key: string) => [
  ...new Map(arr.map((item) => [item[key], item])).values(),
];

const sortByNewest = (arr) =>
  arr.sort(
    (a, b) => new Date(a.getTime).getTime() - new Date(b.getTime).getTime()
  );

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [nodes, disks, partitions, ram] = await Promise.all([
    axios.get('http://135.125.190.40:3333/api/nodes'),
    axios.get('http://135.125.190.40:3333/api/node-disks'),
    axios.get('http://135.125.190.40:3333/api/node-disk-partitions'),
    axios.get('http://135.125.190.40:3333/api/node-ram'),
  ]);

  const disksByNewest = sortByNewest(disks.data);
  const partitionByNewest = sortByNewest(partitions.data);
  const [ramByNewest] = sortByNewest(ram.data);

  return {
    props: {
      nodes: nodes.data,
      disks: arrayUniqueByKey(disksByNewest, 'serialNumber'),
      partitions: arrayUniqueByKey(partitionByNewest, 'diskSerialNumber'),
      ram: ramByNewest,
    },
  };
};
export default Index;