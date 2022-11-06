import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import Disk from '@/types/disk';
import Partition from '@/types/partition';
import Header from './Header';
import DiskDetails from './DiskDetails';
import PartitionDetails from './PartitionDetails';
import ChartCard from './ChartCard';
import { useGetNodeDisksList } from '@/api/disks';
import { useGetNodeDiskPartitionsList } from '@/api/diskPartitions';
import DonutCartCard from '../ChartCards/DonutCartCard';

const partitions = [
  {
    time: '2022-10-21T21:00:05.215Z',
    diskIdentifier: 'test-node/null',
    path: '/dev/sda1',
    usedSpace: '239675',
    capacity: '321324',
    fileSystem: 'Ext4',
    name: 'new disk',
  },
  {
    time: '2022-10-21T21:00:05.215Z',
    diskIdentifier: 'test-node/null',
    path: '/dev/sda2',
    usedSpace: '234678',
    capacity: '328314',
    fileSystem: 'Ext4',
    name: 'new disk 2',
  },
];

const getPartitionFreeAndUsedSpace = (partition: Partition) => {
  const usedSpace = parseInt(partition.usedSpace, 10);
  const capacity = parseInt(partition.capacity, 10);
  return [capacity - usedSpace, usedSpace];
};

const getDiskPartitionsPaths = (partitions: Partition[]) => {
  return partitions.map(({ path }) => path);
};

const getDiskPartitionsCapacity = (partitions: Partition[]) => {
  return partitions.map(({ capacity }) => parseInt(capacity, 10));
};

const calculateDiskUasage = (partitions: Partition[]) => {
  const totalUsedSpace = partitions.reduce(
    (total, { usedSpace }) => total + parseInt(usedSpace, 10),
    0
  );
  const totalSpace = partitions.reduce(
    (total, { capacity }) => total + parseInt(capacity, 10),
    0
  );

  return ((totalUsedSpace / totalSpace) * 100).toFixed(2);
};

const Disks: React.FC = () => {
  const [disk, setDisk] = useState<Disk | undefined>(undefined);
  const [partition, setPartition] = useState<Partition | undefined>(undefined);

  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: disks, isLoading: isLoadingDisks } =
    useGetNodeDisksList(nodeId);

  // const { data: partitions } = useGetNodeDiskPartitionsList(
  //   `${nodeId}/${'example'}`
  // );

  const handleDiskChange = (diskName: string) => {
    const selectedDisk = disks.find((d) => d.name === diskName);
    setDisk(selectedDisk);
  };

  const handlePartitionChange = (path: string) => {
    const selectedPartition = partitions.find((d) => d.path === path);
    setPartition(selectedPartition);
  };

  const getPartitonsByDiskId = (diskName: string) => {
    return partitions?.filter((p) => p.diskIdentifier.includes(diskName));
  };

  useEffect(() => {
    setPartition(undefined);
  }, [disk]);

  if (isLoadingDisks) {
    return <div>Loading disks..</div>;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Header
          disks={disks}
          handleDiskChange={handleDiskChange}
          partitions={getPartitonsByDiskId(disk?.name)}
          handlePartitionChange={handlePartitionChange}
        />
      </Grid>
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={12} md={6}>
          <DiskDetails disk={disks[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PartitionDetails partition={partitions[0]} />
        </Grid>
      </Grid>

      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={12} md={6}>
          <DonutCartCard
            title="Disk space"
            value={`Usage: ${calculateDiskUasage(partitions)}%`}
            labels={getDiskPartitionsPaths(partitions)}
            series={getDiskPartitionsCapacity(partitions)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DonutCartCard
            title="Partition space"
            value={`Usage: ${calculateDiskUasage([partitions[0]])}%`}
            labels={['Used', 'Free']}
            series={getPartitionFreeAndUsedSpace(partitions[0])}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Disks;


