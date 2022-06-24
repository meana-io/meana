import { Card, CardContent, Typography } from '@mui/material';

import { formatBytes } from '@/utility/formatBytes';

import Cpu from '@/types/cpu';

interface CpuDetailsProps {
  cpu: Cpu;
}

const CpuDetails: React.FC<CpuDetailsProps> = ({ cpu }) => {
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h4">
          Cpu
        </Typography>
      </CardContent>
      <CardContent>
        <Typography component="div" variant="h6">
          Frequency: {formatBytes(parseInt(cpu?.frequency || '0', 10)) ?? 'N/A'}
        </Typography>
        <Typography component="div" variant="h6">
          CoresQuantity: {formatBytes(parseInt(cpu?.coresQuantity || '0', 10)) ?? 'N/A'}
        </Typography>
        <Typography component="div" variant="h6">
          Manufacture: {formatBytes(parseInt(cpu?.manufacture || '0', 10)) ?? 'N/A'}
        </Typography>
        <Typography component="div" variant="h6">
          Model: {formatBytes(parseInt(cpu?.model || '0', 10)) ?? 'N/A'}
        </Typography>

      </CardContent>
    </Card>
  );
};

export default CpuDetails;
