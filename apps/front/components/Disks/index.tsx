import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Grid } from '@mui/material';

import Header from './Header';
import DiskDetails from './DiskDetails';
import PartitionDetails from './PartitionDetails';
import DonutCartCard from '../ChartCards/DonutCartCard';
import { useGetNodeDisksAndPartitions } from '@/api/disks';
import Partition from '@/types/partition';
import Disk from '@/types/disk';

const getPartitionFreeAndUsedSpace = (partition: Partition) => {
  const usedSpace = parseInt(partition.usedSpace, 10);
  const capacity = parseInt(partition.capacity, 10);
  return [capacity - usedSpace, usedSpace];
};

const calculatePartitionUasage = (partition: Partition) => {
  const [free, used] = getPartitionFreeAndUsedSpace(partition);

  return (used / (free + used) * 100).toFixed(2);;
};

const getDiskPartitionsPaths = (disk: Disk) => {
  return disk?.partitions.map(({ path }) => path);
};

const getDiskPartitionsCapacity = (disk: Disk) => {
  return disk.partitions?.map(({ capacity }) => parseInt(capacity, 10));
};

const calculateDiskUasage = (disk: Disk) => {
  const totalUsedSpace = disk.partitions?.reduce(
    (total, { usedSpace }) => total + parseInt(usedSpace, 10),
    0
  );
  const totalSpace = parseInt(disk.capacity, 10);

  return ((totalUsedSpace / totalSpace) * 100).toFixed(2);
};

const Disks: React.FC = () => {
  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: disksAndPartitions, isLoading } =
    useGetNodeDisksAndPartitions(nodeId);

  const [selectedDisk, setSelectedDisk] = useState<Disk | undefined>(undefined);
  const [selectedPartition, setSelectedPartition] = useState<
    Partition | undefined
  >(undefined);

  const handleDiskChange = (diskIndex: number) => {
    setSelectedDisk(disksAndPartitions[diskIndex]);
  };

  const handlePartitionChange = (partitionIndex: number) => {
    setSelectedPartition(selectedDisk.partitions[partitionIndex]);
  };

  useEffect(() => {
    setSelectedPartition(undefined);
  }, [selectedDisk]);

  if (isLoading) {
    return <div>Loading disks..</div>;
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Header
          disksAndPartitions={disksAndPartitions}
          selectedDisk={selectedDisk}
          handleDiskChange={handleDiskChange}
          handlePartitionChange={handlePartitionChange}
        />
      </Grid>
      <Grid item spacing={2} container direction="row" xs={12}>
        {selectedDisk && <DiskDetails disk={selectedDisk} />}
        {selectedPartition && (
          <PartitionDetails partition={selectedPartition} />
        )}
      </Grid>
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={12} md={6}>
          {selectedDisk && (
            <DonutCartCard
              title="Disk space"
              value={`Usage: ${calculateDiskUasage(selectedDisk)}%`}
              labels={getDiskPartitionsPaths(selectedDisk)}
              series={getDiskPartitionsCapacity(selectedDisk)}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {selectedPartition && (
            <DonutCartCard
              title="Partition space"
              value={`Usage: ${calculatePartitionUasage(selectedPartition)}%`}
              labels={['Used', 'Free']}
              series={getPartitionFreeAndUsedSpace(selectedPartition)}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Disks;
