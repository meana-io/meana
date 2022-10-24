import { NextPage } from 'next';

import TabPanel from '@/components/Tabs/TabPanel';

import MainLayout from '@/layouts/Main';
import Disks from '@/components/Disks';

import TabsProvider from '@/contexts/tabsContext';

import Ram from '@/components/Ram';
import Cpu from '@/components/Cpu';
import ErrorBoundry from '@/components/Error';

const Index: NextPage = () => {
  return (
    <TabsProvider>
      <MainLayout>
        <TabPanel index={0}>
          <ErrorBoundry>
            <Disks />
          </ErrorBoundry>
        </TabPanel>
        <TabPanel index={1}>
          <Ram />
        </TabPanel>
        <TabPanel index={2}>
          <Cpu />
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
// const disksByNewest = sortByNewest(nodeDisks);
// const partitionByNewest = sortByNewest(nodePartitions);
// const ramByNewest = sortByNewest(nodeRam);
// return {
//   props: {
//     disks: arrayUniqueByKey(disksByNewest, 'name'),
//     partitions: arrayUniqueByKey(partitionByNewest, 'diskIdentifier'),
//     ram: ramByNewest,
//     cpu: nodeCpu,
//   },
// };
// };
export default Index;
