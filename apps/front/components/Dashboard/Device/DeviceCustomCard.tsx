import { useGetDashboardDevice } from '@/api/devices';
import { useGetNode } from '@/api/nodes';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';

interface DeviceCustomCardCustomCardProps {
  hash: string;
}

const DeviceCustomCardCustomCard: React.FC<DeviceCustomCardCustomCardProps> = ({
  hash,
}) => {
  const [_, query, name, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetDashboardDevice(query, name);
  const { data: node, isLoading: isLoadingNodeName } = useGetNode(query);

  if (isLoading || isLoadingNodeName) {
    return <Progress />;
  }

  return (
    <DashboardCard title={`${node.name}: ${title}`} hash={hash}>
      {data?.at(0)['port'] || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'device_custom_card';

export default DeviceCustomCardCustomCard;
