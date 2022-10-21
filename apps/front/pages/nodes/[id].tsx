import { NextPage, GetServerSideProps } from 'next';
import api from '@/utility/axios';
import axios from 'axios';

import TabPanel from '@/components/Tabs/TabPanel';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/tabsContext';

import Disk from '@/types/disk';
import Partition from '@/types/partition';
import Node from '@/types/node';
import NodeRam from '@/types/ram';
import NodeCpu from '@/types/cpu';

import Ram from '@/components/Ram';
import Cpu from '@/components/Cpu';

interface IndexPageProps {
  disks: Disk[];
  nodes: Node[];
  partitions: Partition[];
  ram: NodeRam[];
  cpu: NodeCpu[];
}

const Index: NextPage<IndexPageProps> = ({
  nodes,
  disks,
  partitions,
  ram,
  cpu,
}) => {
  return (
    <TabsProvider>
      <MainLayout nodes={nodes}>
        <TabPanel index={0}>
          <Disks disks={disks} partitions={partitions} />
        </TabPanel>
        <TabPanel index={1}>
          <Ram ram={ram} />
        </TabPanel>
        <TabPanel index={2}>
          <Cpu cpu={cpu} />
        </TabPanel>
      </MainLayout>
    </TabsProvider>
  );
};

const arrayUniqueByKey = (arr, key: string) => [
  ...new Map(arr.map((item) => [item[key], item])).values(),
];

const sortByNewest = (arr) =>
  arr.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

const getDisksIndentifiers = (nodeName: string, disks: Disk[]) => {
  return [
    ...new Set(disks.map(({ name: diskName }) => `${nodeName}/${diskName}`)),
  ];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const nodeId = context.query.id as string;

  const { data: nodes } = await api.get(`/nodes`);

  const { data: nodeDisks } = await api.get('/node-disks', {
    data: {
      where: {
        nodeId,
      },
    },
  });

  const { data: node } = await api.get(`/nodes/${nodeId}`);

  const partitionQuery = getDisksIndentifiers(node.name, nodeDisks);

  const { data: nodePartitions } = await api.get('/node-disk-partitions', {
    data: {
      where: {
        diskIdentifier: partitionQuery,
      },
    },
  });

  const { data: nodeRam } = await api.get('/node-ram', {
    data: {
      where: {
        nodeId,
      },
      linit: 50,
    },
  });

  const { data: nodeCpu } = await axios.get(
    'http://vps-5c7e69c7.vps.ovh.net:3333/api/node-cpu',
    {
      data: {
        where: {
          nodeId,
        },
        linit: 50,
      },
    }
  );

  const disksByNewest = sortByNewest(nodeDisks);
  const partitionByNewest = sortByNewest(nodePartitions);
  const ramByNewest = sortByNewest(nodeRam);

  return {
    props: {
      nodes: nodes,
      disks: arrayUniqueByKey(disksByNewest, 'name'),
      partitions: arrayUniqueByKey(partitionByNewest, 'diskIdentifier'),
      ram: ramByNewest,
      cpu: nodeCpu,
    },
  };
};;;;
export default Index;
