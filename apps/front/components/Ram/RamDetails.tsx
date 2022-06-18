import { Card, CardContent, Typography } from '@mui/material';

import { formatBytes } from '@/utility/formatBytes';

import Ram from '@/types/ram';

interface RamDetailsProps {
  ram: Ram;
}

const RamDetails: React.FC<RamDetailsProps> = ({ ram }) => {
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          Ram
        </Typography>
      </CardContent>
      <CardContent>
        <Typography component="div" variant="h6">
          Used Space: {formatBytes(parseInt(ram?.used || '0', 10)) ?? 'N/A'}
        </Typography>
        <Typography component="div" variant="h6">
          Capacity: {formatBytes(parseInt(ram?.total || '0', 10)) ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RamDetails;
