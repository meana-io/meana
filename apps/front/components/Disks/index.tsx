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
  const [disk, setDisk] = useState<Disk | undefined>(undefined);
  const [partition, setPartition] = useState<Partition | undefined>(undefined);

  const handleDiskChange = (diskId: string) => {
    const selectedDisk = disks.find((d) => d.id === diskId);
    setDisk(selectedDisk);
  };

  const handlePartitionChange = (partitionId: string) => {
    const selectedPartition = partitions.find((d) => d.id === partitionId);
    setPartition(selectedPartition);
  };

  const getPartitonsByDiskId = (diskId: string) => {
    return partitions.filter((p) => p.diskId === diskId);
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
          <PartitionDetails partition={partition} />
        </Grid>
      </Grid>

      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={6}>
          {disk && (
            <ChartCard
              title="Disk space"
              labels={getPartitonsByDiskId(disk?.id).map((p) => p?.path)}
              series={getPartitonsByDiskId(disk?.id).map((p) => p?.capacity)}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {partition && (
            <ChartCard
              title="Partiton space"
              labels={['Used', 'Free']}
              series={[
                partition?.capacity - partition?.usedSpace,
                partition?.usedSpace,
              ]}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Disks;
