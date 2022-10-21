import { NextPage, GetServerSideProps } from 'next';
// import api from '@/utility/axios';
import axios from 'axios';


import MainLayout from '@/layouts/Main';

import TabsProvider from '@/contexts/tabsContext';

import Disk from '@/types/disk';
import Partition from '@/types/partition';
import Node from '@/types/node';
import NodeRam from '@/types/ram';

interface IndexPageProps {
  disks: Disk[];
  nodes: Node[];
  partitions: Partition[];
  ram: NodeRam;
}

const Index: NextPage<IndexPageProps> = ({ nodes, disks, partitions, ram }) => {
  return (
    <TabsProvider>
      <MainLayout nodes={nodes}>Please select Node</MainLayout>
    </TabsProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { data: nodes } = await axios.get(
    'http://vps-5c7e69c7.vps.ovh.net:3333/api/nodes'
  );

  return {
    props: {
      nodes: nodes,
    },
  };
};;
export default Index;
