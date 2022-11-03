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

const calcualteDiskSapce = (disk: Disk, partitions: Partition[]) => {
  const diskSpace = parseInt(disk.capacity, 10);
  const used = partitions.reduce(
    (acc, partition) => acc + parseInt(partition.usedSpace, 10),
    0
  );

  return [diskSpace, diskSpace - used];
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

const calcualtePartitionSapce = (partition: Partition) => {
  const capacity = parseInt(partition.capacity, 10);
  const usedSpace = parseInt(partition.usedSpace, 10);
  return [capacity - usedSpace, usedSpace];
};

const Disks: React.FC = () => {
  const [disk, setDisk] = useState<Disk | undefined>(undefined);
  const [partition, setPartition] = useState<Partition | undefined>(undefined);

  const router = useRouter();
  const nodeId = router.query.id as string;
  const { data: disks, isLoading: isLoadingDisks } =
    useGetNodeDisksList(nodeId);

  const { data: partitions } = useGetNodeDiskPartitionsList(
    `${nodeId}/${'example'}`
  );

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
          <DiskDetails disk={disk} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PartitionDetails partition={partition} />
        </Grid>
      </Grid>

      <Grid item spacing={2} container direction="row" xs={12}>
        <Grid item xs={12} md={6}>
          {/* {disk && (
            <ChartCard
              title="Disk space"
              labels={getPartitonsByDiskId(disk.name)?.map(({ path }) => path)}
              series={getPartitonsByDiskId(disk.name)?.map(({ capacity }) =>
                parseInt(capacity, 10)
              )}
            />
          )} */}
        </Grid>
        <Grid item xs={12} md={6}>
          {/* {partition && (
            <ChartCard
              title="Partiton space"
              labels={['Used', 'Free']}
              series={calcualtePartitionSapce(partition)}
            />
          )} */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Disks;


