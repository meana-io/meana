import { useGetNodeDisk } from '@/api/disks';
import { useGetNode } from '@/api/nodes';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { toFormatBytesInNumber } from '@/utility/formatBytes';
import { deHashParams } from '@/utility/hashParams';

interface DiskCustomCardProps {
  hash: string;
}

const DiskCustomCard: React.FC<DiskCustomCardProps> = ({ hash }) => {
  const [_, query, diskName, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeDisk(query, diskName);
  const { data: node } = useGetNode(query);
  if (isLoading) {
    return <Progress />;
  }

  return (
    <DashboardCard title={`${node.name}: ${title}`} hash={hash}>
      {toFormatBytesInNumber(data?.at(0)[key]) || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'disk_custom_card';

export default DiskCustomCard;
