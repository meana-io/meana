import { useGetNodeRam } from '@/api/ram';
import { formatBytes } from '@/utility/formatBytes';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import BaseCardComponent from '../Base';

interface RamComponentProps {
  query: string;
}

const RamComponent: React.FC<RamComponentProps> = ({ query }) => {
  const { data: ram, isLoading } = useGetNodeRam(query, {
    limit: 1,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!ram) {
    return <BaseCardComponent title="RAM">No Data</BaseCardComponent>;
  }

  return (
    <BaseCardComponent title="Ram">
      <Typography component="p" variant="h6">
        Used Space: {formatBytes(parseInt(ram.at(0)?.used || '0', 10)) ?? 'N/A'}
      </Typography>
      <Typography component="p" variant="h6">
        Capacity: {formatBytes(parseInt(ram.at(0)?.total || '0', 10)) ?? 'N/A'}
      </Typography>
    </BaseCardComponent>
  );
};

export default RamComponent;
