import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Grid, useTheme } from '@mui/material';

import Header from './Header';
import DiskDetails from './DiskDetails';
import PartitionDetails from './PartitionDetails';
import { useGetNodeDisksAndPartitions } from '@/api/disks';
import Partition from '@/types/partition';
import Disk from '@/types/disk';
import DiskUsageChart from 'sections/nodes/DiskUsageChart';

const getPartitionFreeAndUsedSpace = (partition: Partition) => {
  const usedSpace = parseInt(partition.usedSpace, 10);
  const capacity = parseInt(partition.capacity, 10);
  return [
    {
      label: 'Free',
      value: capacity - usedSpace,
    },
    {
      label: 'Used',
      value: usedSpace,
    },
  ];
};

const getDiskParitionsNameAndCapacity = (disk: Disk) => {
  return (
    disk?.partitions?.map(({ path, capacity }) => ({
      label: path,
      value: parseInt(capacity, 10),
    })) ?? []
  );
};

const Disks: React.FC = () => {
  const theme = useTheme();
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
            <DiskUsageChart
              title="Disk details"
              chartData={getDiskParitionsNameAndCapacity(selectedDisk)}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          {selectedPartition && (
            <DiskUsageChart
              title="Partition details"
              chartData={getPartitionFreeAndUsedSpace(selectedPartition)}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Disks;
