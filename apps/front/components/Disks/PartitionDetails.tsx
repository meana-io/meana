import { Card, CardContent, Typography } from '@mui/material';

import Partition from '@/types/partition';

import { toTitleCase } from '@/utility/toTitleCase';
import { formatBytes } from '@/utility/formatBytes';

interface PartitionDetailsProps {
  partition: Partition;
}

const PartitionDetails: React.FC<PartitionDetailsProps> = ({ partition }) => {
  const keysToDisplay: (keyof Partition)[] = ['path', 'fileSystem'];

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          Partition - {partition?.path}
        </Typography>
      </CardContent>
      <CardContent>
        {keysToDisplay.map((key) => (
          <Typography key={key} component="div" variant="h6">
            {toTitleCase(key)}: {partition?.[key] ?? 'N/A'}
          </Typography>
        ))}
        <Typography component="div" variant="h6">
          Used Space:{' '}
          {formatBytes(parseInt(partition?.usedSpace || '0', 10)) ?? 'N/A'}
        </Typography>
        <Typography component="div" variant="h6">
          Capacity:{' '}
          {formatBytes(parseInt(partition?.capacity || '0', 10)) ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PartitionDetails;
