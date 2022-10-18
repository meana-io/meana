import { Card, CardContent, CardHeader, Typography } from '@mui/material';

import { formatBytes } from '@/utility/formatBytes';

import Cpu from '@/types/cpu';

interface CpuDetailsProps {
  cpu: Cpu;
}

const CpuDetails: React.FC<CpuDetailsProps> = ({ cpu }) => {
  return (
    <Card>
      <CardHeader title="CPU" />
      <CardContent>
        <Typography component="div" variant="h6">
          Frequency: {cpu?.frequency}
        </Typography>
        <Typography component="div" variant="h6">
          CoresQuantity: {cpu?.coresQuantity}
        </Typography>
        <Typography component="div" variant="h6">
          Manufacture: {cpu?.manufacture}
        </Typography>
        <Typography component="div" variant="h6">
          Model: {cpu?.model}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CpuDetails;
