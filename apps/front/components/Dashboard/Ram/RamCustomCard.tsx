import { useGetNode } from '@/api/nodes';
import { useGetNodeRam } from '@/api/ram';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';

interface RamCustomCardProps {
  hash: string;
}

const RamCustomCard: React.FC<RamCustomCardProps> = ({ hash }) => {
  const [_, query, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeRam(query, {
    limit: 1,
  });

  const { data: node } = useGetNode(query);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <DashboardCard title={`${node.name}: ${title}`} hash={hash}>
      {data?.at(0)[key] || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'ram_custom_card';

export default RamCustomCard;
