import { Grid } from '@mui/material';

import Partition from '@/types/partition';

import { toTitleCase } from '@/utility/toTitleCase';
import { formatBytes } from '@/utility/formatBytes';
import CustomCard from '../CustomCard/CustomCard';

interface PartitionDetailsProps {
  partition: Partition;
}

const toFormatBytesInNumber = (value: string) => {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) ? formatBytes(parsed) : value;
};

const PartitionDetails: React.FC<PartitionDetailsProps> = ({ partition }) => {
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
            title={toTitleCase(key)}
            value={toFormatBytesInNumber(partition[key]) || 'N/A'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default PartitionDetails;
