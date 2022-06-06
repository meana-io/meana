import { useState } from 'react';

import { Grid, Box } from '@mui/material';

import Header from './Header';
import DiskDetails from './DiskDetails';
import PartitionDetails from './PartitionDetails';
import ChartCard from './ChartCard';
import Disk from '@/types/disk';
import Partition from '@/types/partition';

interface DisksProps {
  disks: Disk[];
  partitions: Partition[];
}

const Disks: React.FC<DisksProps> = ({ disks, partitions }) => {
  const [disk, setDisk] = useState<Disk | null>(null);
  const [partition, setPartition] = useState<Partition | null>(null);

  const handleDiskChange = (diskId: string) => {
    const selectedDisk = disks.find((d) => d.id === diskId);
    setDisk(selectedDisk);
  };

  const handlePartitionChange = (partitionId: string) => {
    const selectedPartition = partitions.find((d) => d.id === partitionId);
    setPartition(selectedPartition);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Header
          disks={disks}
          handleDiskChange={handleDiskChange}
          partitions={partitions}
          handlePartitionChange={handlePartitionChange}
        />
      </Grid>
      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={6}>
          <DiskDetails disk={disk} />
        </Grid>
        <Grid item xs={6}>
          {/* <PartitionDetails partition={partition} /> */}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <ChartCard />
      </Grid>
    </Grid>
  );
};

export default Disks;
