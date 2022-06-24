import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import { toTitleCase } from '@/utility/toTitleCase';
import Disk from '@/types/disk';

import { formatBytes } from '@/utility/formatBytes';

interface DiskDetailsProps {
  disk: Disk;
}
const DiskDetails: React.FC<DiskDetailsProps> = ({ disk }) => {
  const keysToDisplay: (keyof Disk)[] = ['manufacture', 'model'];

  return (
    <Card>
      <CardHeader title={`Disk - ${disk?.name}`} />
      <CardContent>
        {keysToDisplay.map((key, index) => (
          <Typography key={index} component="div" variant="h6">
            {toTitleCase(key)}: {disk?.[key] ?? 'N/A'}
          </Typography>
        ))}
        <Typography component="div" variant="h6">
          Capacity: {formatBytes(parseInt(disk?.capacity || '0', 10)) ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiskDetails;
