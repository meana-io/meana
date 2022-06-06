import { Card, CardContent, Typography } from '@mui/material';

import toTitleCase from '@/utility/toTitleCase';
import Disk from '@/types/disk';

interface DiskDetailsProps {
  disk: Disk;
}

const DiskDetails: React.FC<DiskDetailsProps> = ({ disk }) => {
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          {/* Disk - {disk.path} */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DiskDetails;
