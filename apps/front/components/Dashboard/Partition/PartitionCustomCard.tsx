import { useGetNodeDiskPartitionsList } from '@/api/diskPartitions';
import { useGetNode } from '@/api/nodes';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { toFormatBytesInNumber } from '@/utility/formatBytes';
import { deHashParams } from '@/utility/hashParams';

interface PartitionCustomCardProps {
  hash: string;
}

const PartitionCustomCard: React.FC<PartitionCustomCardProps> = ({ hash }) => {
  const [_, query, usedSpace, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeDiskPartitionsList(usedSpace, {
    limit: 1,
  });
  const { data: node, isLoading: isLoadingNodeName } = useGetNode(query);

  if (isLoading || isLoadingNodeName) {
    return <Progress />;
  }

  return (
    <DashboardCard title={`${node.name}: ${title}`} hash={hash}>
      {toFormatBytesInNumber(data?.at(0)[key]) || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'partition_custom_card';

export default PartitionCustomCard;
