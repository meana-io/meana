import { Grid } from '@mui/material';

import Partition from '@/types/partition';

import { toTitleCase } from '@/utility/toTitleCase';
import { toFormatBytesInNumber } from '@/utility/formatBytes';
import CustomCard from '@/components/CustomCard/CustomCard';
import { COMPONENT_NAME } from '@/components/Dashboard/Partition/PartitionCustomCard';
import { hashParams } from '@/utility/hashParams';
import { useRouter } from 'next/router';

interface PartitionDetailsProps {
  partition: Partition;
}
const PartitionDetails: React.FC<PartitionDetailsProps> = ({ partition }) => {
  const router = useRouter();
  const nodeId = router.query.id as string;

  const keysToDisplay: (keyof Partition)[] = [
    'path',
    'fileSystem',
    'usedSpace',
    'capacity',
  ];

  return (
    <Grid container spacing={2} item xs={12} lg={6}>
      {keysToDisplay.map((key) => (
        <Grid xs={12} lg={6} xl={4} item key={key}>
          <CustomCard
            hash={hashParams(
              COMPONENT_NAME,
              nodeId,
              partition.usedSpace,
              toTitleCase(key),
              key
            )}
            title={toTitleCase(key)}
            value={toFormatBytesInNumber(partition[key]) || 'N/A'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PartitionDetails;
