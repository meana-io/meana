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
      <Typography component="div" variant="h6">
        Used Space: {ram.at(-1)?.used}
        {/* {formatBytes(parseInt(ram.at(-1)?.used || '0', 10)) ?? 'N/A'} */}
      </Typography>
      <Typography component="div" variant="h6">
        Capacity: {formatBytes(parseInt(ram.at(-1)?.total || '0', 10)) ?? 'N/A'}
      </Typography>
    </BaseCardComponent>
  );
};

export default RamComponent;
