import { useGetNodeRam } from '@/hooks/queries/useNodeRam';
import { formatBytes } from '@/utility/formatBytes';
import { Card, CardContent, Typography } from '@mui/material';

interface RamComponentProps {
  nodeId: string;
}

const RamComponent: React.FC<RamComponentProps> = ({ nodeId }) => {
  const { data: ram } = useGetNodeRam(nodeId);

  return (
    <Card>
      <CardContent>
        <Typography>
          Used Space: {formatBytes(parseInt(ram[0]?.used || '0', 10)) ?? 'N/A'}
        </Typography>
        <Typography component="div" variant="h6">
          Capacity: {formatBytes(parseInt(ram[0]?.total || '0', 10)) ?? 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RamComponent;
