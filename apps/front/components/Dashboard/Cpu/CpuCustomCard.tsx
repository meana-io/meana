import { useGetNodeCpu } from '@/api/cpu';
import { useGetNode } from '@/api/nodes';
import DashboardCard from '@/components/CustomCard/DashboardCard';
import Progress from '@/components/Progress/Progress';
import { deHashParams } from '@/utility/hashParams';

interface CpuCustomCardProps {
  hash: string;
}

const CpuCustomCard: React.FC<CpuCustomCardProps> = ({ hash }) => {
  const [_, query, title, key] = deHashParams(hash);
  const { data, isLoading } = useGetNodeCpu(query, { limit: 1 });
  const { data: node, isLoading: isLoadingNodeName } = useGetNode(query);

  if (isLoading || isLoadingNodeName) {
    return <Progress />;
  }

  return (
    <DashboardCard title={`${node.name}: ${title}`} hash={hash}>
      {data?.at(0)[key] || 'N/A'}
    </DashboardCard>
  );
};

export const COMPONENT_NAME = 'cpu_custom_card';

export default CpuCustomCard;
