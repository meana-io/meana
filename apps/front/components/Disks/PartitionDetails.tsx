import { Card, CardContent, Typography } from '@mui/material';

import { toTitleCase } from '@/utility/toTitleCase';
import Partition from '@/types/partition';

interface PartitionDetailsProps {
  partition: Partition;
}

const PartitionDetails: React.FC<PartitionDetailsProps> = ({ partition }) => {
  const keysToDisplay: (keyof Partition)[] = [
    'path',
    'usedSpace',
    'capacity',
    'fileSystem',
  ];

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
      </CardContent>
    </Card>
  );
};

export default PartitionDetails;
