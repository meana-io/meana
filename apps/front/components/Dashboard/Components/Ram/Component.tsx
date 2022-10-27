import { useGetNodeRam } from '@/hooks/queries/useNodeRam';
import { formatBytes } from '@/utility/formatBytes';
import { Typography } from '@mui/material';
import BaseCardComponent from '../Base';

interface RamComponentProps {
  query: string;
}

const RamComponent: React.FC<RamComponentProps> = ({ query }) => {
  const { data: ram } = useGetNodeRam(query);

  return (
    <BaseCardComponent title="Ram">
      <Typography>
        Used Space: {formatBytes(parseInt(ram[0]?.used || '0', 10)) ?? 'N/A'}
      </Typography>
      <Typography component="div" variant="h6">
        Capacity: {formatBytes(parseInt(ram[0]?.total || '0', 10)) ?? 'N/A'}
      </Typography>
    </BaseCardComponent>
  );
};

export default RamComponent;
