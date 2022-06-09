import { Card, CardContent, Typography } from '@mui/material';

import { toTitleCase } from '@/utility/toTitleCase';
import Disk from '@/types/disk';

interface DiskDetailsProps {
  disk: Disk;
}

const DiskDetails: React.FC<DiskDetailsProps> = ({ disk }) => {
  const keysToDisplay: (keyof Disk)[] = [
    'path',
    'manufacture',
    'model',
    'serialNumber',
    'capacity',
    'firmwareVersion',
  ];

  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          Disk - {disk?.path}
        </Typography>
      </CardContent>
      <CardContent>
        {keysToDisplay.map((key) => (
          <Typography key={key} component="div" variant="h6">
            {toTitleCase(key)}: {disk?.[key] ?? 'N/A'}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default DiskDetails;
