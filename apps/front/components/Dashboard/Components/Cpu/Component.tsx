import { useGetNodeCpu } from '@/hooks/queries/useNodeCpu';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

interface CpuComponentProps {
  nodeId: string;
}

const CpuComponent: React.FC<CpuComponentProps> = ({ nodeId }) => {
  const { data: cpu } = useGetNodeCpu(nodeId);
  return (
    <Card>
      <CardHeader title="CPU" />
      <CardContent>
        <Typography component="div" variant="h6">
          Frequency: {cpu[0]?.frequency}
        </Typography>
        <Typography component="div" variant="h6">
          CoresQuantity: {cpu[0]?.coresQuantity}
        </Typography>
        <Typography component="div" variant="h6">
          Manufacture: {cpu[0]?.manufacture}
        </Typography>
        <Typography component="div" variant="h6">
          Model: {cpu[0]?.model}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CpuComponent;
